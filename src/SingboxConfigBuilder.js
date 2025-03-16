import { SING_BOX_CONFIG, generateSingboxRuleSets, generateRules, getOutbounds, PREDEFINED_RULE_SETS, getActions, UNIFIED_RULES} from './config.js';
import { BaseConfigBuilder } from './BaseConfigBuilder.js';
import { DeepCopy } from './utils.js';
import { t } from './i18n/index.js';

export class SingboxConfigBuilder extends BaseConfigBuilder {
    constructor(inputString, selectedRules, customRules, baseConfig, lang, userAgent) {
        if (baseConfig === undefined) {
            baseConfig = SING_BOX_CONFIG;
        }
        super(inputString, baseConfig, lang, userAgent);
        this.selectedRules = selectedRules;
        this.customRules = customRules;
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
        this.config.outbounds.push(proxy);
    }

    addAutoSelectGroup(proxyList) {
        this.config.outbounds.unshift({
            type: "urltest",
            tag: t('outboundNames.Auto Select'),
            outbounds: DeepCopy(proxyList),
            url: "http://www.v2ex.com/generate_204",
            interval: "10m"
        });
    }

    addNodeSelectGroup(proxyList) {
        proxyList.unshift('DIRECT', t('outboundNames.Auto Select'));
        this.config.outbounds.unshift({
            type: "selector",
            tag: t('outboundNames.Node Select'),
            outbounds: proxyList
        });
    }

    addOutboundGroups(outbounds, proxyList) {
        outbounds.forEach(outbound => {
            if (outbound !== t('outboundNames.Node Select') && getActions(outbound) != 'DIRECT' && getActions(outbound) != 'REJECT') {
                this.config.outbounds.push({
                    type: "selector",
                    tag: t(`outboundNames.${outbound}`),
                    outbounds: [t('outboundNames.Node Select'), ...proxyList]
                });
            }
        });
    }

    addCustomRuleGroups(proxyList) {
        if (Array.isArray(this.customRules)) {
            this.customRules.forEach(rule => {
                this.config.outbounds.push({
                    type: "selector",
                    tag: rule.name,
                    outbounds: [t('outboundNames.Node Select'), ...proxyList]
                });
            });
        }
    }

    addFallBackGroup(proxyList) {
        this.config.outbounds.push({
            type: "selector",
            tag: t('outboundNames.Fall Back'),
            outbounds: [t('outboundNames.Node Select'), ...proxyList]
        });
    }

    formatConfig() {
        const rules = generateRules(this.selectedRules, this.customRules);
        const { singbox_site_rule_sets, singbox_non_ip_rule_sets, singbox_ip_rule_sets } = generateSingboxRuleSets(this.selectedRules, this.customRules);

        this.config.route.rule_set = [...singbox_site_rule_sets, ...singbox_non_ip_rule_sets, ...singbox_ip_rule_sets];

        this.config.route.rules = rules.map(rule => ({
            rule_set: [
                ...(rule.site_rules.filter(site => site.trim() !== '').map(site => `${site}_domainset`)),
                ...(rule.non_ip_rules.filter(non_ip => non_ip.trim() !== '').map(non_ip => `${non_ip}_non_ip`)),
                ...(rule.ip_rules.filter(ip => ip.trim() !== '').map(ip => `${ip}_ip`))
            ],
            domain_suffix: rule.domain_suffix,
            domain_keyword: rule.domain_keyword,
            ip_cidr: rule.ip_cidr,
            protocol: rule.protocol,
            outbound: getActions(rule.outbound) == 'DIRECT' && getActions(rule.outbound) != 'REJECT' ? 'DIRECT' : t(`outboundNames.${rule.outbound}`),
            action: getActions(rule.outbound) == 'REJECT' ? 'reject' : undefined
        }));

        this.config.route.rules.unshift(
            { inbound: ['mixed-in', 'tun-in'], action: 'sniff' },
            { port: 53, action: 'hijack-dns'}
        );

        this.config.route.rules.unshift(
            { clash_mode: 'direct', outbound: 'DIRECT' },
            { clash_mode: 'global', outbound: t('outboundNames.Node Select') }
        );
        this.config.route.auto_detect_interface = true;
        this.config.route.final = t('outboundNames.Fall Back');

        return this.config;
    }
}