---
layout: post
title: Henningsen and Henningsen 2011
author: henningsen2011
category: [blog]
tags: [Review]
---

Paper ini saya baca karena kebutuhan untuk estimasi fungsi produksi Constant Elasticity of Substitution (CES). Umumnya ketika melakukan estimasi Total Factor Productivity (TFP), ekonom lebih suka menggunakan fungsi Cobb-Douglass yang gampang dibikin linear, dan parameternya lebih berguna untuk diterjemahkan ke dunia nyata. Sayangnya, kalau mau menggunakan model terstruktur seperti model Computable General Equilibrium (CGE), model estimasi pake Cobb-Douglass punya kelemahan berupa parameter substitusinya akan selalu 1. Hari gini mana ada model CGE yang pake substitusi=1?

Sayangnya estimasi CES lumayan susah. Linearisasi bisa sih pake [taylor series](https://en.wikipedia.org/wiki/Taylor_series) dan ekstensinya, tapi kalo mau dipake buat model ekonomi, restriksi yang harus diberikan agak banyak. Alternatifnya ya pake estimasi non-linear yang ada banyak macam algoritmanya. Plus, saya butuh instuksi *step-by-step* untuk membantu melakukannya melalui komputer.

{% assign author = site.data.article[page.author] %}
<a rel="author"
  href="{{ author.link }}"
  title="{{ author.name }}">
    {{ author.name }} {{ author.year}}
</a> adalah paper yang sempurna buat saya. Mereka membuat paket di R yang namanya [micEconCES](https://cran.r-project.org/web/packages/micEconCES/index.html). Paket ini bisa melakukan estimasi CES dan mendokumentasikan berbagai macam algoritma yang bisa kita gunakan di paket tersebut. Mereka juga membahas beberapa perkembangan estimasi CES mulai dari dicetuskannya CES oleh [Arrow](https://en.wikipedia.org/wiki/Kenneth_Arrow) dan kawan-kawan, sampai perkembangan terkini. Komplit lah pokoknya.

Sedikit refreshing tentang CES, secara umum, fungsi CES bentuknya adalah seperti ini:

$$
y = \gamma \left(\sum_{i=1}^n \delta_i x_i^{\rho}\right)^{-\frac{\upsilon}{\rho}} \label{1}
$$

di mana x adalah faktor produksi (kapita, pekerja, material, dll). Idealnya, kita menginginkan parameter substitusi yang berbeda-beda untuk setiap dua faktor produksi yang disandingkan. <a rel="author"
  href="{{ author.link }}"
  title="{{ author.name }}">
    {{ author.name }} {{ author.year}}
</a> menggunakan *approach* yang dimulai oleh Sato (1967) yaitu dengan menggunakan *nested CES*. Misalnya ada 3 faktor produksi, daripada semua faktor dimasukin ke model \ref{1} dengan 3 3 nya punya satu parameter substitusi $$\rho$$, sama Sato dibikin kayak gini:

$$
y = \gamma \left[\: \delta \: (\delta_1 x_1^{-\rho_1} + (1-\delta_1) x_2^{-\rho_1})^{\rho/\rho_1} + (1-\delta) \delta_2 x_3^{-\rho/\rho_2}\right]^{-\frac{\upsilon}{\rho}} \label{2}
$$

Dengan metode *nesting CES* ini, kita jadi bisa punya banyak parameter substitusi, diantaranya substitusi antara $x_1$ dengan $x_2$, yaitu si ${\rho/\rho_1}$, dan parameter antara *nested $x_1$ dan $x_2$* dengan $x_3$. Tergantung kebutuhan anda sebagai *researcher*, model ini bisa diatur. Jika anda merasa cukup dengan $\rho$ saja untuk semua faktor produksi, maka bisa langsung pake model \ref{1}. Ada kalanya kita merasa bahwa dari 3 faktor itu, ada 2 yang punya substitusi berbeda dengan yang ke-3. Misalnya, Jika faktor anda adalah *kapital*, *skilled labor* dan *unskilled labor*, maka anda bisa menggunakan metode \ref{2} di mana $x_1=skilled labor, x_2=unskilled labor$, dan $x_3 = kapital$.



