---
layout: post
title: "Jumlah tes COVID-19 per hari di Indonesia"
categories: [blog]
tags: [coronavirus COVID-19]

---

Sepertinya pemerintah semakin semangat menyongsong “New Normal” dan mulai membuka ekonominya. Telah beredar buku pedoman bagaimana menghadapi “New Normal” [dari BPOM](https://investor.id/lifestyle/bpom-menerbitkan-buku-panduan-lengkap-covid19). Berita bahwa mal akan dibuka santer beredar di mana-mana (tapi katanya [summarecon mal bekasi gak jadi buka](https://metro.tempo.co/read/1346375/ini-agenda-presiden-jokowi-ke-bekasi-siang-ini-bukan-buka-mal) ntahlah akupun bingung). Ekonomi akan kembali bergeliat!

Kalo menurut banyak sumber ([misalnya salah satunya ini](https://www.abc.net.au/indonesian/2020-05-27/who-mengatakan-gelombang-pertama-covid-19-masih-tinggi/12291202)), kunci sukses membuka ekonomi yang berhasil adalah pertumbuhan tes per hari yang banyak, alias, massive testing. Tapi apakah kita udah berhasil bikin massive testing yang cukup?


```python
import pandas as pd
import seaborn as sns; sns.set()
import matplotlib.pyplot as plt
c=pd.read_csv("https://covid.ourworldindata.org/data/owid-covid-data.csv")
c['date']=pd.to_datetime(c['date'])
y=c['new_tests'][c['iso_code']=='IDN']
y1=c['new_tests_smoothed'][c['iso_code']=='IDN']
x=c['date'][c['iso_code']=='IDN']
plt.figure(figsize=(15,5))
#nt=sns.load_dataset("c")
sns.lineplot(x=x, y=y, data=c)
sns.lineplot(x=x, y=y1, data=c)
```
![png](/image/output_1_1.png)


Gambar di atas menunjukkan jumlah “new test” per hari. saya ambil datanya dari [our world in data](https://ourworldindata.org/coronavirus-data). Datanya update harian sesuai dengan laporan pemerintah. di sumbu x saya kasih tanggal, sementara di sumbu y adalah variabel yang namanya “new_tests” kalo di dataset aslinya. Intinya mah ini adalah tes harian CMIIW.

jumlah tes hariannya adalah titik-titik dan garis item, sementara garis biru menunjukkan smoothed new tests, alias yang diperhalus.

Jumlah tes harian Indonesia keliatan banget bolong-bolongnya, dan keliatannya sampai 26 Mei 2020, jumlah tes harian kita masih volatil banget. Naik turunnya agak ga jelas. Beberapa pendapat yang saya lihat di twitter sih bilangnya jumlah tes harian emang sulit diperkirakan karena faktornya nggak cuma jumlah swab yang dilakukan, tapi juga antrian sampel-sampel tersebut di lab. Jadi bisa jadi angka yang muncul itu sebenernya hasil swab kemaren yang baru di-tes hari ini.

Saya nggak terlalu ngikutin sih perdebatan testing COVID-19 hahaha maaf. Dah lama nggak update COVID-19, cuma gara-gara tiba-tiba ada rame-rame pembukaan ekonomi kembali, jadinya penasaran. Selain itu, katanya Bio Farma sudah berhasil bikin PCR test kit sendiri, [bahkan diklaim sanggup bikin 100,000 per hari](https://tirto.id/jokowi-klaim-indonesia-produksi-alat-rapid-tes-pcr-100-ribu-hari-fzhZ) jadinya mestinya tes hariannya meroket dong (tentu saja asumsinya logistik ke lab dan proses di lab-nya lancar dan cukup kapasitas). Tapi keliatannya klaim tersebut belum terwujud di jumlah tes harian ya?

Jadi penasaran apa yang membuat pemerintah merasa percaya diri membuka ekonomi kalau tes hariannya masih aneh gitu. Pastinya alasan ini adalah sesuatu yang saya nggak tau. Bisa jadi PCR test nya baru akan meroket per hari ini, cuma publik belom tau aja hehe.

Oh iya, datanya dari pemerintah pusat, sementara data pemerintah pusat adalah hasil tes mereka plus tes yang dilakukan oleh pemerintah daerah (dan mungkin swasta?). Meskipun kita nggak tau data selain dari pemerintah pusat, setidaknya pemerintah daerah tau data daerahnya sendiri. hehe.

BTW, negara lain juga “new tests”-nya agak aneh. New Zealand dan Malaysia juga volatil sementara Jepang nggak report new tests nya (tapi totalnya ada). Vietnam malah mendadak turun trus ilang di tengah jalan. Jadi mungkin ini sebabnya Pak Jokowi sangat percaya diri he he he he.


```python
import pandas as pd
import seaborn as sns; sns.set()
import matplotlib.pyplot as plt
c=pd.read_csv("https://covid.ourworldindata.org/data/owid-covid-data.csv")
c['date']=pd.to_datetime(c['date'])
plt.figure(figsize=(15,10))
#cn=c.drop(c[(c['iso_code'] != 'IDN')| c[(c['iso_code'] != 'VNM') | c[(c['iso_code'] != 'SGP') | c[(c['iso_code'] != 'AUS') | c[(c['iso_code'] != 'MYS')].index)
cn=c[(c['iso_code'] == 'IDN') | (c['iso_code'] == 'VNM') | (c['iso_code'] == 'MYS') | (c['iso_code'] == 'JPN') | (c['iso_code'] == 'NZL')]
sns.lineplot(x="date", y="new_tests", hue="iso_code", style="iso_code",data=cn)
```

![png](/image/output_3_1.png)



```python

```
