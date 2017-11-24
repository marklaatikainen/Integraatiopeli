/*

Innovointi ja projektikurssin ryhmätyö.
Ryhmä: Aikalisä: https://aikalisa.wordpress.com/
Digitaalisen version pelistä tehnyt: Mark Laatikainen, 2017

Tämä prototyyppi ja prototyyppiin liittyvät kuva, ääni, video ja muut prototyypissä tarvittavat tiedostot ja materiaalit on julkaistu Creative Commons 4.0 lisenssillä. Käyttämällä näitä materiaaleja osoitat lukeneesi ja hyväksyneesi Creative Commons 4.0 lisenssiehdot, jotka löytyvät osoitteesta: http://creativecommons.fi/lisenssien-kayttoohje/

*/


// pelin asetukset:
gOptions = {
	peliKierroksia: 20,
	noppaMin: 1,
	noppaMax: 3,
	maxPisteet: 5,
	rikMaara: 3,
	hLkm: 3,
	kLkm: 4
}


var myGamePiece;
// kierroslaskuri
var i = 0;
if (i == gOptions.peliKierroksia+1) {
    i = gOptions.peliKierroksia;
}
// rikki olevat komponentit
var rikkinaiset = [];
// pois käytöstä olevat komponentit
var poisKaytosta = [];
// pelaajan tämänhetkiset pisteet
var pisteet = 0;
// korjauksen hinta
var pis = 0;
// rikkoutuneiden komponenttien määrä
var rikKomp = 0;

// eheyden tarkastus
var isSulakkeetRikki = false;
var isVerkkoRikki = false;
var isTietokoneRikki = false;
var isAurinkokennotRikki = false;
var isLammitysJarjestelmaRikki = false;
var isLamputRikki = false;
var isIlmastointijarjestelmaRikki = false;
var isKodinkoneetRikki = false;
var isHalytysjarjestelmaRikki = false;
var isPaloilmoitinJarjestelmaRikki = false;
var isAvainRikki = false;
var isTurvakameratRikki = false;

// komponenttien sijainnit (x, y, halkaisija)
var sulakkeet = [1050, 66, 27];
var verkko = [1077, 612, 28];
var tietokone = [883, 220, 28];
var aurinkokennot = [438, 742, 28];
var lammitysjarjestelma = [101, 565, 30];
var lamput = [444, 568, 30];
var ilmastointijarjestelma = [879, 479, 30];
var kodinkoneet = [624, 151, 27];
var halytysjarjestelma = [87, 350, 30];
var paloilmointinjarjestelma = [378, 314, 30];
var avain = [1080, 425, 28];
var turvakamerat = [675, 747, 30];

// laskurit komponenteille, kuinka monta vuoroa olleet rikki.
var sulakeVuorojaRikki = 0;
var verkkoVuorojaRikki = 0;
var tietokoneVuorojaRikki = 0;
var aurinkokennotVuorojaRikki = 0;
var lammitysjarjestelmaVuorojaRikki = 0;
var lamputVuorojaRikki = 0;
var ilmastointijarjestelmaVuorojaRikki = 0;
var kodinkoneetVuorojaRikki = 0;
var halytysjarjestelmaVuorojaRikki = 0;
var paloilmointinjarjestelmaVuorojaRikki = 0;
var avainVuorojaRikki = 0;
var turvakameratVuorojaRikki = 0;


// pelin aloitus
function startGame() {
	myGameArea.start();
    // komponentit vihreiksi
    resetComponents();
    // pistemäärä nollataan
    document.getElementById("kp").innerHTML = pisteet;
    // uudelleenaloitus pois päältä
    document.getElementById("reset").disabled = true;
    // noppien heitto aktiivinen
    document.getElementById("play").disabled = false;
}

// pelialue kanvas
var myGameArea = {
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 1150;
        this.canvas.height = 800;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
};

// komponenttien piirtäminen
function component(color, x, y, d) {
    this.d = d;
    this.x = x;
    this.y = y;
    this.color = color;
    ctx = myGameArea.context;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.d, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
}

// nollataan kaikki muuttujat
function resetGame() {
    poisKaytosta = [];
    rikkinaiset = [];
    i = 0;
    pisteet = 0;
    pis = 0;
    sulakeVuorojaRikki = 0;
    verkkoVuorojaRikki = 0;
    tietokoneVuorojaRikki = 0;
    aurinkokennotVuorojaRikki = 0;
    lammitysjarjestelmaVuorojaRikki = 0;
    lamputVuorojaRikki = 0;
    ilmastointijarjestelmaVuorojaRikki = 0;
    kodinkoneetVuorojaRikki = 0;
    halytysjarjestelmaVuorojaRikki = 0;
    paloilmointinjarjestelmaVuorojaRikki = 0;
    avainVuorojaRikki = 0;
    turvakameratVuorojaRikki = 0;

    isSulakkeetRikki = false;
    isVerkkoRikki = false;
    isTietokoneRikki = false;
    isAurinkokennotRikki = false;
    isLammitysJarjestelmaRikki = false;
    isLamputRikki = false;
    isIlmastointijarjestelmaRikki = false;
    isKodinkoneetRikki = false;
    isHalytysjarjestelmaRikki = false;
    isPaloilmoitinJarjestelmaRikki = false;
    isAvainRikki = false;
    isTurvakameratRikki = false;

    document.getElementById("lkm").innerHTML = i;
    document.getElementById("kp").innerHTML = pisteet;
    document.getElementById("noppa1").innerHTML = "";
    document.getElementById("noppa2").innerHTML = "";
    document.getElementById("list").innerHTML = "";
    startGame();
}

function riko(rik) {
    // osien nimet ilman ääkkösiä tulevat ID parametreiksi
    var osat = ['sulakkeet', 'verkko', 'tietokone', 'aurinkokennot', 'lammitysjarjestelma', 'lamput', 'ilmastointijarjestelma', 'kodinkoneet', 'halytysjarjestelma', 'paloilmointinjarjestelma', 'aly-avain', 'turvakamerat'];
    // osien nimet, jotka tulostetaan pelaajalle
    var osaNimet = ['sulakkeet', 'verkko', 'tietokone', 'aurinkokennot', 'lämmitysjärjestelmä', 'lamput', 'ilmastointijärjestelmä', 'kodinkoneet', 'hälytysjärjestelmä', 'paloilmointinjärjestelmä', 'äly-avain', 'turvakamerat'];

    for (var r = 0; r < osat.length; r++) {
        var rikkoutuva = osat[rik - 1];
        var rikNimi = osaNimet[rik - 1];
    }
    if (rik == 1) {
        if (rikkinaiset.indexOf(1) == -1 && poisKaytosta.indexOf(1) == -1) {
            rikkinaiset.push(1);
        }
        isSulakkeetRikki = true;
        var tark = poisKaytosta.indexOf(1);
        if (tark > -1) {
            poisKaytosta.splice(tark, 1);
        }
        pis = 3;
    } else if (rik == 2) {
        if (rikkinaiset.indexOf(2) == -1 && poisKaytosta.indexOf(2) == -1) {
            rikkinaiset.push(2);
        }
        isVerkkoRikki = true;
        var tark = poisKaytosta.indexOf(2);
        if (tark > -1) {
            poisKaytosta.splice(tark, 1);
        }
        pis = 3;
    } else if (rik == 3) {
        if (rikkinaiset.indexOf(3) == -1 && poisKaytosta.indexOf(3) == -1) {
            rikkinaiset.push(3);
        }
        if (isTietokoneRikki != true) {
            isTietokoneRikki = true;
            var tark = poisKaytosta.indexOf(3);
            if (tark > -1) {
                poisKaytosta.splice(tark, 1);
            }
            alert("Tietokone meni rikki. Tietokoneen ollessa rikki,\nmuiden osien korjaaminen maksaa yhden pisteen enemmän.");
            pis = 3;
            var list = document.getElementsByClassName("fix");
            for (var n = 0; n < list.length; ++n) {
                var value = list[n].innerHTML;
                var str = value.split(" ");
                var num = str[1].substring(0,1);
                list[n].innerHTML = str[0] + " " + (parseInt(num) + 1) + "p<br>";
            }
        }
    } else if (rik == 4) {
        if (rikkinaiset.indexOf(4) == -1 && poisKaytosta.indexOf(4) == -1) {
            rikkinaiset.push(4);
        }
        isAurinkokennotRikki = true;
        var tark = poisKaytosta.indexOf(4);
        if (tark > -1) {
            poisKaytosta.splice(tark, 1);
        }
        pis = 2;
    } else if (rik == 5) {
        if (rikkinaiset.indexOf(5) == -1 && poisKaytosta.indexOf(5) == -1) {
            rikkinaiset.push(5);
        }
        isLammitysJarjestelmaRikki = true;
        var tark = poisKaytosta.indexOf(5);
        if (tark > -1) {
            poisKaytosta.splice(tark, 1);
        }
        pis = 2;
    } else if (rik == 6) {
        if (rikkinaiset.indexOf(6) == -1 && poisKaytosta.indexOf(6) == -1) {
            rikkinaiset.push(6);
        }
        isLamputRikki = true;
        var tark = poisKaytosta.indexOf(6);
        if (tark > -1) {
            poisKaytosta.splice(tark, 1);
        }
        pis = 2;
    } else if (rik == 7) {
        if (rikkinaiset.indexOf(7) == -1 && poisKaytosta.indexOf(7) == -1) {
            rikkinaiset.push(7);
        }
        isIlmastointijarjestelmaRikki = true;
        var tark = poisKaytosta.indexOf(7);
        if (tark > -1) {
            poisKaytosta.splice(tark, 1);
        }
        pis = 1;
    } else if (rik == 8) {
        if (rikkinaiset.indexOf(8) == -1 && poisKaytosta.indexOf(8) == -1) {
            rikkinaiset.push(8);
        }
        isKodinkoneetRikki = true;
        var tark = poisKaytosta.indexOf(8);
        if (tark > -1) {
            poisKaytosta.splice(tark, 1);
        }
        pis = 1;
    } else if (rik == 9) {
        if (rikkinaiset.indexOf(9) == -1 && poisKaytosta.indexOf(9) == -1) {
            rikkinaiset.push(9);
        }
        isHalytysjarjestelmaRikki = true;
        var tark = poisKaytosta.indexOf(9);
        if (tark > -1) {
            poisKaytosta.splice(tark, 1);
        }
        pis = 1;
    } else if (rik == 10) {
        if (rikkinaiset.indexOf(10) == -1 && poisKaytosta.indexOf(10) == -1) {
            rikkinaiset.push(10);
        }
        isPaloilmoitinJarjestelmaRikki = true;
        var tark = poisKaytosta.indexOf(10);
        if (tark > -1) {
            poisKaytosta.splice(tark, 1);
        }
        pis = 1;
    } else if (rik == 11) {
        if (rikkinaiset.indexOf(11) == -1 && poisKaytosta.indexOf(11) == -1) {
            rikkinaiset.push(11);
        }
        isAvainRikki = true;
        var tark = poisKaytosta.indexOf(11);
        if (tark > -1) {
            poisKaytosta.splice(tark, 1);
        }
        pis = 1;
    } else if (rik == 12) {
        if (rikkinaiset.indexOf(12) == -1 && poisKaytosta.indexOf(12) == -1) {
            rikkinaiset.push(12);
        }
        isTurvakameratRikki = true;
        var tark = poisKaytosta.indexOf(12);
        if (tark > -1) {
            poisKaytosta.splice(tark, 1);
        }
        pis = 1;
    }

    if (isTietokoneRikki == true) {
        pis += 1;
    }

    // luodaan korjauslinkki ja pariston kuva
    var a = document.createElement("a");
    var icon = document.createElement("i");
    if (rik == 3) { pis = 3; }
    a.innerHTML = rikNimi + " " + pis + "p<br>";
    a.setAttribute('href', "#");
    a.setAttribute('class', rik);
    a.setAttribute('id', rik);
    a.setAttribute('class', "fix");
    icon.setAttribute('class', "icon4");
    icon.setAttribute('id', rikkoutuva);
    icon.appendChild(a);
    if (document.getElementById(rik) == null) {
        document.getElementById("list").appendChild(icon);
    }
    var class_names = document.getElementsByClassName("fix");

    for (var i = 0; i < class_names.length; i++) {
        class_names[i].addEventListener('click', korjaa, false);
    }


    return rikNimi;
}

// määritellään, mikä komponentit poistuvat käytöstä
function muutOsat(rik) {
    var r = rik - 1;
    if (r == 0) {
        if (poisKaytosta.indexOf(4) == -1) {
            poisKaytosta.push(4);
        }
        if (poisKaytosta.indexOf(6) == -1) {
            poisKaytosta.push(6);
        }
        if (poisKaytosta.indexOf(7) == -1) {
            poisKaytosta.push(7);
        }
        if (poisKaytosta.indexOf(9) == -1) {
            poisKaytosta.push(9);
        }
        if (poisKaytosta.indexOf(10) == -1) {
            poisKaytosta.push(10);
        }
        if (poisKaytosta.indexOf(11) == -1) {
            poisKaytosta.push(11);
        }
        if (poisKaytosta.indexOf(12) == -1) {
            poisKaytosta.push(12);
        }
//        return "aurinkokennot, lamput, ilmastointijärjestelmä, hälytysjärjestelmä, paloilmointinjärjestelmä, äly-avain, turvakamerat";
} else if (r == 1) {
    if (poisKaytosta.indexOf(9) == -1) {
        poisKaytosta.push(9);
    }
    if (poisKaytosta.indexOf(10) == -1) {
        poisKaytosta.push(10);
    }
    if (poisKaytosta.indexOf(11) == -1) {
        poisKaytosta.push(11);
    }
    if (poisKaytosta.indexOf(12) == -1) {
        poisKaytosta.push(12);
    }
//        return "hälytysjärjestelmä, paloilmointinjärjestelmä, äly-avain, turvakamerat";
} else if (r == 2) {
    poisKaytosta.push(r);
//        return "Muiden komponenttien korjaus maksaa 1 pisteen enemmän.";
} else {
    return "-";
}
}

function rollDice() {
    i++;
    if (i > gOptions.peliKierroksia && rikKomp <= 3) {
        i = gOptions.peliKierroksia;
        alert("Voitit pelin!");
        document.getElementById("play").disabled = true;
        document.getElementById("reset").disabled = false;
        document.getElementById("list").innerHTML = "";
		return;
    } else if (i > gOptions.peliKierroksia && rikKomp > 3) {
        i = gOptions.peliKierroksia;
        alert("Hävisit pelin!\nLiikaa rikkinäisiä komponentteja");
        document.getElementById("play").disabled = true;
        document.getElementById("reset").disabled = false;
        document.getElementById("list").innerHTML = "";
		return;
	}

    if (isSulakkeetRikki == true) {
        sulakeVuorojaRikki++;
        if (sulakeVuorojaRikki == 1) {
            document.getElementById("sulakkeet").className = "icon2";
        } else if (sulakeVuorojaRikki == 2) {
            document.getElementById("sulakkeet").className = "icon1";
        } else if(sulakeVuorojaRikki == 3) {
            document.getElementById("sulakkeet").className = "icon0";
        }
        if (sulakeVuorojaRikki > 3) {
            alert("Hävisit pelin!\nSulakkeet ovat olleet liian pitkään rikki!");
            document.getElementById("list").innerHTML = "";
            document.getElementById("play").disabled = true;
            document.getElementById("reset").disabled = false;
            return;
        }
    }
    if (isVerkkoRikki == true) {
        verkkoVuorojaRikki++;
        if (verkkoVuorojaRikki == 1) {
            document.getElementById("verkko").className = "icon2";
        } else if (verkkoVuorojaRikki == 2) {
            document.getElementById("verkko").className = "icon1";
        } else if(verkkoVuorojaRikki == 3) {
            document.getElementById("verkko").className = "icon0";
        }
        if (verkkoVuorojaRikki > 3) {
            alert("Hävisit pelin!\nVerkko on ollut liian pitkään rikki!");
            document.getElementById("list").innerHTML = "";
            document.getElementById("play").disabled = true;
            document.getElementById("reset").disabled = false;
            return;
        }
    }
    if (isTietokoneRikki == true) {
        tietokoneVuorojaRikki++;
        if (tietokoneVuorojaRikki == 1) {
            document.getElementById("tietokone").className = "icon2";
        } else if (tietokoneVuorojaRikki == 2) {
            document.getElementById("tietokone").className = "icon1";
        }  else if(tietokoneVuorojaRikki == 3) {
            document.getElementById("tietokone").className = "icon0";
        }
        if (tietokoneVuorojaRikki > 3) {
            alert("Hävisit pelin!\nTietokone on ollut liian pitkään rikki!");
            document.getElementById("list").innerHTML = "";
            document.getElementById("play").disabled = true;
            document.getElementById("reset").disabled = false;
            return;
        }
    }
    if (isAurinkokennotRikki == true) {
        aurinkokennotVuorojaRikki++;
        if (aurinkokennotVuorojaRikki == 1) {
            document.getElementById("aurinkokennot").className = "icon3";
        } else if (aurinkokennotVuorojaRikki == 2) {
            document.getElementById("aurinkokennot").className = "icon2";
        } else if (aurinkokennotVuorojaRikki == 3) {
            document.getElementById("aurinkokennot").className = "icon1";
        } else if(aurinkokennotVuorojaRikki == 4) {
            document.getElementById("aurinkokennot").className = "icon0";
        }
        if (aurinkokennotVuorojaRikki > 4) {
            alert("Hävisit pelin!\nAurinkokennot ovat olleet liian pitkään rikki!");
            document.getElementById("list").innerHTML = "";
            document.getElementById("play").disabled = true;
            document.getElementById("reset").disabled = false;
            return;
        }
    }
    if (isLammitysJarjestelmaRikki == true) {
        lammitysjarjestelmaVuorojaRikki++;
        if (lammitysjarjestelmaVuorojaRikki == 1) {
            document.getElementById("lammitysjarjestelma").className = "icon3";
        } else if (lammitysjarjestelmaVuorojaRikki == 2) {
            document.getElementById("lammitysjarjestelma").className = "icon2";
        } else if (lammitysjarjestelmaVuorojaRikki == 3) {
            document.getElementById("lammitysjarjestelma").className = "icon1";
        } else if(lammitysjarjestelmaVuorojaRikki == 4) {
            document.getElementById("lammitysjarjestelma").className = "icon0";
        }
        if (lammitysjarjestelmaVuorojaRikki > 4) {
            alert("Hävisit pelin!\nLämmitysjärjestelmä on ollut liian pitkään rikki!");
            document.getElementById("list").innerHTML = "";
            document.getElementById("play").disabled = true;
            document.getElementById("reset").disabled = false;
            return;
        }
    }
    if (isLamputRikki == true) {
        lamputVuorojaRikki++;
        if (lamputVuorojaRikki == 1) {
            document.getElementById("lamput").className = "icon3";
        } else if (lamputVuorojaRikki == 2) {
            document.getElementById("lamput").className = "icon2";
        } else if (lamputVuorojaRikki == 3) {
            document.getElementById("lamput").className = "icon1";
        } else if(lamputVuorojaRikki == 4) {
            document.getElementById("lamput").className = "icon0";
        }
        if (lamputVuorojaRikki > 4) {
            alert("Hävisit pelin!\nLamput ovat olleet liian pitkään rikki!");
            document.getElementById("list").innerHTML = "";
            document.getElementById("play").disabled = true;
            document.getElementById("reset").disabled = false;
            return;
        }
    }
    if (isIlmastointijarjestelmaRikki == true) {
        ilmastointijarjestelmaVuorojaRikki++;
        if (ilmastointijarjestelmaVuorojaRikki == 1) {
            document.getElementById("ilmastointijarjestelma").className = "icon3";
        } else if (ilmastointijarjestelmaVuorojaRikki == 2) {
            document.getElementById("ilmastointijarjestelma").className = "icon2";
        } else if (ilmastointijarjestelmaVuorojaRikki == 3) {
            document.getElementById("ilmastointijarjestelma").className = "icon1";
        } else if(ilmastointijarjestelmaVuorojaRikki == 4) {
            document.getElementById("ilmastointijarjestelma").className = "icon0";
        }
        if (ilmastointijarjestelmaVuorojaRikki > 4) {
            alert("Hävisit pelin!\nIlmastointijärjestelmä on ollut liian pitkään rikki!");
            document.getElementById("list").innerHTML = "";
            document.getElementById("play").disabled = true;
            document.getElementById("reset").disabled = false;
            return;
        }
    }
    if (isKodinkoneetRikki == true) {
        kodinkoneetVuorojaRikki++;
        if (kodinkoneetVuorojaRikki == 1) {
            document.getElementById("kodinkoneet").className = "icon3";
        } else if (kodinkoneetVuorojaRikki == 2) {
            document.getElementById("kodinkoneet").className = "icon2";
        } else if (kodinkoneetVuorojaRikki == 3) {
            document.getElementById("kodinkoneet").className = "icon1";
        } else if(kodinkoneetVuorojaRikki == 4) {
            document.getElementById("kodinkoneet").className = "icon0";
        }
        if (kodinkoneetVuorojaRikki > 4) {
            alert("Hävisit pelin!\nKodinkoneet ovat olleet liian pitkään rikki!");
            document.getElementById("list").innerHTML = "";
            document.getElementById("play").disabled = true;
            document.getElementById("reset").disabled = false;
            return;
        }
    }
    if (isHalytysjarjestelmaRikki == true) {
        halytysjarjestelmaVuorojaRikki++;
        if (halytysjarjestelmaVuorojaRikki == 1) {
            document.getElementById("halytysjarjestelma").className = "icon3";
        } else if (halytysjarjestelmaVuorojaRikki == 2) {
            document.getElementById("halytysjarjestelma").className = "icon2";
        } else if (halytysjarjestelmaVuorojaRikki == 3) {
            document.getElementById("halytysjarjestelma").className = "icon1";
        } else if(halytysjarjestelmaVuorojaRikki == 4) {
            document.getElementById("halytysjarjestelma").className = "icon0";
        }
        if (halytysjarjestelmaVuorojaRikki > 4) {
            alert("Hävisit pelin!\nHälytysjärjestelmä on ollut liian pitkään rikki!");
            document.getElementById("list").innerHTML = "";
            document.getElementById("play").disabled = true;
            document.getElementById("reset").disabled = false;
            return;
        }
    }
    if (isPaloilmoitinJarjestelmaRikki == true) {
        paloilmointinjarjestelmaVuorojaRikki++;
        if (paloilmointinjarjestelmaVuorojaRikki == 1) {
            document.getElementById("paloilmointinjarjestelma").className = "icon3";
        } else if (paloilmointinjarjestelmaVuorojaRikki == 2) {
            document.getElementById("paloilmointinjarjestelma").className = "icon2";
        } else if (paloilmointinjarjestelmaVuorojaRikki == 3) {
            document.getElementById("paloilmointinjarjestelma").className = "icon1";
        } else if(paloilmointinjarjestelmaVuorojaRikki == 4) {
            document.getElementById("paloilmointinjarjestelma").className = "icon0";
        }
        if (paloilmointinjarjestelmaVuorojaRikki > 4) {
            alert("Hävisit pelin!\nPaloilmoitinjärjestelmä on ollut liian pitkään rikki!");
            document.getElementById("list").innerHTML = "";
            document.getElementById("play").disabled = true;
            document.getElementById("reset").disabled = false;
            return;
        }
    }
    if (isAvainRikki == true) {
        avainVuorojaRikki++;
        if (avainVuorojaRikki == 1) {
            document.getElementById("aly-avain").className = "icon3";
        } else if (avainVuorojaRikki == 2) {
            document.getElementById("aly-avain").className = "icon2";
        } else if (avainVuorojaRikki == 3) {
            document.getElementById("aly-avain").className = "icon1";
        } else if(avainVuorojaRikki == 4) {
            document.getElementById("aly-avain").className = "icon0";
        }
        if (avainVuorojaRikki > 4) {
            alert("Hävisit pelin!\nÄlyavain on ollut liian pitkään rikki!");
            document.getElementById("list").innerHTML = "";
            document.getElementById("play").disabled = true;
            document.getElementById("reset").disabled = false;
            return;
        }
    }
    if (isTurvakameratRikki == true) {
        turvakameratVuorojaRikki++;
        if (turvakameratVuorojaRikki == 1) {
            document.getElementById("turvakamerat").className = "icon3";
        } else if (turvakameratVuorojaRikki == 2) {
            document.getElementById("turvakamerat").className = "icon2";
        } else if (turvakameratVuorojaRikki == 3) {
            document.getElementById("turvakamerat").className = "icon1";
        } else if(turvakameratVuorojaRikki == 4) {
            document.getElementById("turvakamerat").className = "icon0";
        }
        if (turvakameratVuorojaRikki > 4) {
            alert("Hävisit pelin!\nTurvakamerat ovat olleet liian pitkään rikki!");
            document.getElementById("list").innerHTML = "";
            document.getElementById("play").disabled = true;
            document.getElementById("reset").disabled = false;
            return;
        }
    }

    if (i < 1) {
        document.getElementById("reset").disabled = true;
    } else {
        document.getElementById("reset").disabled = false;
    }
    var painotus = [1, 1, 2, 2, 3, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    rik = painotus[Math.floor(Math.random() * painotus.length)];
    muutOsat(rik);
    var nop2 = Math.floor(Math.random() * gOptions.noppaMax + gOptions.noppaMin);

    if (pisteet == 0) {
        pisteet = nop2;
    } else {
        pisteet += nop2;
    }

    if (pisteet >= gOptions.maxPisteet) {
        pisteet = gOptions.maxPisteet;
    }

    var tar = poisKaytosta.indexOf(rik);
    if (tar > -1) {
        poisKaytosta.splice(tar, 1);
    }
    
    setColors(rik);
    document.getElementById("lkm").innerHTML = i;
    document.getElementById("kp").innerHTML = pisteet;
    rikKomp++;
    document.getElementById("noppa1").innerHTML = "Rikkoutuva osa: <i class=\"red\">" + riko(rik) + "</i>";
    document.getElementById("noppa2").innerHTML = "Korjauspisteet: " + nop2;
}

var class_names = document.getElementsByClassName("fix");

for (var i = 0; i < class_names.length; i++) {
    class_names[i].addEventListener('click', korjaa, false);
}

function korjaa() {
    pis = 0;
    var arry = [];

    if (this.id == 1) {
        pis += 3;
        arry = [sulakkeet[0], sulakkeet[1], sulakkeet[2]];
    } else if (this.id == 2) {
        pis += 3;
        arry = [verkko[0], verkko[1], verkko[2]];
    } else if (this.id == 3) {
        pis += 3;
        arry = [tietokone[0], tietokone[1], tietokone[2]];
    } else if (this.id == 4) {
        pis += 2;
        arry = [aurinkokennot[0], aurinkokennot[1], aurinkokennot[2]];
    } else if (this.id == 5) {
        pis += 2;
        arry = [lammitysjarjestelma[0], lammitysjarjestelma[1], lammitysjarjestelma[2]];
    } else if (this.id == 6) {
        pis += 2;
        arry = [lamput[0], lamput[1], lamput[2]];
    } else if (this.id == 7) {
        pis += 1;
        arry = [ilmastointijarjestelma[0], ilmastointijarjestelma[1], ilmastointijarjestelma[2]];
    } else if (this.id == 8) {
        pis += 1;
        arry = [kodinkoneet[0], kodinkoneet[1], kodinkoneet[2]];
    } else if (this.id == 9) {
        pis += 1;
        arry = [halytysjarjestelma[0], halytysjarjestelma[1], halytysjarjestelma[2]];
    } else if (this.id == 10) {
        pis += 1;
        arry = [paloilmointinjarjestelma[0], paloilmointinjarjestelma[1], paloilmointinjarjestelma[2]];
    } else if (this.id == 11) {
        pis += 1;
        arry = [avain[0], avain[1], avain[2]];
    } else if (this.id == 12) {
        pis += 1;
        arry = [turvakamerat[0], turvakamerat[1], turvakamerat[2]];
    }

    if (isTietokoneRikki == true) {
        pis += 1;
    }
    if (this.id == 3) {
      pis = 3;
  }

  if (pisteet - pis >= 0) {
    pisteet = pisteet - pis;
    alert("Korjaus maksoi " + pis + " pistettä. Sinulla on jäljellä " + pisteet + " pistettä.");
    rikKomp -= 1;

    if (rikKomp < 0) {
        rikKomp == 0;
    }
    document.getElementById("kp").innerHTML = pisteet;
    if (this.id == 1) {
        sulakeVuorojaRikki = 0;
        isSulakkeetRikki = false;
    } else if (this.id == 2) {
        verkkoVuorojaRikki = 0;
        isVerkkoRikki = false;
    } else if (this.id == 3) {
        tietokoneVuorojaRikki = 0;
        isTietokoneRikki = false;
        pis -= 1;
        var lst = document.getElementsByClassName("fix");
        for (var s = 0; s < lst.length; s++) {
            var valu = lst[s].innerHTML;
            var st = valu.split(" ");
            var nu = st[1].substring(0,1);
            lst[s].innerHTML = st[0] + " " + (parseInt(nu) - 1) + "p<br>";
        }						
    } else if (this.id == 4) {
        aurinkokennotVuorojaRikki = 0;
        isAurinkokennotRikki = false;
    } else if (this.id == 5) {
        lammitysjarjestelmaVuorojaRikki = 0;
        isLammitysJarjestelmaRikki = false;
    } else if (this.id == 6) {
        lamputVuorojaRikki = 0;
        isLamputRikki = false;
    } else if (this.id == 7) {
        ilmastointijarjestelmaVuorojaRikki = 0;
        isIlmastointijarjestelmaRikki = false;
    } else if (this.id == 8) {
        kodinkoneetVuorojaRikki = 0;
        isKodinkoneetRikki = false;
    } else if (this.id == 9) {
        halytysjarjestelmaVuorojaRikki = 0;
        isHalytysjarjestelmaRikki = false;
    } else if (this.id == 10) {
        paloilmointinjarjestelmaVuorojaRikki = 0;
        isPaloilmoitinJarjestelmaRikki = false;
    } else if (this.id == 11) {
        avainVuorojaRikki = 0;
        isAvainRikki = false;
    } else if (this.id == 12) {
        turvakameratVuorojaRikki = 0;
        isTurvakameratRikki = false;
    }

    myGamePiece = new component("green", arry[0], arry[1], arry[2]);
        // sulakkeet
        if (this.id == 1) {
         if (rikkinaiset.indexOf(1) != -1) {
            var tark = poisKaytosta.indexOf(1);
            if (tark > -1) {
               poisKaytosta.splice(tark, 1);
           }
       }
       if (poisKaytosta.indexOf(4) != -1) {
                // aurinkokennot
                myGamePiece = new component("green", aurinkokennot[0], aurinkokennot[1], aurinkokennot[2]);
            }
            if (poisKaytosta.indexOf(6) != -1) {
                // lamput
                myGamePiece = new component("green", lamput[0], lamput[1], lamput[2]);
            }
            if (poisKaytosta.indexOf(7) != -1) {
                // ilmastointijärjestelmä
                myGamePiece = new component("green", ilmastointijarjestelma[0], ilmastointijarjestelma[1], ilmastointijarjestelma[2]);
            }
            if (poisKaytosta.indexOf(9) != -1) {
                // hälytysjärjestelmä
                myGamePiece = new component("green", halytysjarjestelma[0], halytysjarjestelma[1], halytysjarjestelma[2]);
            }
            if (poisKaytosta.indexOf(10) != -1) {
                // paloilmointinjärjestelmä
                myGamePiece = new component("green", paloilmointinjarjestelma[0], paloilmointinjarjestelma[1], paloilmointinjarjestelma[2]);
            }
            if (poisKaytosta.indexOf(11) != -1) {
                // äly-avain
                myGamePiece = new component("green", avain[0], avain[1], avain[2]);
            }
            if (poisKaytosta.indexOf(12) != -1) {
                // turvakamerat
                myGamePiece = new component("green", turvakamerat[0], turvakamerat[1], turvakamerat[2]);
            }
            // verkko
        } else if (this.id == 2) {
         if (rikkinaiset.indexOf(2) != -1) {
            var tark = poisKaytosta.indexOf(2);
            if (tark > -1) {
               poisKaytosta.splice(tark, 1);
           }
       }
       if (poisKaytosta.indexOf(9) != -1) {
                // hälytysjärjestelmä
                myGamePiece = new component("green", halytysjarjestelma[0], halytysjarjestelma[1], halytysjarjestelma[2]);
            }
            if (poisKaytosta.indexOf(10) != -1) {
                // paloilmointinjärjestelmä
                myGamePiece = new component("green", paloilmointinjarjestelma[0], paloilmointinjarjestelma[1], paloilmointinjarjestelma[2]);
            }
            if (poisKaytosta.indexOf(11) != -1) {
                // äly-avain
                myGamePiece = new component("green", avain[0], avain[1], avain[2]);
            }
            if (poisKaytosta.indexOf(12) != -1) {
                // turvakamerat
                myGamePiece = new component("green", turvakamerat[0], turvakamerat[1], turvakamerat[2]);
            }
        } else if (this.id == 3) {
         if (rikkinaiset.indexOf(3) != -1) {
            var tark = poisKaytosta.indexOf(3);
            if (tark > -1) {
               poisKaytosta.splice(tark, 1);
           }
       }
   } else if (this.id == 4) {
     if (rikkinaiset.indexOf(4) != -1) {
        var tark = poisKaytosta.indexOf(4);
        if (tark > -1) {
           poisKaytosta.splice(tark, 1);
       }
   }
} else if (this.id == 5) {
 if (rikkinaiset.indexOf(5) != -1) {
    var tark = poisKaytosta.indexOf(5);
    if (tark > -1) {
       poisKaytosta.splice(tark, 1);
   }
}
} else if (this.id == 6) {
 if (rikkinaiset.indexOf(6) != -1) {
    var tark = poisKaytosta.indexOf(6);
    if (tark > -1) {
       poisKaytosta.splice(tark, 1);
   }
}
} else if (this.id == 7) {
 if (rikkinaiset.indexOf(7) != -1) {
    var tark = poisKaytosta.indexOf(7);
    if (tark > -1) {
       poisKaytosta.splice(tark, 1);
   }
}
} else if (this.id == 8) {
 if (rikkinaiset.indexOf(8) != -1) {
    var tark = poisKaytosta.indexOf(8);
    if (tark > -1) {
       poisKaytosta.splice(tark, 1);
   }
}
} else if (this.id == 9) {
 if (rikkinaiset.indexOf(9) != -1) {
    var tark = poisKaytosta.indexOf(9);
    if (tark > -1) {
       poisKaytosta.splice(tark, 1);
   }
}
} else if (this.id == 10) {
 if (rikkinaiset.indexOf(10) != -1) {
    var tark = poisKaytosta.indexOf(10);
    if (tark > -1) {
       poisKaytosta.splice(tark, 1);
   }
}
} else if (this.id == 11) {
 if (rikkinaiset.indexOf(11) != -1) {
    var tark = poisKaytosta.indexOf(11);
    if (tark > -1) {
       poisKaytosta.splice(tark, 1);
   }
}
} else if (this.id == 12) {
 if (rikkinaiset.indexOf(12) != -1) {
    var tark = poisKaytosta.indexOf(12);
    if (tark > -1) {
       poisKaytosta.splice(tark, 1);
   }
}
}
this.parentElement.remove();
} else {
    alert("Pisteesi eivät riitä korjaamaan tätä komponenttia!");
}

}

Element.prototype.remove = function () {
    this.parentElement.removeChild(this);
};


function setColors(comp) {
	// rikkoutuva osa
    var cmp = [];
	// Käytöstä poistuvat osat
    var oog = [];

    switch (comp) {
        case 1:
        cmp = sulakkeet;
        oog = [[aurinkokennot[0], aurinkokennot[1], aurinkokennot[2]], [lamput[0], lamput[1], lamput[2]], [ilmastointijarjestelma[0], ilmastointijarjestelma[1], ilmastointijarjestelma[2]], [halytysjarjestelma[0], halytysjarjestelma[1], halytysjarjestelma[2]], [paloilmointinjarjestelma[0], paloilmointinjarjestelma[1], paloilmointinjarjestelma[2]], [avain[0], avain[1], avain[2]], [turvakamerat[0], turvakamerat[1], turvakamerat[2]]];
        break;
        case 2:
        cmp = verkko;
        oog = [[halytysjarjestelma[0], halytysjarjestelma[1], halytysjarjestelma[2]], [paloilmointinjarjestelma[0], paloilmointinjarjestelma[1], paloilmointinjarjestelma[2]], [avain[0], avain[1], avain[2]], [turvakamerat[0], turvakamerat[1], turvakamerat[2]]];
        break;
        case 3:
        cmp = tietokone;
        break;
        case 4:
        cmp = aurinkokennot;
        break;
        case 5:
        cmp = lammitysjarjestelma;
        break;
        case 6:
        cmp = lamput;
        break;
        case 7:
        cmp = ilmastointijarjestelma;
        break;
        case 8:
        cmp = kodinkoneet;
        break;
        case 9:
        cmp = halytysjarjestelma;
        break;
        case 10:
        cmp = paloilmointinjarjestelma;
        break;
        case 11:
        cmp = avain;
        break;
        case 12:
        cmp = turvakamerat;
        break;
        default:
        cmp == null;
    }

    if (cmp != []) {
        myGamePiece = new component("red", cmp[0], cmp[1], cmp[2]);
    }

    for (var i = 0; i < oog.length; i++) {
        for (var o = 0; o < oog[i].length; o++) {
         if (rikkinaiset.indexOf() == -1) {
            myGamePiece = new component("yellow", oog[i][0], oog[i][1], oog[i][2]);
        }
    }
}
}

// palauta vihreä väri kaikkiin
function resetComponents() {
    // 1. sulakkeet
    myGamePiece = new component("green", sulakkeet[0], sulakkeet[1], sulakkeet[2]);
    // 2. verkko
    myGamePiece = new component("green", verkko[0], verkko[1], verkko[2]);
    // 3. tietokone
    myGamePiece = new component("green", tietokone[0], tietokone[1], tietokone[2]);
    // 4. aurinkokennot
    myGamePiece = new component("green", aurinkokennot[0], aurinkokennot[1], aurinkokennot[2]);
    // 5. lämmitysjärjestelmä
    myGamePiece = new component("green", lammitysjarjestelma[0], lammitysjarjestelma[1], lammitysjarjestelma[2]);
    // 6. lamput
    myGamePiece = new component("green", lamput[0], lamput[1], lamput[2]);
    // 7. ilmastointijärjestelmä
    myGamePiece = new component("green", ilmastointijarjestelma[0], ilmastointijarjestelma[1], ilmastointijarjestelma[2]);
    // 8. kodinkoneet
    myGamePiece = new component("green", kodinkoneet[0], kodinkoneet[1], kodinkoneet[2]);
    // 9. hälytysjärjestelmä
    myGamePiece = new component("green", halytysjarjestelma[0], halytysjarjestelma[1], halytysjarjestelma[2]);
    // 10. paloilmointinjärjestelmä
    myGamePiece = new component("green", paloilmointinjarjestelma[0], paloilmointinjarjestelma[1], paloilmointinjarjestelma[2]);
    // 11. äly-avain
    myGamePiece = new component("green", avain[0], avain[1], avain[2]);
    // 12. turvakamerat
    myGamePiece = new component("green", turvakamerat[0], turvakamerat[1], turvakamerat[2]);

}

function launchIntoFullscreen(element) {
	  if(element.requestFullscreen) {
		element.requestFullscreen();
	  } else if(element.mozRequestFullScreen) {
		element.mozRequestFullScreen();
	  } else if(element.webkitRequestFullscreen) {
		element.webkitRequestFullscreen();
	  } else if(element.msRequestFullscreen) {
		element.msRequestFullscreen();
	  }	
}

$(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e){
 if ((document.fullScreenElement && document.fullScreenElement !== null) || 
    (!document.mozFullScreenElement && !document.webkitFullScreenElement)) {
		document.getElementById("fullScreen").className = "";
    } else {
		document.getElementById("fullScreen").className = "hidden";
	}
});