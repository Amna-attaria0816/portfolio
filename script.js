const projects = [
  {
    title: "WhatsApp Clone Chat App",
    description: "Real-time chat app with login, profile settings, global chat, status and call history.",
    tags: ["HTML", "CSS", "JavaScript", "Firebase"],
    live: "https://amna-attaria0816.github.io/Chatly/",
    code: "https://github.com/Amna-attaria0816/Chatly",
    image: "./images/chatly.png"
  },
  {
    title: "MERN Authentication App",
    description: "Secure signup and login system with a React frontend and an Express and MongoDB backend.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    live: "https://example.com",
    code: "https://github.com/your-username/mern-auth-app",
    image: ""
  },
  {
    title: "Add your next project",
    description: "Copy one project block in script.js, change the text and links, and a new card appears here.",
    tags: ["Your", "Tech", "Stack"],
    live: "",
    code: "",
    image: ""
  }
];

const skills = [
  { name: "HTML", level: 90 },
  { name: "CSS", level: 88 },
  { name: "JavaScript", level: 82 },
  { name: "React", level: 75 },
  { name: "Node.js", level: 65 },
  { name: "Firebase", level: 72 }
];

const roles = ["React developer", "Firebase builder", "Node.js learner", "UI enthusiast"];

const nav = document.getElementById("nav");
const links = document.getElementById("links");
const burger = document.getElementById("burger");
const progress = document.getElementById("progress");
const typed = document.getElementById("typed");
const track = document.getElementById("track");
const skillList = document.getElementById("skillList");
const projectGrid = document.getElementById("projectGrid");
const avatar = document.getElementById("avatar");
const modal = document.getElementById("modal");
const mTitle = document.getElementById("mTitle");
const mDesc = document.getElementById("mDesc");
const mLive = document.getElementById("mLive");
const mCode = document.getElementById("mCode");
const mFrame = document.getElementById("mFrame");
const mClose = document.getElementById("mClose");
const frameWrap = document.querySelector(".frame-wrap");

avatar.addEventListener("error", () => {
  avatar.style.display = "none";
});

skillList.innerHTML = skills
  .map(
    (s) =>
      `<div class="skill" style="--lvl:${s.level}%"><div class="skill-top"><span>${s.name}</span><span>${s.level}%</span></div><div class="bar"><i></i></div></div>`
  )
  .join("");

const techItems = skills.map((s) => s.name).concat(["Responsive Design", "Git", "GitHub", "REST APIs"]);
track.innerHTML = techItems
  .concat(techItems)
  .map((t) => `<span>${t}</span>`)
  .join("");

projectGrid.innerHTML = projects
  .map((p, i) => {
    const thumb = p.image
      ? `<img src="${p.image}" alt="${p.title}">`
      : p.title.charAt(0);
    const tags = p.tags.map((t) => `<span>${t}</span>`).join("");
    const live = p.live
      ? `<a class="btn btn-outline small" href="${p.live}" target="_blank" rel="noopener">Live site</a>`
      : "";
    const code = p.code
      ? `<a class="btn btn-outline small" href="${p.code}" target="_blank" rel="noopener">Code</a>`
      : "";
    return `<article class="card"><div class="thumb">${thumb}</div><div class="card-body"><h3>${p.title}</h3><p>${p.description}</p><div class="tags">${tags}</div><div class="card-links"><button class="btn btn-purple small" data-open="${i}">Preview</button>${live}${code}</div></div></article>`;
  })
  .join("");

function openProject(index) {
  const p = projects[index];
  mTitle.textContent = p.title;
  mDesc.textContent = p.description;
  mLive.hidden = !p.live;
  mCode.hidden = !p.code;
  frameWrap.hidden = !p.live;
  if (p.live) {
    mLive.href = p.live;
    mFrame.src = p.live;
  }
  if (p.code) {
    mCode.href = p.code;
  }
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  mClose.focus();
}

function closeProject() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  mFrame.src = "about:blank";
  document.body.style.overflow = "";
}

projectGrid.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-open]");
  if (btn) openProject(Number(btn.dataset.open));
});

mClose.addEventListener("click", closeProject);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeProject();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeProject();
});

burger.addEventListener("click", () => {
  links.classList.toggle("open");
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") links.classList.remove("open");
});

function onScroll() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  progress.style.transform = `scaleX(${ratio})`;
  nav.classList.toggle("scrolled", window.scrollY > 10);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function type() {
  const word = roles[roleIndex];
  charIndex += deleting ? -1 : 1;
  typed.textContent = word.slice(0, charIndex);
  let delay = deleting ? 45 : 90;
  if (!deleting && charIndex === word.length) {
    deleting = true;
    delay = 1400;
  } else if (deleting && charIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }
  setTimeout(type, delay);
}
setTimeout(type, 1200);

function countUp(el) {
  const target = Number(el.dataset.count);
  const start = performance.now();
  const duration = 1300;
  function step(now) {
    const t = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const revealTargets = document.querySelectorAll(
  ".title, .about-lead, .about-copy, .skill, .card, .contact-text, .contact .actions"
);
revealTargets.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("in");
      entry.target.querySelectorAll("[data-count]").forEach(countUp);
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);
revealTargets.forEach((el) => observer.observe(el));