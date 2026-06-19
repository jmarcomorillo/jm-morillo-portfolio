const root = document.documentElement;
const toggle = document.querySelector("[data-theme-toggle]");
const label = document.querySelector("[data-theme-label]");

function applyTheme(theme) {
  root.classList.toggle("dark", theme === "dark");
  if (label) label.textContent = theme === "dark" ? "Light mode" : "Dark mode";
  if (toggle) toggle.textContent = theme === "dark" ? "\u2600" : "\u263e";
}

const savedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
applyTheme(savedTheme || preferredTheme);

if (toggle) {
  toggle.addEventListener("click", () => {
    const next = root.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem("portfolio-theme", next);
    applyTheme(next);
  });
}

const revealTargets = document.querySelectorAll(
  ".section, .card, .timeline-item, .mini-card, .tool-stack article"
);

const capabilityRotator = document.querySelector("[data-capability-rotator]");
const toast = document.querySelector("[data-toast]");
const capabilities = [
  { label: "jmarcomorillo@gmail.com", type: "email", value: "mailto:jmarcomorillo@gmail.com" },
  { label: "+63 992 325 9840", type: "phone", value: "+63 992 325 9840", href: "sms:+639923259840" },
  { label: "linkedin.com/in/jm-morillo", type: "link", value: "https://www.linkedin.com/in/jm-morillo/" },
  { label: "facebook.com/on.jmm", type: "link", value: "https://www.facebook.com/on.jmm" }
];

let toastTimer;
function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1800);
}

async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      const fallback = document.createElement("textarea");
      fallback.value = text;
      fallback.setAttribute("readonly", "");
      fallback.style.position = "fixed";
      fallback.style.left = "-9999px";
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand("copy");
      fallback.remove();
    }
  } catch {
    // The toast is shown before copying, so permission failures do not hide user feedback.
  }
}

function isMobileContactTarget() {
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

function handlePhoneContact(event, value, href) {
  if (isMobileContactTarget()) return;
  event.preventDefault();
  showToast("Phone number copied");
  copyText(value || href.replace("sms:", ""));
}

document.querySelectorAll("[data-phone-contact]").forEach((link) => {
  link.addEventListener("click", (event) => {
    handlePhoneContact(event, link.dataset.copyValue, link.getAttribute("href") || "");
  });
});

if (capabilityRotator) {
  let capabilityIndex = 0;
  capabilityRotator.setAttribute("aria-label", `Email ${capabilities[0].label}`);

  capabilityRotator.addEventListener("click", () => {
    const current = capabilities[capabilityIndex];
    if (current.type === "email") {
      window.location.href = current.value;
      return;
    }
    if (current.type === "phone") {
      if (isMobileContactTarget()) {
        window.location.href = current.href;
      } else {
        showToast("Phone number copied");
        copyText(current.value);
      }
      return;
    }
    if (current.type === "link") {
      window.open(current.value, "_blank", "noopener,noreferrer");
      return;
    }
    showToast("Contact copied");
    copyText(current.value);
  });

  window.setInterval(() => {
    capabilityRotator.classList.add("is-changing");
    window.setTimeout(() => {
      capabilityIndex = (capabilityIndex + 1) % capabilities.length;
      const current = capabilities[capabilityIndex];
      capabilityRotator.textContent = current.label;
      capabilityRotator.setAttribute(
        "aria-label",
        current.type === "email"
          ? `Email ${current.label}`
          : current.type === "phone"
            ? `Message or copy ${current.label}`
            : current.type === "link"
              ? `Open ${current.label}`
              : `Copy ${current.label}`
      );
      capabilityRotator.classList.remove("is-changing");
    }, 220);
  }, 2200);
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  revealTargets.forEach((target, index) => {
    target.classList.add("reveal");
    target.style.transitionDelay = `${Math.min(index % 6, 5) * 45}ms`;
    observer.observe(target);
  });
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

const leadershipToggle = document.querySelector('[data-see-more="leadership"]');
const leadershipTimeline = leadershipToggle?.closest(".section")?.querySelector(".timeline");

if (leadershipToggle && leadershipTimeline) {
  leadershipToggle.addEventListener("click", () => {
    const expanded = leadershipTimeline.classList.toggle("is-expanded");
    if (expanded) {
      leadershipTimeline
        .querySelectorAll(".timeline-item.is-extra")
        .forEach((item) => item.classList.add("is-visible"));
    }
    leadershipToggle.textContent = expanded
      ? "Show less leadership experiences"
      : "See more leadership experiences";
  });
}
