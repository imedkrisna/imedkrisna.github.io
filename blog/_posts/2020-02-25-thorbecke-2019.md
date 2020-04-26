---
layout: post
title: Thorbecke 2019
author: thorbecke2019
category: [blog]
tags: [Review]
---
Untuk postingan review paper pertama, saya akan coba pake papernya {% assign author = site.data.article[page.author] %}
<a rel="author"
  href="{{ author.link }}"
  title="{{ author.name }}">
    {{ author.name }} {{ author.year}}
</a>
yang pastinya menarik. jadi paper beliau yang berjudul {{ author.title}} ini dipublikasikan di {{author.journal}} baru-baru ini. Tentunya akan menarik melihat bagaimana raksasa manufaktur seperti Jepang tergeser oleh Korea Selatan maupun Taiwan.

Artikel ini memiliki premis awal yang menarik. Jepang adalah raksasa dalam hal ekspor komponen elektronik dan suku cadang. Persaingan komponen dan suku cadang lumayan ketat, sehingga Jepang harus saingan harga dengan negara lain (Taiwan dan Korea, *mostly*. Masalah datang ketika *Global Financial Crisis*(GFC) terjadi. Jepang mendadak jadi *safe haven*. Kapital masuk banyak, Yen terapresiasi, harga jual pun jadi mahal relatif terhadap biaya dalam yen. Hal ini mengakibatkan industri komponen elektronik dan suku cadang menjadi kalah bersaing dengan negara lain, sampai saat ini.

Artikel ini menggunakan metode *Vector Auto Regressive*(VAR). Bentuk estimasinya kira-kira sebagai berikut:

$$ \Delta p_{jt}^x = \beta_0 + \sum_{i=0}^p \beta_{1i} \Delta e_{jt-i} + \sum_{i=0}^p \beta{2i} \Delta p_{t-i}^f + \sum_{i=0}^p \beta_{3i} \Delta c_{jt-i} + \sum_{i=0}^q \beta_{4i} \Delta y_{t-i}^f + u_t $$

<!-- \delta p_{jt}^{x} = \beta_{0} + \frac{\displaystyle\sum_{i=0}^{p} \beta_{1i} \delta e_{jt-i} + \frac{\displaystyle\sum_{i=0}^{p} \beta_{2i} \delta p_{t-i}^{f} + \frac{\displaystyle\sum_{i=0}^{p} \beta_{3i} \delta c_{jt-i} + \frac{\displaystyle\sum_{i=0}^{q} \beta_{4i} \delta y_{t-i}^{f} + u_{t} \label{eq:1} -->
Di mana $p^x$ menunjukkan harga ekspor dari Jepang ke negara tujuan, $e$ adalah nilai tukar, $p^f$ adalah harga di pasar internasional, $c$ menunjukkan *production cost*, dan $y$ menunjukkan indeks harga produksi di negara OECD. Semua data di artikel ini didapatkan dari Bank of Japan dan OECD. Modelnya sendiri cukup sederhana dan mudah diduplikasi untuk konteks negara lain. Tentu asalkan ada datanya seperti yang disediakan Bank of Japan. Kunci dari model ini adalah perubahan mendadak nilai tukar dianggap eksogen.

Begitu baca artikel ini, hal pertama yang saya *notice* adalah bagaimana premis awal yang dibangun oleh {{author.name}} begitu meyakinkan. Beliau memulai dengan cerita dan hasil temuan yang sederhana namun *impactful*. Grafik yang digunakan (seperti indeks harga produsen dan indeks harga ekspor) sangat mendukung proses penceritaan di awal bagian artikel ini. Model yang digunakan juga tidak terlalu sulit, tentu dengan asumsi nilai tukar yang eksogen. Memang kalo punya natural eksperimen kayak krisis gini sih lumayan menguntungkan bagi risercer

gak deng. krisis itu buruk. Gak ada yang mau krisis. moga-moga gak terjadi lagi.

Eniwe, paper ini sangat singkat. Cuma 9 halaman. Hasilnya juga sesuai dugaan, dan dengan asumsi variabel penting yang eksogen, maka tidak perlu ribet-ribet cari metode yang dapat menangani bias variabel endogen. Artikel yang lumayan gampang dicerna bagi orang yang baru awal-awal belajar VAR.
