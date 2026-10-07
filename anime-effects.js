/**
 * ====================================================================
 * ANIME & CYBER AESTHETIC EFFECTS
 * Floating Sakura Petals, Cyber Embers, Typing HUD, and Ambient FX
 * ====================================================================
 */

(function () {
  // Canvas & Particles State
  let canvas, ctx;
  let particles = [];
  let animationFrameId = null;
  let isAnimeFxActive = true;

  // Particle types: 'sakura' and 'cyber-spark'
  class AnimeParticle {
    constructor(w, h, isInit = false) {
      this.reset(w, h, isInit);
    }

    reset(w, h, isInit = false) {
      this.type = Math.random() > 0.4 ? 'sakura' : 'spark';
      this.x = Math.random() * w;
      this.y = isInit ? Math.random() * h : -20;
      this.size = this.type === 'sakura' ? Math.random() * 8 + 6 : Math.random() * 3 + 1.5;
      this.speedY = this.type === 'sakura' ? Math.random() * 1.2 + 0.8 : Math.random() * 0.8 + 0.4;
      this.speedX = Math.random() * 1.5 - 0.5;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 2;
      this.opacity = this.type === 'sakura' ? Math.random() * 0.5 + 0.3 : Math.random() * 0.7 + 0.3;
      this.color = this.type === 'sakura'
        ? (Math.random() > 0.5 ? 'rgba(255, 182, 193, ' : 'rgba(244, 114, 182, ')
        : (Math.random() > 0.5 ? 'rgba(6, 182, 212, ' : 'rgba(168, 85, 247, ');
      this.sway = Math.random() * Math.PI * 2;
      this.swaySpeed = Math.random() * 0.03 + 0.01;
    }

    update(w, h) {
      this.sway += this.swaySpeed;
      this.x += this.speedX + Math.sin(this.sway) * 0.8;
      this.y += this.speedY;
      this.rotation += this.rotSpeed;

      if (this.y > h + 30 || this.x < -30 || this.x > w + 30) {
        this.reset(w, h, false);
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);

      if (this.type === 'sakura') {
        // Draw delicate sakura petal
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.bezierCurveTo(this.size * 0.8, -this.size * 0.5, this.size * 0.8, this.size * 0.5, 0, this.size);
        ctx.bezierCurveTo(-this.size * 0.8, this.size * 0.5, -this.size * 0.8, -this.size * 0.5, 0, -this.size);
        ctx.fill();
      } else {
        // Draw glowing cyber spark / ember
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.shadowColor = this.color + '0.9)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function initAnimeCanvas() {
    canvas = document.createElement('canvas');
    canvas.id = 'anime-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    canvas.style.opacity = '0.7';
    canvas.style.transition = 'opacity 0.5s ease';
    document.body.prepend(canvas);

    ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles based on screen size (balanced for performance)
    const particleCount = Math.min(38, Math.floor(window.innerWidth / 35));
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new AnimeParticle(canvas.width, canvas.height, true));
    }

    animate();
  }

  function animate() {
    if (!isAnimeFxActive) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(canvas.width, canvas.height);
      particles[i].draw(ctx);
    }
    animationFrameId = requestAnimationFrame(animate);
  }

  // Toggle Anime FX
  window.toggleAnimeFx = function () {
    isAnimeFxActive = !isAnimeFxActive;
    if (canvas) {
      canvas.style.opacity = isAnimeFxActive ? '0.7' : '0';
    }
    if (isAnimeFxActive && !animationFrameId) {
      animate();
    } else if (!isAnimeFxActive && animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    const fxBtn = document.getElementById('anime-fx-btn');
    if (fxBtn) {
      fxBtn.classList.toggle('active', isAnimeFxActive);
      fxBtn.title = isAnimeFxActive ? 'Anime Sakura & Sparks: ON' : 'Anime Sakura & Sparks: OFF';
    }

    if (window.showToast) {
      window.showToast(isAnimeFxActive ? '🌸 Anime Visual FX: ENABLED' : 'Anime Visual FX: Paused');
    }
  };

  // Typing HUD Effect for Hero Role
  function initCyberTyping() {
    const roleEl = document.getElementById('hero-role');
    if (!roleEl) return;

    const titles = [
      'Software Developer & Tech Enthusiast',
      '「 ソフトウェアエンジニア 」',
      'Full-Stack Web Architect',
      'Cyberpunk & Tech Innovator',
      '「 コードマスター 」 • Code Crafter'
    ];

    let titleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeLoop() {
      const current = titles[titleIdx];

      if (isDeleting) {
        roleEl.textContent = current.substring(0, charIdx - 1);
        charIdx--;
        typingSpeed = 40;
      } else {
        roleEl.textContent = current.substring(0, charIdx + 1);
        charIdx++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIdx === current.length) {
        typingSpeed = 2200; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        titleIdx = (titleIdx + 1) % titles.length;
        typingSpeed = 400; // Pause before typing next
      }

      setTimeout(typeLoop, typingSpeed);
    }

    // Start typing after initial load
    setTimeout(typeLoop, 1500);
  }

  // Initialize on load
  document.addEventListener('DOMContentLoaded', () => {
    initAnimeCanvas();
    initCyberTyping();
  });
})();
