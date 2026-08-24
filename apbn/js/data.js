/**
 * FinPintar - Indonesian Financial Educational Dataset
 * Contains structured learning modules, quiz banks, scenarios, glossary terms, and health check questions.
 */

window.FinData = {
  // 1. Modul Pembelajaran Interaktif
  tracks: [
    {
      id: "fondasi",
      title: "Fondasi Keuangan & Cashflow",
      desc: "Kuasai pengelolaan arus kas harian, prinsip budgeting 50/30/20, dana darurat, dan antisipasi inflasi.",
      icon: "fa-solid fa-wallet",
      iconClass: "icon-track-1",
      badge: "Sertifikasi Fondasi",
      xpReward: 150,
      lessons: [
        {
          id: "f1",
          title: "1. Piramida Keuangan & Cashflow Positif",
          content: `Piramida perencanaan keuangan mengajarkan kita untuk membangun fondasi yang kokoh sebelum melompat ke investasi berisiko tinggi. Fondasi paling dasar adalah <b>Cashflow Positif</b> (Pemasukan > Pengeluaran) dan <b>Manajemen Risiko</b> (Dana Darurat & Asuransi Dasar).`,
          infobox: "💡 <b>Aturan Emas:</b> Jangan pernah mulai berinvestasi jika arus kas bulanan Anda masih defisit atau Anda belum memiliki proteksi darurat.",
          takeaway: "Pastikan rasio tabungan minimal 10-20% dari total penghasilan bersih setiap bulan."
        },
        {
          id: "f2",
          title: "2. Metode Budgeting 50/30/20",
          content: `Formula budgeting populer yang digagas oleh Senator Elizabeth Warren membagi penghasilan bersih menjadi 3 porsi:
          <ul style="margin: 0.5rem 0 0.5rem 1.5rem;">
            <li><b>50% Kebutuhan Pokok (Needs):</b> Sewa tempat tinggal, makanan pokok, utilitas, cicilan utang produktif.</li>
            <li><b>30% Keinginan (Wants):</b> Hiburan, nongkrong, hobi, langganan streaming.</li>
            <li><b>20% Tabungan & Investasi (Savings):</b> Dana darurat, investasi masa depan, dana pensiun.</li>
          </ul>`,
          infobox: "🎯 <b>Fleksibilitas:</b> Jika gaji Anda masih UMR di kota besar, Anda bisa menyesuaikan ke rasio 60/20/20 atau 70/20/10 terlebih dahulu.",
          takeaway: "Kendalikan porsi 'Wants' agar tidak melebihi 30% dari total pendapatan bulanan Anda."
        },
        {
          id: "f3",
          title: "3. Dana Darurat: Bantalan Hidup",
          content: `Dana darurat adalah sejumlah uang tunai yang disimpan terpisah dan hanya boleh dicairkan saat kondisi darurat tak terduga (misal: PHK, sakit mendadak, genteng bocor parah).
          <br><br><b>Berapa idealnya?</b>
          <ul style="margin: 0.5rem 0 0.5rem 1.5rem;">
            <li>Lajang / Single: <b>3 - 6 kali</b> pengeluaran bulanan.</li>
            <li>Menikah tanpa anak: <b>6 - 9 kali</b> pengeluaran bulanan.</li>
            <li>Menikah dengan anak: <b>9 - 12 kali</b> pengeluaran bulanan.</li>
          </ul>`,
          infobox: "🏦 <b>Tempat Simpan:</b> Instrumen likuid, rendah risiko, dan bebas fluktuasi tajam seperti Reksa Dana Pasar Uang (RDPU), Deposito Digital, atau Tabungan Bank Khusus.",
          takeaway: "Dana darurat bukan untuk mencari keuntungan tinggi (cuan), melainkan untuk keamanan psikologis dan likuiditas instan."
        }
      ]
    },
    {
      id: "utang",
      title: "Manajemen Utang & Waspada Kejahatan",
      desc: "Pahami perbedaan utang produktif vs konsumtif, bahaya bunga pinjol/paylater, judi online, dan cara cek 2L OJK.",
      icon: "fa-solid fa-shield-halved",
      iconClass: "icon-track-2",
      badge: "Benteng Finansial",
      xpReward: 200,
      lessons: [
        {
          id: "u1",
          title: "1. Utang Produktif vs Utang Konsumtif",
          content: `<b>Utang Produktif</b> adalah pinjaman yang digunakan untuk aset atau modal usaha yang menghasilkan nilai tambah/pendapatan di masa depan (misal: KPR rumah pertama, modal ekspansi bisnis yang valid).<br><br>
          <b>Utang Konsumtif</b> adalah pinjaman untuk membeli barang yang nilainya terdepresiasi atau habis pakai semata-mata demi gaya hidup (misal: mencicil smartphone flagship terbaru atau liburan dengan paylater tanpa ada dana cadangan).`,
          infobox: "⚠️ <b>Batas Aman DSR (Debt Service Ratio):</b> Total seluruh cicilan bulanan maksimal <b>30%</b> dari total pendapatan bersih bulanan.",
          takeaway: "Jangan berutang untuk barang yang tidak bisa Anda beli dengan uang tunai saat itu juga jika barang tersebut bukan kebutuhan pokok."
        },
        {
          id: "u2",
          title: "2. Jebakan Pinjol Ilegal & Bunga Majemuk Negatif",
          content: `Pinjaman online ilegal sering kali menerapkan bunga harian yang sangat tinggi, potongan biaya admin fantastis di awal (hingga 40%), tenor sangat singkat, dan akses kontak telepon pribadi ilegal untuk teror.<br><br>
          OJK menetapkan batas bunga pinjol legal maksimal 0.3% per hari (turun bertahap ke 0.1%), sedangkan pinjol ilegal bisa membebankan bunga liar hingga ratusan persen per tahun.`,
          infobox: "🚫 <b>Waspada Judi Online (Judol):</b> Judol dirancang dengan algoritma manipulatif agar pemain pasti rugi dalam jangka panjang. Hindari segala bentuk spekulasi ilegal!",
          takeaway: "Selalu cek legalitas platform pinjaman di situs resmi www.ojk.go.id atau WhatsApp resmi OJK 081-157-157-157."
        },
        {
          id: "u3",
          title: "3. Rumus 2L (Legal & Logis) Anti Penipuan",
          content: `Setiap kali Anda ditawari peluang investasi atau pinjaman, selalu terapkan prinsip 2L dari Otoritas Jasa Keuangan (OJK):
          <br><br>
          <b>1. Legal:</b> Apakah perusahaan memiliki izin resmi dari regulator di Indonesia (OJK, Bappebti, atau Bank Indonesia)?<br>
          <b>2. Logis:</b> Apakah tingkat keuntungan (return) masuk akal? Tidak ada investasi berisiko rendah yang bisa memberikan return pasti 10-30% per bulan tanpa risiko rugi.`,
          infobox: "🔍 <b>Ciri Skema Ponzi:</b> Bonus didapat bukan dari penjualan produk riil, melainkan dari uang pendaftaran anggota baru (member-get-member).",
          takeaway: "High return ALWAYS comes with high risk. Jika ada yang menjanjikan kaya mendadak tanpa risiko, itu 100% penipuan."
        }
      ]
    },
    {
      id: "investasi",
      title: "Investasi Cerdas untuk Pemula",
      desc: "Pelajari instrumen Reksa Dana, Saham, SBN/Obligasi Negara, Emas, keajaiban Compound Interest, dan Diversifikasi.",
      icon: "fa-solid fa-chart-line",
      iconClass: "icon-track-3",
      badge: "Investor Cerdas",
      xpReward: 250,
      lessons: [
        {
          id: "i1",
          title: "1. Mengenal Instrumen Investasi Populer",
          content: `Berbagai instrumen memiliki karakteristik risiko & imbal hasil berbeda:
          <ul style="margin: 0.5rem 0 0.5rem 1.5rem;">
            <li><b>Reksa Dana Pasar Uang (RDPU):</b> Risiko sangat rendah, likuid, return ~4-6% p.a., cocok untuk dana darurat / target < 1 tahun.</li>
            <li><b>Surat Berharga Negara (SBN / ORI / Sukuk):</b> Dijamin 100% oleh negara melalui undang-undang, kupon ~6-7% p.a.</li>
            <li><b>Emas Batangan:</b> Pelindung nilai aset terhadap inflasi (safe haven), ideal untuk jangka panjang > 5 tahun.</li>
            <li><b>Saham & Reksa Dana Saham:</b> Kepemilikan porsi perusahaan publik, potensi capital gain & dividen tinggi, namun memiliki fluktuasi jangka pendek yang tinggi.</li>
          </ul>`,
          infobox: "📈 <b>Compound Interest (Bunga Berbunga):</b> Keajaiban bunga berbunga bekerja paling dahsyat seiring dengan berjalannya waktu (time in the market beats timing the market).",
          takeaway: "Sesuaikan pilihan instrumen dengan tujuan keuangan dan horizon waktu Anda, bukan sekadar ikut-ikutan tren (FOMO)."
        },
        {
          id: "i2",
          title: "2. Menentukan Profil Risiko Anda",
          content: `Profil risiko menentukan seberapa siap mental dan finansial Anda menerima naik-turun nilai portofolio:
          <ul style="margin: 0.5rem 0 0.5rem 1.5rem;">
            <li><b>Konservatif:</b> Mengutamakan keutuhan modal pokok, tidak nyaman dengan penurunan nilai (RDPU, Deposito).</li>
            <li><b>Moderat:</b> Bersedia menerima fluktuasi sedang demi hasil di atas inflasi (Reksa Dana Pendapatan Tetap, SBN, Emas).</li>
            <li><b>Agresif:</b> Siap menerima fluktuasi tajam demi pertumbuhan modal maksimal jangka panjang (Saham, Reksa Dana Saham).</li>
          </ul>`,
          infobox: "⚖️ <b>Strategi DCA (Dollar Cost Averaging):</b> Berinvestasi rutin dengan nominal tetap setiap bulan (misal tanggal gajian) tanpa memusingkan harga sedang naik atau turun.",
          takeaway: "DCA terbukti secara historis mengurangi stres emosional dan menurunkan harga beli rata-rata dalam jangka panjang."
        }
      ]
    },
    {
      id: "masa-depan",
      title: "Perencanaan Masa Depan & Pensiun (FIRE)",
      desc: "Menyiapkan dana pensiun mandiri, membedakan asuransi murni vs unit link, dan konsep Financial Freedom.",
      icon: "fa-solid fa-compass",
      iconClass: "icon-track-4",
      badge: "Arsitek Masa Depan",
      xpReward: 300,
      lessons: [
        {
          id: "m1",
          title: "1. Asuransi: Membeli Ketenangan Pikiran",
          content: `Asuransi bertujuan memindahkan risiko finansial bencana yang tidak terduga ke perusahaan asuransi, bukan untuk sarana mencari kekayaan.<br><br>
          <b>Prioritas Asuransi Utama:</b>
          <ul style="margin: 0.5rem 0 0.5rem 1.5rem;">
            <li><b>BPJS Kesehatan:</b> Perlindungan dasar wajib bagi seluruh warga negara.</li>
            <li><b>Asuransi Kesehatan Swasta:</b> Tambahan untuk kenyamanan rawat inap & kamar privat jika budget mencukupi.</li>
            <li><b>Asuransi Jiwa Murni (Term Life):</b> Wajib dimiliki oleh orang yang berstatus sebagai pencari nafkah utama bagi keluarga.</li>
          </ul>`,
          infobox: "🛡️ <b>Tips Cerdas:</b> Pisahkan antara kebutuhan proteksi murni dengan investasi demi efisiensi biaya premi maksimal.",
          takeaway: "Jangan beli asuransi jiwa jika Anda belum memiliki tanggungan (orang yang bergantung pada nafkah Anda)."
        },
        {
          id: "m2",
          title: "2. Konsep FIRE (Financial Independence, Retire Early)",
          content: `FIRE adalah gerakan kemandirian finansial di mana pendapatan pasif dari hasil investasi telah melampaui seluruh biaya hidup tahunan Anda.<br><br>
          <b>Aturan 4% (Trinity Study):</b> Dana pensiun ideal Anda adalah <b>25 kali pengeluaran tahunan</b> Anda. Misal pengeluaran tahunan Anda Rp 120 Juta (Rp 10 Juta/bulan), maka target dana kebebasan finansial Anda adalah Rp 3 Miliar.`,
          infobox: "⏳ <b>Kekuatan Memulai Lebih Awal:</b> Memulai investasi di usia 20-an butuh modal bulanan jauh lebih kecil dibanding baru mulai di usia 40-an untuk mencapai target nominal yang sama.",
          takeaway: "Pensiun dini bukan berarti berhenti beraktivitas, melainkan memiliki kebebasan penuh atas waktu dan pilihan hidup Anda."
        }
      ]
    }
  ],

  // 2. Bank Soal Kuis (3 Level Kesulitan + Time Attack)
  quizQuestions: {
    pemula: [
      {
        id: "p1",
        q: "Berapa porsi ideal untuk 'Kebutuhan Pokok' (Needs) menurut aturan budgeting 50/30/20?",
        options: ["20%", "30%", "50%", "70%"],
        correct: 2,
        explanation: "Aturan 50/30/20 mengalokasikan 50% untuk Kebutuhan Pokok, 30% untuk Keinginan, dan 20% untuk Tabungan & Investasi."
      },
      {
        id: "p2",
        q: "Manakah di bawah ini yang merupakan tempat paling tepat untuk menyimpan Dana Darurat?",
        options: [
          "Saham gorengan yang sedang viral",
          "Reksa Dana Pasar Uang atau Tabungan Khusus Likuid",
          "Kripto koin baru dengan janji cuan 100x",
          "Dibelikan barang koleksi sneakers langka"
        ],
        correct: 1,
        explanation: "Dana darurat membutuhkan instrumen yang likuid (mudah dicairkan), berisiko sangat rendah, dan nilainya stabil."
      },
      {
        id: "p3",
        q: "Berapa jumlah dana darurat minimum yang direkomendasikan bagi seorang lajang (belum menikah)?",
        options: ["1 bulan pengeluaran", "3 - 6 kali pengeluaran bulanan", "20 kali gaji pokok", "Cukup Rp 500.000 saja"],
        correct: 1,
        explanation: "Bagi yang masih lajang, bantalan 3 hingga 6 bulan pengeluaran sudah cukup aman untuk menghadapi risiko darurat seperti peralihan kerja."
      },
      {
        id: "p4",
        q: "Apa yang dimaksud dengan Inflasi dalam ekonomi sehari-hari?",
        options: [
          "Penurunan harga barang secara serentak",
          "Proses kenaikan harga barang dan jasa secara umum yang menurunkan daya beli uang",
          "Bunga pinjaman bank yang tidak dibayar",
          "Jumlah uang yang disimpan di brankas rumah"
        ],
        correct: 1,
        explanation: "Inflasi menyebabkan daya beli uang menurun seiring berjalannya waktu, sehingga menabung di bawah kasur akan membuat nilai uang tergerus."
      },
      {
        id: "p5",
        q: "Berikut ini adalah contoh dari Utang Produktif, KECUALI:",
        options: [
          "KPR untuk rumah tinggal pertama",
          "Pinjaman modal kerja untuk membeli mesin jahit konveksi",
          "Menggesek Paylater untuk membeli tiket konser musik demi FOMO",
          "Kredit usaha rakyat untuk modal toko kelontong"
        ],
        correct: 2,
        explanation: "Membeli tiket konser dengan paylater adalah utang konsumtif karena tidak menghasilkan arus kas masuk atau nilai aset jangka panjang."
      }
    ],

    menengah: [
      {
        id: "m1",
        q: "Berapa batas maksimal rasio total cicilan utang bulanan terhadap penghasilan bersih (Debt Service Ratio) yang sehat?",
        options: ["10%", "30%", "60%", "80%"],
        correct: 1,
        explanation: "Para perencana keuangan menyarankan total seluruh cicilan utang tidak melebihi 30% dari penghasilan bulanan agar cashflow tetap sehat."
      },
      {
        id: "m2",
        q: "Apa kepanjangan dan arti prinsip '2L' dari OJK dalam mengevaluasi tawaran investasi?",
        options: [
          "Laba & Lancar",
          "Legal & Logis",
          "Langsung & Lunas",
          "Loyal & Luwes"
        ],
        correct: 1,
        explanation: "Prinsip 2L adalah Legal (memiliki izin resmi dari regulator yang berwenang) dan Logis (imbal hasil yang dijanjikan masuk akal)."
      },
      {
        id: "m3",
        q: "Apa keuntungan utama dari strategi investasi berkala Dollar Cost Averaging (DCA)?",
        options: [
          "Pasti mendapatkan harga saham di titik paling terendah sepanjang masa",
          "Menghilangkan bias emosi dan meratakan harga pembelian aset dari waktu ke waktu",
          "Bebas dari segala bentuk pajak dan biaya transaksi selamanya",
          "Menjamin keuntungan 50% setiap bulan"
        ],
        correct: 1,
        explanation: "DCA membantu investor disiplin membeli secara teratur tanpa harus menebak-nebak puncak atau dasar harga pasar (timing the market)."
      },
      {
        id: "m4",
        q: "Manakah instrumen investasi yang dijamin 100% pengembalian pokok dan kuponnya oleh Pemerintah Republik Indonesia?",
        options: [
          "Saham BUMN sektor konstruksi",
          "Surat Berharga Negara (SBN) ritel seperti ORI atau Sukuk Tabungan",
          "Kripto Bitcoin",
          "Peer-to-Peer Lending produktif"
        ],
        correct: 1,
        explanation: "SBN (Surat Berharga Negara) dijamin secara penuh oleh negara melalui undang-undang sehingga bebas dari risiko gagal bayar."
      },
      {
        id: "m5",
        q: "Apa ciri utama dari skema penipuan piramida / Skema Ponzi?",
        options: [
          "Keuntungan dibagikan dari hasil laba penjualan produk riil ke konsumen luar",
          "Keuntungan anggota lama dibayar dari uang setoran anggota baru yang baru bergabung",
          "Terdaftar resmi di Otoritas Jasa Keuangan (OJK)",
          "Mengharuskan audit laporan keuangan publik oleh akuntan terdaftar"
        ],
        correct: 1,
        explanation: "Skema Ponzi tidak memiliki bisnis riil yang menghasilkan keuntungan; roda keuangan berputar semata-mata dari uang rekrutmen member baru."
      }
    ],

    mahir: [
      {
        id: "h1",
        q: "Berdasarkan Aturan 4% (The 4% Rule / Trinity Study), berapa total dana pensiun yang harus dikumpulkan untuk mencapai Kebebasan Finansial (FIRE)?",
        options: [
          "10 kali pengeluaran bulanan",
          "25 kali pengeluaran tahunan",
          "50 kali gaji kotor terakhir",
          "100 kali nilai tabungan darurat"
        ],
        correct: 1,
        explanation: "Aturan 4% menyatakan bahwa jika Anda memiliki portofolio sebesar 25x pengeluaran tahunan, Anda dapat menarik 4% per tahun untuk biaya hidup tanpa menghabiskan modal pokok."
      },
      {
        id: "h2",
        q: "Apa perbedaan paling mendasar antara Asuransi Jiwa Murni (Term Life) dengan Asuransi Jiwa Unit Link?",
        options: [
          "Term Life hanya memberikan proteksi murni tanpa investasi, sedangkan Unit Link menggabungkan premi asuransi dengan instrumen investasi",
          "Term Life mengenakan biaya admin lebih mahal dari Unit Link",
          "Unit Link dijamin pasti untung besar oleh pemerintah",
          "Term Life tidak bisa diklaim jika tertanggung meninggal dunia"
        ],
        correct: 0,
        explanation: "Term Life fokus 100% pada proteksi santunan jiwa dengan premi yang jauh lebih murah, sedangkan Unit Link memecah premi untuk asuransi dan porsi unit investasi."
      },
      {
        id: "h3",
        q: "Apa yang dimaksud dengan konsep 'Diversifikasi Portofolio' dan peribahasa 'Don't put all your eggs in one basket'?",
        options: [
          "Menyimpan semua uang di satu saham terbaik agar keuntungan maksimal",
          "Menyebarkan modal investasi ke beberapa instrumen/aset berbeda untuk meminimalkan risiko kerugian total",
          "Menarik semua uang dari perbankan dan menyimpannya dalam bentuk tunai",
          "Hanya membeli emas batangan seumur hidup"
        ],
        correct: 1,
        explanation: "Diversifikasi menyebarkan risiko antar kelas aset (saham, obligasi, pasar uang, emas) sehingga jika satu sektor anjlok, portofolio keseluruhan tetap terjaga."
      },
      {
        id: "h4",
        q: "Jika Anda berinvestasi modal awal Rp 10 Juta dengan imbal hasil majemuk (compound interest) 10% per tahun, berapakah perkiraan waktu yang dibutuhkan agar modal tersebut berlipat ganda menjadi Rp 20 Juta (Gunakan Aturan 72)?",
        options: [
          "Sekitar 3.6 tahun",
          "Sekitar 7.2 tahun (72 / 10)",
          "Sekitar 12 tahun",
          "Sekitar 20 tahun"
        ],
        correct: 1,
        explanation: "Rumus Aturan 72: Bagi angka 72 dengan estimasi return tahunan (72 / 10 = 7.2 tahun) untuk memperkirakan waktu penggandaan aset."
      },
      {
        id: "h5",
        q: "Apa fungsi rekening Dana Nasabah (RDN) saat Anda berinvestasi di pasar modal Indonesia?",
        options: [
          "Rekening bank atas nama investor sendiri yang digunakan khusus untuk menampung dana transaksi jual-beli saham & reksa dana",
          "Rekening bersama milik broker tempat semua uang investor dicampur",
          "Rekening pinjaman berbunga harian",
          "Rekening khusus untuk membayar denda tilang lalu lintas"
        ],
        correct: 0,
        explanation: "RDN dibuat atas nama pribadi investor di bank kustodian resmi untuk memastikan keamanan dana nasabah terpisah dari aset perusahaan sekuritas."
      }
    ],

    // Soal Kilat Time-Attack
    timeAttack: [
      {
        q: "Apakah Paylater termasuk jenis utang konsumtif jika dipakai belanja baju diskon?",
        options: ["Ya, Benar", "Tidak, itu Tabungan"],
        correct: 0
      },
      {
        q: "Bunga pinjaman 30% per bulan dari agen tanpa izin OJK termasuk:",
        options: ["Investasi Menguntungkan", "Pinjol / Rentenir Ilegal"],
        correct: 1
      },
      {
        q: "Apakah emas batangan cocok untuk kebutuhan dana jangka pendek (di bawah 6 bulan)?",
        options: ["Sangat Cocok", "Kurang Cocok (karena ada spread beli-jual)"],
        correct: 1
      },
      {
        q: "Siapakah regulator resmi yang mengawasi industri perbankan dan pasar modal di Indonesia?",
        options: ["Otoritas Jasa Keuangan (OJK)", "Kominfo"],
        correct: 0
      },
      {
        q: "Apakah BPJS Kesehatan adalah bentuk jaminan kesehatan sosial wajib di Indonesia?",
        options: ["Ya", "Bukan"],
        correct: 0
      },
      {
        q: "SBN (Surat Berharga Negara) diterbitkan oleh:",
        options: ["Pemerintah RI / Kemenkeu", "Platform Judi Online"],
        correct: 0
      },
      {
        q: "Menabung uang Rp 10 Juta di bawah bantal selama 20 tahun akan tergerus oleh:",
        options: ["Inflasi", "Capital Gain"],
        correct: 0
      },
      {
        q: "Tawaran robot trading yang menjanjikan 'Pasti Cuan 1% Per Hari Tanpa Risiko Rugi' adalah:",
        options: ["Inovasi Canggih", "Indikasi Kuat Penipuan / Scam"],
        correct: 1
      }
    ]
  },

  // 3. Skenario Keputusan Interaktif (Interactive Financial Case Studies)
  scenarios: [
    {
      id: "sc1",
      title: "Kasus 1: Rezeki Nomplok THR Rp 10.000.000",
      description: "Anda baru saja menerima Tunjangan Hari Raya (THR) bersih sebesar Rp 10 Juta. Saat ini Anda memiliki cicilan paylater Rp 3 Juta (bunga berjalan), dana darurat masih kosong, dan teman mengajak liburan ke Bali.",
      choices: [
        {
          text: "Pakai Rp 3 Juta lunasi paylater, Rp 5 Juta isi dana darurat di RDPU, Rp 2 Juta untuk silaturahmi & kebutuhan hari raya.",
          feedback: "Pilihan Luar Biasa! Utang lunas terbebas dari bunga, fondasi dana darurat langsung terbentuk, dan Anda tetap bisa merayakan hari raya dengan bijak.",
          statsChange: { tabungan: 5000000, utang: -3000000, skorKetenangan: 95 }
        },
        {
          text: "Gunakan Rp 8 Juta langsung untuk liburan ke Bali bareng teman-teman, sisanya bayar minimum payment paylater.",
          feedback: "Bahaya Finansial! Membayar minimum payment paylater membuat bunga majemuk terus berbunga. Saat darurat datang, Anda akan terpaksa gali lubang tutup lubang.",
          statsChange: { tabungan: 0, utang: 1500000, skorKetenangan: 30 }
        },
        {
          text: "Taruh seluruh Rp 10 Juta ke saham gorengan yang lagi ramai di media sosial biar langsung naik jadi Rp 20 Juta.",
          feedback: "Spekulasi Berbahaya! Tanpa dana darurat dan riset fundamental, Anda berisiko kehilangan modal THR saat saham anjlok drastis.",
          statsChange: { tabungan: -4000000, utang: 3000000, skorKetenangan: 20 }
        }
      ]
    },
    {
      id: "sc2",
      title: "Kasus 2: Godaan Upgrade Gadget Terbaru Seharga Rp 18 Juta",
      description: "Smartphone Anda yang berumur 2 tahun masih berfungsi normal, namun seri baru baru saja rilis. Gaji bulanan Anda Rp 6 Juta.",
      choices: [
        {
          text: "Ambil cicilan paylater 12 bulan dengan cicilan Rp 1.8 Juta/bulan (30% dari seluruh gaji) demi gengsi nongkrong.",
          feedback: "Jeratan Konsumtif! Menghabiskan 30% gaji murni untuk gadget konsumtif akan mencekik ruang bernapas finansial Anda selama setahun ke depan.",
          statsChange: { tabungan: 0, utang: 21600000, skorKetenangan: 25 }
        },
        {
          text: "Tetap pakai ponsel lama, lalu buat pos tabungan sinking fund Rp 500.000/bulan di reksa dana sampai uangnya terkumpul tunai.",
          feedback: "Mental Juara! Anda menunda kepuasan sesaat (delayed gratification) dan hanya membeli saat cashflow benar-benar siap.",
          statsChange: { tabungan: 6000000, utang: 0, skorKetenangan: 98 }
        },
        {
          text: "Jual motor harian untuk membeli smartphone tersebut, nanti berangkat kerja naik ojek online.",
          feedback: "Keputusan Kontra-produktif! Menjual aset transportasi produktif untuk barang konsumtif akan menambah beban ongkos transportasi bulanan.",
          statsChange: { tabungan: -1000000, utang: 0, skorKetenangan: 40 }
        }
      ]
    }
  ],

  // 4. Glosarium Finansial Lengkap
  glossary: [
    { term: "OJK (Otoritas Jasa Keuangan)", cat: "Regulasi", def: "Lembaga independen negara yang bertugas mengatur, mengawasi, memeriksa, dan menyidik sektor jasa keuangan perbankan, pasar modal, dan IKNB di Indonesia." },
    { term: "BI-Rate (Suku Bunga Acuan)", cat: "Moneter", def: "Suku bunga kebijakan yang mencerminkan sikap moneter Bank Indonesia untuk mengendalikan inflasi dan menjaga stabilitas nilai tukar Rupiah." },
    { term: "RDN (Rekening Dana Nasabah)", cat: "Investasi", def: "Rekening perbankan khusus atas nama investor yang terpisah dari sekuritas untuk menampung dana jual-beli saham atau reksa dana." },
    { term: "IHSG (Indeks Harga Saham Gabungan)", cat: "Pasar Modal", def: "Indeks acuan yang mengukur pergerakan rata-rata seluruh harga saham yang tercatat di Bursa Efek Indonesia (BEI)." },
    { term: "SBN (Surat Berharga Negara)", cat: "Investasi", def: "Surat utang yang diterbitkan oleh pemerintah Republik Indonesia (seperti ORI, SBR, Sukuk Ritel) yang dijamin 100% pokok dan kuponnya oleh UU." },
    { term: "Compound Interest (Bunga Majemuk)", cat: "Fondasi", def: "Bunga yang dihitung dari modal pokok ditambah akumulasi bunga dari periode sebelumnya ('bunga yang menghasilkan bunga')." },
    { term: "Dana Darurat (Emergency Fund)", cat: "Proteksi", def: "Uang tunai likuid yang disiapkan khusus untuk menghadapi kejadian tak terduga seperti PHK, krisis kesehatan, atau perbaikan mendesak." },
    { term: "Diversifikasi", cat: "Investasi", def: "Strategi menyebarkan modal ke berbagai instrumen investasi berbeda untuk mengurangi risiko kerugian menyeluruh." },
    { term: "Capital Gain & Dividen", cat: "Pasar Modal", def: "Capital Gain adalah keuntungan dari selisih harga jual di atas harga beli aset. Dividen adalah pembagian laba bersih perusahaan kepada pemegang saham." },
    { term: "DSR (Debt Service Ratio)", cat: "Utang", def: "Rasio perbandingan antara total seluruh cicilan utang bulanan terhadap total penghasilan bersih bulanan (disarankan maks 30%)." },
    { term: "FIRE (Financial Independence, Retire Early)", cat: "Perencanaan", def: "Gerakan kebebasan finansial di mana hasil pasif dari investasi telah mencukupi seluruh biaya hidup tanpa harus bekerja untuk uang." },
    { term: "Skema Ponzi", cat: "Kejahatan", def: "Modus penipuan investasi di mana return investor lama dibayar menggunakan uang yang disetor oleh investor baru, bukan dari laba bisnis nyata." }
  ],

  // 5. Kuis Cek Kesehatan Finansial Kilat (Financial Health Checkup)
  healthQuestions: [
    {
      q: "1. Apakah Anda rutin mencatat atau mengetahui ke mana larinya uang Anda setiap bulan?",
      options: [
        { text: "Ya, sangat detail & ada pos anggaran jelas", score: 25 },
        { text: "Kira-kira saja di kepala", score: 10 },
        { text: "Tidak sama sekali, sering kaget saldo habis", score: 0 }
      ]
    },
    {
      q: "2. Berapa bulan pengeluaran yang saat ini tersedia di rekening Dana Darurat Anda?",
      options: [
        { text: "Minimal 3 sampai 6 bulan atau lebih", score: 25 },
        { text: "Ada sekitar 1 - 2 bulan", score: 12 },
        { text: "Nol atau bahkan minus (ada utang konsumtif)", score: 0 }
      ]
    },
    {
      q: "3. Berapa persen dari gaji bulanan Anda yang tersedot untuk membayar cicilan utang?",
      options: [
        { text: "0% (Bebas utang) atau di bawah 20%", score: 25 },
        { text: "Sekitar 20% - 35%", score: 15 },
        { text: "Lebih dari 40% (Mulai sesak bernapas)", score: 0 }
      ]
    },
    {
      q: "4. Apakah Anda menyisihkan uang untuk investasi secara rutin setiap tanggal gajian?",
      options: [
        { text: "Rutin otomatis minimal 10-20% setiap bulan", score: 25 },
        { text: "Kadang-kadang kalau ada sisa di akhir bulan", score: 10 },
        { text: "Belum pernah berinvestasi sama sekali", score: 0 }
      ]
    }
  ],

  // 6. Checklist 2L Scam Detector
  scamChecklist: [
    { id: "c1", text: "Menjanjikan keuntungan (return) PASTI tinggi (misal: 10% - 50% per bulan) tanpa risiko rugi." },
    { id: "c2", text: "Mengharuskan Anda merekrut anggota baru (member-get-member) untuk mendapatkan bonus atau komisi utama." },
    { id: "c3", text: "Tidak memiliki izin resmi dari regulator di Indonesia (OJK, Bappebti, atau Bank Indonesia)." },
    { id: "c4", text: "Proses penarikan dana (withdrawal) dipersulit atau meminta biaya transfer tambahan di muka saat mau mencairkan modal." },
    { id: "c5", text: "Tokoh pemilik atau badan hukum perusahaan tidak jelas alamat dan laporan keuangannya." },
    { id: "c6", text: "Menggunakan klaim flexing kemewahan berlebihan dan testimoni palsu tanpa penjelasan model bisnis riil." }
  ]
};
