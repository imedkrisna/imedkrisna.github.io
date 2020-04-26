---
layout: post
title: Belajar Membuat Blog Sendiri dengan Jekyll dan Github
categories: [blog]
tags: [Macem-macem]
---

Saat lagi nggak ada kerjaan, saya suka bingung mau ngapain. Kadang mikir waktu luang mau dipakai apa yang sedikit lebih produktif. Akhirnya nyoba-nyoba bikin static blog, ternyata seru juga. Jadilah saya eksperimen dengan bikin blog baru. Blog lama saya dijalankan di medium, bisa dicek di [sini](https://medium.com/@imedkrisna) kalo tertarik.

Nah jadi setelah browsing-browsing, ketemu deh cara bikin blok statik yang dihosting melalui github. Jadi awal-awal kudu belajar dikit dulu apa itu github. Ternyata github ini adalah versi online dari git. Git sendiri bisa diinstall di komputer. Nah saya sendiri udah install git di komputer tapi kok bingung ya kok mirip kayak command prompt biasa wkkw. Maaf saya bukan programmer jadi agak gak ngerti.

Nah jadilah blog ini. Jadinya blog ini berbentuk statik, pake suatu sistem bernama Jekyll yang support markdown. Saya bukan web developer ya jadi nggak begitu mengerti. Waktu awal-awal nyoba [Jekyll](https://jekyllrb.com/), gw sempet bingung karena ternyata dia instal-instal gitu kan pake git (yg mana gw gak bisa bedain git dengan command prompt biasa). Usut punya usut ternyata kalo ngikutin si websitenya Jekyll mentah-mentah, blog kita cuma nongol di local host doang. kagak bisa *on-line* wkwk. Kode kita harus dideploy ke hosting lain dan itu kayaknya ribet. Barulah setelah pake github jadi bisa dihosting di github. Setelah tau bisa hosting di github jadi tau bahwa kita nggak perlu install Jekyll di komputer sendiri<sup>[1](#myfootnote1)</sup>.

Setelah tau bahwa kita kudu ngehost blog kita, yasudah saya cari yang gratisan kan. Jekyll menyarankan hosting di github page. Jadilah sayakudu ngutik-utik github. Yang dilakukan pertama kali adalah bikin akun github. Gampang kok kayak bikin akun onlen-onlen pada umumnya. Operasionalisasinya yang agak susah. Lumayan ribet kalo bagi awam koding seperti saya. Tapi tenang ada tutorialnya. Ikutin aja pelan-pelan dan sering-sering dipake lama-lama bisa. Tutorial cara bikin Jekyll pake github juga ada, jadi tinggal diikutin. Kalo ngikutin tutorial tersebut, kita langsung dapet 1-page blog dari Jekyll. Gampang lagi ngutik-utik layoutnya bisa pake theme doang ditaro di from-matter.

Sayangnya 1-page blog gitu kurang memuaskan untuk saya. Setelah brosing-brosing, ternyata kalo mau bikin yang agak aneh-aneh, kudu belajar html. Hadeh pusing. Untungnya saya ketemu template punyanya mas [Barry Clark](https://www.smashingmagazine.com/2014/08/build-blog-jekyll-github-pages/). Enak banget ini template tinggal kita fork doang abis itu edit-edit dikit buat pasang foto dan kasih judul dan lain-lain. Template mas Barry juga ngasi tau cara bikin komen di blog kita pake [disqus](https://disqus.com/), sesuatu yang gak ada di tutorial Jekyll-nya github.

Kalo sekedar bikin blog aja, template mas Barry sudah lebih dari cukup. Tapi belum cukup kalo mau ngedit lebih jauh daripada pasang foto dan mulai ngeblog. nah ini ada sumber bagus lain yang saya dapat lewat gugel dari mas-mas bernama [Jonathan McGlone](http://jmcglone.com/guides/github-pages/). Berkat tulisan mas tersebut, saya jadi bisa ngedit index.html untuk bikin *page* baru untuk blog saya, sehingga bisa punya tab baru buat akses halaman berbeda untuk kategori post berbeda. Seru banget wkwk.

Bikin blog seru juga tapi sekaligus ribet. Awalnya nemu cara bikin *static website* pake Jekyll, eh ternyata cuma lokalan. Belajar cari hostingan, dapet github, eh ribet lagi bikinnya. Dah gitu ternyata kalo mau aneh-aneh harus belajar html wkwkw. Belakangan nemu juga aktivitas baru: belajar pake json. Lha gimana ini Harusnya bikin blog baru cuma buat selingan eh malah jadi kebanyakan makan waktu wkwkwkwk. Saya sendiri bukan pro atau apa. Ini semua belajar dari gugling aja. Mohon maaf kalo ada yang salah di post ini. Kalo ada komen/saran atau mau tanya-tanya silakan komen di bawah, atau kontak saya di laman [about}(https://imedimud.github.io/about/). Terima kasih!

<sup><a name="myfootnote1">1</a>: Meski demikian, install Jekyll lumayan seru sih. Template cepat yang dibikin si Jekyll lumayan bagus wkwk lumayan buat dicuri kodenya sih.</sup>
