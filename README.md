# LupoVerify Extension

Zero-knowledge Twitter verification powered by TLSNotary MPC-TLS protocol.

## Overview

LupoVerify is a Chrome extension that generates cryptographic proofs of web content without revealing sensitive data. Built on TLSNotary's MPC-TLS protocol, it enables privacy-preserving verification of Twitter interactions for the LupoVerify ZK Quest System. Features a custom dark glassmorphism UI and fixes critical Chrome Manifest V3 async messaging issues from the upstream fork.

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS with custom glassmorphism theme
- **Build**: Webpack 5
- **Extension**: Chrome Manifest V3
- **Crypto**: TLSNotary MPC-TLS (`tlsn-js`), Extism WASM plugins
- **State**: Redux with Thunk middleware

## Quick Start

```bash
git clone https://github.com/LucianoLupo/lupo-verify-extension.git
cd lupo-verify-extension
npm install
npm run build
```

Load in Chrome:
1. Navigate to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" → select `build/`

### Development

```bash
npm run dev                         # Watch mode with hot reload
NODE_ENV=production npm run build   # Production build
```

## Architecture

```
src/
├── entries/
│   ├── Background/    # Service worker (MPC-TLS coordination)
│   ├── Content/       # Content script (DOM interaction)
│   ├── Popup/         # Toolbar popup UI
│   ├── SidePanel/     # Progress display panel
│   ├── Offscreen/     # Offscreen document for WASM
│   └── Options/       # Configuration page
├── components/        # Shared React components
├── pages/             # Page-level components
├── reducers/          # Redux state management
└── utils/             # Core utilities and crypto helpers
```

**Key Features:**
- MPC-TLS notarization for cryptographic proofs
- WASM plugin system via Extism for custom data extraction
- Real-time progress tracking in Chrome side panel

## Related Projects

- [ZK Twitter Verifier](https://github.com/LucianoLupo/zk-twitter-verifier-002) — Full ZK Twitter verification stack

## Resources

- [TLSNotary Docs](https://docs.tlsnotary.org/)

## License

Dual-licensed under MIT or Apache 2.0.
