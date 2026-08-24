/**
 * Adventure of Alfan & Andra — Wave Shooter RPG (v2)
 * 
 * Mekanik Utama:
 * - Tembak musuh Soni dengan peluru terbatas (5 peluru)
 * - Peluru habis → jawab kuis fiskal APBN untuk reload
 * - 5 ronde × 3 Soni = 15 musuh total
 * - Boss akhir Firman_Hidayat muncul setelah 15 Soni kalah (3 HP)
 * - Setiap Soni yang kalah menjatuhkan "tax_revenue"
 */

// ============================= APBN QUIZ BANK =============================
const APBN_QUESTIONS = [
  {
    q: "Apa kepanjangan dari APBN?",
    opts: ["Anggaran Pendapatan dan Belanja Negara", "Anggaran Pengeluaran dan Biaya Nasional", "Akumulasi Pendapatan Bersih Nasional", "Alokasi Pembiayaan dan Belanja Negara"],
    correct: 0,
    explain: "APBN adalah Anggaran Pendapatan dan Belanja Negara, yaitu rencana keuangan tahunan pemerintah yang disetujui oleh DPR."
  },
  {
    q: "Apa sumber penerimaan terbesar dalam APBN Indonesia?",
    opts: ["Hibah luar negeri", "Penerimaan Negara Bukan Pajak (PNBP)", "Penerimaan Perpajakan", "Pinjaman dari Bank Dunia"],
    correct: 2,
    explain: "Penerimaan perpajakan (PPh, PPN, Cukai, dll.) menyumbang sekitar 80% dari total pendapatan negara dalam APBN."
  },
  {
    q: "Siapa yang berwenang menyusun dan mengajukan RAPBN kepada DPR?",
    opts: ["Bank Indonesia", "Mahkamah Konstitusi", "Presiden / Pemerintah", "Badan Pemeriksa Keuangan"],
    correct: 2,
    explain: "Presiden menyusun RAPBN bersama Kementerian Keuangan lalu mengajukannya kepada DPR untuk dibahas dan disetujui."
  },
  {
    q: "Apa yang dimaksud dengan defisit APBN?",
    opts: ["Pendapatan negara lebih besar dari belanja", "Belanja negara lebih besar dari pendapatan", "Utang negara sudah lunas", "Tidak ada pajak yang dipungut"],
    correct: 1,
    explain: "Defisit APBN terjadi ketika total belanja negara melebihi total pendapatan negara dalam satu tahun anggaran."
  },
  {
    q: "Berapa batas maksimal defisit APBN menurut UU Keuangan Negara?",
    opts: ["1% dari PDB", "3% dari PDB", "5% dari PDB", "10% dari PDB"],
    correct: 1,
    explain: "UU No. 17/2003 tentang Keuangan Negara menetapkan batas defisit APBN maksimal 3% dari Produk Domestik Bruto (PDB)."
  },
  {
    q: "PPN adalah singkatan dari?",
    opts: ["Pajak Pendapatan Nasional", "Pajak Pertambahan Nilai", "Pajak Penghasilan Netto", "Pungutan Penerimaan Negara"],
    correct: 1,
    explain: "PPN (Pajak Pertambahan Nilai) adalah pajak tidak langsung yang dikenakan atas konsumsi barang dan jasa di dalam negeri."
  },
  {
    q: "PPh atau Pajak Penghasilan dikenakan atas?",
    opts: ["Kepemilikan tanah dan bangunan", "Penghasilan yang diterima wajib pajak orang pribadi maupun badan", "Transaksi jual-beli barang mewah saja", "Impor barang dari luar negeri saja"],
    correct: 1,
    explain: "PPh dikenakan atas setiap penghasilan (gaji, usaha, investasi) yang diterima oleh wajib pajak orang pribadi maupun badan usaha."
  },
  {
    q: "Apa fungsi APBN yang berkaitan dengan pemerataan pendapatan antar daerah?",
    opts: ["Fungsi Otorisasi", "Fungsi Alokasi", "Fungsi Distribusi", "Fungsi Regulasi"],
    correct: 2,
    explain: "Fungsi Distribusi APBN bertujuan memeratakan pendapatan dan pembangunan antar wilayah melalui transfer daerah dan dana perimbangan."
  },
  {
    q: "Dana Alokasi Umum (DAU) merupakan bagian dari?",
    opts: ["Penerimaan perpajakan pusat", "Transfer ke daerah dan dana desa", "Pembiayaan utang luar negeri", "Belanja pegawai kementerian"],
    correct: 1,
    explain: "DAU adalah dana perimbangan dari pemerintah pusat yang ditransfer ke pemerintah daerah untuk mendanai kebutuhan operasional pemerintahan."
  },
  {
    q: "Siapa yang bertugas memeriksa pengelolaan dan tanggung jawab keuangan negara (APBN)?",
    opts: ["Komisi Pemberantasan Korupsi (KPK)", "Badan Pemeriksa Keuangan (BPK)", "Otoritas Jasa Keuangan (OJK)", "Dewan Perwakilan Daerah (DPD)"],
    correct: 1,
    explain: "BPK (Badan Pemeriksa Keuangan) adalah lembaga negara yang bertugas memeriksa pengelolaan dan tanggung jawab keuangan negara."
  },
  {
    q: "Apa yang dimaksud dengan PNBP dalam struktur APBN?",
    opts: ["Pajak Non-Bumi Pertiwi", "Penerimaan Negara Bukan Pajak", "Program Nasional Bantuan Publik", "Pendapatan Neto Badan Perpajakan"],
    correct: 1,
    explain: "PNBP adalah penerimaan pemerintah pusat yang tidak berasal dari perpajakan, misalnya royalti SDA, dividen BUMN, dan biaya layanan publik."
  },
  {
    q: "Belanja pemerintah pusat dalam APBN meliputi, KECUALI:",
    opts: ["Belanja pegawai dan belanja barang", "Belanja modal infrastruktur", "Dana Bagi Hasil untuk daerah", "Belanja subsidi BBM dan listrik"],
    correct: 2,
    explain: "Dana Bagi Hasil (DBH) termasuk dalam kategori Transfer ke Daerah, bukan Belanja Pemerintah Pusat."
  },
  {
    q: "Apa tujuan utama kebijakan fiskal ekspansif?",
    opts: ["Mengurangi inflasi dengan menaikkan pajak", "Mendorong pertumbuhan ekonomi dengan meningkatkan belanja pemerintah", "Menurunkan jumlah uang beredar", "Mengurangi defisit APBN menjadi nol"],
    correct: 1,
    explain: "Kebijakan fiskal ekspansif bertujuan menstimulasi perekonomian melalui peningkatan belanja negara atau penurunan tarif pajak."
  },
  {
    q: "Surat Berharga Negara (SBN) diterbitkan pemerintah untuk?",
    opts: ["Membayar gaji DPR saja", "Membiayai defisit APBN melalui utang yang sah", "Menggantikan fungsi pajak sepenuhnya", "Membeli saham BUMN di bursa efek"],
    correct: 1,
    explain: "SBN (ORI, SBR, Sukuk) diterbitkan untuk membiayai defisit APBN dan merupakan instrumen pembiayaan utang negara yang legal dan terstruktur."
  },
  {
    q: "Subsidi dalam APBN bertujuan untuk?",
    opts: ["Menaikkan harga barang pokok", "Meringankan beban masyarakat atas harga barang/jasa tertentu", "Memberikan bonus kepada pegawai negeri", "Menambah cadangan devisa Bank Indonesia"],
    correct: 1,
    explain: "Subsidi (BBM, listrik, pupuk, dll.) bertujuan menjaga keterjangkauan harga barang/jasa kebutuhan pokok bagi masyarakat."
  }
];

// ============================= SOUND ENGINE =============================
class GameSound {
  constructor() { this.ctx = null; this.on = true; }
  init() {
    if (!this.ctx) { const AC = window.AudioContext || window.webkitAudioContext; if(AC) this.ctx = new AC(); }
    if (this.ctx?.state === 'suspended') this.ctx.resume();
  }
  play(type) {
    if (!this.on) return; this.init(); if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = (freq, t, dur, wave='sine', vol=0.12) => {
      const o = this.ctx.createOscillator(), g = this.ctx.createGain();
      o.type = wave; o.frequency.setValueAtTime(freq, now+t);
      g.gain.setValueAtTime(vol, now+t); g.gain.exponentialRampToValueAtTime(0.001, now+t+dur);
      o.connect(g); g.connect(this.ctx.destination); o.start(now+t); o.stop(now+t+dur);
    };
    switch(type) {
      case 'shoot': osc(600,0,0.06,'square',0.1); osc(400,0.03,0.05,'sawtooth',0.07); break;
      case 'hit': osc(200,0,0.06,'square',0.15); osc(100,0.04,0.08,'sawtooth',0.1); break;
      case 'kill': osc(400,0,0.1,'sine',0.12); osc(300,0.06,0.1); osc(200,0.12,0.15,'sine',0.08); break;
      case 'coin': osc(880,0,0.08,'sine',0.12); osc(1100,0.08,0.12,'sine',0.1); break;
      case 'hurt': osc(150,0,0.1,'sawtooth',0.18); osc(80,0.06,0.12,'sawtooth',0.12); break;
      case 'empty': osc(200,0,0.04,'square',0.08); osc(150,0.04,0.06,'square',0.06); break;
      case 'reload': [523,659,784,1047].forEach((f,i)=>osc(f,i*0.06,0.12,'triangle',0.12)); break;
      case 'round': [440,554,659].forEach((f,i)=>osc(f,i*0.1,0.2,'triangle',0.14)); break;
      case 'boss': osc(80,0,0.3,'sawtooth',0.2); osc(60,0.1,0.4,'square',0.15); osc(40,0.3,0.3,'sawtooth',0.1); break;
      case 'victory': [523,659,784,1047,1319,1568].forEach((f,i)=>osc(f,i*0.12,0.3,'triangle',0.13)); break;
      case 'click': osc(600,0,0.04,'sine',0.08); break;
      case 'wrong': osc(200,0,0.12,'sawtooth',0.14); osc(150,0.1,0.15,'sawtooth',0.1); break;
      case 'correct': osc(523,0,0.08,'triangle',0.12); osc(659,0.08,0.08,'triangle',0.1); osc(784,0.16,0.15,'triangle',0.1); break;
    }
  }
}

// ============================= INPUT =============================
class Input {
  constructor() {
    this.keys = {}; this.jp = {};
    window.addEventListener('keydown', e => { if(!this.keys[e.code]) this.jp[e.code]=true; this.keys[e.code]=true; if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)) e.preventDefault(); });
    window.addEventListener('keyup', e => { this.keys[e.code]=false; });
  }
  down(c) { return !!this.keys[c]; }
  pressed(c) { if(this.jp[c]){this.jp[c]=false;return true;} return false; }
  clear() { this.jp={}; }
  get up() { return this.down('KeyW')||this.down('ArrowUp'); }
  get dn() { return this.down('KeyS')||this.down('ArrowDown'); }
  get lt() { return this.down('KeyA')||this.down('ArrowLeft'); }
  get rt() { return this.down('KeyD')||this.down('ArrowRight'); }
  get fire() { return this.pressed('Space')||this.pressed('KeyJ'); }
  get dash() { return this.down('ShiftLeft')||this.down('ShiftRight'); }
}

// ============================= PARTICLES =============================
class Particle {
  constructor(x,y,vx,vy,color,life,size=3) {
    this.x=x;this.y=y;this.vx=vx;this.vy=vy;this.color=color;this.life=life;this.maxLife=life;this.size=size;
  }
  update(dt) { this.x+=this.vx*dt; this.y+=this.vy*dt; this.vy+=60*dt; this.life-=dt; }
  draw(ctx) {
    const a = Math.max(0,this.life/this.maxLife);
    ctx.globalAlpha=a; ctx.fillStyle=this.color;
    const s=this.size*a;
    ctx.fillRect(this.x-s/2, this.y-s/2, s, s);
    ctx.globalAlpha=1;
  }
  get dead() { return this.life<=0; }
}

class Particles {
  constructor() { this.list=[]; }
  emit(x,y,count,colors,speed=100,life=0.6,size=3) {
    for(let i=0;i<count;i++){
      const a=Math.random()*Math.PI*2, sp=speed*(0.3+Math.random()*0.7);
      this.list.push(new Particle(x,y,Math.cos(a)*sp,Math.sin(a)*sp-50,colors[Math.floor(Math.random()*colors.length)],life*(0.5+Math.random()),size));
    }
  }
  update(dt) { this.list.forEach(p=>p.update(dt)); this.list=this.list.filter(p=>!p.dead); }
  draw(ctx) { this.list.forEach(p=>p.draw(ctx)); }
}

// ============================= BULLET =============================
class Bullet {
  constructor(x, y, dirOrAngle, isPlayerBullet = true, customSpeed = null) {
    this.x = x; this.y = y;
    this.isPlayer = isPlayerBullet;
    this.speed = customSpeed || (isPlayerBullet ? 450 : 225); // Soni/Enemy bullet is ~50% player speed
    this.dead = false;
    this.radius = isPlayerBullet ? 4 : 5;
    this.trail = [];

    if (typeof dirOrAngle === 'number' && dirOrAngle >= 0 && dirOrAngle <= 3 && Number.isInteger(dirOrAngle)) {
      const dirs = [[0,1],[-1,0],[0,-1],[1,0]];
      this.dx = dirs[dirOrAngle][0]; this.dy = dirs[dirOrAngle][1];
    } else {
      // Angle in radians
      this.dx = Math.cos(dirOrAngle);
      this.dy = Math.sin(dirOrAngle);
    }
  }

  update(dt, bounds) {
    this.trail.push({ x: this.x, y: this.y, life: 0.15 });
    this.x += this.dx * this.speed * dt;
    this.y += this.dy * this.speed * dt;

    // Update trail
    this.trail.forEach(t => t.life -= dt);
    this.trail = this.trail.filter(t => t.life > 0);

    // Out of bounds
    if (this.x < 0 || this.x > bounds.w || this.y < 0 || this.y > bounds.h) this.dead = true;
  }

  draw(ctx) {
    // Trail
    for (const t of this.trail) {
      const a = t.life / 0.15;
      ctx.globalAlpha = a * 0.5;
      ctx.fillStyle = this.isPlayer ? '#fbbf24' : '#ff4444';
      ctx.beginPath();
      ctx.arc(t.x, t.y, this.radius * a, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Bullet body
    ctx.fillStyle = this.isPlayer ? '#ffd700' : '#ff2222';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    // Glow
    ctx.fillStyle = this.isPlayer ? 'rgba(255,215,0,0.35)' : 'rgba(255,50,50,0.45)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2);
    ctx.fill();
  }

  hits(entity) {
    const dist = Math.hypot(this.x - entity.x, this.y - entity.y);
    return dist < this.radius + (entity.hitRadius || 14);
  }
}

// ============================= PLAYER =============================
class Player {
  constructor(x, y, type) {
    this.x = x; this.y = y;
    this.type = type;
    this.speed = type === 'andra' ? 180 : type === 'lala' ? 200 : 155;
    this.maxHP = type === 'alfan' ? 6 : type === 'lala' ? 4 : 5;
    this.hp = this.maxHP;
    this.dir = 2; // face up
    this.animFrame = 0; this.animTimer = 0;
    this.moving = false;
    this.iFrames = 0;
    this.hitRadius = 10;
    this.dashCD = 0;
  }

  update(dt, input, bounds) {
    let dx = 0, dy = 0;
    if (input.up)  { dy=-1; this.dir=2; }
    if (input.dn)  { dy=1;  this.dir=0; }
    if (input.lt)  { dx=-1; this.dir=1; }
    if (input.rt)  { dx=1;  this.dir=3; }
    this.moving = dx!==0||dy!==0;
    if(dx&&dy){dx*=0.707;dy*=0.707;}

    let spd = this.speed;
    if(this.dashCD>0) this.dashCD-=dt;
    if(input.dash && this.dashCD<=0 && this.moving) { spd*=1.7; this.dashCD=0.6; }

    this.x = Math.max(16, Math.min(bounds.w-16, this.x + dx*spd*dt));
    this.y = Math.max(16, Math.min(bounds.h-16, this.y + dy*spd*dt));

    if(this.moving) { this.animTimer+=dt; if(this.animTimer>0.14){this.animFrame=(this.animFrame+1)%4;this.animTimer=0;} }
    else { this.animFrame=0; }
    if(this.iFrames>0) this.iFrames-=dt;
  }

  takeDamage(amount) {
    if(this.iFrames>0) return false;
    this.hp = Math.max(0, this.hp-amount);
    this.iFrames = 1.2;
    return true;
  }

  draw(ctx) {
    if(this.iFrames>0 && Math.floor(this.iFrames*10)%2===0) return;

    const sx=this.x, sy=this.y;
    const isA = this.type==='alfan', isL = this.type==='lala';
    const body = isA?'#2563eb':isL?'#db2777':'#059669';
    const bodyL = isA?'#3b82f6':isL?'#f472b6':'#10b981';
    const hair = isA?'#92400e':isL?'#fde68a':'#1c1917';
    const hairL = isA?'#b45309':isL?'#fffbeb':'#44403c';

    // Shadow
    ctx.fillStyle='rgba(0,0,0,0.3)';
    ctx.beginPath(); ctx.ellipse(sx,sy+12,10,4,0,0,Math.PI*2); ctx.fill();

    // Legs
    const lo = this.moving ? Math.sin(this.animFrame*Math.PI/2)*3 : 0;
    ctx.fillStyle='#1e3a5f';
    ctx.fillRect(sx-5,sy+5+lo,5,9); ctx.fillRect(sx+1,sy+5-lo,5,9);

    // Body
    ctx.fillStyle=body; ctx.fillRect(sx-8,sy-7,16,16);
    ctx.fillStyle=bodyL; ctx.fillRect(sx-6,sy-5,5,7);

    // Andra / Lala: skirted tunic (Lala's gown is fuller)
    if(!isA){ const w=isL?10:9, h=isL?8:6, ty=isL?3:4;
      ctx.fillStyle=body; ctx.fillRect(sx-w,sy+ty,w*2,h);
      ctx.fillStyle=bodyL; ctx.fillRect(sx-w,sy+ty,w*2,2); }

    // Head
    ctx.fillStyle='#fbbf24'; ctx.fillRect(sx-7,sy-19,14,13);
    // Hair
    ctx.fillStyle=hair; ctx.fillRect(sx-8,sy-21,16,6);
    if(isA) ctx.fillRect(sx-8,sy-19,3,9);
    else {
      ctx.fillRect(sx-9,sy-22,18,6);                                 // crown
      ctx.fillRect(sx-10,sy-19,3,14); ctx.fillRect(sx+7,sy-19,3,14);  // locks past the shoulders
      ctx.fillRect(sx-9,sy-5,2,8);    ctx.fillRect(sx+7,sy-5,2,8);    // ...narrowing to the waist
      ctx.fillRect(sx-7,sy-19,4,4);   ctx.fillRect(sx+3,sy-19,4,4);   // fringe framing the face
      ctx.fillStyle=hairL; ctx.fillRect(sx-6,sy-21,9,1);              // sheen
      if(isL){                                                       // Lala's tiara
        ctx.fillStyle='#f59e0b';
        ctx.fillRect(sx-8,sy-24,16,3);
        ctx.fillRect(sx-6,sy-26,2,2); ctx.fillRect(sx-1,sy-27,2,3); ctx.fillRect(sx+4,sy-26,2,2);
        ctx.fillStyle='#ec4899'; ctx.fillRect(sx-1,sy-23,2,2);
        ctx.fillStyle='#fbbf24'; ctx.fillRect(sx-8,sy-24,16,1);
      }
    }

    // Eyes
    ctx.fillStyle='#1a1a2e';
    if(this.dir===0){ctx.fillRect(sx-3,sy-13,2,3);ctx.fillRect(sx+2,sy-13,2,3);}
    else if(this.dir===1){ctx.fillRect(sx-5,sy-13,2,3);}
    else if(this.dir===3){ctx.fillRect(sx+4,sy-13,2,3);}

    // Gun
    ctx.fillStyle='#6b7280';
    const gx = [0,-10,0,10][this.dir], gy = [10,0,-10,0][this.dir];
    ctx.fillRect(sx+gx-2, sy+gy-2, 5, 5);
    ctx.fillStyle='#374151';
    const bx = [0,-6,0,6][this.dir], by = [6,0,-6,0][this.dir];
    ctx.fillRect(sx+gx+bx-1, sy+gy+by-1, 3, 3);
  }
}

// ============================= ENEMY (SONI) =============================
class Soni {
  constructor(x, y, tier=0) {
    this.x=x; this.y=y; this.tier=tier;
    this.hp = 1;
    this.speed = 40 + tier*15 + Math.random()*20;
    this.hitRadius = 12;
    this.dead = false;
    this.dir = 0;
    this.animFrame = 0; this.animTimer = 0;
    this.flashTimer = 0;
    this.spawnAnim = 1.0; // spawn animation duration

    this.aiTimer = 0;
    this.aiAngle = Math.random()*Math.PI*2;

    this.baseColor = ['#e74c3c','#c0392b','#a93226','#922b21','#7b241c'][tier%5];
    this.dropAmount = 22 + Math.floor(Math.random()*15) + tier*5;

    // Soni shooting timer (shoots bullets at 50% player speed: 225)
    this.shootTimer = 1.2 + Math.random() * 2.0;
  }

  update(dt, playerX, playerY, bounds, game) {
    if(this.dead) return;

    // Spawn animation
    if(this.spawnAnim > 0) { this.spawnAnim -= dt*2; return; }

    const angle = Math.atan2(playerY-this.y, playerX-this.x);
    const dist = Math.hypot(playerX-this.x, playerY-this.y);

    // Chase player
    if(dist > 20) {
      this.x += Math.cos(angle)*this.speed*dt;
      this.y += Math.sin(angle)*this.speed*dt;
    }

    // Face player
    const deg = ((angle*180/Math.PI)+360)%360;
    if(deg>225&&deg<315) this.dir=2;
    else if(deg>45&&deg<135) this.dir=0;
    else if(deg>=135&&deg<=225) this.dir=1;
    else this.dir=3;

    // Clamp
    this.x = Math.max(16,Math.min(bounds.w-16,this.x));
    this.y = Math.max(16,Math.min(bounds.h-16,this.y));

    this.animTimer+=dt;
    if(this.animTimer>0.2){this.animFrame=(this.animFrame+1)%4;this.animTimer=0;}
    if(this.flashTimer>0) this.flashTimer-=dt;

    // Soni shooting mechanic (speed = 225, 50% of player's 450)
    this.shootTimer -= dt;
    if(this.shootTimer <= 0) {
      this.shootTimer = 2.2 + Math.random() * 1.8;
      if(game && game.bullets) {
        game.bullets.push(new Bullet(this.x, this.y, angle, false, 225));
        if(game.particles) game.particles.emit(this.x, this.y, 4, ['#ff4444','#ff8888'], 40, 0.2, 2);
        if(game.sound) game.sound.play('shoot');
      }
    }
  }

  draw(ctx) {
    if(this.dead) return;

    // Spawn animation
    if(this.spawnAnim > 0) {
      const p = 1 - this.spawnAnim;
      ctx.globalAlpha = p;
      ctx.fillStyle = '#ff4444';
      ctx.beginPath();
      ctx.arc(this.x, this.y, 20*(1-p)+12*p, 0, Math.PI*2);
      ctx.fill();
      ctx.globalAlpha = 1;
      return;
    }

    const sx=this.x,sy=this.y;
    const flash = this.flashTimer>0;

    // Shadow
    ctx.fillStyle='rgba(0,0,0,0.3)';
    ctx.beginPath(); ctx.ellipse(sx,sy+10,8,3,0,0,Math.PI*2); ctx.fill();

    // Legs
    const lo = Math.sin(this.animFrame*Math.PI/2)*2;
    ctx.fillStyle=flash?'#fff':'#3a1a1a';
    ctx.fillRect(sx-4,sy+4+lo,4,7); ctx.fillRect(sx+1,sy+4-lo,4,7);

    // Body
    ctx.fillStyle=flash?'#fff':this.baseColor;
    ctx.fillRect(sx-7,sy-6,14,13);

    // Belt
    ctx.fillStyle=flash?'#fff':'#ffd700';
    ctx.fillRect(sx-7,sy-1,14,2);

    // Head
    ctx.fillStyle=flash?'#fff':'#ffeaa7';
    ctx.fillRect(sx-6,sy-17,12,11);

    // Helmet
    ctx.fillStyle=flash?'#fff':'#6a2020';
    ctx.fillRect(sx-7,sy-19,14,5);

    // Eyes (angry)
    if(this.dir!==2) {
      ctx.fillStyle='#1a1a2e';
      ctx.fillRect(sx-3,sy-13,2,2);ctx.fillRect(sx+2,sy-13,2,2);
      ctx.fillStyle=flash?'#fff':'#4a0808';
      ctx.fillRect(sx-4,sy-15,3,1);ctx.fillRect(sx+2,sy-15,3,1);
    }

    // Name tag
    ctx.fillStyle='rgba(0,0,0,0.5)';
    ctx.font='bold 7px "Press Start 2P"';
    ctx.textAlign='center';
    ctx.fillText('SONI',sx+1,sy-23);
    ctx.fillStyle='#ff6b6b';
    ctx.fillText('SONI',sx,sy-24);
    ctx.textAlign='start';
  }
}

// ============================= BOSS =============================
class FirmanHidayat {
  constructor(x, y) {
    this.x=x; this.y=y;
    this.maxHP = 3; this.hp = 3;
    this.hitRadius = 22;
    this.speed = 65;
    this.dead = false;
    this.active = false;
    this.dir = 0;
    this.animFrame = 0; this.animTimer = 0;
    this.flashTimer = 0;
    this.entranceTimer = 2.0;

    this.aiState = 'idle';
    this.stateTimer = 1.5;
    this.chargeTarget = null;

    this.shockwaveRadius = 0;
    this.shockwaveActive = false;

    // 5-bullet burst attack
    this.burstCount = 0;
    this.burstTimer = 0;
  }

  activate() { this.active=true; this.entranceTimer=2.0; this.aiState='idle'; this.stateTimer=2; }

  update(dt, playerX, playerY, bounds, particles, cam, game) {
    if(this.dead||!this.active) return;
    if(this.entranceTimer>0) { this.entranceTimer-=dt; return; }

    this.animTimer+=dt;
    if(this.animTimer>0.2){this.animFrame=(this.animFrame+1)%4;this.animTimer=0;}
    if(this.flashTimer>0) this.flashTimer-=dt;

    this.stateTimer -= dt;

    const angle = Math.atan2(playerY-this.y, playerX-this.x);
    const deg = ((angle*180/Math.PI)+360)%360;
    if(deg>225&&deg<315) this.dir=2;
    else if(deg>45&&deg<135) this.dir=0;
    else if(deg>=135&&deg<=225) this.dir=1;
    else this.dir=3;

    switch(this.aiState) {
      case 'idle':
        // Slowly approach
        this.x += Math.cos(angle)*this.speed*0.3*dt;
        this.y += Math.sin(angle)*this.speed*0.3*dt;
        if(this.stateTimer<=0) {
          const rand = Math.random();
          if(rand < 0.45) {
            // Burst 5 consecutive bullets
            this.aiState = 'burst_shoot';
            this.burstCount = 5;
            this.burstTimer = 0; // fire immediately
            this.stateTimer = 1.2;
          } else if(rand < 0.75) {
            this.aiState='charge';
            this.chargeTarget={x:playerX,y:playerY};
            this.stateTimer=1.0;
          } else {
            this.aiState='slam';
            this.stateTimer=0.6;
          }
        }
        break;

      case 'burst_shoot':
        this.burstTimer -= dt;
        if(this.burstTimer <= 0 && this.burstCount > 0) {
          this.burstTimer = 0.13; // rapid consecutive burst interval
          this.burstCount--;
          const shootAngle = Math.atan2(playerY - this.y, playerX - this.x);
          if(game && game.bullets) {
            game.bullets.push(new Bullet(this.x, this.y, shootAngle, false, 240));
          }
          if(particles) particles.emit(this.x, this.y, 6, ['#ff0055','#ff4444','#ffd700'], 60, 0.25, 3);
          if(game && game.sound) game.sound.play('shoot');
          if(cam) cam.shake(2, 0.08);

          if(this.burstCount === 0) {
            this.aiState = 'rest';
            this.stateTimer = 1.2;
          }
        }
        break;

      case 'charge':
        if(this.chargeTarget) {
          const ca = Math.atan2(this.chargeTarget.y-this.y,this.chargeTarget.x-this.x);
          this.x+=Math.cos(ca)*this.speed*2.8*dt;
          this.y+=Math.sin(ca)*this.speed*2.8*dt;
          particles.emit(this.x,this.y,1,['#ff4444','#ff8800'],30,0.2,3);
        }
        if(this.stateTimer<=0){this.aiState='rest';this.stateTimer=1.2;}
        break;

      case 'slam':
        if(this.stateTimer<=0&&!this.shockwaveActive) {
          this.shockwaveActive=true; this.shockwaveRadius=0;
          particles.emit(this.x,this.y,20,['#8b4513','#d2691e','#ff8c00'],100,0.5,4);
          if(cam) cam.shake(8,0.3);
          this.aiState='rest'; this.stateTimer=1.5;
        }
        break;

      case 'rest':
        if(this.stateTimer<=0){this.aiState='idle';this.stateTimer=0.8+Math.random();}
        break;
    }

    // Shockwave
    if(this.shockwaveActive) {
      this.shockwaveRadius+=180*dt;
      if(this.shockwaveRadius>160){this.shockwaveActive=false;this.shockwaveRadius=0;}
    }

    this.x=Math.max(30,Math.min(bounds.w-30,this.x));
    this.y=Math.max(30,Math.min(bounds.h-30,this.y));
  }

  draw(ctx) {
    if(this.dead||!this.active) return;

    const sx=this.x,sy=this.y;
    const flash = this.flashTimer>0;
    const t = performance.now()*0.001;

    // Entrance animation
    if(this.entranceTimer>0) {
      const p = 1 - this.entranceTimer/2;
      ctx.globalAlpha = p;
      // Dark aura
      ctx.fillStyle = `rgba(139,0,0,${0.3*p})`;
      ctx.beginPath(); ctx.arc(sx,sy,50*(2-p),0,Math.PI*2); ctx.fill();
      ctx.globalAlpha=1;
    }

    // Aura
    ctx.fillStyle=`rgba(139,26,26,${0.12+Math.sin(t*4)*0.08})`;
    ctx.beginPath(); ctx.arc(sx,sy,40,0,Math.PI*2); ctx.fill();

    // Shadow
    ctx.fillStyle='rgba(0,0,0,0.4)';
    ctx.beginPath(); ctx.ellipse(sx,sy+16,16,6,0,0,Math.PI*2); ctx.fill();

    // Legs
    const lo = Math.sin(this.animFrame*Math.PI/2)*3;
    ctx.fillStyle=flash?'#fff':'#2a1a1a';
    ctx.fillRect(sx-8,sy+6+lo,7,12); ctx.fillRect(sx+2,sy+6-lo,7,12);

    // Body
    ctx.fillStyle=flash?'#fff':'#1a0a0a';
    ctx.fillRect(sx-14,sy-12,28,22);

    // Cape
    ctx.fillStyle=flash?'#fff':'#8b0000';
    ctx.fillRect(sx-16,sy-10,32,18);
    ctx.fillStyle=flash?'#fff':'#ffd700';
    ctx.fillRect(sx-16,sy-4,32,2);
    ctx.fillRect(sx-16,sy+3,32,2);

    // Shoulders
    ctx.fillStyle=flash?'#fff':'#555';
    ctx.fillRect(sx-18,sy-10,6,10);ctx.fillRect(sx+12,sy-10,6,10);
    ctx.fillStyle=flash?'#fff':'#ffd700';
    ctx.fillRect(sx-17,sy-9,4,4);ctx.fillRect(sx+13,sy-9,4,4);

    // Head
    ctx.fillStyle=flash?'#fff':'#daa520';
    ctx.fillRect(sx-9,sy-28,18,16);

    // Crown
    ctx.fillStyle=flash?'#fff':'#ffd700';
    ctx.fillRect(sx-11,sy-34,22,8);
    ctx.fillStyle=flash?'#fff':'#ff4444';
    ctx.fillRect(sx-9,sy-37,5,5);
    ctx.fillRect(sx-2,sy-38,5,6);
    ctx.fillRect(sx+5,sy-37,5,5);

    // Eyes
    if(this.dir!==2) {
      ctx.fillStyle=flash?'#fff':'#ff0000';
      ctx.fillRect(sx-6,sy-22,3,4);ctx.fillRect(sx+3,sy-22,3,4);
      ctx.fillStyle=flash?'#fff':'#4a0000';
      ctx.fillRect(sx-5,sy-16,10,2);
    }

    // Name
    ctx.font='bold 8px "Press Start 2P"';
    ctx.textAlign='center';
    ctx.fillStyle='rgba(0,0,0,0.5)';
    ctx.fillText('FIRMAN HIDAYAT',sx+1,sy-42);
    ctx.fillStyle='#ff3333';
    ctx.fillText('FIRMAN HIDAYAT',sx,sy-43);

    // HP pips
    for(let i=0;i<this.maxHP;i++) {
      ctx.fillStyle = i<this.hp?'#ff3333':'#333';
      ctx.beginPath(); ctx.arc(sx-10+i*10,sy-50,4,0,Math.PI*2); ctx.fill();
      ctx.strokeStyle='#fff'; ctx.lineWidth=1; ctx.stroke();
    }
    ctx.textAlign='start';

    // Shockwave
    if(this.shockwaveActive) {
      ctx.strokeStyle=`rgba(255,140,0,${1-this.shockwaveRadius/160})`;
      ctx.lineWidth=4;
      ctx.beginPath(); ctx.arc(sx,sy,this.shockwaveRadius,0,Math.PI*2); ctx.stroke();
      ctx.lineWidth=1;
    }
  }
}

// ============================= TAX REVENUE DROP =============================
class TaxDrop {
  constructor(x,y,amount) {
    this.x=x;this.y=y;this.amount=amount;
    this.vy=-80;this.life=5;this.collected=false;this.bob=Math.random()*6;
  }
  update(dt) {
    if(this.collected)return;
    this.vy+=150*dt; this.y+=this.vy*dt; this.vy*=0.95;
    this.bob+=dt*3; this.life-=dt;
    if(this.life<=0)this.collected=true;
  }
  draw(ctx) {
    if(this.collected) return;
    const sy = this.y + Math.sin(this.bob)*3;
    // Coin
    ctx.fillStyle='#ffd700';
    ctx.beginPath();ctx.arc(this.x,sy,7,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#ffec4d';
    ctx.beginPath();ctx.arc(this.x-1,sy-1,4,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#8b6914';
    ctx.font='bold 7px sans-serif';ctx.textAlign='center';
    ctx.fillText('T',this.x+0.5,sy+3);
    // Amount label
    if(this.life>3.5) {
      ctx.globalAlpha=Math.min(1,(5-this.life)*2);
      ctx.fillStyle='#ffd700';ctx.font='bold 8px "Press Start 2P"';
      ctx.fillText(`+${this.amount}T`,this.x,sy-15);
      ctx.globalAlpha=1;
    }
    ctx.textAlign='start';
  }
}

// ============================= CAMERA SHAKE =============================
class Camera {
  constructor() { this.sx=0;this.sy=0;this.dur=0;this.intensity=0; }
  shake(i=5,d=0.15) { this.intensity=i;this.dur=d; }
  update(dt) {
    if(this.dur>0){this.dur-=dt;this.sx=(Math.random()-0.5)*this.intensity;this.sy=(Math.random()-0.5)*this.intensity;}
    else{this.sx=0;this.sy=0;}
  }
}

// ============================= MAIN GAME =============================
class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.sound = new GameSound();
    this.input = new Input();
    this.particles = new Particles();
    this.camera = new Camera();

    this.state = 'title';
    this.selectedChar = null;
    this.player = null;
    this.enemies = [];
    this.bullets = [];
    this.drops = [];
    this.boss = null;

    // Game Stats
    this.ammo = 5;
    this.maxAmmo = 5;
    this.taxRevenue = 0;
    this.round = 0;
    this.maxRounds = 3;
    this.sonisPerRound = 3;
    this.totalKills = 0;
    this.totalSoniTarget = 9;
    this.gameTime = 0;

    // State flags
    this.quizActive = false;
    this.roundAnnounceing = false;
    this.bossPhase = false;
    this.roundAnnouncTimer = 0;
    this.questionUsed = new Set();

    // Arena decorations
    this.grassDetails = [];
    this.obstacles = [];

    this.lastTime = 0;
    this.resize();
    window.addEventListener('resize', () => this.resize());

    this.drawCharPreview('alfanPreview','alfan');
    this.drawCharPreview('andraPreview','andra');
    this.drawCharPreview('lalaPreview','lala');
  }

  get W() { return this.canvas.width; }
  get H() { return this.canvas.height; }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.generateArena();
  }

  generateArena() {
    this.grassDetails = [];
    for(let i=0;i<200;i++) {
      this.grassDetails.push({
        x: Math.random()*this.W, y: Math.random()*this.H,
        color: ['#3a6b33','#2d5a27','#4a7a40','#357030'][Math.floor(Math.random()*4)],
        size: 1+Math.random()*2
      });
    }
    // Some rock obstacles
    this.obstacles = [];
    const ow = this.W, oh = this.H;
    const rockPositions = [
      [0.15,0.3],[0.85,0.3],[0.15,0.7],[0.85,0.7],
      [0.5,0.2],[0.5,0.8],[0.3,0.5],[0.7,0.5]
    ];
    for(const [rx,ry] of rockPositions) {
      this.obstacles.push({x:rx*ow, y:ry*oh, r:18+Math.random()*8});
    }
  }

  drawCharPreview(id,type) {
    const c=document.getElementById(id); if(!c) return;
    c.width=64;c.height=72;
    const cx=c.getContext('2d');
    const isA=type==='alfan', isL=type==='lala';
    const body  = isA?'#2563eb':isL?'#db2777':'#059669';
    const bodyL = isA?'#3b82f6':isL?'#f472b6':'#10b981';
    const hair  = isA?'#92400e':isL?'#fde68a':'#1c1917';
    const hairL = isA?'#b45309':isL?'#fffbeb':'#44403c';
    cx.save(); cx.translate(32,48); cx.scale(2,2);
    cx.fillStyle='rgba(0,0,0,0.3)'; cx.beginPath(); cx.ellipse(0,10,8,4,0,0,Math.PI*2); cx.fill();
    cx.fillStyle='#1e3a5f'; cx.fillRect(-4,4,4,8); cx.fillRect(1,4,4,8);
    cx.fillStyle=body; cx.fillRect(-7,-6,14,14);
    cx.fillStyle=bodyL; cx.fillRect(-5,-4,4,6);
    if(!isA){ const w=isL?9:8, h=isL?7:5, ty=isL?2:3;
      cx.fillStyle=body; cx.fillRect(-w,ty,w*2,h); cx.fillStyle=bodyL; cx.fillRect(-w,ty,w*2,2); }
    cx.fillStyle='#fbbf24'; cx.fillRect(-6,-16,12,12);
    cx.fillStyle=hair; cx.fillRect(-7,-18,14,6);
    if(isA) cx.fillRect(-7,-16,3,8);
    else {
      cx.fillRect(-8,-19,16,6);
      cx.fillRect(-9,-16,3,13); cx.fillRect(6,-16,3,13);
      cx.fillRect(-8,-3,2,6);   cx.fillRect(6,-3,2,6);
      cx.fillRect(-6,-16,4,3);  cx.fillRect(2,-16,4,3);
      cx.fillStyle=hairL; cx.fillRect(-5,-18,8,1);
      if(isL){
        cx.fillStyle='#f59e0b';
        cx.fillRect(-7,-21,14,3);
        cx.fillRect(-5,-23,2,2); cx.fillRect(-1,-24,2,3); cx.fillRect(3,-23,2,2);
        cx.fillStyle='#ec4899'; cx.fillRect(-1,-20,2,2);
        cx.fillStyle='#fbbf24'; cx.fillRect(-7,-21,14,1);
      }
    }
    cx.fillStyle='#1a1a2e'; cx.fillRect(-3,-11,2,2); cx.fillRect(2,-11,2,2);
    // Gun
    cx.fillStyle='#6b7280'; cx.fillRect(8,-2,5,5);
    cx.fillStyle='#374151'; cx.fillRect(13,-1,3,3);
    cx.restore();
  }

  selectChar(type) {
    this.selectedChar = type;
    this.sound.play('click');
    document.querySelectorAll('.char-card').forEach(c=>c.classList.remove('selected'));
    document.querySelector(`.char-card.${type}`).classList.add('selected');
    document.getElementById('startGameBtn').disabled = false;
  }

  startGame() {
    if(!this.selectedChar) return;
    this.sound.play('round');

    this.player = new Player(this.W/2, this.H*0.75, this.selectedChar);
    this.enemies = [];
    this.bullets = [];
    this.drops = [];
    this.boss = null;
    this.ammo = this.maxAmmo;
    this.taxRevenue = 0;
    this.round = 0;
    this.totalKills = 0;
    this.gameTime = 0;
    this.bossPhase = false;
    this.quizActive = false;
    this.questionUsed.clear();

    this.state = 'playing';
    document.getElementById('titleScreen').classList.add('hidden');
    document.getElementById('selectScreen').classList.add('hidden');
    document.getElementById('gameHUD').classList.remove('hidden');

    this.generateArena();
    this.startNextRound();
  }

  startNextRound() {
    this.round++;
    if(this.round > this.maxRounds) {
      this.startBossPhase();
      return;
    }

    // Announce round
    this.roundAnnounceing = true;
    this.roundAnnouncTimer = 1.8;

    const announceEl = document.getElementById('roundAnnounce');
    document.getElementById('roundText').textContent = `RONDE ${this.round} / ${this.maxRounds}`;
    document.getElementById('roundSub').textContent = `3 Soni akan muncul! Peluru: ${this.ammo}/${this.maxAmmo}`;
    announceEl.classList.add('show');
    this.sound.play('round');

    // Spawn 3 Soni after delay
    setTimeout(() => {
      announceEl.classList.remove('show');
      this.roundAnnounceing = false;
      this.spawnRoundEnemies();
    }, 1800);
  }

  spawnRoundEnemies() {
    const positions = [
      // Spawn from edges
      [Math.random()*this.W, -20],
      [Math.random()<0.5 ? -20 : this.W+20, Math.random()*this.H*0.6],
      [Math.random()*this.W, -30]
    ];
    const tier = Math.min(4, Math.floor((this.round-1)*0.8));
    for(const [px,py] of positions) {
      const sx = Math.max(40,Math.min(this.W-40, px));
      const sy = Math.max(40,Math.min(this.H*0.5, py < 0 ? 40+Math.random()*80 : py));
      this.enemies.push(new Soni(sx, sy, tier));
    }
  }

  startBossPhase() {
    this.bossPhase = true;
    this.roundAnnounceing = true;
    this.roundAnnouncTimer = 2.5;

    const announceEl = document.getElementById('roundAnnounce');
    document.getElementById('roundText').textContent = '⚔️ RAJA TERAKHIR ⚔️';
    document.getElementById('roundSub').textContent = 'FIRMAN HIDAYAT telah muncul!';
    announceEl.classList.add('show');
    this.sound.play('boss');

    setTimeout(() => {
      announceEl.classList.remove('show');
      this.roundAnnounceing = false;
      this.boss = new FirmanHidayat(this.W/2, 80);
      this.boss.activate();
      document.getElementById('bossHPBar').classList.add('show');
    }, 2500);
  }

  // Quiz System
  openQuiz() {
    this.quizActive = true;
    this.sound.play('empty');

    // Pick unused question
    let qIdx;
    const available = [];
    for(let i=0;i<APBN_QUESTIONS.length;i++) if(!this.questionUsed.has(i)) available.push(i);
    if(available.length===0) { this.questionUsed.clear(); for(let i=0;i<APBN_QUESTIONS.length;i++) available.push(i); }
    qIdx = available[Math.floor(Math.random()*available.length)];
    this.questionUsed.add(qIdx);

    const q = APBN_QUESTIONS[qIdx];
    this.currentQuizAnswer = q.correct;
    this.currentQuizExplain = q.explain;

    document.getElementById('quizQuestionText').textContent = q.q;
    const optsEl = document.getElementById('quizOptions');
    optsEl.innerHTML = '';
    const letters = ['A','B','C','D'];
    q.opts.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.innerHTML = `<span class="opt-letter">${letters[i]}</span><span>${opt}</span>`;
      btn.onclick = () => this.answerQuiz(i, btn);
      optsEl.appendChild(btn);
    });

    document.getElementById('quizFeedback').className = 'quiz-feedback';
    document.getElementById('quizFeedback').style.display = 'none';
    document.getElementById('quizContinueBtn').classList.remove('show');
    document.getElementById('quizOverlay').classList.add('show');
  }

  answerQuiz(selected, btnEl) {
    const correct = selected === this.currentQuizAnswer;
    const allBtns = document.querySelectorAll('.quiz-opt-btn');
    allBtns.forEach((b,i) => {
      b.classList.add('disabled');
      if(i===this.currentQuizAnswer) b.classList.add('correct');
      else if(i===selected) b.classList.add('wrong');
    });

    const fb = document.getElementById('quizFeedback');
    fb.style.display = 'block';

    if(correct) {
      this.sound.play('correct');
      this.ammo = this.maxAmmo;
      fb.className = 'quiz-feedback correct-fb show';
      fb.innerHTML = `<b>✅ Jawaban Tepat!</b> Peluru di-reload penuh: ${this.maxAmmo} peluru!<br><br>${this.currentQuizExplain}`;
    } else {
      this.sound.play('wrong');
      this.ammo = 3;
      fb.className = 'quiz-feedback wrong-fb show';
      fb.innerHTML = `<b>❌ Jawaban Salah.</b> Peluru hanya di-reload sebagian: 3 peluru.<br><br><b>Jawaban benar:</b> ${this.currentQuizExplain}`;
    }

    document.getElementById('quizContinueBtn').classList.add('show');
  }

  closeQuiz() {
    this.quizActive = false;
    document.getElementById('quizOverlay').classList.remove('show');
    this.sound.play('reload');
  }

  // HUD Update
  updateHUD() {
    if(!this.player) return;

    // Hearts
    const h = document.getElementById('hudHearts');
    let hhtml='';
    for(let i=0;i<this.player.maxHP;i++) hhtml+=`<span class="heart">${i<this.player.hp?'❤️':'🖤'}</span>`;
    h.innerHTML=hhtml;

    // Name
    document.getElementById('hudName').textContent = {alfan:'⚔️ ALFAN',andra:'🗡️ ANDRA',lala:'👑 LALA'}[this.selectedChar];

    // Round
    document.getElementById('hudRound').textContent = this.bossPhase ? '👑 BOSS FIGHT' : `RONDE ${this.round}/${this.maxRounds}`;

    // Revenue
    document.getElementById('hudRevenueVal').textContent = `Rp ${Math.floor(this.taxRevenue)} Triliun`;

    // Progress bar
    const pct = Math.min(100, (this.totalKills / this.totalSoniTarget) * 100);
    document.getElementById('progressFill').style.width = `${pct}%`;
    document.getElementById('progressLabel').textContent = this.bossPhase
      ? '🏛️ PROJECT MBG AKTIF — Kalahkan Firman Hidayat!'
      : `Soni: ${this.totalKills}/${this.totalSoniTarget} dikalahkan`;

    // Ammo
    const ammoEl = document.getElementById('ammoBullets');
    let ahtml='';
    for(let i=0;i<this.maxAmmo;i++) ahtml+=`<div class="ammo-bullet ${i>=this.ammo?'empty':''}"></div>`;
    ammoEl.innerHTML=ahtml;

    document.getElementById('hudKills').textContent = `Eliminasi: ${this.totalKills} | Waktu: ${Math.floor(this.gameTime)}s`;

    // Boss HP
    if(this.boss && this.boss.active && !this.boss.dead) {
      document.getElementById('bossHPFill').style.width = `${(this.boss.hp/this.boss.maxHP)*100}%`;
    }
  }

  // Main Update
  update(dt) {
    if(this.state !== 'playing') return;
    if(this.quizActive || this.roundAnnounceing) return;

    this.gameTime += dt;
    this.camera.update(dt);

    // Player movement
    this.player.update(dt, this.input, {w:this.W, h:this.H});

    // Player shoot
    if(this.input.fire) {
      if(this.ammo > 0) {
        this.ammo--;
        this.sound.play('shoot');
        const bx = this.player.x, by = this.player.y;
        this.bullets.push(new Bullet(bx, by, this.player.dir, true));
        this.particles.emit(bx, by, 4, ['#ffd700','#fff'], 50, 0.2, 2);

        // If ammo just hit 0, open quiz after short delay
        if(this.ammo === 0) {
          setTimeout(() => {
            if(this.state === 'playing' && this.ammo === 0) {
              this.openQuiz();
            }
          }, 400);
        }
      } else {
        this.sound.play('empty');
        // Open quiz immediately
        this.openQuiz();
      }
    }

    // Bullets update
    const bounds = {w: this.W, h: this.H};
    for(const b of this.bullets) b.update(dt, bounds);

    // Bullet collisions
    for(const b of this.bullets) {
      if(b.dead) continue;

      if(b.isPlayer) {
        // Player bullet hitting Soni
        for(const e of this.enemies) {
          if(e.dead || e.spawnAnim > 0) continue;
          if(b.hits(e)) {
            b.dead = true;
            e.hp--;
            e.flashTimer = 0.15;
            this.sound.play('hit');
            this.camera.shake(3, 0.1);
            this.particles.emit(e.x, e.y, 10, ['#fff','#ff6b6b','#ffa07a'], 80, 0.4, 3);

            if(e.hp <= 0) {
              e.dead = true;
              this.totalKills++;
              this.sound.play('kill');
              this.camera.shake(5, 0.15);
              this.particles.emit(e.x, e.y, 20, ['#ff4444','#ff8844','#ffcc44','#fff'], 120, 0.7, 4);
              this.drops.push(new TaxDrop(e.x, e.y, e.dropAmount));
            }
            break;
          }
        }

        // Player bullet hitting Boss
        if(this.boss && this.boss.active && !this.boss.dead && this.boss.entranceTimer<=0) {
          if(b.hits(this.boss)) {
            b.dead = true;
            this.boss.hp--;
            this.boss.flashTimer = 0.15;
            this.sound.play('hit');
            this.camera.shake(6, 0.2);
            this.particles.emit(this.boss.x, this.boss.y, 15, ['#fff','#ff4444','#ffd700'], 100, 0.5, 4);

            if(this.boss.hp <= 0) {
              this.boss.dead = true;
              this.sound.play('victory');
              this.camera.shake(12, 0.5);
              this.particles.emit(this.boss.x, this.boss.y, 50, ['#ff4444','#ff8844','#ffcc44','#fff','#8b1a1a','#ffd700'], 200, 1.2, 6);
              setTimeout(() => this.victory(), 2000);
            }
          }
        }
      } else {
        // Enemy or Boss bullet hitting Player
        if(this.player && this.player.hp > 0 && b.hits(this.player)) {
          b.dead = true;
          if(this.player.takeDamage(1)) {
            this.sound.play('hurt');
            this.camera.shake(4, 0.15);
            this.particles.emit(this.player.x, this.player.y, 8, ['#ff4444','#fff'], 80, 0.3);
            if(this.player.hp <= 0) { this.gameOver(); return; }
          }
        }
      }
    }
    this.bullets = this.bullets.filter(b => !b.dead);

    // Enemy update & contact damage
    for(const e of this.enemies) {
      e.update(dt, this.player.x, this.player.y, bounds, this);
      if(!e.dead && e.spawnAnim<=0) {
        const dist = Math.hypot(this.player.x-e.x, this.player.y-e.y);
        if(dist < 20) {
          if(this.player.takeDamage(1)) {
            this.sound.play('hurt');
            this.camera.shake(4, 0.15);
            this.particles.emit(this.player.x, this.player.y, 8, ['#ff4444','#fff'], 80, 0.3);
            if(this.player.hp <= 0) { this.gameOver(); return; }
          }
        }
      }
    }

    // Boss update & damage
    if(this.boss && this.boss.active && !this.boss.dead) {
      this.boss.update(dt, this.player.x, this.player.y, bounds, this.particles, this.camera, this);
      // Contact damage
      const bd = Math.hypot(this.player.x-this.boss.x, this.player.y-this.boss.y);
      if(bd < 30 && this.boss.entranceTimer<=0) {
        if(this.player.takeDamage(2)) {
          this.sound.play('hurt'); this.camera.shake(6,0.2);
          this.particles.emit(this.player.x,this.player.y,12,['#ff4444','#fff'],100,0.4);
          if(this.player.hp<=0){this.gameOver();return;}
        }
      }
      // Shockwave damage
      if(this.boss.shockwaveActive) {
        const sd = Math.hypot(this.player.x-this.boss.x, this.player.y-this.boss.y);
        if(Math.abs(sd-this.boss.shockwaveRadius)<18) {
          if(this.player.takeDamage(1)) {
            this.sound.play('hurt'); this.camera.shake(5,0.15);
            if(this.player.hp<=0){this.gameOver();return;}
          }
        }
      }
    }

    // Remove dead enemies
    this.enemies = this.enemies.filter(e => !e.dead);

    // Check round completion
    if(!this.bossPhase && this.enemies.length === 0 && !this.roundAnnounceing && this.round <= this.maxRounds) {
      if(this.round > 0) { // Don't trigger on first frame
        setTimeout(() => {
          if(this.state==='playing' && !this.roundAnnounceing && this.enemies.length===0) {
            this.startNextRound();
          }
        }, 1200);
      }
    }

    // Drops
    for(const d of this.drops) {
      d.update(dt);
      if(!d.collected) {
        const dist = Math.hypot(this.player.x-d.x, this.player.y-d.y);
        if(dist < 28) {
          d.collected = true;
          this.taxRevenue += d.amount;
          this.sound.play('coin');
          this.particles.emit(d.x,d.y,6,['#ffd700','#ffec4d','#fff'],50,0.3,2);
        }
      }
    }
    this.drops = this.drops.filter(d => !d.collected);

    this.particles.update(dt);
    this.updateHUD();
  }

  // Draw
  draw() {
    const ctx = this.ctx;
    ctx.clearRect(0,0,this.W,this.H);
    if(this.state !== 'playing' && this.state !== 'victory' && this.state !== 'gameover') return;

    ctx.save();
    ctx.translate(this.camera.sx, this.camera.sy);

    // Arena background
    ctx.fillStyle = '#2a5a24';
    ctx.fillRect(0, 0, this.W, this.H);

    // Grass pattern
    for(let y=0; y<this.H; y+=32) {
      for(let x=0; x<this.W; x+=32) {
        const ci = ((x/32*7+y/32*13)%3);
        ctx.fillStyle = ['#2d5a27','#306130','#285022'][ci];
        ctx.fillRect(x, y, 33, 33);
      }
    }

    // Grass details
    for(const g of this.grassDetails) {
      ctx.fillStyle = g.color; ctx.fillRect(g.x, g.y, g.size, g.size);
    }

    // Obstacles (rocks)
    for(const o of this.obstacles) {
      ctx.fillStyle='#5a5a60';
      ctx.beginPath(); ctx.ellipse(o.x,o.y,o.r,o.r*0.7,0,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='#7a7a82';
      ctx.beginPath(); ctx.ellipse(o.x-2,o.y-2,o.r*0.7,o.r*0.5,0,0,Math.PI*2); ctx.fill();
    }

    // Arena border decoration
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, this.W-20, this.H-20);

    // Drops
    for(const d of this.drops) d.draw(ctx);

    // Bullets
    for(const b of this.bullets) b.draw(ctx);

    // Sort entities by Y for depth
    const ents = [];
    for(const e of this.enemies) if(!e.dead) ents.push({y:e.y,draw:()=>e.draw(ctx)});
    if(this.boss && this.boss.active && !this.boss.dead) ents.push({y:this.boss.y,draw:()=>this.boss.draw(ctx)});
    if(this.player) ents.push({y:this.player.y,draw:()=>this.player.draw(ctx)});
    ents.sort((a,b)=>a.y-b.y);
    for(const e of ents) e.draw();

    // Particles
    this.particles.draw(ctx);

    ctx.restore();

    // Draw ammo indicator near player (world space with camera)
    if(this.player && !this.quizActive) {
      ctx.save();
      ctx.translate(this.camera.sx, this.camera.sy);
      ctx.font = 'bold 9px "Press Start 2P"';
      ctx.textAlign = 'center';
      ctx.fillStyle = this.ammo > 0 ? 'rgba(255,215,0,0.7)' : 'rgba(244,63,94,0.8)';
      ctx.fillText(this.ammo > 0 ? `🔫 ${this.ammo}` : '⚠️ RELOAD!', this.player.x, this.player.y + 28);
      ctx.textAlign = 'start';
      ctx.restore();
    }
  }

  victory() {
    this.state = 'victory';
    document.getElementById('gameHUD').classList.add('hidden');
    document.getElementById('bossHPBar').classList.remove('show');
    document.getElementById('victoryScreen').classList.remove('hidden');
    document.getElementById('victoryChar').textContent = {alfan:'Alfan',andra:'Andra',lala:'Lala'}[this.selectedChar];
    document.getElementById('victoryKills').textContent = this.totalKills;
    document.getElementById('victoryRevenue').textContent = `${Math.floor(this.taxRevenue)} Triliun`;
    document.getElementById('victoryTime').textContent = `${Math.floor(this.gameTime)} detik`;
  }

  gameOver() {
    this.state = 'gameover';
    document.getElementById('gameHUD').classList.add('hidden');
    document.getElementById('bossHPBar').classList.remove('show');
    document.getElementById('gameOverScreen').classList.remove('hidden');
  }

  restart() {
    document.getElementById('victoryScreen').classList.add('hidden');
    document.getElementById('gameOverScreen').classList.add('hidden');
    document.getElementById('quizOverlay').classList.remove('show');
    this.quizActive = false;
    this.state = 'select';
    document.getElementById('selectScreen').classList.remove('hidden');
    this.selectedChar = null;
    document.querySelectorAll('.char-card').forEach(c=>c.classList.remove('selected'));
    document.getElementById('startGameBtn').disabled = true;
  }

  // Game Loop
  loop(ts) {
    const dt = Math.min(0.05, (ts - this.lastTime) / 1000);
    this.lastTime = ts;
    this.update(dt);
    this.draw();
    this.input.clear();
    requestAnimationFrame(t => this.loop(t));
  }

  start() {
    this.lastTime = performance.now();
    requestAnimationFrame(t => this.loop(t));
  }
}

// ============================= INIT =============================
let game;
window.addEventListener('DOMContentLoaded', () => {
  game = new Game();
  game.start();

  document.getElementById('titleStartBtn').onclick = () => {
    game.sound.init(); game.sound.play('click');
    document.getElementById('titleScreen').classList.add('hidden');
    document.getElementById('selectScreen').classList.remove('hidden');
  };

  document.getElementById('cardAlfan').onclick = () => game.selectChar('alfan');
  document.getElementById('cardAndra').onclick = () => game.selectChar('andra');
  document.getElementById('cardLala').onclick = () => game.selectChar('lala');
  document.getElementById('startGameBtn').onclick = () => game.startGame();
  document.getElementById('quizContinueBtn').onclick = () => game.closeQuiz();
  document.getElementById('restartBtn1').onclick = () => game.restart();
  document.getElementById('restartBtn2').onclick = () => game.restart();
});
