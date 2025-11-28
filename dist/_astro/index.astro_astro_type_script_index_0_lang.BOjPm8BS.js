const f=document.getElementById("themeToggle"),c=document.getElementById("sunIcon"),d=document.getElementById("moonIcon"),u=document.documentElement,y=localStorage.getItem("theme")||"light";p(y);f?.addEventListener("click",function(){const t=(u.getAttribute("data-theme")||"light")==="light"?"dark":"light";p(t)});function p(o){u.setAttribute("data-theme",o),localStorage.setItem("theme",o),o==="dark"?(c?.classList.remove("hidden"),d?.classList.add("hidden")):(c?.classList.add("hidden"),d?.classList.remove("hidden"))}const i=document.getElementById("htmlForm"),h=document.getElementById("fileInput"),g=document.getElementById("clearBtn"),b=document.getElementById("content"),r=document.getElementById("result"),l=document.getElementById("error"),x=document.getElementById("submitBtn");h?.addEventListener("change",function(o){const t=o.target.files?.[0];if(t&&t.type==="text/html"){const s=new FileReader;s.onload=function(e){b.value=e.target?.result||""},s.readAsText(t)}});g?.addEventListener("click",function(){i?.reset(),r?.classList.add("hidden"),l?.classList.add("hidden")});i?.addEventListener("submit",async function(o){o.preventDefault();const t=x,s=t?.textContent;try{t&&(t.disabled=!0,t.textContent="⏳ 生成中...");const e=new FormData(i),n=await fetch("/api/pages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:"Shared HTML",content:e.get("content"),language:"html",description:null,is_public:!0})});if(!n.ok)throw new Error(`HTTP ${n.status}: ${n.statusText}`);const a=await n.json();if(a.success)v(a.data);else throw new Error(a.error||"Creation failed")}catch(e){console.error("Error:",e),w(e.message)}finally{t&&(t.disabled=!1,t.textContent=s)}});function v(o){const s=`${window.location.origin}/view/${o.url_id}`;r.innerHTML=`
        <div class="rounded-lg border p-4" style="background-color: #dcfce7; border-color: #86efac; color: #15803d;">
          <p class="font-medium mb-3">✅ 分享链接已生成:</p>
          <div class="flex gap-2">
            <input
              type="text"
              value="${s}"
              readonly
              class="flex-1 px-3 py-2 rounded text-sm font-mono focus:outline-none"
              style="background-color: rgba(255,255,255,0.8); border: 1px solid #86efac;"
            />
            <button
              onclick="copyToClipboard('${s}')"
              class="px-4 py-2 rounded hover:opacity-90 text-sm text-white transition-all"
              style="background-color: #059669;"
            >
              📋 复制
            </button>
            <a
              href="${s}"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2 rounded hover:opacity-90 text-sm text-white transition-all"
              style="background-color: #2563eb;"
            >
              🔗 打开
            </a>
          </div>
        </div>
      `,r?.classList.remove("hidden"),l?.classList.add("hidden")}function w(o){const t=document.getElementById("errorMessage");t&&(t.textContent=o),l?.classList.remove("hidden"),r?.classList.add("hidden")}function T(o){navigator.clipboard.writeText(o).then(()=>{m("✅ 链接已复制到剪贴板")}).catch(()=>{const t=document.createElement("textarea");t.value=o,t.style.position="fixed",t.style.opacity="0",document.body.appendChild(t),t.select(),document.execCommand("copy"),document.body.removeChild(t),m("✅ 链接已复制到剪贴板")})}window.copyToClipboard=T;function m(o){const t=document.querySelector('button[onclick*="copyToClipboard"]'),s=document.getElementById("result"),e=document.createElement("div");let n={position:"absolute",backgroundColor:"#059669",color:"white",padding:"8px 12px",borderRadius:"6px",boxShadow:"0 4px 12px rgba(0,0,0,0.15)",zIndex:"9999",fontSize:"13px",fontFamily:"system-ui, -apple-system, sans-serif",fontWeight:"500",whiteSpace:"nowrap",opacity:"0",transform:"translateY(-10px)",transition:"all 0.3s ease-in-out",pointerEvents:"none"};if(t&&s){const a=s.getBoundingClientRect();n.position="fixed",n.left=`${a.left+a.width/2}px`,n.top=`${a.bottom+10}px`,n.transform="translateX(-50%) translateY(-10px)"}else n.position="fixed",n.bottom="80px",n.left="50%",n.transform="translateX(-50%) translateY(10px)";Object.assign(e.style,n),e.textContent=o,document.body.appendChild(e),requestAnimationFrame(()=>{e.style.opacity="1",e.style.transform="translateX(-50%) translateY(0)"}),setTimeout(()=>{e.style.opacity="0",e.style.transform=e.style.transform.replace("translateY(0)","translateY(-10px)"),setTimeout(()=>{document.body.contains(e)&&document.body.removeChild(e)},300)},2500)}
