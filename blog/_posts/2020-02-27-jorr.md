---
layout: post
title: "Application of Infrastructure Development Problem (Long Chu Style) to Indonesia’s Toll Road"
categories: [blog]
tags: [Economics, English]
---

This article is originally appears [here on my medium blog](https://medium.com/@imedkrisna/application-of-infrastructure-development-problem-long-chu-style-to-indonesias-toll-road-7ccdc68ee817). I remake it in this blog because here I can use $$\LaTeX$$!! yay!! I don't change anything so if you've red this in my medium domain then skip this. 

I’ve been ranting a lot about stuff in this blog. This time, let me share what I have learned from my study at ANU. Particularly the [master’s microeconomics course, IDEC8064][1]. Long Chu is the teacher’s name. There is this one problem called “Infrastructure Development Problem”, which is extremely relevant to lots of developing countries’ problem of public provision of services. This time I will present Indonesia’s current case: Jakarta Outer Ring Road (JORR) increased tariff.
Most Jakartans must know this, that JORR have changed their tariff to a one-off payment of 15,000 IDR (Indonesian currency) every entry (for car. Other heavier vehicles face scarier tariff). This leads to increased cost for people who travel a short distance, but reduced cost for long distance travelers. This leads to a question “how much we should charge for toll service”, especially after taking Long Chu’s Final Exam a couple of days ago. If you also took long’s final exam, think of this as the answer to Question 3… xD

So I try to do some google, and found this good paper by [Hermawan et al (2013)][2] talks about this very issue. They use Stated Preference (SP) as the means to find elasticity on Demand. Basically, do a survey and asks the respondents “Would you still use the toll road if the price of using it increases by x%?”. Their results of SP is not very straight forward, so i will just pick one of them which says that the elasticity of demand is -0.72. Seems reasonable enough.

Next, we need to have capacity. Unlike water provision in Long’s example, capacity of toll roads can be a big debate. Hermawan et al (2013) uses Highway Capacity Manual (2010) to tackle this situation. According to the manual (table 1 in Hermawan et al), we can calculate a (debatable) capacity of a toll road with something called Volume to Capacity Ratio 

$$ VCR = \frac{Q}{C} \label{1}$$ 

This ratio says if $$\frac{Q}{C}=1$$, then it meets its capacity. at $$\frac{Q}{C}=1$$, we will see 2000 vehicles per hour, with the speed of less than equal to 30 mph (around 48 kph). This measure makes me laugh. JORR is definitely well over its capacity.
By the way, the standard of having a good provision of toll road is at $$ VCR=0.6–0.8 $$, which have the speed at around 55 mph (88 kph) with 1500-ish vehicles per hour. I laughed even harder.

Anyway, i tried to find the exact capacity of JORR only to no avail. So I had to find some method to calculate the capacity. I got this other paper by [Li & Laurence (2015)][3] which discuss about estimating capacity. They managed summarize a paper which says that breakdown capacity occurs when the flow of vehicle is 2289 vehicles per hour (they stated that this number maybe very stochastic so we need to be careful, but i have no other lead so). Judging from their definition of “breakdown”, JORR may be worse than breakdown, but let’s use this number as maximum capacity.

We then can calculate the demand for toll road:

$$ 2289=Ad*P^{-0.72} $$

Let’s calculate just the average tariff for car at around 10,000 IDR. If we plug that to P, we will get Ad= 1,736,384.07 (too many numbers, right? This is why i hate working with IDR). So we can get the full demand function of JORR:

$$ Q(P)=1,736,384.07*P^{-0.72} $$

Next we find the Dead Weight Loss (DWL) of having such tariff. To do this, we need to find the willingness to pay to get the normal, non-breakdown level of capacity. Let’s use $$ VCR=0.77 $$, then we will get $$ Q=1550 $$. Now estimate $$P$$ with $$ Q=1550 $$,

$$ 1550=1,736,384.07*P^{-0.72} $$

$$ P= 17,185.35329 $$ -> let’s say the proper Toll price to get $$ VCR=0.77 $$, one ideal ratio, is 17,200 IDR. This is the willingness to pay value for JORR user to get an ideal flow of Toll Road.

We can calculate the DWL using integration, but since i’m lazy, we can just try to approximate it using triangle area.

$$ DWL=(0.5)*(2289–1550)*(17,200–10,000) $$
$$ DWL= 2,660,400 IDR \frac{Vehicle}{Hour} $$

That’s… a lot of IDR

We need to be (very very) careful with my parameterisation, though. The parameters are very roughly determined. For a proper analysis to be conducted, one needs to calibrate a better current price. It’s also better if we have exact flow of JORR, instead of by guessing it. Moreover, we need to come up with what level of flow of vehicle which leads to “optimum service” for a toll road. My use of 1550 is hardly justifiable.

We can, however, try to guess some stuff.

Firstly, we can guess the size of DWL. I use the price 10,000. Of course this is wrong, but we can say that the DWL increases as the current price decreases. If the current price is less than I declare, then the DWL can actually be bigger. Also, goes down DWL as we put higher “flow of vehicle” leads to “optimum service”. This doesn’t have to follow my choice of 1550 vehicle/hr.
Secondly, We can also say that to close the DWL up, we need to crank up the price. According to this exercise, we need to crank up the price to up to 17,200 to close DWL to 0. Currently, Indonesian body of toll road service increase it to 15,000, which is not enough according to my calculation. However, this calculation is based on SP, which may not show the true value of the elasticity of demand. This increased price can be a very good opportunity to study the true value of elasticity of demand of the JORR.
Lastly, increase capacity would be nice policy prescription. With this big DWL, I guess any kind of capacity increase would be worth it. But man, we’re talkin Jakarta here. Where else should we build the damn toll road? But well, we are running of option here. According to infrastructure development problem, it’s either pricing up the cost of using the road, or increase the capacity. Both seems problematic. LoL.

References:
- IDEC8064 Masters Microeconomics by Long Chu.
- Hermawan, R, Frazila, RB, Awang, A & Jihanny J 2013, ‘Hubungan antara variasi tarif tol dengan pendapatan dan tingkat pelayanan’, Jurnal Teknik Sipil, vol. 20, №1.
- Li, Z & Laurence, R 2015, ‘An analysis of four methodologies for estimating highway capacity from ITS data’, Civil Engineering Faculty Publication, Vol. 70.

[1]: https://programsandcourses.anu.edu.au/course/IDEC8064 "IDEC8064 Masters Microeconomics by Long Chu."
[2]: http://journals.itb.ac.id/index.php/jts/article/view/2841 "Hermawan, R, Frazila, RB, Awang, A & Jihanny J 2013, ‘Hubungan antara variasi tarif tol dengan pendapatan dan tingkat pelayanan’, Jurnal Teknik Sipil, vol. 20, №1."
[3]: https://www.researchgate.net/publication/277905943_An_analysis_of_four_methodologies_for_estimating_highway_capacity_from_ITS_data "Li, Z & Laurence, R 2015, ‘An analysis of four methodologies for estimating highway capacity from ITS data’, Civil Engineering Faculty Publication, Vol. 70."
