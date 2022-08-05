# CSS3 Projekt
A feladat, hogy hozz létre egy adminfelületet HTML5 és CSS3 segítségével.

## Általános jellemzők

- Egy HTML-fájl szükséges, a neve "index.html" legyen, csupa kisbetűvel, és a gyökérben helyezd el.
- Kapsz egy képet, ez alapján kell elkészítened a kinézetet.
- A színkódokat és az elvárt osztályneveket megkapod. A színkódokat mindenhol RGB-formátumban adjuk meg.
- Ahol nincs részletesen specifikálva a feladat, ott az előnézet alapján dolgozz.
- Mindenhol Font Awesome-ikonokat használj:
https://fontawesome.com/v4.7.0/assets/font-awesome-4.7.0.zip
miután letöltötted, csomagold ki a css-mappádba, és hivatkozz a benne található css/font-awesome.min.css fáljra az index.html-ben.

## Header   
- Hozz létre az oldalon egy header elemet.
- A CSS-osztálya "header--dark" legyen.
- Háttérszín: 51,57,64
- Kitöltőszín: 236,236,236
---
- Hozz létre egy h3 elemet a header-ön belül az oldal címének.
- A CSS-osztálya "header__title" legyen.
- Inline elem legyen.
- A betűmérete 1.25-szöröse legyen a root-betűméretnek.
- A tartalma "Admin Page" legyen.
---
- Hozz létre egy kereső űrlapot a header jobb oldalán.
- Ez egy div legyen "header__search" osztállyal.
- Inline legyen megjelenítve.
---
- Legyen a header__search osztályú divben egy input elem és egy gomb.
- Az input elem osztálya "search__input" legyen.
- Legyen a bal felső és alsó sarka 4 pixelre lekerekítve.
- A jobb-bal padding 0.75, a felső-alsó 0.375 legyen a roothoz viszonyítva.
- A betűmérete 1.2 legyen a roothoz viszonyítva.
- A szegély színére állíts be egy áttűnést, amely .15 másodpercig tart.
- Ha megkapja a fókuszt, akkor a szegély színe 128,189,255 legyen.
- A gomb elem osztálya "search__btn" legyen.
- A gomb háttérszíne 0,123,255 legyen.
- A nagyító ikont keresd meg a Font Awesome-ikonok között, és jelenítsd meg a gomb közepén a minta alapján.

## Main
- Hozz létre egy main elemet a header alá. 
- Legyen benne egy aside elem.
- Mellette egy section elem "content" osztállyal.

## Aside
- Legyen benne egy nav elem "main__nav" osztállyal.
- Legyen a háttérszíne 33,37,41
- Legyen benne egy ul elem "nav__ul" osztállyal.
- Legyen benne 8 li elem.
- Az li elemekben legyenek fejlécek vagy linkek a minta szerinti tartalommal.
- Az ikonokat is a minta szerint helyezd el a linkek szövege elé, sorrendben:
fa-tachometer, fa-windows, fa-bookmark, fa-area-chart, fa-table

## Section
- Legyen a tetején egy h1 elem "Dashboard" tartalommal.
- Alatta legyen egy breadcrumb, ez egy div legyen "main__breadcrumb" osztállyal.
- Háttérszíne 233,236,239 legyen.
- A szegély lekerekítése .25 legyen a roothoz képest.
- A felirat benne szintén "Dashboard" legyen.
- A padding fent-lent 1, jobb-bal oldalon 1.5 legyen a roothoz képest.
- Legyen egy div alatta "main__cards" osztállyal.
- Legyen benne további négy div "main__card" osztállyal.
- A main__card divek legyen elosztva két további divre, ezek osztályai "card__top" és "card__bottom" legyenek.
- A felsőnek a felső, az alsónak az alsó sarkai legyenek lekerekítve .25 -re a roothoz képest.
- Mind a négy divhez hozz létre még egy-egy osztályt, és rendeld hozzájuk a diveket:
   - main__card--blue: háttérszín 0,123,255
   - main__card--yellow: háttérszín 255,193,7
   - main__card--green: háttérszín 40,167,69
   - main__card--red: háttérszín 220,53,69
- Állíts be áttűnést a háttérszínre az összes alsó és felső div esetén .3 másodperc időtartamban.
- A divek tartalma a minta szerint legyen elkészítve.   

## Opcionális
- 700px alatt a bal oldali menü legyen keskenyebb, és csak a menüpontok ikonjai látsszanak.
- 700px alatt a kártyák egymás alatt legyenek.   

# Minta
![image](https://user-images.githubusercontent.com/68642008/182177865-54a911fa-4115-49a2-afe1-d45e8107cb5f.png)
