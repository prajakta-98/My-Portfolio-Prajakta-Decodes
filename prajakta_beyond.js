// ═══════════════════════════════════════════════════════════
// PRAJAKTA BEYOND THE CODE - PARTICLE WORD ANIMATION
// ═══════════════════════════════════════════════════════════

(function () {
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  const particleInput = document.getElementById("particle-input");
  const particleHint = document.getElementById("particle-hint");

  let W, H, CX, CY, dpr;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    W = canvas.parentElement.clientWidth;
    H = canvas.parentElement.clientHeight;
    CX = W / 2;
    CY = H / 2;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.scale(dpr, dpr);
    if (appState === 0) initSphereTargets();
  }

  // Particle data
  const N = 5000;
  const px = new Float32Array(N);
  const py = new Float32Array(N);
  const pz = new Float32Array(N);
  const vx = new Float32Array(N);
  const vy = new Float32Array(N);
  const vz = new Float32Array(N);
  const tx = new Float32Array(N);
  const ty = new Float32Array(N);
  const tz = new Float32Array(N);
  const ox = new Float32Array(N);
  const oy = new Float32Array(N);
  const oz = new Float32Array(N);
  const hue = new Float32Array(N);
  const phase = new Float32Array(N);

  // State
  let appState = 0; // 0 = sphere | 1 = forming word | 2 = word + repel active
  let mouseX = -9999;
  let mouseY = -9999;
  let t = 0;

  const REPEL_RADIUS = 100;
  const REPEL_FORCE = 8;
  const PHI = Math.PI * (1 + Math.sqrt(5));
  let rotX = 0,
    rotY = 0;
  const FOV = 550;
  const CAMERA_Z = 600;

  // Initialize sphere targets
  function initSphereTargets() {
    const baseDim = Math.min(W, H);
    const R = baseDim > 1200 ? baseDim * 0.28 : baseDim * 0.35;
    for (let i = 0; i < N; i++) {
      const polar = Math.acos(1 - (2 * (i + 0.5)) / N);
      const azim = PHI * i;
      ox[i] = Math.sin(polar) * Math.cos(azim) * R;
      oy[i] = Math.sin(polar) * Math.sin(azim) * R;
      oz[i] = Math.cos(polar) * R;
      tx[i] = ox[i];
      ty[i] = oy[i];
      tz[i] = oz[i];
    }
  }

  // Initialize particles
  function initParticles() {
    for (let i = 0; i < N; i++) {
      px[i] = (Math.random() - 0.5) * W * 2;
      py[i] = (Math.random() - 0.5) * H * 2;
      pz[i] = (Math.random() - 0.5) * 1000;
      vx[i] = vy[i] = vz[i] = 0;
      hue[i] = (i / N) * 320 + 170;
      phase[i] = Math.random() * Math.PI * 2;
    }
  }

  // Sample text positions
  function sampleTextPositions(phrase) {
    const cW = Math.floor(W);
    const cH = Math.floor(H);
    const off = document.createElement("canvas");
    off.width = cW;
    off.height = cH;
    const c2 = off.getContext("2d");

    const words = phrase.split(" ");
    const lines = [];
    let currentLine = "";
    const maxChars = phrase.length > 25 ? 12 : 20;

    words.forEach((word) => {
      if ((currentLine + word).length > maxChars) {
        lines.push(currentLine.trim());
        currentLine = word + " ";
      } else {
        currentLine += word + " ";
      }
    });
    lines.push(currentLine.trim());

    let fs = Math.min(
      (cW * 0.72) / (maxChars * 0.5),
      (cH * 0.45) / lines.length,
      140,
    );
    if (phrase.length > 30) fs *= 0.8;

    c2.fillStyle = "#fff";
    c2.font = `900 ${fs}px Arial Black, Arial, sans-serif`;
    c2.textAlign = "center";
    c2.textBaseline = "middle";

    const lineHeight = fs * 1.1;
    const startY = cH / 2 - ((lines.length - 1) * lineHeight) / 2;

    lines.forEach((line, i) => {
      c2.fillText(line, cW / 2, startY + i * lineHeight);
    });

    const data = c2.getImageData(0, 0, cW, cH).data;
    const pts = [];
    const step = phrase.length > 30 ? 2 : 1;

    for (let y = 0; y < cH; y += step) {
      for (let x = 0; x < cW; x += step) {
        if (data[(y * cW + x) * 4 + 3] > 120) {
          pts.push(
            x - cW / 2 + (Math.random() - 0.5) * 0.8,
            y - cH / 2 + (Math.random() - 0.5) * 0.8,
          );
        }
      }
    }

    for (let i = pts.length / 2 - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const ia = i * 2,
        ja = j * 2;
      let tmp = pts[ia];
      pts[ia] = pts[ja];
      pts[ja] = tmp;
      tmp = pts[ia + 1];
      pts[ia + 1] = pts[ja + 1];
      pts[ja + 1] = tmp;
    }

    return pts;
  }

  // Form word
  let formTimeout;
  function formWord(phrase) {
    if (!phrase.trim()) return;

    appState = 1;
    particleHint.style.opacity = "0";

    const pts = sampleTextPositions(phrase);
    const pCount = pts.length / 2;

    for (let i = 0; i < N; i++) {
      const idx = (i % pCount) * 2;
      tx[i] = pts[idx];
      ty[i] = pts[idx + 1];
      tz[i] = 0;
    }

    rotY = 0;
    t = 0;
    clearTimeout(formTimeout);
    formTimeout = setTimeout(() => {
      appState = 2;
      particleHint.style.opacity = "1";
    }, 1500);
  }

  // Update physics
  function update() {
    t += 0.005;
    if (appState === 0) rotY += 0.006;

    const jitter = appState === 0 ? 1.8 : 0;

    for (let i = 0; i < N; i++) {
      let curTx = tx[i],
        curTy = ty[i],
        curTz = tz[i];

      const cosY = Math.cos(rotY),
        sinY = Math.sin(rotY);
      let targetX = curTx * cosY - curTz * sinY;
      let targetY = curTy;
      let targetZ = curTx * sinY + curTz * cosY;

      if (appState === 0) {
        targetX += Math.sin(t * 8 + phase[i]) * jitter;
        targetY += Math.cos(t * 9 + phase[i]) * jitter;
        targetZ += Math.sin(t * 7 + phase[i] * 2) * jitter;
      }

      const sp = appState === 0 ? 0.02 : 0.022;
      vx[i] += (targetX - px[i]) * sp;
      vy[i] += (targetY - py[i]) * sp;
      vz[i] += (targetZ - pz[i]) * sp;

      if (appState >= 1 && mouseX > 0) {
        const scale = FOV / (FOV + pz[i] + CAMERA_Z);
        const sx = px[i] * scale + CX;
        const sy = py[i] * scale + CY;

        const rdx = sx - mouseX;
        const rdy = sy - mouseY;
        const d2 = rdx * rdx + rdy * rdy;
        if (d2 < REPEL_RADIUS * REPEL_RADIUS && d2 > 1) {
          const d = Math.sqrt(d2);
          const mag = REPEL_FORCE * (1 - d / REPEL_RADIUS) * 5;
          vx[i] += (rdx / d) * mag;
          vy[i] += (rdy / d) * mag;
        }
      }

      vx[i] *= 0.82;
      vy[i] *= 0.82;
      vz[i] *= 0.82;

      px[i] += vx[i];
      py[i] += vy[i];
      pz[i] += vz[i];
    }
  }

  // Draw
  function draw() {
    ctx.fillStyle = "rgba(12,11,15,0.12)";
    ctx.fillRect(0, 0, W, H);

    for (let i = 0; i < N; i++) {
      const zPos = pz[i] + CAMERA_Z;
      if (zPos < 10) continue;

      const scale = FOV / zPos;
      const sx = px[i] * scale + CX;
      const sy = py[i] * scale + CY;

      const spd = Math.sqrt(vx[i] * vx[i] + vy[i] * vy[i] + vz[i] * vz[i]);
      let a = Math.min(1, (0.18 + spd * 0.1) * (scale * 0.65));
      let size = (0.4 + spd * 0.12) * scale;

      if (sx > -size && sx < W + size && sy > -size && sy < H + size) {
        const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, size);
        grd.addColorStop(0, `hsla(${hue[i]}, 100%, 55%, ${a * 0.8})`);
        grd.addColorStop(1, `hsla(${hue[i]}, 100%, 45%, ${a * 0.1})`);

        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Main loop
  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }

  // Interactions
  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });
  canvas.addEventListener("mouseleave", () => {
    mouseX = -9999;
    mouseY = -9999;
  });
  canvas.addEventListener("dblclick", () => {
    appState = 0;
    initSphereTargets();
    particleInput.value = "";
    particleHint.style.opacity = "0";
  });

  particleInput.addEventListener("input", () => {
    const s = particleInput.value.trim();
    if (s) {
      formWord(s);
    } else {
      appState = 0;
      initSphereTargets();
      particleHint.style.opacity = "0";
    }
  });

  // Boot
  resize();
  initParticles();
  loop();

  window.addEventListener("resize", () => {
    ctx.resetTransform();
    resize();
  });
})();
