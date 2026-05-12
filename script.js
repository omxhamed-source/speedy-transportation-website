const SITE_CONFIG = {
  companyName: "Speedy Transportation LLC",
  email: "info@speedytransportationllc.com",
  phone: "(555) 017-2500"
};

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const chatPanel = document.querySelector("[data-chat-panel]");
const toast = document.querySelector("[data-toast]");

function syncContactDetails() {
  const emailLink = document.querySelector("[data-email-link]");
  if (emailLink) {
    emailLink.href = `mailto:${SITE_CONFIG.email}`;
    emailLink.textContent = `Email: ${SITE_CONFIG.email}`;
  }
}

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.setTimeout(() => toast.classList.remove("is-visible"), 4300);
}

function getFileSummary(input) {
  const files = Array.from(input.files || []);
  if (!files.length) return "No files selected";
  return files.map((file) => `${file.name} (${Math.ceil(file.size / 1024)} KB)`).join(", ");
}

function openChat() {
  chatPanel.classList.add("is-open");
  chatPanel.setAttribute("aria-hidden", "false");
  const firstInput = chatPanel.querySelector("input");
  if (firstInput) firstInput.focus();
}

function closeChat() {
  chatPanel.classList.remove("is-open");
  chatPanel.setAttribute("aria-hidden", "true");
}

syncContactDetails();
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = header.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    header.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

document.querySelector("#driverFiles").addEventListener("change", (event) => {
  document.querySelector("[data-file-list]").textContent = getFileSummary(event.currentTarget);
});

document.querySelectorAll("[data-chat-open]").forEach((button) => {
  button.addEventListener("click", openChat);
});

document.querySelector("[data-chat-close]").addEventListener("click", closeChat);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeChat();
});
