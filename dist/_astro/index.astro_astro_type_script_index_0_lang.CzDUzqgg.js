const h=document.getElementById("themeToggle"),c=document.getElementById("sunIcon"),l=document.getElementById("moonIcon"),u=document.documentElement,g=localStorage.getItem("theme")||"light";p(g);h?.addEventListener("click",function(){const e=(u.getAttribute("data-theme")||"light")==="light"?"dark":"light";p(e)});function p(t){u.setAttribute("data-theme",t),localStorage.setItem("theme",t),t==="dark"?(c?.classList.remove("hidden"),l?.classList.add("hidden")):(c?.classList.add("hidden"),l?.classList.remove("hidden"))}const d=document.getElementById("htmlForm"),f=document.getElementById("fileInput"),y=document.getElementById("clearBtn"),b=document.getElementById("content"),r=document.getElementById("result"),i=document.getElementById("error"),x=document.getElementById("submitBtn");f?.addEventListener("change",function(t){const e=t.target.files?.[0];if(e&&e.type==="text/html"){const o=new FileReader;o.onload=function(n){b.value=n.target?.result||""},o.readAsText(e)}});y?.addEventListener("click",function(){d?.reset(),r?.classList.add("hidden"),i?.classList.add("hidden")});d?.addEventListener("submit",async function(t){t.preventDefault();const e=x,o=e?.textContent;try{e&&(e.disabled=!0,e.textContent="⏳ 生成中...");const n=new FormData(d),s=await fetch("/api/pages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:"Shared HTML",content:n.get("content"),language:"html",description:null,is_public:!0})});if(!s.ok)throw new Error(`HTTP ${s.status}: ${s.statusText}`);const a=await s.json();if(a.success)v(a.data);else throw new Error(a.error||"Creation failed")}catch(n){console.error("Error:",n),w(n.message)}finally{e&&(e.disabled=!1,e.textContent=o)}});function v(t){const o=`${window.location.origin}/view/${t.url_id}`;r.innerHTML=`
        <div class="rounded-lg border p-4" style="background-color: #dcfce7; border-color: #86efac; color: #15803d;">
          <p class="font-medium mb-3">✅ 分享链接已生成:</p>
          <div class="flex gap-2">
            <input
              type="text"
              value="${o}"
              readonly
              class="flex-1 px-3 py-2 rounded text-sm font-mono focus:outline-none"
              style="background-color: rgba(255,255,255,0.8); border: 1px solid #86efac;"
            />
            <button
              onclick="copyToClipboard('${o}')"
              class="px-4 py-2 rounded hover:opacity-90 text-sm text-white transition-all"
              style="background-color: #059669;"
            >
              📋 复制
            </button>
            <a
              href="${o}"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2 rounded hover:opacity-90 text-sm text-white transition-all"
              style="background-color: #2563eb;"
            >
              🔗 打开
            </a>
          </div>
        </div>
      `,r?.classList.remove("hidden"),i?.classList.add("hidden")}function w(t){const e=document.getElementById("errorMessage");e&&(e.textContent=t),i?.classList.remove("hidden"),r?.classList.add("hidden")}function T(t){navigator.clipboard.writeText(t).then(()=>{m("✅ 链接已复制到剪贴板")}).catch(()=>{const e=document.createElement("textarea");e.value=t,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select(),document.execCommand("copy"),document.body.removeChild(e),m("✅ 链接已复制到剪贴板")})}window.copyToClipboard=T;function m(t){const e=document.createElement("div");Object.assign(e.style,{position:"fixed",top:"20px",right:"20px",backgroundColor:"#059669",color:"white",padding:"12px 16px",borderRadius:"8px",boxShadow:"0 10px 25px rgba(0,0,0,0.2)",zIndex:"9999",fontSize:"14px",fontFamily:"system-ui, -apple-system, sans-serif",fontWeight:"500",transform:"translateX(100%)",transition:"transform 0.3s ease-in-out",maxWidth:"300px",wordWrap:"break-word"}),e.textContent=t,document.body.appendChild(e),requestAnimationFrame(()=>{e.style.transform="translateX(0)"}),setTimeout(()=>{e.style.transform="translateX(100%)",setTimeout(()=>{document.body.contains(e)&&document.body.removeChild(e)},300)},3e3)}
