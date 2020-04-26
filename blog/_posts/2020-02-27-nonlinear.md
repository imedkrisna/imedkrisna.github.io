---
layout: post
title: Belajar estimasi non-linear Constant Elasticity of Substitution (CES) pakai ADMB
categories: [blog]
tags: [Economics]
---

baru-baru ini saya menemukan software gratisan bernama ADMB. Software ini fungsinya untuk mengestimasi regresi non-linear. Saya perlu estimasi regresi non-linear untuk dapet parameter elastisitas yang bukan 1.

Contoh yang dipakai oleh ADMB untuk Robust Linear Regression adalah model (von Bertalanffy) growth curve yaitu:

$$
s(a)=L_{\infty} \left(1-exp\left(-K(a-t_0)\right)\right) \label{1}
$$

Di mana parameter yang mau diestimasi oleh model di atas adalah $$L_{\infty}$$, $$K$$ dan $$t_0$$. Katakanlah data yang diobservasi di lapangan adalah $$O_i$$ dan $$a_i$$, dan kita mau memprediksi $$O_i$$ pakai $$s(a_i)$$, maka ADMB harus meminimisasi jarak antara $$O_i$$ dan $$s(a_i)$$:

$$
\min_{L_{\infty}, K, t_0} \sum_{i} (O_i-s(a_i))^{2} \label{2}
$$

Yang perlu saya lakukan adalah mengubah model \ref{1} ke fungsi Constant Elasticity of Substitution:

$$
Y = \gamma \left(\sum_{i=1}^n \delta_i X_i^{\rho}\right)^{-\frac{\upsilon}{\rho}} \label{3}
$$

tapi tentu saja versi yang sudah di-natural log sehingga menjadi:

$$
\ln Y = \ln \gamma - \left(\frac{\upsilon}{\rho}\right) \ln \left(\sum_{i=1}^n \delta_i X_i^{\rho}\right) \label{4}
$$

jadi saya harus meng-alter persamaan \ref{1} di contohnya ADMB ke persamaan yang saya inginkan yaitu \ref{4}. di \ref{4}, observablenya adalah $$\ln Y$$ dan $$x_i$$. Selain itu, sisanya yang hurup yunani itu adalah parameter. Saya harus pakai tebakan dulu nih kayaknya. Tebakan paling safe sih salah satunya adalah memakai $$\rho=1$$ biar jadi Cobb-Douglass wkwkwk. Dah gitu sepertinya saya harus me-restriksi $$\sum_i \delta_i = 1$$. 

Berhubung hari ini dah capek. Besok tak lanjut lagi wkwkkw.
