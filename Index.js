// ═══════════════════════════════════════════════════════════
// ACCESSIBILITY: KEYBOARD NAVIGATION & FOCUS MANAGEMENT
// ═══════════════════════════════════════════════════════════

// Skip to main content link
const createSkipLink = () => {
  const skipLink = document.createElement("a");
  skipLink.href = "#work";
  skipLink.textContent = "Skip to main content";
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--purple);
    color: white;
    padding: 8px 12px;
    z-index: 100;
    font-size: 0.8rem;
  `;
  skipLink.addEventListener("focus", () => {
    skipLink.style.top = "0";
  });
  skipLink.addEventListener("blur", () => {
    skipLink.style.top = "-40px";
  });
  document.body.insertBefore(skipLink, document.body.firstChild);
};
createSkipLink();

// Keyboard navigation for modals and menus
document.addEventListener("keydown", (e) => {
  // Escape key closes any open modals
  if (e.key === "Escape") {
    hideLoader();
  }

  // Tab key management for focus trapping (if needed for modals)
  if (e.key === "Tab") {
    // Allow natural tab behavior for now
    // Could implement focus trap for modals if added
  }

  // Home key - scroll to top
  if (e.key === "Home") {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // End key - scroll to bottom
  if (e.key === "End") {
    e.preventDefault();
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }
});

// Add visible focus outline for keyboard users
const focusOutlineStyle = document.createElement("style");
focusOutlineStyle.textContent = `
  *:focus-visible {
    outline: 2px solid var(--yellow);
    outline-offset: 2px;
  }
`;
document.head.appendChild(focusOutlineStyle);

// ═══════════════════════════════════════════════════════════
// CUSTOM CURSOR SYSTEM
// ═══════════════════════════════════════════════════════════
const cursor = document.getElementById("cur");
const cursorRing = document.getElementById("cur-ring");
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
const speed = 0.25;

// Track mouse movement
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Animate cursor position smoothly
function updateCursor() {
  cursorX += (mouseX - cursorX) * speed;
  cursorY += (mouseY - cursorY) * speed;

  cursor.style.left = cursorX + "px";
  cursor.style.top = cursorY + "px";

  cursorRing.style.left = mouseX + "px";
  cursorRing.style.top = mouseY + "px";

  requestAnimationFrame(updateCursor);
}
updateCursor();

// Expand cursor on interactive elements
document.addEventListener(
  "mouseenter",
  (e) => {
    if (
      e.target.matches(
        "a, button, input, textarea, .tech-tag, .chip, .polaroid",
      )
    ) {
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      cursorRing.style.width = "60px";
      cursorRing.style.height = "60px";
    }
  },
  true,
);

document.addEventListener(
  "mouseleave",
  (e) => {
    if (
      e.target.matches(
        "a, button, input, textarea, .tech-tag, .chip, .polaroid",
      )
    ) {
      cursor.style.width = "12px";
      cursor.style.height = "12px";
      cursorRing.style.width = "40px";
      cursorRing.style.height = "40px";
    }
  },
  true,
);

// ═══════════════════════════════════════════════════════════
// LOADER SYSTEM
// ═══════════════════════════════════════════════════════════
const loader = document.getElementById("site-loader");

function hideLoader() {
  if (loader) {
    loader.classList.add("is-hidden");
    gsap.to(loader, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      pointerEvents: "none",
    });
  }
}

// Hide loader on first visit (light load, no actual async assets)
window.addEventListener("load", () => {
  setTimeout(hideLoader, 1200);
});

// Also hide if manually triggered via keyboard
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && loader && !loader.classList.contains("is-hidden")) {
    hideLoader();
  }
});

// ═══════════════════════════════════════════════════════════
// NAVIGATION
// ═══════════════════════════════════════════════════════════
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav-links a");

// Scroll nav background
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// Highlight current section in nav
window.addEventListener("scroll", () => {
  let current = "";
  const sections = document.querySelectorAll("section[id]");

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.style.color = "var(--muted)";
    if (link.getAttribute("href") === `#${current}`) {
      link.style.color = "var(--yellow)";
    }
  });
});

// Smooth scroll on nav click (already supported by CSS scroll-behavior: smooth)
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// ═══════════════════════════════════════════════════════════
// SCROLL ANIMATIONS (GSAP ScrollTrigger)
// ═══════════════════════════════════════════════════════════
gsap.registerPlugin(ScrollTrigger);

// Reveal animations (fade in + slide up)
gsap.utils.toArray(".reveal").forEach((element) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "top 50%",
        scrub: false,
        markers: false,
      },
    },
  );
});

// Reveal scale animations (fade in + slide up + scale)
gsap.utils.toArray(".reveal-scale").forEach((element) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 24,
      scale: 0.94,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "top 50%",
        scrub: false,
        markers: false,
      },
    },
  );
});

// Hero animations
const heroEyebrow = document.querySelector(".hero-eyebrow");
const heROLines = document.querySelectorAll(".hero-h1 .line-inner");
const heroSub = document.querySelector(".hero-sub");
const heroActions = document.querySelector(".hero-actions");
const heroStats = document.querySelector(".hero-stats");

gsap
  .timeline()
  .fromTo(
    heroEyebrow,
    { opacity: 0, y: -10 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
  )
  .fromTo(
    heROLines,
    { y: 110 },
    { y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
    "<",
  )
  .fromTo(
    heroSub,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
    "<0.2",
  )
  .fromTo(
    heroActions,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
    "<0.1",
  )
  .fromTo(
    heroStats,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
    "<0.1",
  );

// Intro section animations (Beyond the Code)
const introEyebrow = document.querySelector(".intro-eyebrow");
const introH1 = document.querySelector(".intro-h1");
const introSub = document.querySelector(".intro-sub");
const nameDoodle = document.querySelector(".name-doodle");
const introPhotoPanel = document.querySelector(".intro-photo-panel");
const introAboutLines = document.querySelectorAll(".intro-about-line");
const introRoleStrip = document.querySelector(".intro-role-strip");
const helloLangLabel = document.querySelector(".hello-lang-label");

// Set initial hidden states synchronously (loader covers the page for 1.2s,
// so users never see the hidden state — but content is always in the DOM/CSS
// as visible, which means it degrades gracefully if JS fails).
gsap.set([introPhotoPanel, nameDoodle, introEyebrow, introH1, introRoleStrip], {
  opacity: 0,
});
gsap.set(introPhotoPanel, { x: -50 });
gsap.set(nameDoodle, { x: -20 });
gsap.set(introEyebrow, { y: -10 });
gsap.set(introH1, { y: 55 });
gsap.set(introAboutLines, { opacity: 0, x: 18 });
gsap.set(introRoleStrip, { y: 10 });

// Fire after loader hides (~1.2s) — #beyond is already in view on load
// so a scrollTrigger would mis-fire during body.is-loading overflow:hidden
const introTl = gsap.timeline({
  delay: 1.5,
  onComplete: startHelloCycler,
});

introTl
  .to(introPhotoPanel, { opacity: 1, x: 0, duration: 1, ease: "power3.out" })
  .to(
    nameDoodle,
    { opacity: 1, x: 0, duration: 0.45, ease: "power2.out" },
    "<0.3",
  )
  .to(
    introEyebrow,
    { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
    "<0.1",
  )
  .to(
    introH1,
    { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" },
    "<0.05",
  )
  .to(
    introAboutLines,
    { opacity: 1, x: 0, duration: 0.55, stagger: 0.12, ease: "power2.out" },
    "<0.25",
  )
  .to(
    introRoleStrip,
    { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
    "<0.1",
  );

// ── Apple-style multilingual greeting cycler (GSAP-driven) ────
function startHelloCycler() {
  const helloCycler = document.querySelector(".hello-cycler");
  if (!helloCycler) return;

  const helloWords = Array.from(helloCycler.querySelectorAll(".hello-word"));
  let helloIdx = 0;

  // Show first word immediately
  gsap.set(helloWords[0], { opacity: 1, y: 0 });

  // Show lang label
  if (helloLangLabel) gsap.to(helloLangLabel, { opacity: 0.55, duration: 0.4 });

  function cycleHello() {
    const prev = helloIdx;
    helloIdx = (helloIdx + 1) % helloWords.length;

    // Slide current word up and out
    gsap.to(helloWords[prev], {
      opacity: 0,
      y: "-110%",
      duration: 0.5,
      ease: "power2.in",
      onComplete() {
        gsap.set(helloWords[prev], { y: "110%" }); // reset below for reuse
      },
    });

    // Slide next word up from below
    gsap.fromTo(
      helloWords[helloIdx],
      { opacity: 0, y: "110%" },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
    );

    // Update lang label
    if (helloLangLabel) {
      gsap.to(helloLangLabel, {
        opacity: 0,
        duration: 0.15,
        onComplete() {
          helloLangLabel.textContent = helloWords[helloIdx].dataset.lang || "";
          gsap.to(helloLangLabel, { opacity: 0.55, duration: 0.3 });
        },
      });
    }
  }

  setInterval(cycleHello, 2200);
}

// Passion block animations
gsap.utils.toArray(".passion-block").forEach((block) => {
  const label = block.querySelector(".passion-label");
  const h2 = block.querySelector(".passion-h2");

  gsap.fromTo(
    label,
    { opacity: 0, x: -20 },
    {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: block,
        start: "top 75%",
        markers: false,
      },
    },
  );

  gsap.fromTo(
    h2,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: block,
        start: "top 75%",
        markers: false,
      },
    },
  );
});

// Chip hover rotation reset
document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("mouseenter", function () {
    gsap.to(this, {
      rotation: 0,
      scale: 1.05,
      duration: 0.3,
      overwrite: "auto",
    });
  });

  chip.addEventListener("mouseleave", function () {
    const originalRotation = parseFloat(this.style.getPropertyValue("--r"));
    gsap.to(this, {
      rotation: originalRotation,
      scale: 1,
      duration: 0.3,
      overwrite: "auto",
    });
  });
});

// Polaroid hover effect
document.querySelectorAll(".polaroid").forEach((pol) => {
  pol.addEventListener("mouseenter", function () {
    gsap.to(this, {
      y: -10,
      rotation: 0,
      boxShadow: "0 16px 48px rgba(0, 0, 0, 0.75)",
      duration: 0.3,
      overwrite: "auto",
    });
  });

  pol.addEventListener("mouseleave", function () {
    const originalRotation = parseFloat(
      this.style.transform.match(/rotate\(([^)]+)deg\)/)?.[1] || 0,
    );
    gsap.to(this, {
      y: 0,
      rotation: originalRotation,
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.55)",
      duration: 0.3,
      overwrite: "auto",
    });
  });
});

// ═══════════════════════════════════════════════════════════
// CONTACT FORM
// ═══════════════════════════════════════════════════════════
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    const submitBtn = contactForm.querySelector(".btn-submit");
    const originalText = submitBtn.textContent;

    try {
      // Using Formspree API (you can configure with your endpoint)
      // Replace 'your-form-id' with your actual Formspree ID or backend endpoint
      const response = await fetch("https://formspree.io/f/xyzpqrst", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        submitBtn.textContent = "✓ Message Sent!";
        submitBtn.disabled = true;
        submitBtn.style.background = "var(--green)";

        gsap.fromTo(
          submitBtn,
          { scale: 1 },
          { scale: 1.05, duration: 0.2, yoyo: true, repeat: 1 },
        );

        contactForm.reset();

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.style.background = "";
        }, 3000);
      } else {
        submitBtn.textContent = "✗ Error. Try again.";
        submitBtn.style.background = "var(--red)";

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.style.background = "";
        }, 2000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      submitBtn.textContent = "✗ Network error.";
      submitBtn.style.background = "var(--red)";

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = "";
      }, 2000);
    }
  });
}

// ═══════════════════════════════════════════════════════════
// MARQUEE ANIMATION
// ═══════════════════════════════════════════════════════════
// Already handled by CSS keyframe animation, but ensure smooth loop

// ═══════════════════════════════════════════════════════════
// TECH TAG HOVER EFFECT
// ═══════════════════════════════════════════════════════════
document.querySelectorAll(".tech-tag").forEach((tag) => {
  tag.addEventListener("mouseenter", function () {
    gsap.to(this, {
      backgroundColor: "var(--yellow)",
      color: "var(--bg)",
      duration: 0.3,
      overwrite: "auto",
    });
  });

  tag.addEventListener("mouseleave", function () {
    gsap.to(this, {
      backgroundColor: "transparent",
      color: "var(--muted)",
      duration: 0.3,
      overwrite: "auto",
    });
  });
});

// ═══════════════════════════════════════════════════════════
// RESPONSIVE CURSOR (disable custom cursor on mobile/touch)
// ═══════════════════════════════════════════════════════════
function checkTouchDevice() {
  return (
    (navigator.maxTouchPoints || navigator.msMaxTouchPoints) > 2 ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  );
}

if (checkTouchDevice()) {
  // Hide custom cursor on touch devices, use native cursor
  cursor.style.display = "none";
  cursorRing.style.display = "none";
  document.body.style.cursor = "auto";
}

// ═══════════════════════════════════════════════════════════
// CONTACT LINK HANDLERS (Update with actual links)
// ═══════════════════════════════════════════════════════════
document.querySelectorAll(".contact-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    // If link is valid, allow navigation
    // Otherwise, prevent and show message
    if (href === "#") {
      e.preventDefault();
      console.log("Update contact links with actual URLs");
    }
  });
});

// ═══════════════════════════════════════════════════════════
// KEYBOARD NAVIGATION
// ═══════════════════════════════════════════════════════════
document.addEventListener("keydown", (e) => {
  // Tab key focus management is handled by browser
  // Add custom keyboard shortcuts if needed

  if (e.key === "h" && e.ctrlKey) {
    // Example: Ctrl+H to go home
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

// ═══════════════════════════════════════════════════════════
// TEAM CARD ANIMATIONS
// ═══════════════════════════════════════════════════════════
document.querySelectorAll(".team-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    gsap.to(this, {
      y: -8,
      duration: 0.3,
      overwrite: "auto",
    });
  });

  card.addEventListener("mouseleave", function () {
    gsap.to(this, {
      y: 0,
      duration: 0.3,
      overwrite: "auto",
    });
  });
});

// ═══════════════════════════════════════════════════════════
// SERVICE CARD HOVER EFFECT
// ═══════════════════════════════════════════════════════════
document.querySelectorAll(".svc-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    gsap.to(this, {
      backgroundColor: "var(--bg3)",
      duration: 0.3,
      overwrite: "auto",
    });
  });

  card.addEventListener("mouseleave", function () {
    gsap.to(this, {
      backgroundColor: "var(--bg2)",
      duration: 0.3,
      overwrite: "auto",
    });
  });
});

// ═══════════════════════════════════════════════════════════
// LAZY LOAD IMAGES (Performance optimization)
// ═══════════════════════════════════════════════════════════
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
        }
        observer.unobserve(img);
      }
    });
  });

  document
    .querySelectorAll("img[data-src]")
    .forEach((img) => imageObserver.observe(img));
}

// ═══════════════════════════════════════════════════════════
// LOG READY
// ═══════════════════════════════════════════════════════════
console.log("✓ Portfolio loaded - Ready to impress!");
