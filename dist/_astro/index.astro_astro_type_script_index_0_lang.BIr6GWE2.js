const i=document.getElementById("htmlForm"),d=document.getElementById("fileInput"),c=document.getElementById("clearBtn"),u=document.getElementById("content"),s=document.getElementById("result"),l=document.getElementById("error"),m=document.getElementById("submitBtn");d?.addEventListener("change",function(n){const e=n.target.files?.[0];if(e&&e.type==="text/html"){const t=new FileReader;t.onload=function(o){u.value=o.target?.result||""},t.readAsText(e)}});c?.addEventListener("click",function(){i?.reset(),s?.classList.add("hidden"),l?.classList.add("hidden")});i?.addEventListener("submit",async function(n){n.preventDefault();const e=m,t=e?.textContent;try{e&&(e.disabled=!0,e.innerHTML='<svg class="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>生成中...');const o=new FormData(i),r=await fetch("/api/pages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:"Shared HTML",content:o.get("content"),language:"html",description:null,is_public:!0})});if(!r.ok)throw new Error(`HTTP ${r.status}: ${r.statusText}`);const a=await r.json();if(a.success)h(a.data);else throw new Error(a.error||"创建失败")}catch(o){console.error("Error:",o),g(o.message)}finally{e&&(e.disabled=!1,e.innerHTML=t)}});function h(n){const t=`${window.location.origin}/view/${n.url_id}`;s.innerHTML=`
        <div class="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200/60 rounded-2xl p-6 shadow-lg">
          <div class="flex items-start justify-between gap-4">
            <div class="flex-1 min-w-0">
              <p class="text-green-800 font-semibold mb-3 flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                分享链接已生成：
              </p>
              <div class="flex items-center gap-3 flex-wrap">
                <input
                  type="text"
                  value="${t}"
                  readonly
                  class="flex-1 min-w-0 px-4 py-3 bg-white/80 border border-green-300/50 rounded-xl text-sm font-mono backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onclick="copyToClipboard('${t}')"
                  class="flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                  </svg>
                  <span class="text-sm">复制</span>
                </button>
                <a
                  href="${t}"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  <span class="text-sm">打开</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      `,s?.classList.remove("hidden"),l?.classList.add("hidden")}function g(n){document.getElementById("errorMessage").textContent=n,l?.classList.remove("hidden"),s?.classList.add("hidden")}
