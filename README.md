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
  
  <p><a href="/docs/README_CN.md">中文文档</a></p>
</div>

## 🚀 Quick Start

### Quick Deployment
- Fork this project, click the `Deploy to Cloudflare` button above
- Select your repository in the `Import Repository` section (you need to link your GitHub account)
- Change the `Deploy Command` as follows, then select `Save and Deploy`
``` bash
npm run deploy
```

## ✨ Features

### Supported Protocols
- ShadowSocks
- VMess
- VLESS
- Hysteria2 (默认使用curl作为UA，某些情况下可能不会下发Hysteria2协议，请修改UA为v2ray)
- Trojan
- TUIC

### Core Features
- Support for importing Base64 http/https subscription links and various protocol sharing URLs
- Pure JavaScript + Cloudflare Worker implementation, one-click deployment, ready to use
- Support for fixed/random short link generation (based on KV)
- Light/Dark theme toggle
- Flexible API, supporting script operations
- Support for Chinese, English, and Persian languages

### Client Support
- Sing-Box
- Clash
- Xray/V2Ray
- Surge

### TODO
- 重构协议匹配
- 添加Clash、Surge、Sing-Box订阅作为来源
- 支持更多通用特性……

### Web Interface Features
- User-friendly operation interface
- Various predefined rule sets
- Customizable policy groups for geo-site, geo-ip, ip-cidr, and domain-suffix

## 📖 API Documentation

For detailed API documentation, please refer to [APIDoc.md](/docs/APIDoc.md)

### Main Endpoints
- `/singbox` - Generate Sing-Box configuration
- `/clash` - Generate Clash configuration
- `/xray` - Generate Xray configuration
- `/shorten` - Generate short links

## 📝 Recent Updates

### 2025-11-08

- feat(config): Added support for proxy configuration grouped by country, updated related translations

## 🔧 Project Structure

```
.
├── index.js                 # Main server logic, handles request routing
├── BaseConfigBuilder.js     # Build base configuration
├── SingboxConfigBuilder.js  # Build Sing-Box configuration
├── ClashConfigBuilder.js    # Build Clash configuration
├── ProxyParsers.js          # Parse URLs of various proxy protocols
├── utils.js                 # Provide various utility functions
├── htmlBuilder.js           # Generate Web interface
├── style.js                 # Generate CSS for Web interface
├── config.js                # Store configuration information
└── docs/
    ├── APIDoc.md            # API documentation
    ├── UpdateLogs.md        # Update logs
    ├── FAQ.md               # Frequently asked questions
    └── BaseConfig.md        # Basic configuration feature introduction
```

## 🤝 Contribution

Sublink Worker-- 暂不接受 Issues ，若其工作中有任何异常且不是本分叉特有，请提交 issue 至 https://github.com/7Sageer/sublink-worker，
若其工作有任何异常且为本分叉特有，您可以 Pull Requests 来改进这个项目。
Issues and Pull Requests are welcome to improve this project.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

This project is for learning and exchange purposes only. Please do not use it for illegal purposes. All consequences resulting from the use of this project are solely the responsibility of the user and are not related to the developer.

## 💰 Sponsorship

<div align="center">
  <h3>Thanks to the following sponsors for their support of this project</h3>
<table border="0">
  <tr>
    <td>
      <a href="https://yxvm.com/" target="_blank" title="YXVM">
        <img src="https://image.779477.xyz/yxvm.png" alt="YXVM" height="60" hspace="20"/>
      </a>
    </td>
    <td>
      <a href="https://github.com/NodeSeekDev/NodeSupport" target="_blank" title="NodeSupport">
        <img src="https://image.779477.xyz/ns.png" alt="NodeSupport" height="60" hspace="20"/>
      </a>
    </td>
  </tr>
</table>
  <p><b>NodeSupport has sponsored this project, thank you for your support!</b></p>
  <p>If you would like to sponsor this project, please contact the developer <a href="https://github.com/7Sageer" style="text-decoration: none;">@7Sageer</a></p>
</div>

## ⭐ Star History

Thanks to everyone who has starred this project! 🌟

<a href="https://star-history.com/#7Sageer/sublink-worker&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=7Sageer/sublink-worker&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=7Sageer/sublink-worker&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=7Sageer/sublink-worker&type=Date" />
 </picture>
</a>
