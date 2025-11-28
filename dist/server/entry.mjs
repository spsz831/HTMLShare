import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CjIBkGWC.mjs';
import { manifest } from './manifest_CYSNsfo4.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/pages/_id_.astro.mjs');
const _page2 = () => import('./pages/api/pages.astro.mjs');
const _page3 = () => import('./pages/demo.astro.mjs');
const _page4 = () => import('./pages/view/_id_.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/api/pages/[id].ts", _page1],
    ["src/pages/api/pages.ts", _page2],
    ["src/pages/demo.astro", _page3],
    ["src/pages/view/[id].astro", _page4],
    ["src/pages/index.astro", _page5]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///E:/WorkSpace/HTMLShare/dist/client/",
    "server": "file:///E:/WorkSpace/HTMLShare/dist/server/",
    "host": true,
    "port": 3000,
    "assets": "_astro"
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
{
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
