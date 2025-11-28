globalThis.process ??= {}; globalThis.process.env ??= {};
import { w as decodeKey } from './chunks/astro/server_CJTHuxak.mjs';
import './chunks/astro-designed-error-pages_C6HZAR6Y.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/noop-middleware_D3EimOmg.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///E:/WorkSpace/HTMLShare/","cacheDir":"file:///E:/WorkSpace/HTMLShare/node_modules/.astro/","outDir":"file:///E:/WorkSpace/HTMLShare/dist/","srcDir":"file:///E:/WorkSpace/HTMLShare/src/","publicDir":"file:///E:/WorkSpace/HTMLShare/public/","buildClientDir":"file:///E:/WorkSpace/HTMLShare/dist/","buildServerDir":"file:///E:/WorkSpace/HTMLShare/dist/_worker.js/","adapterName":"@astrojs/cloudflare","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/health","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/health\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"health","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/health.ts","pathname":"/api/health","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/html/[id]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/html\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"html","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/html/[id].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/pages/[id]","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/pages\\/([^/]+?)\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"pages","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/api/pages/[id].ts","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/pages","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/pages\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"pages","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/pages.ts","pathname":"/api/pages","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/demo.Bno24cYL.css"}],"routeData":{"route":"/demo","isIndex":false,"type":"page","pattern":"^\\/demo\\/?$","segments":[[{"content":"demo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/demo.astro","pathname":"/demo","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/demo.Bno24cYL.css"}],"routeData":{"route":"/view/[id]","isIndex":false,"type":"page","pattern":"^\\/view\\/([^/]+?)\\/?$","segments":[[{"content":"view","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/view/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/demo.Bno24cYL.css"},{"type":"inline","content":"html{font-family:Inter,system-ui,sans-serif}body{margin:0;line-height:1.6;color:#1f2937;background:#fff}[data-astro-cid-sckkx6r4]{box-sizing:border-box}[data-astro-cid-sckkx6r4]::-webkit-scrollbar{width:8px}[data-astro-cid-sckkx6r4]::-webkit-scrollbar-track{background:#f1f5f9}[data-astro-cid-sckkx6r4]::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:4px}[data-astro-cid-sckkx6r4]::-webkit-scrollbar-thumb:hover{background:#94a3b8}[data-astro-cid-sckkx6r4]:focus{outline:2px solid #3b82f6;outline-offset:2px}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.animate-spin[data-astro-cid-sckkx6r4]{animation:spin 1s linear infinite}:root{--bg-primary: #ffffff;--bg-secondary: #f8fafc;--bg-card: #ffffff;--text-primary: #1f2937;--text-secondary: #6b7280;--border-color: #e5e7eb;--accent-color: #3b82f6;--accent-hover: #2563eb}[data-astro-cid-j7pv25f6][data-theme=dark]{--bg-primary: #0f172a;--bg-secondary: #1e293b;--bg-card: #1e293b;--text-primary: #f1f5f9;--text-secondary: #94a3b8;--border-color: #334155;--accent-color: #60a5fa;--accent-hover: #3b82f6}[data-astro-cid-j7pv25f6]{transition:background-color .3s ease,color .3s ease,border-color .3s ease}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["E:/WorkSpace/HTMLShare/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/health@_@ts":"pages/api/health.astro.mjs","\u0000@astro-page:src/pages/api/html/[id]@_@ts":"pages/api/html/_id_.astro.mjs","\u0000@astro-page:src/pages/api/pages/[id]@_@ts":"pages/api/pages/_id_.astro.mjs","\u0000@astro-page:src/pages/api/pages@_@ts":"pages/api/pages.astro.mjs","\u0000@astro-page:src/pages/demo@_@astro":"pages/demo.astro.mjs","\u0000@astro-page:src/pages/view/[id]@_@astro":"pages/view/_id_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"index.js","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_CyuP4FsF.mjs","E:/WorkSpace/HTMLShare/node_modules/unstorage/drivers/cloudflare-kv-binding.mjs":"chunks/cloudflare-kv-binding_DMly_2Gl.mjs","E:/WorkSpace/HTMLShare/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_B6iCIBs0.mjs","E:/WorkSpace/HTMLShare/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.CuM_r5Ju.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["E:/WorkSpace/HTMLShare/src/pages/index.astro?astro&type=script&index=0&lang.ts","const g=document.getElementById(\"themeToggle\"),l=document.getElementById(\"sunIcon\"),i=document.getElementById(\"moonIcon\"),u=document.documentElement,h=localStorage.getItem(\"theme\")||\"light\";m(h);g?.addEventListener(\"click\",function(){const e=(u.getAttribute(\"data-theme\")||\"light\")===\"light\"?\"dark\":\"light\";m(e)});function m(t){u.setAttribute(\"data-theme\",t),localStorage.setItem(\"theme\",t),t===\"dark\"?(l?.classList.remove(\"hidden\"),i?.classList.add(\"hidden\")):(l?.classList.add(\"hidden\"),i?.classList.remove(\"hidden\"))}const c=document.getElementById(\"htmlForm\"),f=document.getElementById(\"fileInput\"),p=document.getElementById(\"clearBtn\"),y=document.getElementById(\"content\"),r=document.getElementById(\"result\"),a=document.getElementById(\"error\"),b=document.getElementById(\"submitBtn\");f?.addEventListener(\"change\",function(t){const e=t.target.files?.[0];if(e&&e.type===\"text/html\"){const n=new FileReader;n.onload=function(o){y.value=o.target?.result||\"\"},n.readAsText(e)}});p?.addEventListener(\"click\",function(){c?.reset(),r?.classList.add(\"hidden\"),a?.classList.add(\"hidden\")});c?.addEventListener(\"submit\",async function(t){t.preventDefault();const e=b,n=e?.textContent;try{e&&(e.disabled=!0,e.textContent=\"⏳ 生成中...\");const o=new FormData(c),s=await fetch(\"/api/pages\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify({title:\"Shared HTML\",content:o.get(\"content\"),language:\"html\",description:null,is_public:!0})});if(!s.ok)throw new Error(`HTTP ${s.status}: ${s.statusText}`);const d=await s.json();if(d.success)v(d.data);else throw new Error(d.error||\"Creation failed\")}catch(o){console.error(\"Error:\",o),x(o.message)}finally{e&&(e.disabled=!1,e.textContent=n)}});function v(t){const n=`${window.location.origin}/view/${t.url_id}`;r.innerHTML=`\n        <div class=\"rounded-lg border p-4\" style=\"background-color: #dcfce7; border-color: #86efac; color: #15803d;\">\n          <p class=\"font-medium mb-3\">✅ 分享链接已生成:</p>\n          <div class=\"flex gap-2\">\n            <input\n              type=\"text\"\n              value=\"${n}\"\n              readonly\n              class=\"flex-1 px-3 py-2 rounded text-sm font-mono focus:outline-none\"\n              style=\"background-color: rgba(255,255,255,0.8); border: 1px solid #86efac;\"\n            />\n            <button\n              onclick=\"copyToClipboard('${n}')\"\n              class=\"px-4 py-2 rounded hover:opacity-90 text-sm text-white transition-all\"\n              style=\"background-color: #059669;\"\n            >\n              📋 复制\n            </button>\n            <a\n              href=\"${n}\"\n              target=\"_blank\"\n              rel=\"noopener noreferrer\"\n              class=\"px-4 py-2 rounded hover:opacity-90 text-sm text-white transition-all\"\n              style=\"background-color: #2563eb;\"\n            >\n              🔗 打开\n            </a>\n          </div>\n        </div>\n      `,r?.classList.remove(\"hidden\"),a?.classList.add(\"hidden\")}function x(t){const e=document.getElementById(\"errorMessage\");e&&(e.textContent=t),a?.classList.remove(\"hidden\"),r?.classList.add(\"hidden\")}"]],"assets":["/_astro/demo.Bno24cYL.css","/_worker.js/index.js","/_worker.js/noop-entrypoint.mjs","/_worker.js/renderers.mjs","/_worker.js/_@astrojs-ssr-adapter.mjs","/_worker.js/_astro-internal_middleware.mjs","/_worker.js/chunks/astro-designed-error-pages_C6HZAR6Y.mjs","/_worker.js/chunks/astro_B5wCGgb1.mjs","/_worker.js/chunks/cache_vhvYp1Vm.mjs","/_worker.js/chunks/cloudflare-kv-binding_DMly_2Gl.mjs","/_worker.js/chunks/database_D4APuvuG.mjs","/_worker.js/chunks/image-endpoint_Cj3BsN4w.mjs","/_worker.js/chunks/index_Bzp8bNyj.mjs","/_worker.js/chunks/noop-middleware_D3EimOmg.mjs","/_worker.js/chunks/path_CH3auf61.mjs","/_worker.js/chunks/remote_CrdlObHx.mjs","/_worker.js/chunks/security_bCJkZ78V.mjs","/_worker.js/chunks/sharp_B6iCIBs0.mjs","/_worker.js/chunks/_@astrojs-ssr-adapter_DWWNjljg.mjs","/_worker.js/pages/demo.astro.mjs","/_worker.js/pages/index.astro.mjs","/_worker.js/pages/_image.astro.mjs","/_worker.js/_astro/demo.Bno24cYL.css","/_worker.js/chunks/astro/server_CJTHuxak.mjs","/_worker.js/pages/api/health.astro.mjs","/_worker.js/pages/api/pages.astro.mjs","/_worker.js/pages/view/_id_.astro.mjs","/_worker.js/pages/api/html/_id_.astro.mjs","/_worker.js/pages/api/pages/_id_.astro.mjs"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"XG43Bh0G+OUP0dmeHI9t1rcKRVb8J5yx16Ae1biqp/Q=","sessionConfig":{"driver":"cloudflare-kv-binding","options":{"binding":"SESSION"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/cloudflare-kv-binding_DMly_2Gl.mjs');

export { manifest };
