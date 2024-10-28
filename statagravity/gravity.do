clear all
set more off
cd C:\github\imedkrisna.github.io\statagravity

// Data preparation

/// pick countries as in Silva & Tenreyro (2006)
use Countries_V202211,clear
keep if country=="Albania" | country == "Denmark" | country == "Kenya" | country == "Romania" | country == "Algeria" | country == "Djibouti" | country == "Kiribati" | country == "Russian Federation" | country == "Angola" | country == "Dominican Rep." | country == "Korea, Rep." | country == "Rwanda" | country == "Argentina" | country == "Ecuador" | country == "Laos" | country == "P. Dem. Rep." | country == "Saudi Arabia" | country == "Australia" | country == "Egypt" | country == "Lebanon" | country == "Senegal" | country == "Austria" | country == "El Salvador" | country == "Madagascar" | country == "Seychelles" | country == "Bahamas" | country == "Eq. Guinea" | country == "Malawi" | country == "Sierra Leone" | country == "Bahrain" | country == "Ethiopia" | country == "Malaysia" | country == "Singapore" | country == "Bangladesh" | country == "Fiji" | country == "Maldives" | country == "Solomon Islands" | country == "Barbados" | country == "Finland" | country == "Mali" | country == "South Africa" | country == "Belgium-Lux." | country == "France" | country == "Malta" | country == "Spain" | country == "Belize" | country == "Gabon" | country == "Mauritania" | country == "Sri Lanka" | country == "Benin" | country == "Gambia" | country == "Mauritius" | country == "St. Kitts and Nevis" | country == "Bhutan" | country == "Germany" | country == "Mexico" | country == "Sudan" | country == "Bolivia" | country == "Ghana" | country == "Mongolia" | country == "Suriname" | country == "Brazil" | country == "Greece" | country == "Morocco" | country == "Sweden" | country == "Brunei" | country == "Guatemala" | country == "Mozambique" | country == "Switzerland" | country == "Bulgaria" | country == "Guinea" | country == "Nepal" | country == "Syrian Arab Rep." | country == "Burkina Faso" | country == "Guinea-Bissau" | country == "Netherlands" | country == "Tanzania" | country == "Burundi" | country == "Guyana" | country == "New Caledonia" | country == "Thailand" | country == "Cambodia" | country == "Haiti" | country == "New Zealand" | country == "Togo" | country == "Cameroon" | country == "Honduras" | country == "Nicaragua" | country == "Trinidad and Tobago" | country == "Canada" | country == "Hong Kong" | country == "Niger" | country == "Tunisia" | country == "Central African Rep." | country == "Hungary" | country == "Nigeria" | country == "Turkey" | country == "Chad" | country == "Iceland" | country == "Norway" | country == "Uganda" | country == "Chile" | country == "India" | country == "Oman" | country == "United Arab Em." | country == "China" | country == "Indonesia" | country == "Pakistan" | country == "United Kingdom" | country == "Colombia" | country == "Iran" | country == "Panama" | country == "United States" | country == "Comoros" | country == "Ireland" | country == "Papua New Guinea" | country == "Uruguay" | country == "Congo Dem. Rep." | country == "Israel" | country == "Paraguay" | country == "Venezuela" | country == "Congo Rep." | country == "Italy" | country == "Peru"

//// There's certainly a better way to do the above. maybe next time.

/// we need to select destination and origin in two step

gen iso3_o=iso3 // select origin countries

save ctr,replace
clear all
use Gravity_V202211,clear
merge m:1 iso3_o using ctr // merge is your friend. gonna do this a lot
keep if _merge==3
drop _merge

save grav,replace

clear all
use ctr,clear

rename iso3_o iso3_d  // now select destination country
save ctr,replace
clear all
use grav,clear
merge m:1 iso3_d using ctr
keep if _merge==3
drop _merge

/// Now we keep variable we need

keep iso3num_o iso3num_d year iso3_o iso3_d distw_harmonic contig comcol comlang_off gdp_o gdp_d gdpcap_o gdpcap_d fta_wto tradeflow_baci

save grav,replace

/// add log version

gen ldist=log(distw_harmonic)
gen lgdpo=log(gdp_o)
gen lgdpd=log(gdp_d)
gen lgdpco=log(gdpcap_o)
gen lgdpcd=log(gdpcap_d)
gen logtrade=log(1+tradeflow_baci)
keep if contig!=. //drop multi input
save grav,replace

// regression
clear all
use grav,clear
/// try one year
keep if year==2019
/// set up encode for dummy country
encode iso3_d,generate(iiso3_d)
encode iso3_o,generate(iiso3_o)

reg logtrade lgdpo lgdpd lgdpco lgdpcd ldist contig comcol comlang_off fta_wto, r
outreg2 using myreg.doc, replace label ctitle(OLS) title(Table XX: my amazing regression)
reg logtrade lgdpo lgdpd lgdpco lgdpcd ldist contig comcol comlang_off fta_wto i.iiso3_d i.iiso3_o, r
outreg2 using myreg.doc, append label ctitle(FE)
ppmlhdfe tradeflow_baci lgdpo lgdpd lgdpco lgdpcd ldist contig comcol comlang_off fta_wto,vce(robust)
outreg2 using myreg.doc, append label ctitle(PPML)
ppmlhdfe tradeflow_baci lgdpo lgdpd lgdpco lgdpcd ldist contig comcol comlang_off fta_wto,absorb(iso3_d iso3_o) vce(robust)
outreg2 using myreg.doc, append label ctitle(PPMLHDFE)

/// try multi year, thus panel
/// since 2 dimension, generate group that's not year
clear all
use grav,clear


encode iso3_d,generate(iiso3_d)
encode iso3_o,generate(iiso3_o)
egen id=group(iso3_o iso3_d)
xtset id year
xtreg logtrade lgdpo lgdpd lgdpco lgdpcd ldist contig comcol comlang_off fta_wto, r
outreg2 using myreg2.doc, replace label ctitle(OLS) title(Table XX: my amazing regression)
xtreg logtrade lgdpo lgdpd lgdpco lgdpcd ldist contig comcol comlang_off fta_wto,fe r
outreg2 using myreg2.doc, append label ctitle(FE)
ppmlhdfe tradeflow_baci lgdpo lgdpd lgdpco lgdpcd ldist contig comcol comlang_off fta_wto,vce(robust)
outreg2 using myreg2.doc, append label ctitle(PPML)
ppmlhdfe tradeflow_baci lgdpo lgdpd lgdpco lgdpcd ldist contig comcol comlang_off fta_wto,absorb(i.iiso3_d#i.year i.iiso3_o#i.year) vce(robust)
outreg2 using myreg2.doc, append label ctitle(PPMLHDFE)

// BACI
clear all
// combine into 1 file

import delimited "BACI_HS17_Y2017_V202401b.csv",numericcols(6) // for some reason my stata thought q is str so i had to change it into float by using numericcols
save baci2017,replace
import delimited "BACI_HS17_Y2018_V202401b.csv",numericcols(6) clear
save baci2018,replace
import delimited "BACI_HS17_Y2019_V202401b.csv",numericcols(6) clear
save baci2019,replace
import delimited "BACI_HS17_Y2020_V202401b.csv",numericcols(6) clear
save baci2020,replace
import delimited "BACI_HS17_Y2021_V202401b.csv",numericcols(6) clear
save baci2021,replace
import delimited "BACI_HS17_Y2022_V202401b.csv",numericcols(6) clear
save baci2022,replace
// appending
use baci2017,clear
append using baci2018
append using baci2019
append using baci2020
append using baci2021
append using baci2022
save baci,replace // the complete baci
// remove individual files to save space
rm baci2017.dta  
rm baci2018.dta 
rm baci2019.dta
rm baci2020.dta 
rm baci2021.dta 
rm baci2022.dta

/// merge baci with grav
/// rename to match key
rename t year
rename i iso3num_o
rename j iso3num_d
/// merging
merge m:1 year iso3num_o iso3num_d using grav
/// keep only if both match
keep if _merge==3
drop _merge // we no longer need the _merge variable
// add log version of hs6digit trade
gen lvv=log(1+v)
gen lq=log(1+q)

// Regression
/// creating id
encode iso3_d,generate(iiso3_d) // encoding again for fixed effect
encode iso3_o,generate(iiso3_o) 
egen id=group(iso3_d iso3_o k) // grouping all non-time index
xtset id year

xtreg lvv lgdpo lgdpd lgdpco lgdpcd contig comcol comlang_off fta_wto ldist,r
outreg2 using myreg3.doc, replace label ctitle(OLS) title(Table XX: my amazing regression)
xtreg lvv lgdpo lgdpd lgdpco lgdpcd contig comcol comlang_off fta_wto ldist,fe r
outreg2 using myreg3.doc, append label ctitle(FE)
ppmlhdfe v lgdpo lgdpd lgdpco lgdpcd contig comcol comlang_off fta_wto ldist,vce(robust)
outreg2 using myreg3.doc, append label ctitle(PPML)
ppmlhdfe v lgdpo lgdpd lgdpco lgdpcd contig comcol comlang_off fta_wto ldist,abs(i.iiso3_d#i.year i.iiso3_o#i.year) vce(robust)
outreg2 using myreg3.doc, append label ctitle(PPMLHDFE)
