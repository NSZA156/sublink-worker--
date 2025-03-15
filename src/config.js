import { t } from './i18n';

export const SINGBOX_SITE_RULE_SET_BASE_URL = 'https://ruleset.skk.moe/sing-box/domainset/';
export const SINGBOX_NON_IP_RULE_SET_BASE_URL = 'https://ruleset.skk.moe/sing-box/non_ip/';
export const SINGBOX_IP_RULE_SET_BASE_URL = 'https://ruleset.skk.moe/sing-box/ip/';
export const CLASH_SITE_RULE_SET_BASE_URL = 'https://ruleset.skk.moe/Clash/domainset/';
export const CLASH_NON_IP_RULE_SET_BASE_URL = 'https://ruleset.skk.moe/Clash/non_ip/';
export const CLASH_IP_RULE_SET_BASE_URL = 'https://ruleset.skk.moe/Clash/ip/';
export const SURGE_SITE_RULE_SET_BASE_URL = 'https://ruleset.skk.moe/List/domainset/';
export const SURGE_NON_IP_RULE_SET_BASE_URL = 'https://ruleset.skk.moe/List/non_ip/';
export const SURGE_IP_RULE_SET_BASE_URL = 'https://ruleset.skk.moe/List/ip/';
// Custom rules
export const CUSTOM_RULES = [];
// Unified rule structure
// The order of the rules was adjusted, 
// and don't change them unless you know what you're doing!
// Confusion of order will cause some rules to lapse!!!
export const UNIFIED_RULES = [
	{
		name: 'Evil Sogou',
		outbound: 'REJECT',
		site_rules: ['sogouinput'],
		non_ip_rules: [],
		ip_rules: []
	},
	{
		name: 'Ad Block',
		outbound: 'REJECT',
		site_rules: ['reject'],
		non_ip_rules: ['reject'],
		ip_rules: ['reject']
	},
	{
		name: 'Netease Music',
		outbound: t('outboundNames.Netease'),
		site_rules: [],
		non_ip_rules: ['neteasemusic'],
		ip_rules: []
	},
	{
		name: 'Lan',
		outbound: 'DIRECT',
		site_rules: [],
		non_ip_rules: ['lan'],
		ip_rules: ['lan']
	},
	{
		name: 'CN Website',
		outbound: 'DIRECT',
		site_rules: [],
		non_ip_rules: ['domestic'],
		ip_rules: ['domestic', 'china_ip']
	},
	{
		name: 'Direct',
		outbound: 'DIRECT',
		site_rules: [],
		non_ip_rules: ['direct'],
		ip_rules: []
	},
	{
		name: 'AppleCN',
		outbound: 'DIRECT',
		site_rules: [],
		non_ip_rules: ['apple_cn'],
		ip_rules: []
	},
	{
		name: 'Speedtest',
		outbound: t('outboundNames.Speedtest'),
		site_rules: ['speedtest'],
		non_ip_rules: [],
		ip_rules: []
	},
	{
		name: 'Global Website',
		outbound: t('outboundNames.Global Website'),
		site_rules: ['cdn'],
		non_ip_rules: ['cdn', 'global'],
		ip_rules: []
	},
	{
		name: 'Global Media',
		outbound: t('outboundNames.Global Media'),
		site_rules: [],
		non_ip_rules: ['stream'],
		ip_rules: ['stream']
	},
	{
		name: 'Telegram',
		outbound: t('outboundNames.Telegram'),
		site_rules: [],
		non_ip_rules: ['telegram'],
		ip_rules: ['telegram']
	},
	{
		name: 'AppleMS CDN',
		outbound: t('outboundNames.AppleMS CDN'),
		site_rules: [],
		non_ip_rules: ['apple_cdn', 'microsoft_cdn'],
		ip_rules: []
	},
	{
		name: 'Game Software',
		outbound: t('outboundNames.Game Software'),
		site_rules: ['download'],
		non_ip_rules: ['download'],
		ip_rules: []
	},
	{
		name: 'Apple Microsoft',
		outbound: t('outboundNames.Apple Microsoft'),
		site_rules: [],
		non_ip_rules: ['apple_services', 'microsoft'],
		ip_rules: []
	},
	{
		name: 'AI Platform',
		outbound: t('outboundNames.AI Platform'),
		site_rules: [],
		non_ip_rules: ['ai'],
		ip_rules: []
	}
];

export const PREDEFINED_RULE_SETS = {
	balanced: ['Ad Block', 'Lan', 'CN Website', 'Direct', 'AppleCN', 'Global Website', 'Global Media', 'Telegram', 'Game Software', 'Apple Microsoft', 'AI Platform'],
	comprehensive: UNIFIED_RULES.map(rule => rule.name)
  };
  


// Generate SINGBOX_SITE_RULE_SETS and SINGBOX_IP_RULE_SETS from UNIFIED_RULES
export const SINGBOX_SITE_RULE_SETS = UNIFIED_RULES.reduce((acc, rule) => {
	rule.site_rules.forEach(site_rule => {
		acc[site_rule] = `${site_rule}.json`;
	});
	return acc;
}, {});

export const SINGBOX_NON_IP_RULE_SETS = UNIFIED_RULES.reduce((acc, rule) => {
	rule.non_ip_rules.forEach(non_ip_rule => {
		acc[non_ip_rule] = `${non_ip_rule}.json`;
	});
	return acc;
}, {});

export const SINGBOX_IP_RULE_SETS = UNIFIED_RULES.reduce((acc, rule) => {
	rule.ip_rules.forEach(ip_rule => {
		acc[ip_rule] = `${ip_rule}.json`;
	});
	return acc;
}, {});

// Generate CLASH_SITE_RULE_SETS and CLASH_IP_RULE_SETS for .txt format
export const CLASH_SITE_RULE_SETS = UNIFIED_RULES.reduce((acc, rule) => {
	rule.site_rules.forEach(site_rule => {
		acc[site_rule] = `${site_rule}.txt`;
	});
	return acc;
}, {});

export const CLASH_NON_IP_RULE_SETS = UNIFIED_RULES.reduce((acc, rule) => {
	rule.non_ip_rules.forEach(non_ip_rule => {
		acc[non_ip_rule] = `${non_ip_rule}.txt`;
	});
	return acc;
}, {});

export const CLASH_IP_RULE_SETS = UNIFIED_RULES.reduce((acc, rule) => {
	rule.ip_rules.forEach(ip_rule => {
		acc[ip_rule] = `${ip_rule}.txt`;
	});
	return acc;
}, {});

// Helper function to get outbounds based on selected rule names
// This is confusing! --NSZA156
export function getOutbounds(selectedRuleNames) {
    if (!selectedRuleNames || !Array.isArray(selectedRuleNames)) {
        return [];
    }
    return UNIFIED_RULES
      .filter(rule => selectedRuleNames.includes(rule.name))
      .map(rule => rule.name);
}

// To Avoid another level confusion, Here is a new function to get Outbounds/Actions OF THE RULES!
export function getActions(selectedRuleOutbounds) {
    return UNIFIED_RULES
      .filter(rule => selectedRuleOutbounds.includes(rule.name))
      .map(rule => rule.outbound);
}

// Helper function to generate rules based on selected rule names
export function generateRules(selectedRules = [], customRules = []) {
	if (typeof selectedRules === 'string' && PREDEFINED_RULE_SETS[selectedRules]) {
	  selectedRules = PREDEFINED_RULE_SETS[selectedRules];
	}
  
	if (!selectedRules || selectedRules.length === 0) {
	  selectedRules = PREDEFINED_RULE_SETS.balanced;
	}
  
	const rules = [];
  
	UNIFIED_RULES.forEach(rule => {
	  if (selectedRules.includes(rule.name)) {
		rules.push({
		  site_rules: rule.site_rules,
		  non_ip_rules: rule.non_ip_rules,
		  ip_rules: rule.ip_rules,
		  domain_suffix: rule?.domain_suffix,
		  ip_cidr: rule?.ip_cidr,
		  outbound: rule.name
		});
	  }
	});
  
	customRules.reverse();
	customRules.forEach((rule) => {
		rules.unshift({
			site_rules: rule.site.split(','),
			ip_rules: rule.ip.split(','),
			domain_suffix: rule.domain_suffix ? rule.domain_suffix.split(',') : [],
			domain_keyword: rule.domain_keyword ? rule.domain_keyword.split(',') : [],
			ip_cidr: rule.ip_cidr ? rule.ip_cidr.split(',') : [],
			protocol: rule.protocol ? rule.protocol.split(',') : [],
			outbound: rule.name
		});
		});
  
	return rules;
}


export function generateSingboxRuleSets(selectedRules = [], customRules = []) {
  if (typeof selectedRules === 'string' && PREDEFINED_RULE_SETS[selectedRules]) {
    selectedRules = PREDEFINED_RULE_SETS[selectedRules];
  }
  
  if (!selectedRules || selectedRules.length === 0) {
    selectedRules = PREDEFINED_RULE_SETS.balanced;
  }

  const selectedRulesSet = new Set(selectedRules);

  const siteRuleSets = new Set();
  const nonIpRuleSets = new Set();
  const ipRuleSets = new Set();

  const ruleSets = [];

  UNIFIED_RULES.forEach(rule => {
    if (selectedRulesSet.has(rule.name)) {
      rule.site_rules.forEach(siteRule => siteRuleSets.add(siteRule));
	  rule.non_ip_rules.forEach(nonIpRule => nonIpRuleSets.add(nonIpRule));
      rule.ip_rules.forEach(ipRule => ipRuleSets.add(ipRule));
    }
  });
  
  const singbox_site_rule_sets = Array.from(siteRuleSets).map(rule => ({
    tag: `${rule}_domainset`,
    type: 'remote',
    format: 'source',
    url: `${SINGBOX_SITE_RULE_SET_BASE_URL}${SINGBOX_SITE_RULE_SETS[rule]}`
  }));

  const singbox_non_ip_rule_sets = Array.from(nonIpRuleSets).map(rule => ({
    tag: `${rule}_non_ip`,
    type: 'remote',
    format: 'source',
    url: `${SINGBOX_NON_IP_RULE_SET_BASE_URL}${SINGBOX_NON_IP_RULE_SETS[rule]}`
  }));

  const singbox_ip_rule_sets = Array.from(ipRuleSets).map(rule => ({
    tag: `${rule}_ip`,
    type: 'remote',
    format: 'source',
    url: `${SINGBOX_IP_RULE_SET_BASE_URL}${SINGBOX_IP_RULE_SETS[rule]}`
  }));

//   if(customRules){
// 	customRules.forEach(rule => {
// 		if(rule.site!=''){
// 			rule.site.split(',').forEach(site => {
// 				singbox_site_rule_sets.push({
// 					tag: site.trim(),
// 					type: 'remote',
// 					format: 'binary',
// 					url: `${SINGBOX_SITE_RULE_SET_BASE_URL}geosite-${site.trim()}.srs`,
// 				});
// 			});
// 		}
// 		if(rule.ip!=''){
// 			rule.ip.split(',').forEach(ip => {
// 				singbox_ip_rule_sets.push({
// 					tag: `${ip.trim()}-ip`,
// 					type: 'remote',
// 					format: 'binary',
// 					url: `${SINGBOX_IP_RULE_SET_BASE_URL}geoip-${ip.trim()}.srs`,
// 				});
// 			});
// 		}
// 	});
// 	}

  ruleSets.push(...singbox_site_rule_sets, ...singbox_non_ip_rule_sets, ...singbox_ip_rule_sets);

  return { singbox_site_rule_sets, singbox_non_ip_rule_sets, singbox_ip_rule_sets };
}

// Generate rule sets for Clash using .txt format
export function generateClashRuleSets(selectedRules = [], customRules = []) {
  if (typeof selectedRules === 'string' && PREDEFINED_RULE_SETS[selectedRules]) {
    selectedRules = PREDEFINED_RULE_SETS[selectedRules];
  }
  
  if (!selectedRules || selectedRules.length === 0) {
    selectedRules = PREDEFINED_RULE_SETS.balanced;
  }

  const selectedRulesSet = new Set(selectedRules);

  const siteRuleSets = new Set();
  const nonIpRuleSets = new Set();
  const ipRuleSets = new Set();

  UNIFIED_RULES.forEach(rule => {
    if (selectedRulesSet.has(rule.name)) {
      rule.site_rules.forEach(siteRule => siteRuleSets.add(siteRule));
	  rule.non_ip_rules.forEach(nonIpRule => nonIpRuleSets.add(nonIpRule))
      rule.ip_rules.forEach(ipRule => ipRuleSets.add(ipRule));
    }
  });

  const site_rule_providers = {};
  const non_ip_rule_providers = {};
  const ip_rule_providers = {};

  Array.from(siteRuleSets).forEach(rule => {
    site_rule_providers[rule+'_domainset'] = {
      type: 'http',
      format: 'text',
      behavior: 'domain',
      url: `${CLASH_SITE_RULE_SET_BASE_URL}${CLASH_SITE_RULE_SETS[rule]}`
    };
  });

  Array.from(nonIpRuleSets).forEach(rule => {
    non_ip_rule_providers[rule+'_non_ip'] = {
      type: 'http',
      format: 'text',
      behavior: 'classical',
      url: `${CLASH_NON_IP_RULE_SET_BASE_URL}${CLASH_NON_IP_RULE_SETS[rule]}`
    };
  });

  Array.from(ipRuleSets).forEach(rule => {
    ip_rule_providers[rule+'_ip'] = {
      type: 'http',
      format: 'text',
      behavior: 'classical',
      url: `${CLASH_IP_RULE_SET_BASE_URL}${CLASH_IP_RULE_SETS[rule]}`
    };
  });

  if (ip_rule_providers['china_ip']) {
	ip_rule_providers['china_ip'].format = 'ipcidr';
  };

// Add custom rules
//   if(customRules){
//     customRules.forEach(rule => {
//       if(rule.site!=''){
//         rule.site.split(',').forEach(site => {
//           const site_trimmed = site.trim();
//           site_rule_providers[site_trimmed] = {
//             type: 'http',
//             format: 'mrs',
//             behavior: 'domain',
//             url: `${CLASH_SITE_RULE_SET_BASE_URL}${site_trimmed}.mrs`
//           };
//         });
//       }
//       if(rule.ip!=''){
//         rule.ip.split(',').forEach(ip => {
//           const ip_trimmed = ip.trim();
//           ip_rule_providers[ip_trimmed] = {
//             type: 'http',
//             format: 'mrs',
//             behavior: 'ipcidr',
//             url: `${CLASH_IP_RULE_SET_BASE_URL}${ip_trimmed}.mrs`
//           };
//         });
//       }
//     });
//   }

  return { site_rule_providers, non_ip_rule_providers, ip_rule_providers };
}

// Singbox configuration
export const SING_BOX_CONFIG = {
	log: {
		level: "info"
	},
	experimental: {
		cache_file: {
			enabled: true,
			store_fakeip: true
		}
	},
	dns: {
		servers: [
			{
				tag: "dns_default",
				address: "180.184.1.1",
				strategy: "ipv4_only",
				detour: "DIRECT"
			},
			{
				tag: "dns_fakeip",
				address: "fakeip"
			}
		],
		rules: [
			{
				outbound: "any",
				server: "dns_default"
			},
			{
				query_type: [
					"A"
				],
				server: "dns_fakeip"
			}
		],
		fakeip: {
			enabled: true,
			inet4_range: "198.18.0.1/15",
		}
	},
	inbounds: [
		{ type: 'mixed', tag: 'mixed-in', listen: '0.0.0.0', listen_port: 2080 },
		{ type: 'tun', tag: 'tun-in', address: '172.19.0.1/30', auto_route: true, stack: 'mixed' }
	],
	outbounds: [
		{ type: 'direct', tag: 'DIRECT' }
	],
	route : {
		rule_set: [],
		rules: []
	}
};

export const CLASH_CONFIG = {
    'mode': 'rule',
    'log-level': 'info',
	'profile': {
		'store-fake-ip': true
	},
	'listener': [
		{
			'name': 'mixed-in',
			'type': 'mixed',
			'port': 7892,
			'listen': '0.0.0.0'
		},
		{
			'name': 'tun-in',
			'type': 'tun',
			'stack': 'mixed',
			'auto-route': true,
			'dns-hijack': [
				'0.0.0.0:53'
			],
			'inet4-address':[
				'198.19.0.1/30'
			]
		}
	],
    'dns': {
        'enable': true,
		'ipv6': false,
        'enhanced-mode': 'fake-ip',
		'fake-ip-range':  '198.18.0.1/15',
        'nameserver': [
            '180.184.1.1'
        ]
    },
    'proxies': [],
    'proxy-groups': [],
    'rule-providers': {
		// 将由代码自动生成
	}
};

export const SURGE_CONFIG = {
	'general': {
		'loglevel': 'info',
		'allow-wifi-access': true,
		'allow-hotspot-access': true,
		'wifi-access-http-port': 6152,
		'wifi-access-socks5-port': 6153,
		'http-listen': '0.0.0.0:6152',
		'socks5-listen': '0.0.0.0:6153',
		'ipv6': false,
		'dns-server': '180.184.1.1',
		'read-etc-hosts': true,
		'hijack-dns': '*:53',
		'proxy-test-url': 'http://www.v2ex.com/generate_204'
	}
};