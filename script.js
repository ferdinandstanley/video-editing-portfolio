
/* Project information */

const portfolioConfig = {
  showreelUrl: "https://youtu.be/XoK7iCjIqeE",

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
      description: "Product video for online store.",
      software: "Premiere Pro · After Effect · Adobe Animate · Adobe Illustrator",
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
      year: "2025"
    },
    {
      title: "Brand/App Introduction",
      category: "motion",
      label: "MOTION GRAPHICS",
      description: "Tailorgang Brand Introduction.",
      software: "After Effects",
      thumbnail: "",
      videoUrl: "https://youtu.be/fQHFtVbIQBw",
      year: "2024"
    },
    {
      title: "Company Logo Intro",
      category: "youtube",
      label: "YOUTUBE",
      description: "BIOLAFLOW Logo unveiling.",
      software: "Premiere Pro · After Effects",
      thumbnail: "",
      videoUrl: "https://youtu.be/4eXlGsyaWE0",
      year: "2024"
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


/* CONVERT VIDEO LINKS TO EMBED LINKS */

function embedUrl(url) {
  if (!url) return "";

  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return `https://www.youtube-nocookie.com/embed/${u.pathname.slice(1)}`;
    }

    if (host.includes("youtube.com")) {
      const id = u.searchParams.get("v") ||
        (u.pathname.startsWith("/embed/") ? u.pathname.split("/")[2] : "") ||
        (u.pathname.startsWith("/shorts/") ? u.pathname.split("/")[2] : "");

      if (id) return `https://www.youtube-nocookie.com/embed/${id}`;
    }

    if (host.includes("vimeo.com")) {
      const id = u.pathname.split("/").filter(Boolean).pop();
      if (/^\d+$/.test(id || "")) {
        return `https://player.vimeo.com/video/${id}`;
      }
    }

    if (host.includes("drive.google.com")) {
      const match = url.match(/\/file\/d\/([^/]+)/);
      if (match) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
    }

    return url;
  } catch {
    return url;
  }
}


function directVideo(url) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url || "");
}


/* EXTRACT YOUTUBE VIDEO ID */

function getYouTubeVideoId(url) {
  if (!url) return "";

  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return u.pathname.split("/").filter(Boolean)[0] || "";
    }

    if (host.includes("youtube.com")) {
      return u.searchParams.get("v") ||
        (u.pathname.startsWith("/embed/") ? u.pathname.split("/")[2] : "") ||
        (u.pathname.startsWith("/shorts/") ? u.pathname.split("/")[2] : "");
    }
  } catch {
    return "";
  }

  return "";
}


/* AUTOMATIC YOUTUBE THUMBNAILS */

function getProjectThumbnail(project) {
  if (project.thumbnail) return project.thumbnail;

  const videoId = getYouTubeVideoId(project.videoUrl);

  return videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : "";
}


/* DISPLAY PROJECTS */

function renderProjects(filter = "all") {
  const grid = document.getElementById("project-grid");
  const count = document.getElementById("work-count");

  if (!grid || !count) return;

  const items = portfolioConfig.projects.filter(
    p => filter === "all" || p.category === filter
  );

  count.textContent =
    `${String(items.length).padStart(2, "0")} PROJECTS`;

  grid.innerHTML = items.map((p, i) => {
    const thumbnail = getProjectThumbnail(p);

    return `
      <article class="project-card">

        <div class="project-thumb">

          ${
            thumbnail
              ? `<img
                   src="${thumbnail}"
                   alt="${p.title} thumbnail"
                   loading="lazy"
                   onerror="
                     if (!this.dataset.fallbackTried) {
                       this.dataset.fallbackTried = 'true';
                       this.src = this.src.replace('hqdefault.jpg', 'mqdefault.jpg');
                     } else {
                       this.style.display = 'none';
                       this.nextElementSibling.style.display = 'flex';
                     }
                   "
                 >`
              : ""
          }

          <div class="thumb-placeholder"
               style="display:${thumbnail ? "none" : "flex"}">
            ${p.label || "SELECTED WORK"}
          </div>

          <span class="project-play">▶</span>

        </div>

        <div class="project-info">

          <div class="project-meta">
            <span>${p.label || p.category}</span>
            <span>${p.year || String(i + 1).padStart(2, "0")}</span>
          </div>

          <h3>${p.title}</h3>

          <p>${p.description}</p>

          <div class="project-meta">
            <span>${p.software || ""}</span>
          </div>

          <div class="project-actions">
            ${
              p.videoUrl
                ? `<a class="watch-project"
                     href="${p.videoUrl}"
                     data-video="${p.videoUrl}">
                     Watch video ↗
                   </a>`
                : `<span class="project-pending">
                     Add video link in script.js
                   </span>`
            }
          </div>

        </div>
      </article>
    `;
  }).join("");

  grid.querySelectorAll(".watch-project").forEach(a => {
    a.addEventListener("click", e => {
      const url = a.dataset.video;

      if (directVideo(url)) return;

      e.preventDefault();
      window.open(embedUrl(url), "_blank", "noopener");
    });
  });
}


/* DISPLAY SHOWREEL */

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

  const heroPlayer =
    document.getElementById("hero-showreel-player");

  const lowerPlayer =
    document.getElementById("showreel-player");

  [heroPlayer, lowerPlayer].forEach(el => {
    if (!el) return;

    if (directVideo(url)) {
      el.innerHTML =
        `<video controls playsinline preload="metadata" src="${url}"></video>`;
    } else {
      el.innerHTML = iframeHTML;
    }
  });
}


/* PROJECT FILTERS */

document.querySelectorAll(".filter-button").forEach(button => {
  button.addEventListener("click", () => {

    document.querySelectorAll(".filter-button").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    renderProjects(button.dataset.filter);
  });
});


/* MOBILE NAVIGATION */

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}


/* FOOTER YEAR */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* INITIALIZE WEBSITE */

renderProjects();
renderShowreel();
