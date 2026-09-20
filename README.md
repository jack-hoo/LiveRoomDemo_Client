# LiveRoomDemo — Client

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Vue](https://img.shields.io/badge/Vue-2.x-42b883.svg)](https://v2.vuejs.org/)
[![Node](https://img.shields.io/badge/Node-8.x-green.svg)](https://nodejs.org/)

The mobile front-end of a live-streaming room demo, built with Vue 2: HLS playback,
a STOMP-over-WebSocket chat room, bullet-screen comments and live viewer statistics.

**中文文档请看 [README.zh-CN.md](README.zh-CN.md)** — it is the primary documentation and
covers setup, configuration and the Node version requirement in detail.

---

## Features

- HLS live playback via `vue-video-player` + `videojs-contrib-hls`
- WebSocket chat room over STOMP (`vue-stomp`)
- Bullet-screen comments synced with the chat (`vue2-barrage`)
- Live online-viewer list and visitor history
- Mobile-first UI built on [Vonic](https://github.com/wangdahoo/vonic)

## ⚠️ Node version requirement

This project's build chain is frozen at **webpack 2 + node-sass 4.x**, which means it
**only installs on Node 8.x**. `node-sass@4` ships no prebuilt binary for Node 9 or
newer, so `npm install` fails before the build even starts.

```bash
nvm install 8
nvm use 8
npm install
npm run dev
```

The framework and build toolchain were deliberately left untouched during the 2026
cleanup, to keep the project as it originally was. See
[README.zh-CN.md](README.zh-CN.md#环境要求) for the full rationale and the options if
you want to modernise it.

## Quick start

```bash
nvm use 8
npm install

# point the client at your backend and stream, then:
npm run dev      # dev server on http://localhost:8080, proxying /LiveDemo to :8085
npm run build    # production bundle in dist/
```

The backend lives in
[LiveRoomDemo_Server](https://github.com/jack-hoo/LiveRoomDemo_Server) and must be
running for the chat room to work. Configuration lives in `config/prod.env.js` —
see [README.zh-CN.md](README.zh-CN.md#配置).

## Related repositories

- [LiveRoomDemo_Server](https://github.com/jack-hoo/LiveRoomDemo_Server) — Spring Boot backend

## Contributing

Issues and pull requests are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

## License

[MIT](LICENSE) © jack-hoo
