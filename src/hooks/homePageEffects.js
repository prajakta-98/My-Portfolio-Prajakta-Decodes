import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function runHomePageEffects() {
  const nav = document.getElementById("nav");
  if (nav) {
    window.addEventListener("scroll", () =>
      nav.classList.toggle("scrolled", window.scrollY > 50),
    );
  }

  initCustomCursor();

  // Decorative stickers stay outside React state because dragging only changes position.
  ["fstk1", "fstk2", "fstk3"].forEach((id) => {
    const sticker = document.getElementById(id);
    if (!sticker) return;

    let activePointerId = null;
    let offsetX = 0;
    let offsetY = 0;

    sticker.addEventListener("pointerdown", (e) => {
      if (e.button !== undefined && e.button !== 0) return;

      const parentRect = sticker.parentElement.getBoundingClientRect();
      const rect = sticker.getBoundingClientRect();
      const currentLeft = rect.left - parentRect.left;
      const currentTop = rect.top - parentRect.top;

      sticker.style.left = `${currentLeft}px`;
      sticker.style.top = `${currentTop}px`;
      sticker.style.right = "auto";
      sticker.style.bottom = "auto";
      sticker.style.transition = "none";
      sticker.style.zIndex = "50";
      sticker.style.transform = "none";
      sticker.classList.add("dragging");

      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      activePointerId = e.pointerId;
      sticker.setPointerCapture(activePointerId);
      e.preventDefault();
    });

    sticker.addEventListener("pointermove", (e) => {
      if (activePointerId !== e.pointerId) return;

      const parentRect = sticker.parentElement.getBoundingClientRect();
      const maxLeft = Math.max(0, parentRect.width - sticker.offsetWidth);
      const maxTop = Math.max(0, parentRect.height - sticker.offsetHeight);
      const nextLeft = clamp(e.clientX - parentRect.left - offsetX, 0, maxLeft);
      const nextTop = clamp(e.clientY - parentRect.top - offsetY, 0, maxTop);

      sticker.style.left = `${nextLeft}px`;
      sticker.style.top = `${nextTop}px`;
    });

    const stopDragging = (e) => {
      if (activePointerId !== e.pointerId) return;

      activePointerId = null;
      sticker.classList.remove("dragging");
      sticker.style.zIndex = "10";
      sticker.style.transition = "";

      if (sticker.hasPointerCapture(e.pointerId)) {
        sticker.releasePointerCapture(e.pointerId);
      }
    };

    sticker.addEventListener("pointerup", stopDragging);
    sticker.addEventListener("pointercancel", stopDragging);
  });
  
  // FormSubmit integration with client-side validation before the network call.
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const loaderStart = performance.now();
  const loaderEl = document.getElementById("site-loader");
  let introStarted = false;
  let loaderDismissed = false;

function initCustomCursor() {
  const cur = document.getElementById("cur");
  const ring = document.getElementById("cur-ring");
  if (!cur || !ring || document.body.dataset.cursorReady === "true") return;

  document.body.dataset.cursorReady = "true";

  const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const interactiveSelector = "a,button,[role='button'],[role='link'],.polaroid,.intro-polaroid,.pl-item,.mood-tag,.stat-pill,.work-swap-card,.svc-card,.social-pill";
  const textSelector = "input,textarea,select,[contenteditable='true']";
  let mx = 0;
  let my = 0;
  let rx = 0;
  let ry = 0;
  let rafId = null;
  let clickTimer = null;
  document.body.classList.add("custom-cursor-out");

  const moveCursor = (x, y) => {
    cur.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-6px, -5px)`;
  };

  const moveRing = (x, y) => {
    ring.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
  };

  const animate = () => {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    moveRing(rx, ry);
    rafId = requestAnimationFrame(animate);
  };

  const setEnabled = () => {
    const enabled = finePointerQuery.matches && !reducedMotionQuery.matches;
    document.body.classList.toggle("custom-cursor-enabled", enabled);
    document.body.classList.toggle("custom-cursor-out", enabled);
    if (enabled && rafId === null) {
      rafId = requestAnimationFrame(animate);
    }
    if (!enabled && rafId !== null) {
      cancelAnimationFrame(rafId);
      rafId = null;
      window.clearTimeout(clickTimer);
      document.body.classList.remove(
        "custom-cursor-hover",
        "custom-cursor-text",
        "custom-cursor-down",
        "custom-cursor-pop",
        "custom-cursor-out",
      );
    }
  };

  const hideCursor = () => {
    document.body.classList.add("custom-cursor-out");
    document.body.classList.remove(
      "custom-cursor-hover",
      "custom-cursor-text",
      "custom-cursor-down",
      "custom-cursor-pop",
    );
  };

  const isInsideViewport = (event) =>
    event.clientX >= 0 &&
    event.clientY >= 0 &&
    event.clientX <= window.innerWidth &&
    event.clientY <= window.innerHeight;

  const playClick = () => {
    if (!document.body.classList.contains("custom-cursor-enabled")) return;
    window.clearTimeout(clickTimer);
    document.body.classList.add("custom-cursor-down", "custom-cursor-pop");
    clickTimer = window.setTimeout(() => {
      document.body.classList.remove("custom-cursor-pop");
    }, 420);
  };

  document.addEventListener("pointermove", (e) => {
    if (!document.body.classList.contains("custom-cursor-enabled")) return;
    if (!isInsideViewport(e)) {
      hideCursor();
      return;
    }
    document.body.classList.remove("custom-cursor-out");
    mx = e.clientX;
    my = e.clientY;
    moveCursor(mx, my);
  });

  document.addEventListener("pointerdown", playClick);

  document.addEventListener("pointerup", () => {
    document.body.classList.remove("custom-cursor-down");
  });

  document.addEventListener("mouseover", (e) => {
    if (!document.body.classList.contains("custom-cursor-enabled")) return;
    const target = e.target;
    if (!(target instanceof Element)) return;
    document.body.classList.toggle("custom-cursor-text", Boolean(target.closest(textSelector)));
    document.body.classList.toggle("custom-cursor-hover", Boolean(target.closest(interactiveSelector)));
  });

  document.addEventListener("mouseout", (e) => {
    if (e.relatedTarget) return;
    hideCursor();
  });

  document.documentElement.addEventListener("mouseleave", hideCursor);
  window.addEventListener("blur", hideCursor);

  finePointerQuery.addEventListener("change", setEnabled);
  reducedMotionQuery.addEventListener("change", setEnabled);
  setEnabled();
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function revealWithoutGsap() {
  revealKineticHeroWithoutGsap();
  document.querySelectorAll(".sr,.sr-l,.sr-r,.sr-s,.reveal,.reveal-scale,.passion-label,.passion-h2").forEach((el) => {
    el.classList.add("vis");
    el.style.opacity = "1";
    el.style.transform = "none";
  });
}

function revealFooterPills() {
  const pillContainer = document.getElementById("pills-trigger");
  if (!pillContainer || pillContainer.classList.contains("is-visible")) return;
  pillContainer.classList.add("is-visible");
}

function initFooterPillDrop() {
  const pillContainer = document.getElementById("pills-trigger");
  if (!pillContainer) return;

  if (prefersReducedMotion) {
    revealFooterPills();
    return;
  }

  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.create({
      trigger: pillContainer,
      start: "top 88%",
      once: true,
      onEnter: revealFooterPills,
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealFooterPills();
        observer.disconnect();
      });
    },
    { threshold: 0.2 },
  );

  observer.observe(pillContainer);
}

function revealKineticHeroWithoutGsap() {
  document
    .querySelectorAll(
      ".kinetic-reveal,.kinetic-pixel,.hero-edge,.kinetic-particle,.hero-title-letter",
    )
    .forEach((el) => {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.filter = "none";
    });
}

function initKineticHero(heroDelay) {
  const hero = document.querySelector(".kinetic-hero");
  if (!hero) return;

  if (prefersReducedMotion) {
    revealKineticHeroWithoutGsap();
    return;
  }

  gsap.set(".kinetic-reveal", { opacity: 0, y: 18 });
  gsap.set(".hero-edge", { opacity: 0, y: -8 });
  gsap.set(".kinetic-particle", { opacity: 0, scale: 0.38 });
  gsap.set(".kinetic-title", { opacity: 1 });
  gsap.set(".hero-title-letter", {
    opacity: 0,
    y: 24,
    filter: "blur(6px)",
    rotateX: -34,
  });
  gsap.set(".kinetic-pixel", {
    opacity: 0,
    scale: 0.6,
    x: () => gsap.utils.random(-90, 90),
    y: () => gsap.utils.random(-64, 64),
  });

  const tl = gsap.timeline({ delay: heroDelay });
  tl.to(".hero-edge", {
    opacity: 1,
    y: 0,
    duration: 0.58,
    stagger: 0.06,
    ease: "power2.out",
  })
    .to(
      ".kinetic-pixel",
      {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.52,
        stagger: 0.045,
        ease: "steps(5)",
      },
      0.08,
    )
    .to(
      ".kinetic-pixel",
      {
        opacity: 0,
        duration: 0.34,
        stagger: 0.035,
        ease: "power1.in",
      },
      0.74,
    )
    .to(
      ".kinetic-reveal",
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
      },
      0.52,
    )
    .to(
      ".hero-title-letter",
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        rotateX: 0,
        duration: 0.72,
        stagger: 0.026,
        ease: "power3.out",
      },
      0.78,
    )
    .to(
      ".kinetic-particle",
      {
        opacity: 1,
        scale: 1,
        duration: 0.62,
        stagger: 0.07,
        ease: "back.out(2.1)",
      },
      1.06,
    );

  gsap.to(".kinetic-pixel-mark span", {
    opacity: 0.48,
    duration: 1.1,
    stagger: { each: 0.05, from: "center", repeat: -1, yoyo: true },
    ease: "sine.inOut",
  });
}

function startIntroAnimations() {
  if (introStarted) return;
  introStarted = true;

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    revealWithoutGsap();
    initFooterPillDrop();
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const heroDelay = prefersReducedMotion ? 0 : 0.08;
  initKineticHero(heroDelay);

  gsap.utils.toArray(".passion-label").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.58,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  });
  gsap.utils.toArray(".passion-h2").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.64,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
    });
  });

  ScrollTrigger.batch(".sr,.sr-l,.sr-r,.sr-s,.reveal,.reveal-scale", {
    start: "top 90%",
    once: true,
    interval: 0.08,
    batchMax: 6,
    onEnter: (batch) => {
      batch.forEach((el) => el.classList.add("vis"));
    },
  });

  document.querySelectorAll(".polaroid").forEach((pol, i) => {
    const base = ["-8deg", "5deg", "2deg", "-6deg"][i] || "0deg";
    pol.addEventListener("mousemove", (e) => {
      const r = pol.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const dx = ((e.clientX - cx) / r.width) * 12;
      pol.style.transform = `rotate(${dx}deg) translateY(-8px) scale(1.04)`;
    });
    pol.addEventListener("mouseleave", () => {
      pol.style.transform = `rotate(${base}) translateY(0) scale(1)`;
      pol.style.transition = "transform .32s cubic-bezier(.22,1,.36,1)";
    });
  });

  initFooterPillDrop();
}

function dismissLoader() {
  if (loaderDismissed) return;
  loaderDismissed = true;
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    const hashTarget = window.location.hash
      ? document.querySelector(window.location.hash)
      : null;
    document.body.classList.remove("is-loading");
    if (loaderEl) {
      loaderEl.classList.add("is-hidden");
      loaderEl.style.display = "none";
    }
    if (hashTarget) {
      window.setTimeout(() => {
        hashTarget.scrollIntoView({ block: "start" });
      }, 0);
    } else {
      window.scrollTo(0, 0);
    }
    startIntroAnimations();
  };

  if (!loaderEl) {
    finish();
    return;
  }

  if (typeof gsap === "undefined" || prefersReducedMotion) {
    loaderEl.style.opacity = "0";
    finish();
    return;
  }

  gsap.to(".loader-inner", {
    opacity: 0,
    y: -12,
    duration: 0.32,
    ease: "power2.in",
  });
  gsap.to(loaderEl, {
    opacity: 0,
    duration: 0.55,
    ease: "power2.inOut",
    onComplete: finish,
  });
  window.setTimeout(finish, 900);
}

function scheduleLoaderExit() {
  const minimumLoaderMs = prefersReducedMotion ? 350 : 1250;
  const elapsed = performance.now() - loaderStart;
  window.setTimeout(dismissLoader, Math.max(0, minimumLoaderMs - elapsed));
}

if (document.readyState === "complete") {
  scheduleLoaderExit();
} else {
  window.addEventListener("load", scheduleLoaderExit, { once: true });
}
window.setTimeout(dismissLoader, prefersReducedMotion ? 1600 : 4200);

const contactForm = document.getElementById("contact-form");
let isContactSubmitting = false;

function setFieldError(field, message) {
  if (!field) return;
  const errorId = field.getAttribute("aria-describedby");
  const errorEl = errorId ? document.getElementById(errorId) : null;
  field.classList.add("is-invalid");
  field.classList.remove("is-valid");
  field.setAttribute("aria-invalid", "true");
  if (errorEl) errorEl.textContent = message;
}

function clearFieldError(field) {
  if (!field) return;
  const errorId = field.getAttribute("aria-describedby");
  const errorEl = errorId ? document.getElementById(errorId) : null;
  field.classList.remove("is-invalid");
  field.classList.add("is-valid");
  field.removeAttribute("aria-invalid");
  if (errorEl) errorEl.textContent = "";
}

function setBudgetError(message) {
  const budgetWrap = document.getElementById("cf-budget");
  const errorEl = document.getElementById("cf-budget-error");
  if (!budgetWrap || !errorEl) return;
  budgetWrap.classList.add("is-invalid");
  budgetWrap.setAttribute("aria-invalid", "true");
  document.querySelectorAll('input[name="budget"]').forEach((radio) => {
    radio.setAttribute("aria-invalid", "true");
  });
  errorEl.textContent = message;
}

function clearBudgetError() {
  const budgetWrap = document.getElementById("cf-budget");
  const errorEl = document.getElementById("cf-budget-error");
  if (!budgetWrap || !errorEl) return;
  budgetWrap.classList.remove("is-invalid");
  budgetWrap.removeAttribute("aria-invalid");
  document.querySelectorAll('input[name="budget"]').forEach((radio) => {
    radio.removeAttribute("aria-invalid");
  });
  errorEl.textContent = "";
}

function setFormStatus(message, type = "") {
  const status = document.getElementById("form-status");
  if (!status) return;
  status.textContent = message;
  status.className = `form-status${type ? ` is-${type}` : ""}`;
}

function validateName(field) {
  const value = field.value.trim();
  if (!value) return "Please enter your name.";
  if (value.length < 2) return "Name must be at least 2 characters.";
  if (!/^[a-zA-Z][a-zA-Z\s.'-]*$/.test(value)) return "Use letters, spaces, apostrophes, dots, or hyphens only.";
  return "";
}

function validateEmail(field) {
  const value = field.value.trim();
  if (!value) return "Please enter your email address.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return "Enter a valid email address.";
  return "";
}

function validateService(field) {
  if (!field.value) return "Please choose a project type.";
  return "";
}

function validateMessage(field) {
  const value = field.value.trim();
  if (!value) return "Please tell me a bit about your project.";
  if (value.length < 20) return "Project details should be at least 20 characters.";
  return "";
}

function validateBudget() {
  const selected = document.querySelector('input[name="budget"]:checked');
  return selected ? "" : "Please choose an approximate budget.";
}

function validateField(field) {
  if (!field) return true;
  let message = "";

  if (field.id === "cf-name") message = validateName(field);
  if (field.id === "cf-email") message = validateEmail(field);
  if (field.id === "cf-service") message = validateService(field);
  if (field.id === "cf-msg") message = validateMessage(field);

  if (message) {
    setFieldError(field, message);
    return false;
  }

  clearFieldError(field);
  return true;
}

function validateContactForm() {
  const nameField = document.getElementById("cf-name");
  const emailField = document.getElementById("cf-email");
  const serviceField = document.getElementById("cf-service");
  const messageField = document.getElementById("cf-msg");

  const checks = [
    { field: nameField, valid: validateField(nameField) },
    { field: emailField, valid: validateField(emailField) },
    { field: serviceField, valid: validateField(serviceField) },
    { field: messageField, valid: validateField(messageField) },
  ];

  const budgetMessage = validateBudget();
  if (budgetMessage) setBudgetError(budgetMessage);
  else clearBudgetError();

  const firstInvalid = checks.find((item) => !item.valid)?.field || (budgetMessage ? document.querySelector('input[name="budget"]') : null);
  if (firstInvalid) firstInvalid.focus();

  return checks.every((item) => item.valid) && !budgetMessage;
}

async function handleForm(e) {
  e.preventDefault();

  if (!contactForm) return;
  if (isContactSubmitting) return;
  if (!validateContactForm()) {
    setFormStatus("Please fix the highlighted fields and try again.", "error");
    return;
  }

  const btn = document.getElementById("f-btn");
  const txt = document.getElementById("f-btn-txt");
  const successBox = document.getElementById("form-success");
  const recipient = contactForm.dataset.recipient?.trim();
  const nameField = document.getElementById("cf-name");
  const emailField = document.getElementById("cf-email");
  const serviceField = document.getElementById("cf-service");
  const messageField = document.getElementById("cf-msg");
  const service = serviceField?.value || "";

  if (!btn || !txt) {
    setFormStatus("The form is missing submit controls. Please refresh and try again.", "error");
    return;
  }
  const payload = {
    name: nameField?.value.trim() || "",
    email: emailField?.value.trim() || "",
    service,
    project_type: service,
    budget: document.querySelector('input[name="budget"]:checked')?.value || "",
    message: messageField?.value.trim() || "",
    _subject: "New portfolio enquiry from Prajakta Beyond the Code",
    _template: "table",
    _replyto: emailField?.value.trim() || "",
  };

  if (!recipient) {
    setFormStatus("Recipient email is missing. Update the form's data-recipient value first.", "error");
    return;
  }

  if (contactForm.querySelector('input[name="_honey"]')?.value.trim()) {
    return;
  }

  isContactSubmitting = true;
  contactForm.setAttribute("aria-busy", "true");
  btn.disabled = true;
  btn.setAttribute("aria-disabled", "true");
  btn.style.background = "#4a1b99";
  txt.textContent = "Sending your note...";
  setFormStatus("Submitting your message...", "");
  if (successBox) successBox.style.display = "none";

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await response.json().catch(() => ({}))
      : { message: await response.text().catch(() => "") };

    if (!response.ok || data.success === false) {
      throw new Error(data.message || "Something went wrong while sending your message.");
    }

    contactForm.reset();
    contactForm.querySelectorAll(".f-input").forEach((field) => {
      field.classList.remove("is-valid", "is-invalid");
      field.removeAttribute("aria-invalid");
    });
    clearBudgetError();
    setFormStatus("Message sent successfully. I'll get back to you soon!", "success");
    if (successBox) successBox.style.display = "block";
    btn.style.background = "#22C55E";
    txt.textContent = "Sent! Talk soon";
  } catch (error) {
    const message =
      error instanceof TypeError
        ? "Network error. Please check your connection and try again."
        : error.message || "Unable to send the form right now. Please try again shortly.";
    setFormStatus(message, "error");
    btn.style.background = "#b42318";
    txt.textContent = "Could not send";
  } finally {
    isContactSubmitting = false;
    contactForm.setAttribute("aria-busy", "false");
    btn.disabled = false;
    btn.setAttribute("aria-disabled", "false");
    window.setTimeout(() => {
      btn.style.background = "var(--purple)";
      txt.textContent = "Send this note";
    }, 1400);
  }
}

if (contactForm) {
  contactForm.addEventListener("submit", handleForm);

  ["cf-name", "cf-email", "cf-service", "cf-msg"].forEach((id) => {
    const field = document.getElementById(id);
    if (!field) return;

    const validateNow = () => {
      if (!field.value.trim() && field.tagName !== "SELECT") return;
      if (field.tagName === "SELECT" && !field.value) return;
      validateField(field);
    };

    field.addEventListener("blur", validateNow);
    field.addEventListener("input", () => {
      if (field.classList.contains("is-invalid")) validateField(field);
      if (field.id === "cf-msg") {
        const trimmed = field.value.trim();
        if (trimmed && trimmed.length >= 20) clearFieldError(field);
      }
    });
    if (field.tagName === "SELECT") {
      field.addEventListener("change", () => validateField(field));
    }
  });

  document.querySelectorAll('input[name="budget"]').forEach((radio) => {
    radio.addEventListener("change", clearBudgetError);
  });
}
}
