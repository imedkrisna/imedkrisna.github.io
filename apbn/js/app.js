/**
 * FinPintar - Main Application Controller & UI State Manager
 */

class FinApp {
  constructor() {
    this.state = {
      xp: parseInt(localStorage.getItem('finXP') || '0', 10),
      level: 1,
      completedLessons: JSON.parse(localStorage.getItem('finCompletedLessons') || '[]'),
      theme: localStorage.getItem('finTheme') || 'dark',
      soundEnabled: localStorage.getItem('finSoundEnabled') !== 'false'
    };

    this.confettiCanvas = null;
    this.confettiCtx = null;
    this.particles = [];
    this.isConfettiActive = false;
  }

  init() {
    this.applyTheme(this.state.theme);
    this.updateUserStatsUI();
    this.renderLearningTracks();
    this.renderGlossary();
    this.renderScamChecklist();
    this.initCalculators();
    this.initConfettiCanvas();

    // Listeners for window resize on charts
    window.addEventListener('resize', () => {
      this.refreshCompoundCalculator();
    });
  }

  // XP & Level Progression Logic
  addXP(amount) {
    this.state.xp += amount;
    localStorage.setItem('finXP', this.state.xp);
    this.updateUserStatsUI();
    this.showToast(`✨ +${amount} XP didapatkan!`);
  }

  updateUserStatsUI() {
    // Level formula: Level = Math.floor(XP / 250) + 1
    const currentLevel = Math.floor(this.state.xp / 250) + 1;
    this.state.level = currentLevel;

    const currentLevelXP = (currentLevel - 1) * 250;
    const nextLevelXP = currentLevel * 250;
    const xpInCurrentLevel = this.state.xp - currentLevelXP;
    const progressPercent = Math.min(100, Math.round((xpInCurrentLevel / 250) * 100));

    // Update Nav XP
    const navXP = document.getElementById('navXpCount');
    if (navXP) navXP.textContent = `${this.state.xp} XP`;

    // Update Hero User Widget
    const userLevelEl = document.getElementById('userLevelBadge');
    if (userLevelEl) userLevelEl.textContent = `Level ${currentLevel} • Calon Sultan Cerdas`;

    const userXpText = document.getElementById('userXpProgressText');
    if (userXpText) userXpText.textContent = `${xpInCurrentLevel} / 250 XP (${progressPercent}%)`;

    const userXpFill = document.getElementById('userXpProgressBar');
    if (userXpFill) userXpFill.style.width = `${progressPercent}%`;

    const totalModCompleted = this.state.completedLessons.length;
    const statModCompleted = document.getElementById('statCompletedMod');
    if (statModCompleted) statModCompleted.textContent = totalModCompleted;
  }

  // Theme Management (Dark / Light Mode)
  toggleTheme() {
    const newTheme = this.state.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  }

  applyTheme(theme) {
    this.state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('finTheme', theme);

    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
      themeBtn.innerHTML = theme === 'dark' 
        ? '<i class="fa-solid fa-sun"></i>' 
        : '<i class="fa-solid fa-moon"></i>';
    }

    // Redraw charts with suitable colors
    setTimeout(() => this.refreshCompoundCalculator(), 100);
  }

  toggleSound() {
    const isEnabled = window.soundFX.toggle();
    this.state.soundEnabled = isEnabled;
    const soundBtn = document.getElementById('soundToggleBtn');
    if (soundBtn) {
      soundBtn.innerHTML = isEnabled 
        ? '<i class="fa-solid fa-volume-high"></i>' 
        : '<i class="fa-solid fa-volume-xmark"></i>';
    }
    this.showToast(isEnabled ? '🔊 Suara Diaktifkan' : '🔇 Suara Dinonaktifkan');
  }

  // Switch Main Nav Tabs
  switchTab(tabId) {
    if (window.soundFX) window.soundFX.playClick();

    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    document.querySelectorAll('.tab-pane').forEach(pane => {
      pane.classList.toggle('active', pane.id === tabId);
    });

    // If switching to calculators, refresh chart canvas
    if (tabId === 'kalkulatorTab') {
      setTimeout(() => this.refreshCompoundCalculator(), 150);
    }
  }

  // Render Learning Modules
  renderLearningTracks() {
    const tracksContainer = document.getElementById('tracksGrid');
    if (!tracksContainer) return;

    tracksContainer.innerHTML = '';

    window.FinData.tracks.forEach(track => {
      const card = document.createElement('div');
      card.className = 'track-card';
      card.innerHTML = `
        <div class="track-icon-wrap ${track.iconClass}">
          <i class="${track.icon}"></i>
        </div>
        <h3>${track.title}</h3>
        <p>${track.desc}</p>
        <ul class="track-topics-list">
          ${track.lessons.map(l => `<li><i class="fa-solid fa-circle-check"></i> ${l.title}</li>`).join('')}
        </ul>
        <div class="track-footer">
          <span class="track-badge-count"><i class="fa-solid fa-award"></i> +${track.xpReward} XP</span>
          <button class="btn btn-secondary" onclick="finApp.openTrackModal('${track.id}')">
            Buka Modul <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      `;
      tracksContainer.appendChild(card);
    });
  }

  // Open Lesson Detail Modal
  openTrackModal(trackId) {
    if (window.soundFX) window.soundFX.playClick();
    const track = window.FinData.tracks.find(t => t.id === trackId);
    if (!track) return;

    document.getElementById('modalTrackTitle').innerHTML = `<i class="${track.icon}"></i> ${track.title}`;
    
    const body = document.getElementById('modalTrackBody');
    body.innerHTML = `
      <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">${track.desc}</p>
      ${track.lessons.map(lesson => `
        <div class="lesson-card-item">
          <h4>${lesson.title}</h4>
          <div style="font-size: 0.95rem; line-height: 1.6; color: var(--text-primary);">${lesson.content}</div>
          <div class="lesson-infobox">${lesson.infobox}</div>
          <div class="lesson-action-box">
            <b>📌 Poin Penting:</b> ${lesson.takeaway}
          </div>
        </div>
      `).join('')}
      <div style="text-align: center; margin-top: 2rem;">
        <button class="btn btn-primary" onclick="finApp.completeTrack('${track.id}', ${track.xpReward})">
          <i class="fa-solid fa-check-double"></i> Tandai Selesai & Klaim ${track.xpReward} XP
        </button>
      </div>
    `;

    document.getElementById('lessonModalOverlay').classList.add('active');
  }

  closeTrackModal() {
    document.getElementById('lessonModalOverlay').classList.remove('active');
  }

  completeTrack(trackId, xpReward) {
    if (!this.state.completedLessons.includes(trackId)) {
      this.state.completedLessons.push(trackId);
      localStorage.setItem('finCompletedLessons', JSON.stringify(this.state.completedLessons));
      this.addXP(xpReward);
      if (window.soundFX) window.soundFX.playFanfare();
      this.triggerConfetti();
      this.showToast(`🎉 Selamat! Anda telah menuntaskan modul ini!`);
    } else {
      this.showToast(`ℹ️ Anda sudah menyelesaikan modul ini sebelumnya.`);
    }
    this.closeTrackModal();
  }

  // Calculators Setup & Real-time Listeners
  initCalculators() {
    // 1. Compound Interest Inputs
    const initialInput = document.getElementById('calcInitialPrincipal');
    const monthlyInput = document.getElementById('calcMonthlyContrib');
    const rateInput = document.getElementById('calcAnnualRate');
    const rateSlider = document.getElementById('calcAnnualRateSlider');
    const yearsInput = document.getElementById('calcYears');
    const yearsSlider = document.getElementById('calcYearsSlider');

    // Sync sliders and number inputs
    if (rateSlider && rateInput) {
      rateSlider.addEventListener('input', (e) => {
        rateInput.value = e.target.value;
        this.refreshCompoundCalculator();
      });
      rateInput.addEventListener('input', (e) => {
        rateSlider.value = e.target.value;
        this.refreshCompoundCalculator();
      });
    }

    if (yearsSlider && yearsInput) {
      yearsSlider.addEventListener('input', (e) => {
        yearsInput.value = e.target.value;
        this.refreshCompoundCalculator();
      });
      yearsInput.addEventListener('input', (e) => {
        yearsSlider.value = e.target.value;
        this.refreshCompoundCalculator();
      });
    }

    if (initialInput) initialInput.addEventListener('input', () => this.refreshCompoundCalculator());
    if (monthlyInput) monthlyInput.addEventListener('input', () => this.refreshCompoundCalculator());

    // 2. Emergency Fund Inputs
    const emExpense = document.getElementById('emExpenseInput');
    const emStatus = document.getElementById('emStatusSelect');
    const emCurrent = document.getElementById('emCurrentFund');

    const updateEmergencyFund = () => {
      const exp = parseFloat(emExpense?.value || 0);
      const mult = parseFloat(emStatus?.value || 3);
      const curr = parseFloat(emCurrent?.value || 0);

      const res = window.finCalc.calculateEmergencyFund(exp, mult, curr);

      document.getElementById('emTargetVal').textContent = window.finCalc.formatRupiah(res.targetFund);
      document.getElementById('emShortfallVal').textContent = window.finCalc.formatRupiah(res.shortfall);
      document.getElementById('emProgressBarFill').style.width = `${res.progressPercent}%`;
      document.getElementById('emProgressText').textContent = `${res.progressPercent}% Tercapai`;
    };

    if (emExpense) emExpense.addEventListener('input', updateEmergencyFund);
    if (emStatus) emStatus.addEventListener('change', updateEmergencyFund);
    if (emCurrent) emCurrent.addEventListener('input', updateEmergencyFund);

    // 3. 50/30/20 Budget Inputs
    const salaryInput = document.getElementById('budgetSalaryInput');
    const updateBudget = () => {
      const income = parseFloat(salaryInput?.value || 0);
      const res = window.finCalc.calculateBudget503020(income);

      document.getElementById('budgetNeedsVal').textContent = window.finCalc.formatRupiah(res.needs);
      document.getElementById('budgetWantsVal').textContent = window.finCalc.formatRupiah(res.wants);
      document.getElementById('budgetSavingsVal').textContent = window.finCalc.formatRupiah(res.savings);
    };

    if (salaryInput) salaryInput.addEventListener('input', updateBudget);

    // Initial triggers
    this.refreshCompoundCalculator();
    updateEmergencyFund();
    updateBudget();
  }

  refreshCompoundCalculator() {
    const p0 = parseFloat(document.getElementById('calcInitialPrincipal')?.value || 5000000);
    const pM = parseFloat(document.getElementById('calcMonthlyContrib')?.value || 1000000);
    const r = parseFloat(document.getElementById('calcAnnualRate')?.value || 10);
    const yr = parseInt(document.getElementById('calcYears')?.value || 10, 10);

    const result = window.finCalc.calculateCompound(p0, pM, r, yr);

    const finalEl = document.getElementById('compoundFinalBalance');
    if (finalEl) finalEl.textContent = window.finCalc.formatRupiah(result.finalBalance);

    const totalPrinEl = document.getElementById('compoundTotalPrincipal');
    if (totalPrinEl) totalPrinEl.textContent = window.finCalc.formatRupiah(result.totalPrincipal);

    const totalIntEl = document.getElementById('compoundTotalInterest');
    if (totalIntEl) totalIntEl.textContent = `+${window.finCalc.formatRupiah(result.totalInterest)}`;

    const multEl = document.getElementById('compoundGrowthMultiplier');
    if (multEl) multEl.textContent = `${result.growthMultiple}x Lipat`;

    // Render Canvas Chart
    window.finCalc.renderInvestmentChart('compoundChart', result.history);
  }

  // Switch Sub-calculator inside Calculator tab
  switchCalcSubtab(calcType) {
    document.querySelectorAll('.calc-nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.calc === calcType);
    });

    document.querySelectorAll('.calc-subpane').forEach(pane => {
      pane.style.display = pane.id === `calc-${calcType}` ? 'block' : 'none';
    });

    if (calcType === 'compound') {
      setTimeout(() => this.refreshCompoundCalculator(), 100);
    }
  }

  // Financial Health Checkup Survey Modal
  openHealthCheckup() {
    if (window.soundFX) window.soundFX.playClick();
    const modal = document.getElementById('healthCheckModal');
    const body = document.getElementById('healthQuestionsWrap');
    body.innerHTML = '';

    window.FinData.healthQuestions.forEach((item, qIdx) => {
      const card = document.createElement('div');
      card.className = 'lesson-card-item';
      card.innerHTML = `
        <h4 style="font-size: 1rem; margin-bottom: 0.75rem;">${item.q}</h4>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${item.options.map((opt, optIdx) => `
            <label style="display: flex; align-items: center; gap: 0.75rem; font-size: 0.9rem; cursor: pointer;">
              <input type="radio" name="hq_${qIdx}" value="${opt.score}" ${optIdx === 0 ? 'checked' : ''} style="accent-color: var(--accent-emerald);">
              <span>${opt.text}</span>
            </label>
          `).join('')}
        </div>
      `;
      body.appendChild(card);
    });

    document.getElementById('healthResultVerdict').style.display = 'none';
    modal.classList.add('active');
  }

  submitHealthCheckup() {
    let totalScore = 0;
    const totalQ = window.FinData.healthQuestions.length;

    for (let i = 0; i < totalQ; i++) {
      const selected = document.querySelector(`input[name="hq_${i}"]:checked`);
      if (selected) {
        totalScore += parseInt(selected.value, 10);
      }
    }

    const verdictBox = document.getElementById('healthResultVerdict');
    verdictBox.style.display = 'block';

    let title = '';
    let color = '';
    let advice = '';

    if (totalScore >= 80) {
      title = '🏆 Finansial Prima (Financial Health: EXCELLENT)';
      color = 'var(--accent-emerald-light)';
      advice = 'Luar biasa! Fondasi keuangan Anda sangat tangguh. Anda siap memaksimalkan investasi agresif dan mempercepat target Financial Freedom.';
    } else if (totalScore >= 50) {
      title = '👍 Finansial Sehat & Stabil (MODERATE)';
      color = 'var(--accent-cyan)';
      advice = 'Kondisi keuangan Anda cukup baik. Tingkatkan lagi alokasi dana darurat dan mulai disiplin investasi rutin dengan metode DCA.';
    } else {
      title = '⚠️ Butuh Perhatian Khusus (WARNING / PERBAIKI CASHFLOW)';
      color = 'var(--accent-rose)';
      advice = 'Segera batasi pengeluaran konsumtif, lunasi utang berbunga tinggi, dan fokus bangun dana darurat minimal 3 bulan pengeluaran.';
    }

    verdictBox.innerHTML = `
      <div style="font-size: 1.3rem; font-weight: 800; color: ${color}; margin-bottom: 0.5rem;">${title}</div>
      <div style="font-size: 1.1rem; font-weight: 700; margin-bottom: 0.5rem;">Skor Kesehatan Anda: ${totalScore} / 100</div>
      <p style="color: var(--text-secondary); font-size: 0.92rem;">${advice}</p>
    `;

    if (window.soundFX) window.soundFX.playFanfare();
    this.addXP(50);
  }

  closeHealthCheckup() {
    document.getElementById('healthCheckModal').classList.remove('active');
  }

  // Financial Glossary Search & Render
  renderGlossary(filterText = '') {
    const container = document.getElementById('glossaryGrid');
    if (!container) return;

    const filtered = window.FinData.glossary.filter(item => {
      const q = filterText.toLowerCase();
      return item.term.toLowerCase().includes(q) || item.def.toLowerCase().includes(q) || item.cat.toLowerCase().includes(q);
    });

    container.innerHTML = '';
    if (filtered.length === 0) {
      container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 2rem;">Istilah tidak ditemukan.</div>';
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'glossary-card';
      card.innerHTML = `
        <div class="glossary-term">
          <span>${item.term}</span>
          <span class="glossary-cat-tag">${item.cat}</span>
        </div>
        <div class="glossary-def">${item.def}</div>
      `;
      container.appendChild(card);
    });
  }

  // Scam Detector Checklist
  renderScamChecklist() {
    const wrap = document.getElementById('scamChecklistWrap');
    if (!wrap) return;

    wrap.innerHTML = '';
    window.FinData.scamChecklist.forEach(item => {
      const div = document.createElement('label');
      div.className = 'scam-check-item';
      div.innerHTML = `
        <input type="checkbox" onchange="finApp.evaluateScamRisk()">
        <span style="font-size: 0.95rem; color: var(--text-primary);">${item.text}</span>
      `;
      wrap.appendChild(div);
    });
  }

  evaluateScamRisk() {
    const checked = document.querySelectorAll('#scamChecklistWrap input[type="checkbox"]:checked').length;
    const verdict = document.getElementById('scamVerdictResult');
    if (!verdict) return;

    verdict.style.display = 'block';

    if (checked === 0) {
      verdict.style.background = 'rgba(16, 185, 129, 0.12)';
      verdict.style.border = '1px solid var(--accent-emerald)';
      verdict.innerHTML = `
        <div style="font-weight: 800; font-size: 1.15rem; color: var(--accent-emerald-light); margin-bottom: 0.25rem;">
          🛡️ Profil Relatif Aman
        </div>
        <div style="font-size: 0.9rem; color: var(--text-secondary);">
          Tidak terdeteksi indikasi umum penipuan. Tetap pastikan legalitas izinnya di kontak resmi OJK 157.
        </div>
      `;
    } else if (checked <= 2) {
      verdict.style.background = 'rgba(245, 158, 11, 0.15)';
      verdict.style.border = '1px solid var(--accent-amber)';
      verdict.innerHTML = `
        <div style="font-weight: 800; font-size: 1.15rem; color: var(--accent-amber); margin-bottom: 0.25rem;">
          ⚠️ Indikasi Waspada (${checked} Tanda Mencurigakan Ditemukan)
        </div>
        <div style="font-size: 0.9rem; color: var(--text-secondary);">
          Tawaran ini memiliki ciri-ciri mencurigakan. Jangan setor uang sebelum melakukan verifikasi izin di ojk.go.id!
        </div>
      `;
    } else {
      verdict.style.background = 'rgba(244, 63, 94, 0.15)';
      verdict.style.border = '1px solid var(--accent-rose)';
      verdict.innerHTML = `
        <div style="font-weight: 800; font-size: 1.15rem; color: var(--accent-rose); margin-bottom: 0.25rem;">
          🚨 BAHAYA TINGGI: HAMPIR PASTI INVESTASI BODONG / SCAM (${checked} Ciri Terpenuhi)
        </div>
        <div style="font-size: 0.9rem; color: var(--text-secondary);">
          HINDARI SEGERA! Skema ini menggunakan manipulasi keuntungan palsu atau skema ponzi yang berujung pada hilangnya seluruh uang Anda.
        </div>
      `;
    }
  }

  // Confetti Particle Physics System
  initConfettiCanvas() {
    this.confettiCanvas = document.getElementById('confettiCanvas');
    if (!this.confettiCanvas) return;
    this.confettiCtx = this.confettiCanvas.getContext('2d');
    this.resizeConfetti();
    window.addEventListener('resize', () => this.resizeConfetti());
  }

  resizeConfetti() {
    if (this.confettiCanvas) {
      this.confettiCanvas.width = window.innerWidth;
      this.confettiCanvas.height = window.innerHeight;
    }
  }

  triggerConfetti() {
    this.particles = [];
    const colors = ['#10b981', '#34d399', '#6366f1', '#f59e0b', '#06b6d4', '#ec4899'];
    for (let i = 0; i < 120; i++) {
      this.particles.push({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        w: Math.random() * 10 + 6,
        h: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.7) * 20,
        gravity: 0.4,
        rot: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        opacity: 1
      });
    }

    if (!this.isConfettiActive) {
      this.isConfettiActive = true;
      this.animateConfetti();
    }
  }

  animateConfetti() {
    if (!this.isConfettiActive || !this.confettiCtx) return;

    this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rot += p.rotSpeed;
      p.opacity -= 0.008;

      this.confettiCtx.save();
      this.confettiCtx.translate(p.x, p.y);
      this.confettiCtx.rotate((p.rot * Math.PI) / 180);
      this.confettiCtx.fillStyle = p.color;
      this.confettiCtx.globalAlpha = Math.max(0, p.opacity);
      this.confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      this.confettiCtx.restore();
    }

    this.particles = this.particles.filter(p => p.opacity > 0 && p.y < window.innerHeight);

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.animateConfetti());
    } else {
      this.isConfettiActive = false;
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
    }
  }

  // Toast Notification
  showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-info" style="color: var(--accent-emerald-light);"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

window.finApp = new FinApp();

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.finApp.init();
});
