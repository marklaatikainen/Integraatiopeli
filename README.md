<a rel="license" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons -lisenssi" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/80x15.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/InteractiveResource" property="dct:title" rel="dct:type">Pidä integraatio koossa-peli</span>, jonka digitaalisen version tekijä on <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">Mark Laatikainen</span>, on lisensoitu <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Nimeä 4.0 Kansainvälinen -lisenssillä</a>.<br />Perustuu teokseen osoitteessa <a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/marklaatikainen/Integraatiopeli" rel="dct:source">https://github.com/marklaatikainen/Integraatiopeli</a>. 

Peli perustuu <a href="https://aikalisa.wordpress.com/">Aikalisän</a> tekemään lautapeliin innovaatiotyönä.

Peliä ja sen sääntöjä ovat olleet ideoimassa Ilari Munukka, Mark Laatikainen, Miikka Kukko ja Jarkko Niemi.
********************
# Pelin ohjeet

Pelissä pelaaja on älykodissa, jossa elektroniikka alkaa mennä rikki. Pelaajan tehtävänä on korjata vikoja parhaansa mukaan. 
Pelaaja voittaa pelin selviämällä kaikki 20 vuoroa, ilman liiallisia vahinkoja.
Alussa pelilaudalla ovat kaikki alueet ehjät ja peli alkaa ensimmäisestä nopan heitosta.
                    
Pelaaja joutuu korjaamaan rikkoutuneet komponentit, pysyäkseen pelissä mukana. Jos pelaaja ei kolmeen vuoroon korjaa rikkinäistä komponenttia, se rikkoutuu korjauskelvottomaksi. Kolmen pisteen komponentit menevät rikki kahdessa vuorossa kolmen sijaan.
                    
Pelaaja voittaa pelin selviämällä 20 vuoroa ilman, että komponentit menevät korjauskelvottomaksi (ovat rikki liian monen vuoron ajan).

<img src="assets/img/battery-4.png" alt="battery"/> <img src="assets/img/battery-3.png" alt="battery"/> <img src="assets/img/battery-2.png" alt="battery"/> <img src="assets/img/battery-1.png" alt="battery"/> <img src="assets/img/battery-0.png" alt="battery"/>
Pelissä paristoikonit ilmaisevat sen, että kuinka kauan on vielä<br>aikaa korjata kyseinen komponentti ennen pelin häviämistä.

Eriväriset ympyrät ilmaisevat komponentin tilan.
<img src="assets/img/greencircle.png" alt="vihreä"/>&nbsp;Vihreä on kunnossa,<br>
<img src="assets/img/yellowcircle.png" alt="keltainen"/>&nbsp;keltainen ympyrä ilmaisee komponentin olevan pois käytöstä muun komponentin rikkoutumisen johdosta.
<img src="assets/img/redcircle.png" alt="punainen"/>&nbsp;Punainen väri tarkoittaa komponentin olevan rikki ja se on korjattava mahdollisimman nopeasti.

## Komponentit, jotka poistavat muita komponentteja käytöstä

Jos “Sulakkeet” tai “Verkko” menee rikki, vaikuttaa se lukuisiin muihin komponentteihin poistamalla ne käytöstä. Käytöstä poistettu komponentti palaa normaalitilaan, kun sen rikkoutumisellaan käytöstä poistanut komponentti korjataan.

### Tietokone

Jos Tietokone menee rikki, maksaa muiden komponenttien korjaus yhden korjauspisteen enemmän. Muiden komponenttien korjaamiseen vaadittavien korjauspisteiden määrä palaa ennalleen, kun tietokoneen korjaa.
					
<img src="assets/img/control.png" alt="pelin ohjaus"/>
Vasemmassa yläkulmassa ovat “Heitä nopat”-, “Aloita peli alusta”-, ja “ohje”-painikkeet.
“Heitä nopat”- painike siirtää pelin seuraavaan vuoroon, ja arpoo sinulle jonkin määrän korjauspisteitä, ja arpoo myös mahdolliset vuorolla rikki menevät komponentit.

Painikkeiden alla olevat numerot kertovat, montako vuoroa olet pelannut (kahdestakymmenestä), ja tällä hetkellä käytettävissä olevien korjauspisteiden kokonaismäärän (viimeksi saadut korjauspisteet + aikaisemmilta vuoroilta säästyneet. Käyttämättömät korjauspisteet säilyvät seuraavalle vuorolle.

<img src="assets/img/lastround.png" alt="edellinen kierros"/>
“Edellinen kierros”-ruutu kertoo sinulle viime kierroksella rikki menneet komponentit ja viime kierroksella saadut korjauspisteet.

<img src="assets/img/fix.png" alt="korjaa"/>
Komponentti korjataan klikkaamalla sen nimeä "Korjattavissa olevat:" laatikosta. Nimen perässä näkyy pistemäärä, jolla komponentti korjataan.

Tässä kyseisessä tilanteessa pelaajan on seuraavalle vuorolle selvitäkseen korjattava tietokone, sillä sen edessä oleva paristoikoni näyttää rastia.
