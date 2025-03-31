<div align="center">
  <h1>⚠️ FORCE PUSH WARNING ⚠️</h1>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZL7MFFHWpDzHCdJKwcRHfWMaVVb7Hr0o7mDAly0EdoKJzU1EnLcKCdP1F&s">
  <br>

  <h1><b>Sublink Worker--</b></h1>
  <h5><i>统一、平衡、轻量、无负担的 Serverless 自部署订阅转换工具</i></h5>
  <h6><i>(以及新特性试验场)</i></h6>

  <!-- <p>
    <a href="https://sublink-worker.sageer.me">https://sublink-worker.sageer.me</a>
  </p> -->
  <br>

  <p>
    <a href="https://dash.cloudflare.com/?to=/:account/workers-and-pages/create">
      <img src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare Workers"/>
    </a>
  </p>
</div>

## ⚠️ 免责声明及许可证

本项目仅供学习交流使用，请勿用于非法用途。
本项目不提供任何担保，也不对任何损失负责，
包括但不限于：客户端无法正常工作、网络延迟、分流异常、设备变砖、设备丢失、小行星撞击地球、您或您的私有财产掉入Backrooms等。
使用本项目所造成的一切后果由使用者自行承担，与开发者无关。

本项目采用 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

您在使用本项目的预置规则集时可能使用到来自[Sukka RuleSet Server](https://ruleset.skk.moe/)的规则文件，
使用它们则代表您知晓并同意其[隐私政策](https://skk.moe/privacy-policy/)中所声明的条款（与本项目无关）。
若您不同意，请勿使用内置规则集，作为替代，请使用自定义规则集(**WIP**)或使用MetaRules规则集(**WIP**)。

## 🚀 快速开始

### --> 读我 <--
提示：大多数场景下，您应该优先考虑[原项目](https://github.com/7Sageer/sublink-worker)，
一般对于**能够带向上游的特性，我会尽量带向上游**，除非您有特定问题，否则不必使用本仓库。

- Q: 什么是Sublink Worker--，为什么要有Sublink-Worker--？  
- A: Sublink Worker--是[Sublink Worker](https://github.com/7Sageer/sublink-worker)的妹妹。
由于原项目使用者众多，为了照顾到较多用户，不方便进行大规模实验性改动。Sublink Worker--诞生的目的是提出并实施一些激进的改动。
相比于原项目，Sublink Worker--抛弃了订阅文件中对于GeoSITE和GeoIP的依赖，完全使用远程规则集。它的配置模板经过精简和调整，
目的是为所有客户端带来统一、平衡的使用体验，同时使尽量多的场景下，用户能够无负担的使用和学习。  

- Q: 我的客户端是XXX，操作系统是XXX，为什么不加入XXX特性(平台或客户端特有)  
- A: 正如上面所言，Sublink Worker--希望带来平衡且统一的体验，因此不会加入如TProxy、ProxyProvider等仅限少数平台或客户端的特性。
您可自行在配置文件中添加字段。  

- Q: Sublink Worker--添加特性的标准是什么？  
- A: 如果某项功能或订阅格式在四种订阅链接（Base64、Sing-box、Clash、Surge）中有三种及以上有对应客户端支持该特性，那么会考虑加入。  

- Q: Sublink Worker--支持的客户端有什么？  
- A: 本项目主要支持Sing-Box、Clash Meta、Surge(Surfboard)的官方客户端最新稳定版，任何在非最新稳定版上出现的异常均被视为预期行为。  

### 快速部署
- Fork本项目，点击上方Deploy to Cloudflare按钮
- 在`导入储存库`栏选择你的仓库（你需要绑定Github账户）
- 更改`部署命令`如下，选择`保存并部署`即可使用
``` bash
npm run deploy
```

### 新手指南
参考[官方文档](/docs)，或原项目下的Youtube指南。

## ✨ 功能特点

### 差异
和官方版Sublink Worker相比，Sublink Worker--有以下差异：
- 不对非最新稳定客户端提供支持(Sing-box v1.11- Clash原版 Surge v5.8-)，它们可能无法启动或工作异常
- 订阅面板分类展示，规则集被分为屏蔽、直连、代理三种，已订阅的屏蔽和直连规则默认出站为REJECT和DIRECT
- 全面换用远程规则集(感谢SukkaW)
- 规则模板差异

### 支持协议
- ShadowSocks
- VMess
- VLESS
- Hysteria2 (默认使用curl作为UA，某些情况下可能不会下发Hysteria2协议，请修改UA为v2ray)
- Trojan
- TUIC

### 核心功能
- 支持导入 Base64 的 http/https 订阅链接以及多种协议的分享URL
- 纯JavaScript + Cloudflare Worker实现，一键部署，开箱即用
- 支持固定/随机短链接生成（基于 KV）
- 浅色/深色主题切换
- 灵活的 API，支持脚本化操作
- 中文，英语双语言支持

### 客户端支持
- Sing-Box
- Clash
- Xray/V2Ray
- Surge

### TODO
- 重构协议匹配
- 添加Clash、Surge、Sing-Box订阅作为来源
- 支持更多通用特性……

### Web 界面特性
- 用户友好的操作界面
- 提供多种预定义规则集
- 可自建关于 geo-site、geo-ip、ip-cidr 和 domain-suffix 的自定义策略组(**WIP**)

## 📖 API 文档

详细的 API 文档请参考 [API-doc.md](/docs/API-doc.md)

### 主要端点
- `/singbox` - 生成 Sing-Box 配置
- `/clash` - 生成 Clash 配置
- `/surge` - 生成 Surge 配置
- `/xray` - 生成 Xray 配置
- `/shorten` - 生成短链接

## 🔧 项目结构

```
.
├── index.js                 # 主要的服务器逻辑，处理请求路由
├── BaseConfigBuilder.js     # 构建基础配置
├── SingboxConfigBuilder.js  # 构建 Sing-Box 配置
├── ClashConfigBuilder.js    # 构建 Clash 配置
├── SurgeConfigBuilder.js    # 构建 Surge 配置
├── ProxyParsers.js         # 解析各种代理协议的 URL
├── utils.js                # 提供各种实用函数
├── htmlBuilder.js          # 生成 Web 界面
├── style.js               # 生成 Web 界面的 CSS
├── config.js              # 保存配置信息
└── docs/
    ├── API-doc.md         # API 文档
    ├── update-log.md      # 更新日志
    └── FAQ.md             # 常见问题解答
```

## 🤝 贡献

Sublink Worker-- 暂不接受 Issues ，若其工作中有任何异常且不是本分叉特有，请提交 issue 至 https://github.com/7Sageer/sublink-worker，
若其工作有任何异常且为本分叉特有，您可以 Pull Requests 来改进这个项目。
