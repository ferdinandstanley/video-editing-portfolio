/* EDIT YOUR CONTENT HERE. Replace starter entries with real projects you have permission to show. */
const portfolioConfig={
  showreelUrl:"https://youtu.be/XoK7iCjIqeE", // YouTube, Vimeo, Google Drive preview or public MP4 URL
  projects: [
  {
    title: "Women Of Excellence Award",
    category: "commercial",
    label: "COMMERCIAL",
    description: "Women Of Excellence Award — Creative Director.",
    software: "Premiere Pro · After Effects",
    thumbnail: "",
    videoUrl: "https://youtu.be/FfYU9p_XQwc",
    year: "2025"
  },
  {
    title: "New Product Video",
    category: "social",
    label: "PRODUCT VIDEO",
    description: "Product video for Online store.",
    software: "Premiere Pro · CapCut",
    thumbnail: "",
    videoUrl: "https://youtu.be/JOiVjVWE7AY",
    year: "2024"
  },
  {
    title: "Real Estate Clip",
    category: "storytelling",
    label: "STORYTELLING",
    description: "Real estate clip.",
    software: "DaVinci Resolve · Premiere Pro",
    thumbnail: "",
    videoUrl: "https://youtu.be/OX_HRpj2juc",
    year: ""
  },
  {
    title: "Brand/App Introduction",
    category: "motion",
    label: "MOTION GRAPHICS",
    description: "Tailorgang Brand Introduction.",
    software: "After Effects",
    thumbnail: "",
    videoUrl: "https://youtu.be/fQHFtVbIQBw",
    year: ""
  },
  {
    title: "Company Logo Intro",
    category: "youtube",
    label: "YOUTUBE",
    description: "BIOLAFLOW Logo unveiling.",
    software: "Premiere Pro · After Effects",
    thumbnail: "",
    videoUrl: "https://youtu.be/4eXlGsyaWE0",
    year: ""
  },
  {
    title: "Promotional Content",
    category: "commercial",
    label: "PROMOTIONAL",
    description: "9 To Thrive Summit.",
    software: "Premiere Pro · DaVinci Resolve",
    thumbnail: "",
    videoUrl: "https://youtu.be/xt0iIYfN8r0",
    year: "2024"
  }
]
};
function embedUrl(url){if(!url)return"";try{const u=new URL(url),h=u.hostname.replace(/^www\./,"");if(h==="youtu.be")return`https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}`;if(h.includes("youtube.com")){const id=u.searchParams.get("v");if(id)return`https://www.youtube-nocookie.com/embed/${id}`;if(u.pathname.startsWith("/embed/"))return url;}if(h.includes("vimeo.com")){const id=u.pathname.split("/").filter(Boolean).pop();if(/^\d+$/.test(id))return`https://player.vimeo.com/video/${id}`;}if(h.includes("drive.google.com")){const m=url.match(/\/file\/d\/([^/]+)/);if(m)return`https://drive.google.com/file/d/${m[1]}/preview`;}return url;}catch{return url;}}
function directVideo(url){return/\.(mp4|webm|ogg)(\?.*)?$/i.test(url||"");}
function renderProjects(filter="all"){const grid=document.getElementById("project-grid"),items=portfolioConfig.projects.filter(p=>filter==="all"||p.category===filter);document.getElementById("work-count").textContent=`${String(items.length).padStart(2,"0")} PROJECTS`;grid.innerHTML=items.map((p,i)=>`<article class="project-card"><div class="project-thumb">${p.thumbnail?`<img src="${p.thumbnail}" alt="${p.title} thumbnail" loading="lazy">`:`<div class="thumb-placeholder">${p.label||"SELECTED WORK"}</div>`}<span class="project-play">▶</span></div><div class="project-info"><div class="project-meta"><span>${p.label||p.category}</span><span>${p.year||String(i+1).padStart(2,"0")}</span></div><h3>${p.title}</h3><p>${p.description}</p><div class="project-meta"><span>${p.software||""}</span></div><div class="project-actions">${p.videoUrl?`<a class="watch-project" href="${p.videoUrl}" data-video="${p.videoUrl}">Watch video ↗</a>`:`<span class="project-pending">Add video link in script.js</span>`}</div></div></article>`).join("");grid.querySelectorAll(".watch-project").forEach(a=>a.addEventListener("click",e=>{if(directVideo(a.dataset.video))return;e.preventDefault();window.open(embedUrl(a.dataset.video),"_blank","noopener");}));}
function renderShowreel() {
  const url = portfolioConfig.showreelUrl;
  if (!url) return;

  const iframeHTML = `
    <iframe
      src="${embedUrl(url)}"
      title="Stanley Ferdinand Showreel"
      referrerpolicy="strict-origin-when-cross-origin"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy">
    </iframe>`;

  const heroPlayer = document.getElementById("hero-showreel-player");
  const lowerPlayer = document.getElementById("showreel-player");

  [heroPlayer, lowerPlayer].forEach(el => {
    if (!el) return;

    if (directVideo(url)) {
      el.innerHTML = `<video controls playsinline preload="metadata" src="${url}"></video>`;
    } else {
      el.innerHTML = iframeHTML;
    }
  });
}
document.querySelectorAll(".filter-button").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filter-button").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProjects(b.dataset.filter);}));const toggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".main-nav");toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open));});nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false");}));document.getElementById("year").textContent=new Date().getFullYear();renderProjects();renderShowreel();
