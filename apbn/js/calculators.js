/**
 * FinPintar - Financial Calculators & Interactive Canvas Chart Engine
 * Formats Rupiah currency, calculates compound growth, emergency funds, 50/30/20 budgets, and draws real-time charts.
 */

class FinancialCalculators {
  constructor() {
    this.chartCanvas = null;
    this.chartCtx = null;
  }

  formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(number);
  }

  // 1. Compound Interest / Investment Growth Calculator
  calculateCompound(initialPrincipal, monthlyContribution, annualRatePercent, years) {
    const r = (annualRatePercent / 100) / 12; // Monthly rate
    const totalMonths = years * 12;
    const history = [];

    let currentBalance = initialPrincipal;
    let totalPrincipalPaid = initialPrincipal;

    history.push({
      year: 0,
      totalPrincipal: totalPrincipalPaid,
      totalBalance: currentBalance,
      interestEarned: 0
    });

    for (let m = 1; m <= totalMonths; m++) {
      currentBalance = (currentBalance + monthlyContribution) * (1 + r);
      totalPrincipalPaid += monthlyContribution;

      if (m % 12 === 0 || m === totalMonths) {
        const yr = Math.floor(m / 12);
        history.push({
          year: yr,
          totalPrincipal: Math.round(totalPrincipalPaid),
          totalBalance: Math.round(currentBalance),
          interestEarned: Math.round(currentBalance - totalPrincipalPaid)
        });
      }
    }

    return {
      finalBalance: Math.round(currentBalance),
      totalPrincipal: Math.round(totalPrincipalPaid),
      totalInterest: Math.round(currentBalance - totalPrincipalPaid),
      growthMultiple: (currentBalance / (totalPrincipalPaid || 1)).toFixed(2),
      history: history
    };
  }

  // Render Interactive Canvas Chart for Investment Growth
  renderInvestmentChart(canvasId, historyData) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padding = { top: 30, right: 30, bottom: 40, left: 70 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    ctx.clearRect(0, 0, width, height);

    if (!historyData || historyData.length === 0) return;

    const maxVal = Math.max(...historyData.map(d => d.totalBalance)) * 1.15;
    const pointsTotal = historyData.length;

    const getX = (index) => padding.left + (index / (pointsTotal - 1 || 1)) * chartW;
    const getY = (val) => padding.top + chartH - (val / (maxVal || 1)) * chartH;

    // 1. Draw Grid Lines & Y-Axis Labels
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.fillStyle = '#9ca3af';
    ctx.font = '11px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'right';

    const ySteps = 4;
    for (let i = 0; i <= ySteps; i++) {
      const val = (maxVal / ySteps) * i;
      const y = getY(val);

      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Format simple label (e.g. 50 Jt, 1 M)
      let label = (val / 1000000).toFixed(0) + ' Jt';
      if (val >= 1000000000) {
        label = (val / 1000000000).toFixed(1) + ' M';
      }
      ctx.fillText(label, padding.left - 10, y + 4);
    }

    // 2. Draw Total Balance (Gradient Area & Line)
    const balanceGradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    balanceGradient.addColorStop(0, 'rgba(16, 185, 129, 0.45)');
    balanceGradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

    ctx.beginPath();
    ctx.moveTo(getX(0), getY(historyData[0].totalBalance));
    for (let i = 1; i < pointsTotal; i++) {
      ctx.lineTo(getX(i), getY(historyData[i].totalBalance));
    }
    ctx.lineTo(getX(pointsTotal - 1), height - padding.bottom);
    ctx.lineTo(getX(0), height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = balanceGradient;
    ctx.fill();

    // Line for Total Balance
    ctx.beginPath();
    ctx.moveTo(getX(0), getY(historyData[0].totalBalance));
    for (let i = 1; i < pointsTotal; i++) {
      ctx.lineTo(getX(i), getY(historyData[i].totalBalance));
    }
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.stroke();

    // 3. Draw Principal Line (Modal Pokok)
    ctx.beginPath();
    ctx.moveTo(getX(0), getY(historyData[0].totalPrincipal));
    for (let i = 1; i < pointsTotal; i++) {
      ctx.lineTo(getX(i), getY(historyData[i].totalPrincipal));
    }
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.stroke();
    ctx.setLineDash([]); // reset

    // 4. Draw Year X-Axis Labels & Points
    ctx.fillStyle = '#9ca3af';
    ctx.textAlign = 'center';
    historyData.forEach((d, i) => {
      const x = getX(i);
      // Only draw some year labels to avoid crowding
      if (pointsTotal <= 10 || i % Math.ceil(pointsTotal / 6) === 0 || i === pointsTotal - 1) {
        ctx.fillText(`Thn ${d.year}`, x, height - 15);
      }

      // Draw point on final balance
      if (i === pointsTotal - 1) {
        ctx.beginPath();
        ctx.arc(x, getY(d.totalBalance), 5, 0, Math.PI * 2);
        ctx.fillStyle = '#10b981';
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#fff';
        ctx.stroke();
      }
    });
  }

  // 2. Emergency Fund Calculator
  calculateEmergencyFund(monthlyExpense, statusMultiplier, currentFund) {
    const targetFund = monthlyExpense * statusMultiplier;
    const shortfall = Math.max(0, targetFund - currentFund);
    const progressPercent = Math.min(100, Math.round((currentFund / targetFund) * 100));

    return {
      targetFund,
      currentFund,
      shortfall,
      progressPercent,
      isComplete: shortfall === 0
    };
  }

  // 3. 50/30/20 Budget Allocator
  calculateBudget503020(monthlyIncome) {
    const needs = Math.round(monthlyIncome * 0.50);
    const wants = Math.round(monthlyIncome * 0.30);
    const savings = Math.round(monthlyIncome * 0.20);

    return {
      income: monthlyIncome,
      needs,
      wants,
      savings
    };
  }

  // 4. Pinjol vs Saving Calculator
  calculatePinjolAwareness(loanAmount, dailyRatePercent, tenorDays) {
    const dailyInterest = loanAmount * (dailyRatePercent / 100);
    const totalInterest = Math.round(dailyInterest * tenorDays);
    const totalRepayment = loanAmount + totalInterest;
    const effectiveAnnualRate = (dailyRatePercent * 365).toFixed(1);

    return {
      loanAmount,
      totalInterest,
      totalRepayment,
      effectiveAnnualRate
    };
  }
}

window.finCalc = new FinancialCalculators();
