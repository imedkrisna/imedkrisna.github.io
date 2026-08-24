/**
 * FinPintar - Interactive Quiz Engine, Time Attack, Scenario RPG & Certificate Generator
 */

class QuizEngine {
  constructor() {
    this.currentMode = null; // 'pemula', 'menengah', 'mahir', 'timeAttack', 'scenario'
    this.questions = [];
    this.currentIndex = 0;
    this.score = 0;
    this.selectedAnswer = null;
    this.isAnswered = false;

    // Time Attack properties
    this.timerInterval = null;
    this.timeLeft = 60;
    this.timeAttackScore = 0;

    // Scenario properties
    this.currentScenarioIndex = 0;
    this.scenarioStats = { tabungan: 5000000, utang: 0, ketenangan: 80 };
  }

  // Start standard quiz level (pemula, menengah, mahir)
  startLevelQuiz(levelKey) {
    this.currentMode = levelKey;
    this.questions = [...window.FinData.quizQuestions[levelKey]];
    this.currentIndex = 0;
    this.score = 0;
    this.isAnswered = false;

    // Hide selection, show active quiz box
    document.getElementById('quizModeSelect').style.display = 'none';
    document.getElementById('quizResultBox').style.display = 'none';
    document.getElementById('scenarioBox').style.display = 'none';
    document.getElementById('quizActiveBox').style.display = 'block';
    document.getElementById('quizTimerBadge').style.display = 'none';

    this.renderQuestion();
  }

  // Start Time-Attack Blitz
  startTimeAttack() {
    this.currentMode = 'timeAttack';
    this.questions = [...window.FinData.quizQuestions.timeAttack].sort(() => Math.random() - 0.5);
    this.currentIndex = 0;
    this.score = 0;
    this.timeAttackScore = 0;
    this.timeLeft = 60;
    this.isAnswered = false;

    document.getElementById('quizModeSelect').style.display = 'none';
    document.getElementById('quizResultBox').style.display = 'none';
    document.getElementById('scenarioBox').style.display = 'none';
    document.getElementById('quizActiveBox').style.display = 'block';

    const timerBadge = document.getElementById('quizTimerBadge');
    timerBadge.style.display = 'flex';
    document.getElementById('timerCount').textContent = `${this.timeLeft}s`;

    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.timeLeft--;
      document.getElementById('timerCount').textContent = `${this.timeLeft}s`;
      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.finishQuiz();
      }
    }, 1000);

    this.renderQuestion();
  }

  renderQuestion() {
    this.isAnswered = false;
    const q = this.questions[this.currentIndex];
    if (!q) {
      this.finishQuiz();
      return;
    }

    // Update Progress
    const totalQ = this.questions.length;
    const currentNum = this.currentIndex + 1;
    document.getElementById('quizProgressText').textContent = `Pertanyaan ${currentNum} dari ${totalQ}`;
    document.getElementById('quizProgressBarFill').style.width = `${(currentNum / totalQ) * 100}%`;

    // Render Question Text
    document.getElementById('questionText').textContent = q.q;

    // Render Options
    const optionsContainer = document.getElementById('optionsList');
    optionsContainer.innerHTML = '';
    const prefixes = ['A', 'B', 'C', 'D'];

    q.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `
        <span class="opt-prefix">${prefixes[idx] || idx + 1}</span>
        <span>${optText}</span>
      `;
      btn.onclick = () => this.handleAnswer(idx);
      optionsContainer.appendChild(btn);
    });

    // Hide Explanation & Next button
    const expBox = document.getElementById('quizExplanationBox');
    expBox.style.display = 'none';
    const nextBtn = document.getElementById('quizNextBtn');
    nextBtn.style.display = 'none';
  }

  handleAnswer(selectedIndex) {
    if (this.isAnswered) return;
    this.isAnswered = true;

    const q = this.questions[this.currentIndex];
    const optionButtons = document.querySelectorAll('#optionsList .option-btn');
    const isCorrect = selectedIndex === q.correct;

    optionButtons.forEach((btn, idx) => {
      btn.classList.add('disabled');
      if (idx === q.correct) {
        btn.classList.add('correct');
      } else if (idx === selectedIndex) {
        btn.classList.add('wrong');
      }
    });

    if (isCorrect) {
      this.score++;
      if (window.soundFX) window.soundFX.playCorrect();
      if (this.currentMode === 'timeAttack') {
        this.timeAttackScore += 100 + this.timeLeft * 2;
      }
    } else {
      if (window.soundFX) window.soundFX.playWrong();
    }

    // Show Explanation (if available)
    if (q.explanation) {
      const expBox = document.getElementById('quizExplanationBox');
      document.getElementById('explanationTitle').textContent = isCorrect ? '🎉 Jawaban Tepat!' : '💡 Penjelasan Edukasi:';
      document.getElementById('explanationTitle').style.color = isCorrect ? 'var(--accent-emerald-light)' : 'var(--accent-amber)';
      document.getElementById('explanationContent').textContent = q.explanation;
      expBox.style.display = 'block';
    }

    // Show Next Button
    const nextBtn = document.getElementById('quizNextBtn');
    nextBtn.style.display = 'inline-flex';
    nextBtn.textContent = (this.currentIndex === this.questions.length - 1 || this.currentMode === 'timeAttack' && this.currentIndex === this.questions.length - 1) ? 'Lihat Hasil Akhir' : 'Lanjut ke Soal Berikutnya';
  }

  nextQuestion() {
    if (window.soundFX) window.soundFX.playClick();
    this.currentIndex++;
    if (this.currentIndex < this.questions.length) {
      this.renderQuestion();
    } else {
      this.finishQuiz();
    }
  }

  finishQuiz() {
    if (this.timerInterval) clearInterval(this.timerInterval);

    document.getElementById('quizActiveBox').style.display = 'none';
    const resultBox = document.getElementById('quizResultBox');
    resultBox.style.display = 'block';

    const totalQ = this.questions.length;
    const finalPercent = Math.round((this.score / totalQ) * 100);
    const xpGained = this.score * 30 + (this.currentMode === 'timeAttack' ? 50 : 0);

    // Add XP to app state
    if (window.finApp) {
      window.finApp.addXP(xpGained);
    }

    // Trigger celebration & audio
    if (finalPercent >= 60) {
      if (window.soundFX) window.soundFX.playFanfare();
      if (window.finApp) window.finApp.triggerConfetti();
    }

    // Update Result UI
    document.getElementById('resultScoreDisplay').textContent = `${this.score} / ${totalQ} (${finalPercent}%)`;
    document.getElementById('resultXpEarned').textContent = `+${xpGained} XP`;

    let feedbackMsg = '';
    if (finalPercent === 100) {
      feedbackMsg = '🏆 Luar Biasa Sempurna! Pemahaman literasi keuangan Anda sangat matang.';
    } else if (finalPercent >= 70) {
      feedbackMsg = '🌟 Hebat! Anda memiliki fondasi finansial yang kuat dan siap menerapkannya dalam kehidupan nyata.';
    } else if (finalPercent >= 50) {
      feedbackMsg = '👍 Cukup Bagus! Pelajari kembali materi modul untuk memperdalam pemahaman investasi & utang.';
    } else {
      feedbackMsg = '📚 Jangan Berkecil Hati! Baca ulang modul edukasi FinPintar dan coba kuis ini kembali.';
    }
    document.getElementById('resultFeedbackText').textContent = feedbackMsg;

    // Show Certificate generator if score >= 70%
    const certSection = document.getElementById('certificateGenSection');
    if (finalPercent >= 60 && this.currentMode !== 'timeAttack') {
      certSection.style.display = 'block';
      this.generateCertificate();
    } else {
      certSection.style.display = 'none';
    }
  }

  // 4. Interactive Scenario RPG Mode
  startScenarioMode() {
    this.currentMode = 'scenario';
    this.currentScenarioIndex = 0;
    this.scenarioStats = { tabungan: 5000000, utang: 0, ketenangan: 80 };

    document.getElementById('quizModeSelect').style.display = 'none';
    document.getElementById('quizResultBox').style.display = 'none';
    document.getElementById('quizActiveBox').style.display = 'none';
    document.getElementById('scenarioBox').style.display = 'block';

    this.renderScenario();
  }

  renderScenario() {
    const sc = window.FinData.scenarios[this.currentScenarioIndex];
    if (!sc) {
      this.finishScenario();
      return;
    }

    // Update Stats Display
    document.getElementById('scTabunganVal').textContent = window.finCalc.formatRupiah(this.scenarioStats.tabungan);
    document.getElementById('scUtangVal').textContent = window.finCalc.formatRupiah(this.scenarioStats.utang);
    document.getElementById('scKetenanganVal').textContent = `${this.scenarioStats.ketenangan}/100`;

    // Title and Desc
    document.getElementById('scenarioTitle').textContent = sc.title;
    document.getElementById('scenarioDesc').textContent = sc.description;

    // Render Choices
    const choicesWrap = document.getElementById('scenarioChoices');
    choicesWrap.innerHTML = '';
    document.getElementById('scenarioFeedback').style.display = 'none';
    document.getElementById('scenarioNextBtn').style.display = 'none';

    sc.choices.forEach((choice, idx) => {
      const card = document.createElement('div');
      card.className = 'scenario-choice-card';
      card.innerHTML = `
        <div style="font-weight: 700; margin-bottom: 0.25rem;">Pilihan ${String.fromCharCode(65 + idx)}:</div>
        <div style="font-size: 0.92rem; color: var(--text-primary);">${choice.text}</div>
      `;
      card.onclick = () => this.handleScenarioChoice(choice);
      choicesWrap.appendChild(card);
    });
  }

  handleScenarioChoice(choice) {
    if (window.soundFX) window.soundFX.playClick();

    // Apply Stat changes
    this.scenarioStats.tabungan += choice.statsChange.tabungan;
    this.scenarioStats.utang += choice.statsChange.utang;
    this.scenarioStats.ketenangan = Math.max(0, Math.min(100, this.scenarioStats.ketenangan + (choice.statsChange.skorKetenangan - 50)));

    // Update Stats Display
    document.getElementById('scTabunganVal').textContent = window.finCalc.formatRupiah(this.scenarioStats.tabungan);
    document.getElementById('scUtangVal').textContent = window.finCalc.formatRupiah(this.scenarioStats.utang);
    document.getElementById('scKetenanganVal').textContent = `${this.scenarioStats.ketenangan}/100`;

    // Show Feedback
    const fb = document.getElementById('scenarioFeedback');
    fb.style.display = 'block';
    fb.innerHTML = `
      <div style="font-weight: 800; font-size: 1.05rem; margin-bottom: 0.35rem;">Analisis Konsekuensi Keputusan:</div>
      <div style="font-size: 0.92rem;">${choice.feedback}</div>
    `;

    // Disable all choices
    document.querySelectorAll('.scenario-choice-card').forEach(c => c.style.pointerEvents = 'none');

    // Show next button
    const nextBtn = document.getElementById('scenarioNextBtn');
    nextBtn.style.display = 'inline-flex';
    nextBtn.textContent = (this.currentScenarioIndex < window.FinData.scenarios.length - 1) ? 'Lanjut ke Kasus Berikutnya' : 'Selesaikan Simulasi Kasus';
  }

  nextScenario() {
    this.currentScenarioIndex++;
    if (this.currentScenarioIndex < window.FinData.scenarios.length) {
      this.renderScenario();
    } else {
      this.finishScenario();
    }
  }

  finishScenario() {
    if (window.soundFX) window.soundFX.playFanfare();
    if (window.finApp) {
      window.finApp.addXP(200);
      window.finApp.triggerConfetti();
      window.finApp.showToast('🎉 Selamat! Anda telah menuntaskan Simulasi Studi Kasus Finansial!');
    }
    this.returnToSelection();
  }

  returnToSelection() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    document.getElementById('quizActiveBox').style.display = 'none';
    document.getElementById('quizResultBox').style.display = 'none';
    document.getElementById('scenarioBox').style.display = 'none';
    document.getElementById('quizModeSelect').style.display = 'grid';
  }

  // 5. Generate High-Resolution Digital Certificate on Canvas
  generateCertificate() {
    const canvas = document.getElementById('certificateCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 1200;
    canvas.height = 800;

    const userName = document.getElementById('certUserNameInput')?.value || 'Sahabat FinPintar';
    const dateStr = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
    const levelTitle = this.currentMode ? (this.currentMode.toUpperCase() + ' LEVEL') : 'LITERASI KEUANGAN';

    // 1. Background Gradient & Frame
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 800);
    bgGrad.addColorStop(0, '#0b132b');
    bgGrad.addColorStop(0.5, '#111e38');
    bgGrad.addColorStop(1, '#0b132b');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 800);

    // Ornate Border
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 10;
    ctx.strokeRect(30, 30, 1140, 740);

    ctx.strokeStyle = '#34d399';
    ctx.lineWidth = 2;
    ctx.strokeRect(45, 45, 1110, 710);

    // Corner Ornaments
    const drawCorner = (x, y) => {
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
    };
    drawCorner(55, 55);
    drawCorner(1145, 55);
    drawCorner(55, 745);
    drawCorner(1145, 745);

    // 2. Header Content
    ctx.textAlign = 'center';
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 22px Outfit, sans-serif';
    ctx.fillText('FINPINTAR INDONESIA • SERTIFIKAT KELULUSAN LITERASI', 600, 110);

    ctx.fillStyle = '#ffffff';
    ctx.font = '800 48px Outfit, sans-serif';
    ctx.fillText('SERTIFIKAT KEMAHIRAN FINANSIAL', 600, 175);

    ctx.fillStyle = '#9ca3af';
    ctx.font = '20px Plus Jakarta Sans, sans-serif';
    ctx.fillText('Dengan bangga diberikan kepada:', 600, 240);

    // User Name
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 50px Outfit, sans-serif';
    ctx.fillText(userName, 600, 320);

    // Underline name
    ctx.strokeStyle = 'rgba(52, 211, 153, 0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(350, 345);
    ctx.lineTo(850, 345);
    ctx.stroke();

    // Achievement Description
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '22px Plus Jakarta Sans, sans-serif';
    ctx.fillText(`Telah berhasil menyelesaikan Uji Kompetensi Literasi Keuangan [${levelTitle}]`, 600, 410);
    ctx.fillText('dengan pemahaman menyeluruh tentang Budgeting, Manajemen Risiko & Investasi Cerdas.', 600, 445);

    // 3. Golden Seal Badge on bottom center
    const sealX = 600;
    const sealY = 560;
    ctx.beginPath();
    ctx.arc(sealX, sealY, 55, 0, Math.PI * 2);
    ctx.fillStyle = '#f59e0b';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#fbbf24';
    ctx.stroke();

    ctx.fillStyle = '#78350f';
    ctx.font = 'bold 16px Outfit, sans-serif';
    ctx.fillText('VERIFIED', sealX, sealY - 10);
    ctx.font = 'bold 22px Outfit, sans-serif';
    ctx.fillText('100%', sealX, sealY + 16);
    ctx.font = '12px Plus Jakarta Sans, sans-serif';
    ctx.fillText('EXCELLENCE', sealX, sealY + 34);

    // 4. Signatures / Metadata
    ctx.textAlign = 'left';
    ctx.fillStyle = '#9ca3af';
    ctx.font = '16px Plus Jakarta Sans, sans-serif';
    ctx.fillText(`Tanggal Terbit: ${dateStr}`, 100, 680);
    ctx.fillText(`ID Sertifikasi: FP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`, 100, 710);

    ctx.textAlign = 'right';
    ctx.fillText('Dewan Edukasi FinPintar', 1100, 680);
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 18px Outfit, sans-serif';
    ctx.fillText('Platform Cerdas Finansial', 1100, 710);
  }

  // Download Certificate as PNG Image
  downloadCertificate() {
    const canvas = document.getElementById('certificateCanvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Sertifikat_FinPintar_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    if (window.finApp) {
      window.finApp.showToast('📥 Sertifikat berhasil diunduh ke perangkat Anda!');
    }
  }
}

window.quizEngine = new QuizEngine();
