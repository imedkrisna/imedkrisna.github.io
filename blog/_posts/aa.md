---
title: "Jumlah tes COVID-19 per hari di Indonesia"
tags : [COVID-19]
categories : [blog]
output:
  html_document: 
    keep_md: true
  pdf_document: default
---

Sepertinya pemerintah semakin semangat menyongsong "New Normal" dan mulai membuka ekonominya. Telah beredar buku pedoman bagaimana menghadapi "New Normal" [dari BPOM](https://investor.id/lifestyle/bpom-menerbitkan-buku-panduan-lengkap-covid19). Berita bahwa mal akan dibuka santer beredar di mana-mana(tapi katanya [summarecon mal bekasi gak jadi buka](https://metro.tempo.co/read/1346375/ini-agenda-presiden-jokowi-ke-bekasi-siang-ini-bukan-buka-mal). Ntahlah akupun bingung). Ekonomi akan kembali bergeliat!

Kalo menurut banyak sumber [salah satunya ini](https://www.forbes.com/sites/steveforbes/2020/04/08/to-get-our-economy-moving-focus-on-testing-for-coronavirus/#5e69feb73f2c), kunci sukses membuka ekonomi yang berhasil adalah pertumbuhan tes per hari yang banyak, alias, *massive testing*. Tapi apakah kita udah berhasil bikin massive testing yang cukup?


```r
library(ggplot2)

indocov<-subset(read.csv(url("https://covid.ourworldindata.org/data/owid-covid-data.csv")),iso_code=="IDN")

p <- ggplot(indocov, aes(x=as.Date(date), y=new_tests)) +
  geom_line() + 
  geom_point() +
  geom_smooth() +
  labs(title="Jumlah Tes Harian Indonesia",x="tanggal",y="tes harian") +
  xlab("")

p
```

![](aa_files/figure-html/grafik-1.png)<!-- -->

Gambar di atas menunjukkan jumlah "new test" per hari. saya ambil datanya dari [our world in data](https://ourworldindata.org/coronavirus-data). Datanya update harian sesuai dengan laporan pemerintah. di sumbu x saya kasih tanggal, sementara di sumbu y adalah variabel yang namanya "new_tests" kalo di dataset aslinya. Intinya mah ini adalah tes harian CMIIW.

jumlah tes hariannya adalah titik-titik dan garis item, sementara garis biru menunjukkan *smoothed new tests*, alias yang diperhalus.

Jumlah tes harian Indonesia keliatan banget bolong-bolongnya, dan keliatannya sampai 26 Mei 2020, jumlah tes harian kita masih volatil banget. Naik turunnya agak ga jelas. Beberapa pendapat yang saya lihat di twitter sih bilangnya jumlah tes harian emang sulit diperkirakan karena faktornya nggak cuma jumlah *swab* yang dilakukan, tapi juga antrian sampel-sampel tersebut di lab. Jadi bisa jadi angka yang muncul itu sebenernya hasil swab kemaren yang baru di-tes hari ini.

Saya nggak terlalu ngikutin sih perdebatan testing COVID-19 hahaha maaf. Dah lama nggak update COVID-19, cuma gara-gara tiba-tiba ada rame-rame pembukaan ekonomi kembali, jadinya penasaran. Selain itu, katanya Bio Farma sudah berhasil bikin PCR test kit sendiri, bahkan [diklaim sanggup bikin 100,000 per hari](https://tirto.id/jokowi-klaim-indonesia-produksi-alat-rapid-tes-pcr-100-ribu-hari-fzhZ) jadinya mestinya tes hariannya meroket dong (tentu saja asumsinya logistik ke lab dan proses di lab-nya lancar dan cukup kapasitas). Tapi keliatannya klaim tersebut belum terwujud di jumlah tes harian ya?

Jadi penasaran apa yang membuat pemerintah merasa percaya diri membuka ekonomi kalau tes hariannya masih aneh gitu. Pastinya alasan ini adalah sesuatu yang saya nggak tau. Bisa jadi PCR test nya baru akan meroket per hari ini, cuma publik belom tau aja hehe.

Oh iya, datanya dari pemerintah pusat, sementara data pemerintah pusat adalah hasil tes mereka plus tes yang dilakukan oleh pemerintah daerah (dan mungkin swasta?). Meskipun kita nggak tau data selain dari pemerintah pusat, setidaknya pemerintah daerah tau data daerahnya sendiri. hehe.

BTW, negara lain juga "new tests"-nya agak aneh. Australia dan Malaysia juga volatil sementara Jepang nggak report new tests nya (tapi totalnya ada). Vietnam malah mendadak turun trus ilang di tengah jalan. Jadi mungkin ini sebabnya Pak Jokowi sangat percaya diri he he he he.


```r
library(ggplot2)

indocov<-subset(read.csv(url("https://covid.ourworldindata.org/data/owid-covid-data.csv")),iso_code=="IDN" | iso_code=="AUS" | iso_code=="VNM" | iso_code=="MYS" | iso_code=="JPN")

p <- ggplot(indocov, aes(x=as.Date(date), y=new_tests, color=iso_code)) +
  geom_line() + 
  geom_point() +
  geom_smooth() +
  labs(title="Jumlah Tes Harian Indonesia",x="tanggal",y="tes harian") +
  xlab("")

p
```

![](aa_files/figure-html/unnamed-chunk-1-1.png)<!-- -->

