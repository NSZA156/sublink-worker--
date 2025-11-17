import {checkStartsWith} from "../utils.js";
// 定义语言包
const translations = {
  'zh-CN': {
    missingInput: '缺少输入参数',
    missingConfig: '缺少配置参数',
    missingUrl: '缺少URL参数',
    shortUrlNotFound: '短链接未找到',
    invalidShortUrl: '无效的短链接',
    internalError: '内部服务器错误',
    notFound: '未找到',
    invalidFormat: '无效格式：',
    defaultRules: ['Ad Block', 'Lan', 'CN Website', 'Direct', 'AppleCN', 'Global Webiste', 'Global Media', 'Telegram', 'Game Software', 'Apple Microsoft', 'AI Platform'],
    configValidationError: '配置验证错误：',
    pageDescription: 'Sublink Worker - 订阅链接转换工具',
    pageKeywords: '订阅链接,转换,Xray,SingBox,Clash,Surge',
    pageTitle: 'Sublink Worker - 订阅链接转换工具',
    ogTitle: 'Sublink Worker - 订阅链接转换工具',
    ogDescription: '一个强大的订阅链接转换工具，支持多种客户端格式',
    shareUrls: '分享链接',
    urlPlaceholder: '在此输入分享链接（可直接粘贴之前生成的链接快速解析配置）...',
    advancedOptions: '高级选项',
    baseConfigSettings: '基础配置设置',
    baseConfigTooltip: '在此处自定义您的基础配置',
    saveConfig: '保存配置',
    clearConfig: '清除配置',
    convert: '转换',
    clear: '清除',
    customPath: '自定义路径',
    savedPaths: '已保存的路径',
    shortenLinks: '生成短链接',
    ruleSelection: '规则选择',
    ruleSelectionTooltip: '选择您需要的规则集',
    ruleSelectionReject: '拒绝规则',
    ruleSelectionTooltipReject: '这些网站将被默认屏蔽',
    ruleSelectionDirect: '直连规则',
    ruleSelectionTooltipDirect: '这些网站将默认直连',
    ruleSelectionProxy: '代理规则',
    ruleSelectionTooltipProxy: '这些规则将成为可选的组',

    custom: '自定义',
    // minimal: '最小化',
    balanced: '均衡',
    comprehensive: '全面',
    addCustomRule: '添加自定义规则（暂不可用）',
    customRuleOutboundName: '出站名称*',
    customRuleGeoSite: 'Geo-Site规则集',
    customRuleGeoSiteTooltip: 'SingBox中的Site规则来自 https://github.com/lyc8503/sing-box-rules，这意味着您的自定义规则必须在该仓库中',
    customRuleGeoSitePlaceholder: '例如：google,anthropic',
    customRuleGeoIP: 'Geo-IP规则集',
    customRuleGeoIPTooltip: 'SingBox中的IP规则来自 https://github.com/lyc8503/sing-box-rules，这意味着您的自定义规则必须在该仓库中',
    customRuleGeoIPPlaceholder: '例如：private,cn',
    customRuleDomainSuffix: '域名后缀',
    customRuleDomainSuffixPlaceholder: '域名后缀（用逗号分隔）',
    customRuleDomainKeyword: '域名关键词',
    customRuleDomainKeywordPlaceholder: '域名关键词（用逗号分隔）',
    customRuleIPCIDR: 'IP CIDR',
    customRuleIPCIDRPlaceholder: 'IP CIDR（用逗号分隔）',
    customRuleProtocol: '协议类型',
    customRuleProtocolTooltip: '特定流量类型的协议规则。更多详情：https://sing-box.sagernet.org/configuration/route/sniff/',
    customRuleProtocolPlaceholder: '协议（用逗号分隔，例如：http,ssh,dns）',
    removeCustomRule: '移除',
    addCustomRuleJSON: '添加JSON规则',
    customRuleJSON: 'JSON规则',
    customRuleJSONTooltip: '使用JSON格式添加自定义规则，支持批量添加',
    customRulesSection: '自定义规则',
    customRulesSectionTooltip: '创建自定义路由规则来控制特定流量的路由行为。支持表单和JSON两种编辑方式，可以相互转换。',
    customRulesForm: '表单视图',
    customRulesJSON: 'JSON视图',
    customRule: '自定义规则',
    convertToJSON: '转换为JSON',
    convertToForm: '转换为表单',
    validateJSON: '验证JSON',
    clearAll: '清空所有',
    addJSONRule: '添加JSON规则',
    noCustomRulesForm: '点击"添加自定义规则"开始创建规则',
    noCustomRulesJSON: '点击"添加JSON规则"开始创建规则',
    confirmClearAllRules: '确定要清空所有自定义规则吗？',
    noFormRulesToConvert: '没有表单规则可以转换',
    noValidJSONToConvert: '没有有效的JSON规则可以转换',
    convertedFromForm: '从表单转换',
    convertedFromJSON: '从JSON转换',
    mustBeArray: '必须是数组格式',
    nameRequired: '规则名称是必需的',
    invalidJSON: '无效的JSON格式',
    allJSONValid: '所有JSON规则都有效！',
    jsonValidationErrors: 'JSON验证错误',
    // 规则名称和出站名称的翻译
    outboundNames: {
      'Auto Select': '⚡ 自动选择',
      'Node Select': '🚀 节点选择',
      'Fall Back': '🐟 漏网之鱼',
      'Evil Sogou': '⛔ 搜狗记录',
      'Ad Block': '⛔ 广告拦截',
      'Netease Music': '🎵 网易音乐',
      'Lan': '✅ 内网规则',
      'CN Website': '✅ 国内网站',
      'Direct': '✅ 常见直连',
      'AppleCN': '✅ 苹果中国',
      'Speedtest': '⏱️ 测速服务',
      'Global Website': '🌐 常见国外',
      'Global Media': '📺 国外媒体',
      'Telegram': '🛩️ 电报消息',
      'AppleMS CDN': '🏭 苹果微软(CDN)',
      'Game Software': '🕹️ 游戏软件',
      'Apple Microsoft': '🏭 苹果微软',
      'AI Platform': '🤖 AI平台',
      'GLOBAL': 'GLOBAL'
    },
    groupByCountry: '按国家分组',
    groupByCountryTip: '仅 Clash/Surge/SingBox 生效',
    UASettings: '自定义UserAgent',
    UAtip: '默认值curl/7.74.0'
  },
  'en-US': {
    missingInput: 'Missing input parameter',
    missingConfig: 'Missing config parameter',
    missingUrl: 'Missing URL parameter',
    shortUrlNotFound: 'Short URL not found',
    invalidShortUrl: 'Invalid short URL',
    internalError: 'Internal Server Error',
    notFound: 'Not Found',
    invalidFormat: 'Invalid format: ',
    defaultRules: ['Ad Block', 'Lan', 'CN Website', 'Direct', 'AppleCN', 'Global Webiste', 'Global Media', 'Telegram', 'Game Software', 'Apple Microsoft', 'AI Platform'],
    configValidationError: 'Config validation error: ',
    pageDescription: 'Sublink Worker - Subscription Link Converter',
    pageKeywords: 'subscription link,converter,Xray,SingBox,Clash,Surge',
    pageTitle: 'Sublink Worker - Subscription Link Converter',
    ogTitle: 'Sublink Worker - Subscription Link Converter',
    ogDescription: 'A powerful subscription link converter supporting multiple client formats',
    shareUrls: 'Share URLs',
    urlPlaceholder: 'Enter your share links here (paste previously generated links for quick config parsing)...',
    advancedOptions: 'Advanced Options',
    baseConfigSettings: 'Base Config Settings',
    baseConfigTooltip: 'Customize your base configuration here',
    saveConfig: 'Save Config',
    clearConfig: 'Clear Config',
    convert: 'Convert',
    clear: 'Clear',
    customPath: 'Custom Path',
    savedPaths: 'Saved Paths',
    shortenLinks: 'Generate Short Links',
    ruleSelection: 'Rule Selection',
    ruleSelectionTooltip: 'Select your desired rule sets',
    ruleSelectionReject: 'Reject Rules',
    ruleSelectionTooltipReject: 'These websites will be rejected',
    ruleSelectionDirect: 'Direct Rules',
    ruleSelectionTooltipDirect: 'These websites will bypass the proxy',
    ruleSelectionProxy: 'Proxy Rules',
    ruleSelectionTooltipProxy: 'These rules will become switchable groups',
    custom: 'Custom',
    // minimal: 'Minimal',
    balanced: 'Balanced',
    comprehensive: 'Comprehensive',
    addCustomRule: 'Add Custom Rule（Not Avaliable）',
    customRuleOutboundName: 'Outbound Name*',
    customRuleGeoSite: 'Geo-Site Rules',
    customRuleGeoSiteTooltip: 'SingBox Site rules come from https://github.com/lyc8503/sing-box-rules, which means your custom rules must be in that repository',
    customRuleGeoSitePlaceholder: 'e.g., google,anthropic',
    customRuleGeoIP: 'Geo-IP Rules',
    customRuleGeoIPTooltip: 'SingBox IP rules come from https://github.com/lyc8503/sing-box-rules, which means your custom rules must be in that repository',
    customRuleGeoIPPlaceholder: 'e.g., private,cn',
    customRuleDomainSuffix: 'Domain Suffix',
    customRuleDomainSuffixPlaceholder: 'Domain suffixes (comma separated)',
    customRuleDomainKeyword: 'Domain Keyword',
    customRuleDomainKeywordPlaceholder: 'Domain keywords (comma separated)',
    customRuleIPCIDR: 'IP CIDR',
    customRuleIPCIDRPlaceholder: 'IP CIDR (comma separated)',
    customRuleProtocol: 'Protocol Type',
    customRuleProtocolTooltip: 'Protocol rules for specific traffic types. More details: https://sing-box.sagernet.org/configuration/route/sniff/',
    customRuleProtocolPlaceholder: 'Protocols (comma separated, e.g., http,ssh,dns)',
    removeCustomRule: 'Remove',
    addCustomRuleJSON: 'Add JSON Rule',
    customRuleJSON: 'JSON Rule',
    customRuleJSONTooltip: 'Add custom rules using JSON format, supports batch adding',
    customRulesSection: 'Custom Rules',
    customRulesSectionTooltip: 'Create custom routing rules to control traffic routing behavior. Supports both form and JSON editing modes with bidirectional conversion.',
    customRulesForm: 'Form View',
    customRulesJSON: 'JSON View',
    customRule: 'Custom Rule',
    convertToJSON: 'Convert to JSON',
    convertToForm: 'Convert to Form',
    validateJSON: 'Validate JSON',
    clearAll: 'Clear All',
    addJSONRule: 'Add JSON Rule',
    noCustomRulesForm: 'Click "Add Custom Rule" to start creating rules',
    noCustomRulesJSON: 'Click "Add JSON Rule" to start creating rules',
    confirmClearAllRules: 'Are you sure you want to clear all custom rules?',
    noFormRulesToConvert: 'No form rules to convert',
    noValidJSONToConvert: 'No valid JSON rules to convert',
    convertedFromForm: 'Converted from Form',
    convertedFromJSON: 'Converted from JSON',
    mustBeArray: 'Must be an array format',
    nameRequired: 'Rule name is required',
    invalidJSON: 'Invalid JSON format',
    allJSONValid: 'All JSON rules are valid!',
    jsonValidationErrors: 'JSON validation errors',
    outboundNames:{
      'Auto Select': '⚡ Auto Select',
      'Node Select': '🚀 Node Select',
      'Fall Back': '🐟 Fall Back',
      'Evil Sogou': 'Sogou Record',
      'Ad Block': 'AdBlock',
      'Netease Music': '🎵 Netease',
      'Lan': 'Lan',
      'CN Website': 'China Website',
      'Direct': 'Direct Website',
      'AppleCN': 'Apple China',
      'Speedtest': '⏱️ Speedtest',
      'Global Website': '🌐 Global Website',
      'Global Media': '📺 Global Media',
      'Telegram': '🛩️ Telegram',
      'AppleMS CDN': '🏭 Apple&Microsoft(CDN)',
      'Game Software': '🕹️ Game&Download',
      'Apple Microsoft': '🏭 Apple&Microsoft',
      'AI Platform': '🤖 AI Platform',
      'GLOBAL': 'GLOBAL'
    },
    groupByCountry: 'Group by Country',
    groupByCountryTip: 'Clash/Surge/SingBox only',
    UASettings: 'Custom UserAgent',
    UAtip: 'By default it will use curl/7.74.0'
  },
  // 'fa': {
  //   missingInput: 'پارامتر ورودی وجود ندارد',
  //   missingConfig: 'پارامتر پیکربندی وجود ندارد',
  //   missingUrl: 'پارامتر URL وجود ندارد',
  //   shortUrlNotFound: 'لینک کوتاه پیدا نشد',
  //   internalError: 'خطای داخلی سرور',
  //   notFound: 'یافت نشد',
  //   invalidFormat: 'فرمت نامعتبر: ',
  //   defaultRules: ['مسدودسازی تبلیغات', 'سرویس‌های گوگل', 'رسانه‌های خارجی', 'تلگرام'],
  //   configValidationError: 'خطای اعتبارسنجی پیکربندی: ',
  //   pageDescription: 'Sublink Worker - مبدل لینک اشتراک',
  //   pageKeywords: 'لینک اشتراک,مبدل,Xray,SingBox,Clash,Surge',
  //   pageTitle: 'Sublink Worker - مبدل لینک اشتراک',
  //   ogTitle: 'Sublink Worker - مبدل لینک اشتراک',
  //   ogDescription: 'یک مبدل قدرتمند لینک اشتراک با پشتیبانی از فرمت‌های مختلف',
  //   shareUrls: 'اشتراک‌گذاری لینک‌ها',
  //   urlPlaceholder: 'لینک‌های اشتراک خود را اینجا وارد کنید...',
  //   advancedOptions: 'گزینه‌های پیشرفته',
  //   baseConfigSettings: 'تنظیمات پیکربندی پایه',
  //   baseConfigTooltip: 'پیکربندی پایه خود را اینجا سفارشی کنید',
  //   saveConfig: 'ذخیره پیکربندی',
  //   clearConfig: 'پاک کردن پیکربندی',
  //   convert: 'تبدیل',
  //   clear: 'پاک کردن',
  //   customPath: 'مسیر سفارشی',
  //   savedPaths: 'مسیرهای ذخیره شده',
  //   shortenLinks: 'ایجاد لینک‌های کوتاه',
  //   ruleSelection: 'انتخاب قوانین',
  //   ruleSelectionTooltip: 'مجموعه قوانین مورد نظر خود را انتخاب کنید',
  //   custom: 'سفارشی',
  //   minimal: 'حداقل',
  //   balanced: 'متعادل',
  //   comprehensive: 'جامع',
  //   addCustomRule: 'افزودن قانون سفارشی',
  //   customRuleOutboundName: 'نام خروجی*',
  //   customRuleGeoSite: 'قوانین Geo-Site',
  //   customRuleGeoSiteTooltip: 'قوانین SingBox Site از https://github.com/lyc8503/sing-box-rules می‌آیند، به این معنی که قوانین سفارشی شما باید در آن مخزن باشد',
  //   customRuleGeoSitePlaceholder: 'برای مثال: google,anthropic',
  //   customRuleGeoIP: 'قوانین Geo-IP',
  //   customRuleGeoIPTooltip: 'قوانین SingBox IP از https://github.com/lyc8503/sing-box-rules می‌آیند، به این معنی که قوانین سفارشی شما باید در آن مخزن باشد',
  //   customRuleGeoIPPlaceholder: 'برای مثال: private,cn',
  //   customRuleDomainSuffix: 'پسوند دامنه',
  //   customRuleDomainSuffixPlaceholder: 'پسوندهای دامنه (با کاما جدا شده)',
  //   customRuleDomainKeyword: 'کلمه کلیدی دامنه',
  //   customRuleDomainKeywordPlaceholder: 'کلمات کلیدی دامنه (با کاما جدا شده)',
  //   customRuleIPCIDR: 'IP CIDR',
  //   customRuleIPCIDRPlaceholder: 'IP CIDR (با کاما جدا شده)',
  //   customRuleProtocol: 'نوع پروتکل',
  //   customRuleProtocolTooltip: 'قوانین پروتکل برای انواع خاص ترافیک. جزئیات بیشتر: https://sing-box.sagernet.org/configuration/route/sniff/',
  //   customRuleProtocolPlaceholder: 'پروتکل‌ها (با کاما جدا شده، مثلاً: http,ssh,dns)',
  //   removeCustomRule: 'حذف',
  //   outboundNames: {
  //     'Auto Select': '⚡ انتخاب خودکار',
  //     'Node Select': '🚀 انتخاب نود',
  //     'Fall Back': '🐟 فال بک',
  //     'Ad Block': '🛑 مسدودسازی تبلیغات',
  //     'AI Services': '💬 سرویس‌های هوش مصنوعی',
  //     'Bilibili': '📺 بیلی‌بیلی',
  //     'Youtube': '📹 یوتیوب',
  //     'Google': '🔍 سرویس‌های گوگل',
  //     'Private': '🏠 شبکه خصوصی',
  //     'Location:CN': '🔒 سرویس‌های چین',
  //     'Telegram': '📲 تلگرام',
  //     'Github': '🐱 گیت‌هاب',
  //     'Microsoft': 'Ⓜ️ سرویس‌های مایکروسافت',
  //     'Apple': '🍏 سرویس‌های اپل',
  //     'Social Media': '🌐 شبکه‌های اجتماعی',
  //     'Streaming': '🎬 استریمینگ',
  //     'Gaming': '🎮 پلتفرم بازی',
  //     'Education': '📚 منابع آموزشی',
  //     'Financial': '💰 سرویس‌های مالی',
  //     'Cloud Services': '☁️ سرویس‌های ابری',
  //     'Non-China': '🌐 خارج از چین',
  //     'GLOBAL': 'GLOBAL'
  //   },
  //   UASettings: 'Custom UserAgent',
  //   UAtip: 'By default it will use curl/7.74.0'
  // }
};

// 当前语言
let currentLang = 'zh-CN';


// 设置语言
export function setLanguage(lang) {
  if(translations[lang]) {
    currentLang = lang;
  } else if(checkStartsWith(lang, 'en')) {
    currentLang = 'en-US';
  // } else if(checkStartsWith(lang, 'fa')) {
  //   currentLang = 'fa';
  } else {
    currentLang = 'zh-CN';
  }
}

// 获取翻译，支持嵌套键值访问
export function t(key) {
  const keys = key.split('.');
  let value = translations[currentLang];
  
  // 逐级查找翻译值
  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) {
      if (checkStartsWith(key, 'outboundNames.')) {
        return key.split('.')[1];
      }
      // 找不到翻译时返回原始键名
      return key;
    }
  }
  return value;
}

// 获取当前语言
export function getCurrentLang() {
  return currentLang;
}

// 获取默认规则列表
export function getDefaultRules() {
  return translations[currentLang].defaultRules;
}

// 获取出站集
export function getOutbounds(){
  return translations[currentLang].outboundNames;
}
