---
layout: post
title: Amiti and Konings 2007
author: amiti2007
category: [blog]
tags: [Review]
---
Sebenarnya udah lama sih mau ngeblogin review papernya {% assign author = site.data.article[page.author] %}
<a rel="author"
  href="{{ author.link }}"
  title="{{ author.name }}">
    {{ author.name }} {{ author.year}}
</a>. Paper ini banyak yang nge-cite, dan ketika nongol emang isu-nya hot banget: soal bagaimana penurunan tarif bisa membantu Indonesia ngikut Global Value Chain (GVC), dan makin produktif.

Artikel ini dimulai dengan melakukan rangkuman perdebatan mengenai peran liberalisasi perdagangan bagi industri. Sebagian besar artikel yang mereka sitasi menunjukkan bahwa liberalisasi perdagangan berdampak positif bagi industri dalam negeri suatu negara. Mereka menekankan pentingnya memeriksa peran liberalisasi pada impor input, yang ketika itu masih ada *gap*. Artikel dilanjutkan dengan dinamika bea masuk impor di Indonesia, serta keterlibatan Indonesia di World Ttrade Organization (WTO)  pada 1995.

Bagian paling menarik di artikel ini tentu saja metodologinya. Mereka melakukan 2 tahap estimasi ekonometri dan satu tahap deterministik perhitungan produktivitas (TFP). Dengan mengasumsikan fungsi produksi *Cobb-Douglass*, mereka mengestimasi parameter *factor returns* terhadap output.

$$ y_{it} = \beta_0 + \sum_{Z={k,l,m}} \beta_Z Z_{it} + e_{it} \label{1} $$

Setelah dapat *estimated parameters*, lalu menghitung log TFP dengan 

$$ tfp_{it}^k = y_{it} - \sum_{Z={k,l,m}} \hat{\beta}_Z Z_{it} \label{2} $$

where k,l,m are capital, labor and materials respectively. Setelah mereka mendapatkan nilai TFP untuk setiap perusahaan, tfp tersebut kemudian diregresikan terhadap tarif input dan tarif output. Simpel.

Yang seru, persamaan \ref{1} diestimasi dengan memperhitungkan bahwa di dalam $e_{it}$ ada *time-varying productivity shock*, dan ini akan berpengaruh pada keputusan perusahaan membeli input. Masalah ini diakomodir oleh metode *Olley-Pakes*, yang mereka bahas di appendixnya. Di samping itu, karena mereka peduli dengan material impor, mereka memodifikasi metode *Olley-Pakes* sehingga keputusan impor juga diperhitungkan dalam proses optimisasi perusahaan.Menarik bagaimana menghubungkan perdagangan dan proses optimisasi input material impor ke dalam TFP tanpa melalui *approach* standar *gravity equation*

Paper ini sangat menunjukkan kerja keras mereka dalam mengolah data. Agregasi dan disagregasi tarif ke dalam data Statistik Indonesia yang mereka gunakan bukan kerjaan mudah. Banyak bagian yang harus mereka kerjakan secara manual. Bayangin aja mapping HS9 digit ke ISIC, lalu membangun input output table sendiri dari SI. Belum lagi mereka harus menghitung tarif untuk input dan output.

Satu lagi, paper yang masuk AER sih khas banget punya robustness check yang banyak. Mereka melakukan berbagai robustness check, seperti melihat sensitivitas penggunaan metrik lain untuk TFP, endogenitas *trade policy shock*, alternatif metrik untuk tarif, dan Non-Tariff Measure.

Akhir kata, ini adalah artikel yang menarik. Khusus untuk metode estimasi TFP-nya sih kalo emang penasaran masih harus ngeliat paper lain yang mereka sitasi. Tapi memang estimasi non-parametrik gitu selalu menarik sih, jadi nggak melulu pasrah pada asumsi yang diperlukan oleh ekonometri. Paper yang sangat menarik dibaca, terutama jika anda tertarik dengan isu perdagangan Indonesia. Paper ini juga pengantar yang sangat baik untuk artikelnya Lili Yan Ing di buku World Trade Evolution.

