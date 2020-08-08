---
layout: post
title: Mencari hubungan antara anggaran Kementerian dengan growth industri
categories: [blog]
tags: [Economics]
---

Hai semua. Pada postingan kali ini, saya akan melanjutkan postingan saya sebelumnya [tentang Kebijakan Industri](imedkrisna.github.io/evaluasi/) yang mengatakan bahwa untuk memajukan industri manufaktur, Indonesia butuh lebih dari sekedar Kementerian Perindustrian. Jangan-jangan target yang diusung Kementerian Perindustrian agak terlalu makro alias kurang spesifik?

Jika benar terget tersebut terlalu makro, maka program yang dilakukan Kementerian Perindustrian kemungkinan tidak akan memiliki pengaruh yang signifikan terhadap target yang mereka tetapkan sendiri. Ada dua masalah utama dalam mencoba nge-regresi-in masalah ini. Pertama, sasaran Kementerian Perindustrian ada banyak, yaitu 8. Solusinya mudah: saya ambil aja satu. wkwk. MAaf saya pemalas. Jadi saya akan mengambil target **Pertumbuhan Ekonomi Industri Manufaktur Non-Migas**. Data ini tinggal [didownload di BPS](https://bps.go.id/subject/11/produk-domestik-bruto--lapangan-usaha-.html#subjekViewTab3). Silakan cek postingan saya sebelumnya tentang kebijakan industri untuk *relate*.

Masalah kedua, apa variabel yang pas buat mewakili "program dan kegiatan yang dilakukan Kementerian Perindustrian"? Ini lebih ribet sih, soalnya sebuah institusi pemerintah melakukan banyak hal, menerbitkan (dan me-*maintain*) peraturan, memberi subsidi mungkin, dll. Berhubung ribet, maka saya akan pakai 1 indikator yang paling sederhana, yaitu **APBN**. Untungnya Kemenperin adalah salah satu Kementerian yang paling oke transparansinya, jadi [APBN-nya mudah dicari](https://kemenperin.go.id/dipa).

## Data 

Seperti saya sampaikan di atas, sumber data yang saya pakai adalah dari situs Kemenperin dan situs BPS. Saya sudah kompilasi datanya dan jika anda mau replikasi, datanya bisa didonlot di [sini(.csv)](https://1drv.ms/u/s!AjelszXKKcms6T94R-qq7bKPQWKT?e=YEAbCy). Saya *embed* di paling bawah laman ini jika anda pingin browsing-browsing. Time-spannya 2012-2018.

Dari BPS kita bisa dapat 15 jenis industri. Saya cuma pakai 14 aja soalnya yang ke-15 itu industri lain-lain. Kenapa yang lain-lain saya buang? Karena saya nggak tau yang lain-lain ini masuk program Kementerian yang mana.

Dari data APBN Kemenperin, kita bisa dapatkan data yang agak mendetil tentang berapa alokasi anggaran untuk setiap program yang dilakukan oleh Kemenperin. Ada beberapa program yang muncul di situ, seperti program dukungan, penelitian, pembangunan SDM, dll, tapi cuma 3 yang sepertinya menarget langsung ke sektor Industri. 3 Program tersebut adalah industri berbasis agro, industri tekstil, kulit, dll, dan berbasis logam dan teknologi. Dari 3 program itu lalu saya pasangkan ke 14 kelompok industri yang ada di BPS.

Berhubung program lain juga sudah pasti penting, maka saya masukin juga ke regresi.

## Korelasi Pertumbuhan Industri Manufaktur Non-Migas dengan Anggaran Total Kemenperin

Pertama kita bisa ngecek hubungan antara anggaran total Kemenperin dengan growth manufaktur non-migas. Untuk regresi yang ini, saya pakai growth industri manufaktur non migas secara keseluruhan (rata-rata 15 industri) dengan anggaran total Kemenperin (bukan per program). Datanya kalo di-plot adalah seperti ini

![alt](/images/reg.png)

Garis biru (skala sebelah kiri) adalah growth industri, garis oranye (skala sebelah kanan) adalah APBN Kemenperin dalam rupiah. Apakah anda melihat sebuah pola? Negatip? Positip? gak nyambung? Kalo anda pake fungsi `cor.test()`, akan nongol angka $-0.55$. Tapi untuk memastikan, maka saya reg aja. Hasilnya ada di tabel 1. Modelnya gini:

$$
GROWTH_t = \alpha + \beta log(TOTAL APBN KEMENPERIN_t) + \epsilon_t
$$

###### tabel 1 korelasi antara log(TOTAL APBN KEMENPERIN) dengan industrial growth
<table>
  <thead>
  <tr>
    <th>Variabel</th>
    <th>coef.</th>
    <th>S.E.</th>
    <th>t</th>
    <th>Pr(>|t|)</th>
  </tr>
  </thead>
<tbody>
<tr>
  <td>log(total)</td>
  <td>-5.29</td>
  <td>3.43</td>
  <td>-1.54</td>
  <td>0.183</td>
</tr>
</tbody>
</table>

Kalo lihat dari tabel 1 kayaknya korelasinya kurang kuat ya? Meskipun angkanya menunjukkan negatif. Angka tersebut (kolom coef.) bilang bahwa jika anggaran Kemenperin **meningkat 100%**, maka industrial growth akan **turun 5,29** *percentage points*. Gede juga ya. turun 5.29 *percentage points* dari angka 2018 berarti minus wkkwwk. Sebaliknya, kalo anggaran Kemenperin di-0-kan, alias bubar, maka growth naik sebesar 5.29 *percentage points*. wkwk. Tolong dicek jangan-jangan saya salah menerjemahkan? Tapi tenang, t-value nya kecil jadi artinya korelasinya kurang kuat. Hasil regresinya **tidak signifikan**. Wkwkwkkw fiuh.

Kalo saya regresi dengan $X=(total APBN Kemenperin)$ dan $Y=industrial growth$, maka gambarnya kayak gini:

![alt](/images/logreg.png)

Btw saya run di [r](https://www.r-project.org/). Tolong dicek sekalian jangan-jangan kodenya salah. Berikut kodenya
```
library(car)
##ngeload data
panel<-read.csv("C:/regperin/regperin.csv")
all<-read.csv("C:/regperin/regtotal.csv")

## regresi
lsols<-lm(GROWTH~log(TOTAL),data=all)
summary(lsols)

## plot
plot(log(all$TOTAL),all$GROWTH,pch=19,xlab = "LOG APBN KEMENPERIN",ylab = "GROWTH NON OIL MANUFACTURING")
abline(lm(all$GROWTH~log(all$TOTAL)),lwd=3,col="red")
```
## Fixed Effect berdasarkan industri

Kali ini kita regresiin berdasarkan masing-masing industri. Data BPS membagi industri jadi sekitar 14 jenis yang dibina oleh 3 Direktorat Jenderal Kemenperin (masing-masing Direktorat Jenderal melaksanakan 1 program). Berhubung ada banyak Direktorat Jenderal di Kemenperin, jadinya saya masukkan APBN dari program yang membina 14 industri tersebut, dan APBN total Kemenperin. Hasilnya ada di tabel 2. modelnye:

$$
GROWTH_{it} = \alpha + \beta log(program_{it}) + \gamma log(total_{t}) + \eta_i + \mu_{it} \label{2}
$$

Ada 3 jenis angka `log(program)` untuk setiap tahunnya yang dipetakan ke 14 sektor industri $i$. Pemetaannya silakan lihat di excel yang paling bawah. Pemetaan saya lakukan berdasarkan jenis program di Kemenperin sesuai data di APBN. Belum tentu pemetaan saya valid wkwk.

###### tabel 2 korelasi berdasarkan industri
<table>
  <col>
  <colgroup span="3"></colgroup>
  <colgroup span="3"></colgroup>
  <thead>
  <tr>
    <th>Variabel</th>
    <th colspan="4" scope="colgroup">Pooled ($\eta_i=0 \: \forall \: i$)</th>
    <th colspan="4" scope="colgroup">Fixed effect</th>
  </tr>
  <tr>
    <th></th>
    <th scope="col">coef.</th>
    <th scope="col">S.E.</th>
    <th scope="col">t</th>
    <th scope="col">Pr(>|t|)</th>
    <th scope="col">coef.</th>
    <th scope="col">S.E.</th>
    <th scope="col">t</th>
    <th scope="col">Pr(>|t|)</th>
    </tr>
</thead>
<tbody>
<tr>
  <td>Log(program)</td>
  <td>-0.55</td>
  <td>0.33</td>
  <td>-1.64</td>
  <td>0.10</td>
  <td>-0.53</td>
  <td>1.15</td>
  <td>-0.46</td>
  <td>0.64</td>
</tr>
<tr>
  <td>Log(total)</td>
  <td>-1.14</td>
  <td>5.08</td>
  <td>-0.23</td>
  <td>0.82</td>
  <td>-1.15</td>
  <td>4.95</td>
  <td>-0.23</td>
  <td>0.82</td>
</tr>
</tbody>
</table>

2 model yang saya pakai, yaitu pooled dan fixed effect. Untuk hasil yang *pooling panel data regression*, hasilnya negatif dan signifikan di level $\alpha=10%$. Wkwkwkw. Magnitude-nya jauh lebih kecil daripada regresi total. Jika program tersebut **dihapus** (anggarannya dipotong 100%), maka industri yang mereka bina akan **tumbuh** sebesar 0,55 *percentage points*. wkwkwk. Hanya saja ketika dikontrol individu (dikasih *fixed effect*), **signifikansinya hilang**. Fiuh. Artinya, dampaknya sangat berbeda-beda tergantung industrinya. Ada sesuatu yang lebih ngefek, sesuatu yang spesifik di masing-masing industri, tapi bukan anggaran Kemenperin.

kodenya:
```
### pooled
lols<-lm(growth~log(APBN)+log(TOTAL),data=panel)

### fixed effect
library(plm)
lfixed<-plm(growth~log(APBN)+log(TOTAL),data=panel, index=c("id","year"),method="within")
```
Bener ga sih tuh kodenya? wkwkwk. Anyway, lumayan seru dan gak terlalu lama ngerjainnya. Lumayan buat anda yang pingin ngutik2 regresi seru deh. Mungkin anda bisa coba pake data Kementerian lain wkwkkw.


## Kenapa ga bisa langsung diintrepretasikan?

BTW modelnya ini banyak caveatnya yaaa. Ga bisa langsung diinterpretasiin, apalagi buat lo lo pade yang anti big government pro neo-lib ckckckckck. Apakah korelasi negatif berarti Kalo Kementerian dibubarkan maka industri akan maju? Apakah tidak signifikan artinya ngasi duit ke Kementerian gak ada gunanya?

Jika anda bermain-main dengan model untuk memberikan rekomendasi kebijakan, maka anda harus sangat sangat sangat **sangat sangat hati-hati**. Sebelum nyalahin pihak lain (pemerintah kah? SJW kah? buruh kah? kapitalisme?), pastikan anda (dan model anda) sudah benar! Dan tentu saja model saya ini kudu dikritik dulu sebelum saya mengkritik yang laen.

Regresi ini sangat sederhana sekali. Masalahnya dah pasti macem-macem. Kalo segampang ini mah gue dah nyalonin diri jadi mentri kali. Bagi tukang statistik, masalah dari model sederhana ini langsung keliatan. Pertama adalah *endogeneity*(APBN kayaknya gak bakal eksogen sih), dan yang kedua masalah error term yang kemungkinan gak normal. Kalo dilanjutin sih bakal ketemu masalahnya di mana aja, tapi setidaknya ada dua hal yang bisa saya sampaikan.

Pertama, sepertinya eksperimen ini tidak berhasil membuktikan bahwa hipotesis saya salah. Hipotesis apa? Bahwa mungkin industrial growth adalah indikator yang tidak tepat untuk disasar oleh Kemenperin. Tentu Kemenperin punya indikator yang lebih spesifik di Renstra, tapi studi tentang link indikator spesifik tersebut ke sasaran makro nya harusnya ada dan terbukti kesinambungannya. 

Kedua, apa yang saya kerjakan di blog ini bisa jadi semacam bab awal dari tugas akhir studi ekonomi. Studi dampak program ke indikator kinerja sepertinya belum banyak di Kemenperin, dan sangat potensial untuk dijadikan topik tugas akhir studi ekonomi. Kemenperin memiliki program kerjasama master dengan beberapa universitas baik dalam dan luar negeri, sebagian di bidang ekonomi. Kalo jadi *master thesis* sih jelas metode regresi yang digunakan akan bisa lebih *sophisticated* dengan variabel yang lebih banyak dan tepat.

Untuk saat ini sih postingan ini bisa buat belajar regresi sederhana atau buat tebak-tebakan wkwkwk. Berikut ini salah satu jawaban dari sohib saya si Risetio tentang regresi ini:
<blockquote class="twitter-tweet"><p lang="in" dir="ltr">Kalau liat dari model ekonometriknya, residualnya mungkin justru yg punya pengaruh terbesar ke pdb industri non migas, bukan anggaran kemenperin. Pertanyaannya, variabel apakah itu yg seharusnya bukan di residual?</p>&mdash; Risetioz (@risetioz) <a href="https://twitter.com/risetioz/status/1235521681889693698?ref_src=twsrc%5Etfw">March 5, 2020</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Bagaimana pendapat anda? Drop in di komen yak!

<iframe src="https://onedrive.live.com/embed?cid=ACC929CA35B3A537&resid=ACC929CA35B3A537%2113504&authkey=AMLP8uST9gRkPWY&em=2" width="402" height="346" frameborder="0" scrolling="no"></iframe>
