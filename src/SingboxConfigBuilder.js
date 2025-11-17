import { SING_BOX_CONFIG, generateSingboxRuleSets, generateRules, getOutbounds, PREDEFINED_RULE_SETS, getActions, UNIFIED_RULES} from './config.js';
import { BaseConfigBuilder } from './BaseConfigBuilder.js';
import { DeepCopy, parseCountryFromNodeName } from './utils.js';
import { t } from './i18n/index.js';

export class SingboxConfigBuilder extends BaseConfigBuilder {
    constructor(inputString, selectedRules, customRules, baseConfig, lang, userAgent, groupByCountry = false) {
        if (baseConfig === undefined) {
            baseConfig = SING_BOX_CONFIG;
        }
        super(inputString, baseConfig, lang, userAgent, groupByCountry);
        this.selectedRules = selectedRules;
        this.customRules = customRules;
        this.countryGroupNames = [];
        this.manualGroupName = null;
    }

    getProxies() {
        return this.config.outbounds.filter(outbound => outbound?.server != undefined);
    }

    getProxyName(proxy) {
        return proxy.tag;
    }

    convertProxy(proxy) {
        return proxy;
    }

    addProxyToConfig(proxy) {
        // Check if there are proxies with similar tags in existing outbounds
        const similarProxies = this.config.outbounds.filter(p => p.tag && p.tag.includes(proxy.tag));

        // Check if there is a proxy with identical data (excluding the tag)
        const isIdentical = similarProxies.some(p => {
            const { tag: _, ...restOfProxy } = proxy; // Exclude the tag attribute
            const { tag: __, ...restOfP } = p;       // Exclude the tag attribute
            return JSON.stringify(restOfProxy) === JSON.stringify(restOfP);
        });

        if (isIdentical) {
            // If there is a proxy with identical data, skip adding it
            return;
        }

        // If there are proxies with similar tags but different data, modify the tag name
        if (similarProxies.length > 0) {
            proxy.tag = `${proxy.tag} ${similarProxies.length + 1}`;
        }

        this.config.outbounds.push(proxy);
    }

    addAutoSelectGroup(proxyList) {
        this.config.outbounds.push({
            type: "urltest",
            tag: t('outboundNames.Auto Select'),
            outbounds: DeepCopy(proxyList),
            url: "http://www.v2ex.com/generate_204",
            interval: "10m"
        });
    }

    addNodeSelectGroup(proxyList) {
        proxyList.unshift('DIRECT', t('outboundNames.Auto Select'));
        this.config.outbounds.push({
            type: "selector",
            tag: t('outboundNames.Node Select'),
            outbounds: proxyList
        });
    }

    buildSelectorMembers(proxyList = []) {
        const normalize = (s) => typeof s === 'string' ? s.trim() : s;
        const base = this.groupByCountry
            ? [
                t('outboundNames.Node Select'),
                t('outboundNames.Auto Select'),
                ...(this.manualGroupName ? [this.manualGroupName] : []),
                ...(this.countryGroupNames || [])
              ]
            : [
                t('outboundNames.Node Select'),
                ...proxyList
              ];
        const combined = ['DIRECT', 'REJECT', ...base].filter(Boolean);
        const seen = new Set();
        return combined.filter(name => {
            const key = normalize(name);
            if (!key || seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    addOutboundGroups(outbounds, proxyList) {
        outbounds.forEach(outbound => {
            if (outbound !== t('outboundNames.Node Select') && getActions(outbound) != 'DIRECT' && getActions(outbound) != 'REJECT') {
                this.config.outbounds.push({
                    type: "selector",
                    tag: t(`outboundNames.${outbound}`),
                    outbounds: selectorMembers
                });
            }
        });
    }

    addCustomRuleGroups(proxyList) {
        if (Array.isArray(this.customRules)) {
            this.customRules.forEach(rule => {
                const selectorMembers = this.buildSelectorMembers(proxyList);
                this.config.outbounds.push({
                    type: "selector",
                    tag: rule.name,
                    outbounds: selectorMembers
                });
            });
        }
    }

    addFallBackGroup(proxyList) {
        const selectorMembers = this.buildSelectorMembers(proxyList);
        this.config.outbounds.push({
            type: "selector",
            tag: t('outboundNames.Fall Back'),
            outbounds: selectorMembers
        });
    }

    addCountryGroups() {
        const proxies = this.getProxies();
        const countryGroups = {};

        proxies.forEach(proxy => {
            const countryInfo = parseCountryFromNodeName(proxy?.tag || '');
            if (countryInfo) {
                const { name } = countryInfo;
                if (!countryGroups[name]) {
                    countryGroups[name] = { ...countryInfo, proxies: [] };
                }
                countryGroups[name].proxies.push(proxy.tag);
            }
        });

        const normalize = (s) => typeof s === 'string' ? s.trim() : s;
        const existingTags = new Set((this.config.outbounds || []).map(o => normalize(o?.tag)).filter(Boolean));

        const manualProxyNames = proxies.map(p => p?.tag).filter(Boolean);
        const manualGroupName = manualProxyNames.length > 0 ? t('outboundNames.Manual Switch') : null;
        if (manualGroupName) {
            const manualNorm = normalize(manualGroupName);
            if (!existingTags.has(manualNorm)) {
                this.config.outbounds.push({
                    type: 'selector',
                    tag: manualGroupName,
                    outbounds: manualProxyNames
                });
                existingTags.add(manualNorm);
            }
        }

        const countries = Object.keys(countryGroups).sort((a, b) => a.localeCompare(b));
        const countryGroupNames = [];

        countries.forEach(country => {
            const { emoji, name, proxies: countryProxies } = countryGroups[country];
            if (!countryProxies || countryProxies.length === 0) {
                return;
            }
            const groupName = `${emoji} ${name}`;
            const norm = normalize(groupName);
            if (!existingTags.has(norm)) {
                this.config.outbounds.push({
                    tag: groupName,
                    type: 'urltest',
                    outbounds: countryProxies
                });
                existingTags.add(norm);
            }
            countryGroupNames.push(groupName);
        });

        const nodeSelectTag = t('outboundNames.Node Select');
        const nodeSelectGroup = this.config.outbounds.find(o => normalize(o?.tag) === normalize(nodeSelectTag));
        if (nodeSelectGroup && Array.isArray(nodeSelectGroup.outbounds)) {
            const seen = new Set();
            const rebuilt = [
                'DIRECT',
                'REJECT',
                t('outboundNames.Auto Select'),
                ...(manualGroupName ? [manualGroupName] : []),
                ...countryGroupNames
            ].filter(Boolean);
            nodeSelectGroup.outbounds = rebuilt.filter(name => {
                if (seen.has(name)) return false;
                seen.add(name);
                return true;
            });
        }

        this.countryGroupNames = countryGroupNames;
        this.manualGroupName = manualGroupName;
    }

    formatConfig() {
        const rules = generateRules(this.selectedRules, this.customRules);
        const { singbox_site_rule_sets, singbox_non_ip_rule_sets, singbox_ip_rule_sets } = generateSingboxRuleSets(this.selectedRules, this.customRules);

        this.config.route.rule_set = [...singbox_site_rule_sets, ...singbox_non_ip_rule_sets, ...singbox_ip_rule_sets];

        // Rule-Set & Domain-Set:  To reduce DNS leaks and unnecessary DNS queries,
        // domain & non-IP rules must precede IP rules

        rules.filter(rule => !!rule.domain_suffix || !!rule.domain_keyword).map(rule => {
            this.config.route.rules.push({
                domain_suffix: rule.domain_suffix,
                domain_keyword: rule.domain_keyword,
                protocol: rule.protocol, 
                outbound : getActions(rule.outbound) == 'DIRECT' ? 'DIRECT' : getActions(rule.outbound) == 'REJECT' ? undefined : t(`outboundNames.${rule.outbound}`), 
                action: getActions(rule.outbound) == 'REJECT' ? 'reject' : undefined
            });
        });

        // Predefined site rules
        rules.filter(rule => !!rule.site_rules[0]).map(rule => {
            this.config.route.rules.push({
                rule_set: [
                    ...(rule.site_rules.filter(site => site.trim() !== '').map(site => `${site}_domainset`))
                ],
                protocol: rule.protocol, 
                outbound : getActions(rule.outbound) == 'DIRECT' ? 'DIRECT' : getActions(rule.outbound) == 'REJECT' ? undefined : t(`outboundNames.${rule.outbound}`), 
                action: getActions(rule.outbound) == 'REJECT' ? 'reject' : undefined
            });
        });

        // Predefined non ip rules
        rules.filter(rule => !!rule.non_ip_rules[0]).map(rule => {
            this.config.route.rules.push({
                rule_set: [
                    ...(rule.non_ip_rules.filter(non_ip => non_ip.trim() !== '').map(non_ip => `${non_ip}_non_ip`))
                ],
                protocol: rule.protocol, 
                outbound : getActions(rule.outbound) == 'DIRECT' ? 'DIRECT' : getActions(rule.outbound) == 'REJECT' ? undefined : t(`outboundNames.${rule.outbound}`), 
                action: getActions(rule.outbound) == 'REJECT' ? 'reject' : undefined
            });
        });

        // Resolve the Domain if Any IP Rules were selected!!!
        if (rules.some(rule => !!rule.ip_rules[0] || !!rule?.ip_cidr)) {
            this.config.route.rules.push({
                inbound: [
                    'mixed-in', 'tun-in'
                ],
                action: 'resolve'
            });
        };

        // Predefined ip rules
        rules.filter(rule => !!rule.ip_rules[0]).map(rule => {
            this.config.route.rules.push({
                rule_set: [
                    ...(rule.ip_rules.filter(ip => ip.trim() !== '').map(ip => `${ip}_ip`))
                ],
                protocol: rule.protocol, 
                outbound : getActions(rule.outbound) == 'DIRECT' ? 'DIRECT' : getActions(rule.outbound) == 'REJECT' ? undefined : t(`outboundNames.${rule.outbound}`), 
                action: getActions(rule.outbound) == 'REJECT' ? 'reject' : undefined
            });
        });

        rules.filter(rule => !!rule.ip_cidr).map(rule => {
            this.config.route.rules.push({
                ip_cidr: rule.ip_cidr,
                protocol: rule.protocol, 
                outbound : getActions(rule.outbound) == 'DIRECT' ? 'DIRECT' : getActions(rule.outbound) == 'REJECT' ? undefined : t(`outboundNames.${rule.outbound}`), 
                action: getActions(rule.outbound) == 'REJECT' ? 'reject' : undefined
            });
        });

        this.config.route.rules.unshift(
            { inbound: ['mixed-in', 'tun-in'], action: 'sniff' },
            { port: 53, action: 'hijack-dns'}
        );

        this.config.route.rules.unshift(
            { clash_mode: 'direct', outbound: 'DIRECT' },
            { clash_mode: 'global', outbound: t('outboundNames.Node Select') },
            { action: 'sniff' },
            { protocol: 'dns', action: 'hijack-dns' }
        );
        this.config.route.auto_detect_interface = true;
        this.config.route.final = t('outboundNames.Fall Back');

        return this.config;
    }
}
