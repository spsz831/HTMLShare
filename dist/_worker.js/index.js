globalThis.process ??= {}; globalThis.process.env ??= {};
import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_DWWNjljg.mjs';
import { manifest } from './manifest_amJHj-84.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/health.astro.mjs');
const _page2 = () => import('./pages/api/html/_id_.astro.mjs');
const _page3 = () => import('./pages/api/pages/_id_.astro.mjs');
const _page4 = () => import('./pages/api/pages.astro.mjs');
const _page5 = () => import('./pages/demo.astro.mjs');
const _page6 = () => import('./pages/view/_id_.astro.mjs');
const _page7 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js", _page0],
    ["src/pages/api/health.ts", _page1],
    ["src/pages/api/html/[id].ts", _page2],
    ["src/pages/api/pages/[id].ts", _page3],
    ["src/pages/api/pages.ts", _page4],
    ["src/pages/demo.astro", _page5],
    ["src/pages/view/[id].astro", _page6],
    ["src/pages/index.astro", _page7]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = undefined;
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
