console.log("test")
function zeigeErgebnis() {
  let eingabe = document.getElementById("eingabe").value;
  let ausgabe = document.getElementById("ausgabe");
  let bild = document.getElementById("bild");

  if (eingabe.toLowerCase() === "hallo") {
    ausgabe.innerText = "Hallo! Schön, dich hier zu sehen!";
    bild.style.display = "none";
  } else if (eingabe.toLowerCase() === "github") {
    ausgabe.innerText = "Du benutzt GitHub Pages!";
    bild.style.display = "none";
  } else if (eingabe.toLowerCase() === "bild") {
    ausgabe.innerText = "Hier ist dein Bild:";
    bild.style.display = "block";
  } else {
    ausgabe.innerText = "Ich kenne diese Eingabe nicht.";
    bild.style.display = "none";
  }
}

async function starteSchachprogramm() {
  document.body.innerHTML = ""; // Löscht den Inhalt der Seite
  let h1 = document.createElement("h1");
  let show_input = document.createElement("button")
  var show = false
  show_input.innerText = "Eingabe wird ausgeblendet"
  show_input.onclick = () => {
    let show = show_input.innerText != "Eingabe wird ausgeblendet"
    show_input.innerText =  show ? "Eingabe wird ausgeblendet" : "Eingabe wird angezeigt"
    let inputs = document.getElementsByClassName("input")
    for(let input of inputs){
      console.log(input)
      input.type = show ? "password" : "text"
      console.log(input)
    }
  }
  h1.innerText = "Online-Nebelschachschiedsrichter";
  document.body.appendChild(h1);
  document.body.appendChild(show_input)
  let dialog = document.createElement("div");
  dialog.id = "dialog";
  dialog.style.textAlign = "left";
  dialog.style.margin = "20px";
  dialog.style.padding = "20px";
  dialog.style.border = "1px solid #ccc";
  dialog.style.borderRadius = "10px";
  dialog.style.backgroundColor = "grey";
  document.body.appendChild(dialog);

  var rochadeWeiß = {
    könig_bewegt: false,
    turm_a1_bewegt: false,
    turm_h1_bewegt: false,
  };

  var rochadeSchwarz = {
    könig_bewegt: false,
    turm_a8_bewegt: false,
    turm_h8_bewegt: false,
  };

  const figurenWeiß = [
    "bauer_w",
    "bauer_w",
    "bauer_w",
    "bauer_w",
    "bauer_w",
    "bauer_w",
    "bauer_w",
    "bauer_w",
    "springer_w",
    "springer_w",
    "läufer_w",
    "läufer_w",
    "turm_w",
    "turm_w",
    "dame_w",
    "könig_w",
  ];

  const figurenSchwarz = [
    "bauer_s",
    "bauer_s",
    "bauer_s",
    "bauer_s",
    "bauer_s",
    "bauer_s",
    "bauer_s",
    "bauer_s",
    "springer_s",
    "springer_s",
    "läufer_s",
    "läufer_s",
    "turm_s",
    "turm_s",
    "dame_s",
    "könig_s",
  ];

  const schachbrett = [
    ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
    ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
    ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
    ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
    ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
    ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
    ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
    ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"],
  ];

  let felderVerzeichnis = {
    a8: [0, 0, "turm_s", false, true],
    b8: [0, 1, "springer_s", false, true],
    c8: [0, 2, "läufer_s", false, true],
    d8: [0, 3, "dame_s", false, true],
    e8: [0, 4, "könig_s", false, true],
    f8: [0, 5, "läufer_s", false, true],
    g8: [0, 6, "springer_s", false, true],
    h8: [0, 7, "turm_s", false, true],
    a7: [1, 0, "bauer_s", false, true],
    b7: [1, 1, "bauer_s", false, true],
    c7: [1, 2, "bauer_s", false, true],
    d7: [1, 3, "bauer_s", false, true],
    e7: [1, 4, "bauer_s", false, true],
    f7: [1, 5, "bauer_s", false, true],
    g7: [1, 6, "bauer_s", false, true],
    h7: [1, 7, "bauer_s", false, true],
    a6: [2, 0, "", false, true],
    b6: [2, 1, "", false, true],
    c6: [2, 2, "", false, true],
    d6: [2, 3, "", false, true],
    e6: [2, 4, "", false, true],
    f6: [2, 5, "", false, true],
    g6: [2, 6, "", false, true],
    h6: [2, 7, "", false, true],
    a5: [3, 0, "", false, false],
    b5: [3, 1, "", false, false],
    c5: [3, 2, "", false, false],
    d5: [3, 3, "", false, false],
    e5: [3, 4, "", false, false],
    f5: [3, 5, "", false, false],
    g5: [3, 6, "", false, false],
    h5: [3, 7, "", false, false],
    a4: [4, 0, "", false, false],
    b4: [4, 1, "", false, false],
    c4: [4, 2, "", false, false],
    d4: [4, 3, "", false, false],
    e4: [4, 4, "", false, false],
    f4: [4, 5, "", false, false],
    g4: [4, 6, "", false, false],
    h4: [4, 7, "", false, false],
    a3: [5, 0, "", true, false],
    b3: [5, 1, "", true, false],
    c3: [5, 2, "", true, false],
    d3: [5, 3, "", true, false],
    e3: [5, 4, "", true, false],
    f3: [5, 5, "", true, false],
    g3: [5, 6, "", true, false],
    h3: [5, 7, "", true, false],
    a2: [6, 0, "bauer_w", true, false],
    b2: [6, 1, "bauer_w", true, false],
    c2: [6, 2, "bauer_w", true, false],
    d2: [6, 3, "bauer_w", true, false],
    e2: [6, 4, "bauer_w", true, false],
    f2: [6, 5, "bauer_w", true, false],
    g2: [6, 6, "bauer_w", true, false],
    h2: [6, 7, "bauer_w", true, false],
    a1: [7, 0, "turm_w", true, false],
    b1: [7, 1, "springer_w", true, false],
    c1: [7, 2, "läufer_w", true, false],
    d1: [7, 3, "dame_w", true, false],
    e1: [7, 4, "könig_w", true, false],
    f1: [7, 5, "läufer_w", true, false],
    g1: [7, 6, "springer_w", true, false],
    h1: [7, 7, "turm_w", true, false],
  };

  function zugWechsel(amZug) {
    return amZug === "weiß" ? "schwarz" : "weiß";
  }

  function ask(question) {
    let input = document.createElement("input");
    if (!show) input.type = "password";
    input.classList.add("input");
    input.placeholder = question;

    let button = document.createElement("button");
    button.innerText = "Absenden";

    dialog.appendChild(input);
    dialog.appendChild(button);

    input.focus(); // Setzt den Fokus direkt auf das Eingabefeld

    return new Promise((resolve) => {
        function submit() {
            resolve(input.value);
            input.remove();
            button.remove();
        }

        button.onclick = submit; // Klick auf den Button löst Eingabe aus

        input.addEventListener("keydown", function(event) {
            if (event.key === "Enter") {
                submit();
            }
        });
    });
}
  function confirm() {
    let confirm = document.createElement("button");
    confirm.innerText = "Zug Ausführen";
    dialog.appendChild(confirm);
    let deny = document.createElement("button");
    deny.innerText = "Zug Verwerfen";
    dialog.appendChild(deny);
    return new Promise((resolve) => {
      confirm.onclick = () => {
        resolve("Ja");
        confirm.remove();
        deny.remove();
      };
      deny.onclick = () => {
        resolve("Nein");
        confirm.remove();
        deny.remove();
      };
    });
  }

  function say(message, color, text_align) {
    let text = document.createElement("p");
    text.style.color = color || "black";
    text.innerText = message.charAt(0).toUpperCase() + message.slice(1);
    console.log(text.innerText)
    text.style.textAlign = text_align || "left";
    dialog.appendChild(text);
  }

  function dameBekommen(felderVerzeichnis, zu) {
    const feld = felderVerzeichnis[zu];
    if (feld[2] === "bauer_w" && feld[0] === 0) {
      felderVerzeichnis[zu][2] = "dame_w";
    } else if (feld[2] === "bauer_s" && feld[0] === 7) {
      felderVerzeichnis[zu][2] = "dame_s";
    }
    return felderVerzeichnis;
  }

  function felderReal(felderVerzeichnis, felder) {
    return felder.every((feld) => feld in felderVerzeichnis);
  }

  function richtigerAmZug(felderVerzeichnis, von, amZug) {
    return felderVerzeichnis[von][2].endsWith(amZug[0]);
  }

  function feldZuKoordinate(feld, felderVerzeichnis) {
    return felderVerzeichnis[feld].slice(0, 2);
  }

  function generellMoeglich(
    felderVerzeichnis,
    von,
    zu,
    rochadeWeiss,
    rochadeSchwarz
  ) {
    let zutreffend = true;
    let koordinateVon = felderVerzeichnis[von].slice(0, 2);
    let koordinateZu = felderVerzeichnis[zu].slice(0, 2);
    let anwesendeFigur = felderVerzeichnis[von][2];
    let amZug = anwesendeFigur.slice(-1);

    if (!["bauer_w", "bauer_s"].includes(anwesendeFigur)) {
      anwesendeFigur = anwesendeFigur.slice(0, -2);
    }

    if (anwesendeFigur === "bauer_w") {
      let zugweiteZahl = koordinateVon[0] - koordinateZu[0];
      let zugweiteBuchstabe = koordinateVon[1] - koordinateZu[1];
      zugweiteBuchstabe = Math.abs(zugweiteBuchstabe);
      let differenzen = [zugweiteZahl, zugweiteBuchstabe];

      if (
        ![
          [1, 0],
          [1, 1],
        ].some((arr) => arr.toString() === differenzen.toString())
      ) {
        if (
          !(
            differenzen.toString() === [2, 0].toString() &&
            koordinateVon[0] === 6
          )
        ) {
          zutreffend = false;
        }
      }
    } else if (anwesendeFigur === "bauer_s") {
      let zugweiteZahl = koordinateVon[0] - koordinateZu[0];
      let zugweiteBuchstabe = koordinateVon[1] - koordinateZu[1];
      zugweiteBuchstabe = Math.abs(zugweiteBuchstabe);
      let differenzen = [zugweiteZahl, zugweiteBuchstabe];

      if (
        ![
          [-1, 0],
          [-1, 1],
        ].some((arr) => arr.toString() === differenzen.toString())
      ) {
        if (
          !(
            differenzen.toString() === [-2, 0].toString() &&
            koordinateVon[0] === 1
          )
        ) {
          zutreffend = false;
        }
      }
    } else if (anwesendeFigur === "turm") {
      if (von[0] !== zu[0] && von[1] !== zu[1]) {
        zutreffend = false;
      }
    } else if (anwesendeFigur === "springer") {
      let zugweiteZahl = Math.abs(koordinateVon[0] - koordinateZu[0]);
      let zugweiteBuchstabe = Math.abs(koordinateVon[1] - koordinateZu[1]);
      let differenzen = [zugweiteZahl, zugweiteBuchstabe].sort();

      if (differenzen.toString() !== [1, 2].toString()) {
        zutreffend = false;
      }
    } else if (anwesendeFigur === "läufer") {
      let zugweiteZahl = Math.abs(koordinateVon[0] - koordinateZu[0]);
      let zugweiteBuchstabe = Math.abs(koordinateVon[1] - koordinateZu[1]);

      if (zugweiteZahl !== zugweiteBuchstabe) {
        zutreffend = false;
      }
    } else if (anwesendeFigur === "dame") {
      let zutreffendGerade = von[0] === zu[0] || von[1] === zu[1];
      let zugweiteZahl = Math.abs(koordinateVon[0] - koordinateZu[0]);
      let zugweiteBuchstabe = Math.abs(koordinateVon[1] - koordinateZu[1]);
      let zutreffendDiagonal = zugweiteZahl === zugweiteBuchstabe;

      zutreffend = zutreffendGerade || zutreffendDiagonal;
    } else if (anwesendeFigur === "könig") {
      let zugweiteZahl = Math.abs(koordinateVon[0] - koordinateZu[0]);
      let zugweiteBuchstabe = Math.abs(koordinateVon[1] - koordinateZu[1]);
      let differenzen = [zugweiteZahl, zugweiteBuchstabe].sort();

      if (
        ![1, 1].toString() === differenzen.toString() &&
        ![0, 1].toString() === differenzen.toString()
      ) {
        zutreffend = false;
      }

      if (!zutreffend) {
        let königBewegt, turmBewegt;
        if (amZug === "w") {
          königBewegt = rochadeWeiss.könig_bewegt;
          turmBewegt = rochadeWeiss[`turm_${zu}_bewegt`] || false;
        } else {
          königBewegt = rochadeSchwarz.könig_bewegt;
          turmBewegt = rochadeSchwarz[`turm_${zu}_bewegt`] || false;
        }

        if (!königBewegt && !turmBewegt) {
          let zug = [von, zu];
          if (
            [
              ["e1", "c1"],
              ["e1", "g1"],
              ["e8", "c8"],
              ["e8", "g8"],
            ].some((arr) => arr.toString() === zug.toString())
          ) {
            zutreffend = true;
          }
        }
      }
    } else {
      zutreffend = false;
    }

    return zutreffend;
  }

  function linieErstellen(
    koordinateVon,
    koordinateZu,
    schachfeld,
    von,
    felderVerzeichnis,
    zu
  ) {
    let linie = [];
    if (felderVerzeichnis[von][2].slice(0, -2) !== "springer") {
      let indizien = [];
      if (
        koordinateVon[0] !== koordinateZu[0] &&
        koordinateVon[1] !== koordinateZu[1]
      ) {
        indizien = [0, 1];
      } else if (koordinateVon[1] !== koordinateZu[1]) {
        indizien = [1];
      } else {
        indizien = [0];
      }

      let operatoren = [];
      for (let index of indizien) {
        if (koordinateVon[index] - koordinateZu[index] > 0) {
          operatoren.push("-");
        } else {
          operatoren.push("+");
        }
      }

      let zaehler = 0;
      while (
        koordinateVon.toString() !== koordinateZu.toString() &&
        zaehler < 11
      ) {
        for (let index = 0; index < indizien.length; index++) {
          if (operatoren[index] === "+") {
            koordinateVon[indizien[index]] += 1;
          } else {
            koordinateVon[indizien[index]] -= 1;
          }
        }
        zaehler += 1;
        linie.push([...koordinateVon]);
      }
      linie = linie.slice(0, -1);

      for (let index = 0; index < linie.length; index++) {
        linie[index] = schachfeld[linie[index][0]][linie[index][1]];
      }
    }

    if (
      felderVerzeichnis[von][2].slice(0, -2) === "bauer" &&
      felderVerzeichnis[von][1] === felderVerzeichnis[zu][1]
    ) {
      linie.push(zu);
    }

    return linie;
  }

  function explizitMoeglich(felderVerzeichnis, linie, zu, amZug, von) {
    let zutreffend = true;
    for (let feld of linie) {
      if (felderVerzeichnis[feld][2]) {
        zutreffend = false;
      }
    }

    if (felderVerzeichnis[zu][2].slice(-1) === amZug[0]) {
      zutreffend = false;
    }

    if (felderVerzeichnis[von][2].slice(0, -2) === "könig") {
      let zugweiteBuchstabe =
        felderVerzeichnis[von][1] - felderVerzeichnis[zu][1];
      if ([2, -2].includes(zugweiteBuchstabe) && felderVerzeichnis[zu][2]) {
        zutreffend = false;
      }
    }

    if (
      felderVerzeichnis[von][2].slice(0, -2) === "bauer" &&
      von[0] !== zu[0]
    ) {
      if (!felderVerzeichnis[zu][2]) {
        zutreffend = false;
      }
    }

    return zutreffend;
  }

  function explizitMoeglichGegner(felderVerzeichnis, linie, zu, amZug, von) {
    let zutreffend = true;
    let imWeg = "";
    for (let feld of linie) {
      if (felderVerzeichnis[feld][2]) {
        zutreffend = false;
        imWeg = felderVerzeichnis[feld][2].slice(-1);
        break;
      }
    }

    if (felderVerzeichnis[zu][2].slice(-1) === amZug[0]) {
      zutreffend = false;
    }

    if (felderVerzeichnis[von][2].slice(0, -2) === "könig") {
      let zugweiteBuchstabe =
        felderVerzeichnis[von][1] - felderVerzeichnis[zu][1];
      if ([2, -2].includes(zugweiteBuchstabe) && felderVerzeichnis[zu][2]) {
        zutreffend = false;
      }
    }

    if (
      felderVerzeichnis[von][2].slice(0, -2) === "bauer" &&
      von[0] !== zu[0]
    ) {
      if (!felderVerzeichnis[zu][2]) {
        zutreffend = false;
      }
    }

    return [zutreffend, imWeg];
  }
  function zugAusführen(
    felderVerzeichnis,
    amZug,
    von,
    zu,
    matt,
    rochadeWeiß,
    rochadeSchwarz
  ) {
    if (amZug === "weiß") {
      if (felderVerzeichnis[von][2].startsWith("könig")) {
        rochadeWeiß["könig_bewegt"] = true;
      } else if (von === "a1") {
        rochadeWeiß["turm_a1_bewegt"] = true;
      } else if (von === "h1") {
        rochadeWeiß["turm_h1_bewegt"] = true;
      }
    } else {
      if (felderVerzeichnis[von][2].startsWith("könig")) {
        rochadeSchwarz["könig_bewegt"] = true;
      } else if (von === "a8") {
        rochadeSchwarz["turm_a8_bewegt"] = true;
      } else if (von === "h8") {
        rochadeSchwarz["turm_h8_bewegt"] = true;
      }
    }

    let geschlagen = "";
    if (felderVerzeichnis[zu][2]) {
      geschlagen = felderVerzeichnis[zu][2];
    }
    if (felderVerzeichnis[zu][2].startsWith("könig")) {
      matt = true;
    }
    felderVerzeichnis[zu][2] = felderVerzeichnis[von][2];
    felderVerzeichnis[von][2] = "";

    if (amZug === "weiß" && von === "e1" && zu === "g1") {
      felderVerzeichnis = zugAusführen(
        felderVerzeichnis,
        amZug,
        "h1",
        "f1",
        matt,
        rochadeWeiß,
        rochadeSchwarz
      )[0];
    } else if (amZug === "weiß" && von === "e1" && zu === "c1") {
      felderVerzeichnis = zugAusführen(
        felderVerzeichnis,
        amZug,
        "a1",
        "d1",
        matt,
        rochadeWeiß,
        rochadeSchwarz
      )[0];
    } else if (amZug === "schwarz" && von === "e8" && zu === "g8") {
      felderVerzeichnis = zugAusführen(
        felderVerzeichnis,
        amZug,
        "h8",
        "f8",
        matt,
        rochadeWeiß,
        rochadeSchwarz
      )[0];
    } else if (amZug === "schwarz" && von === "e8" && zu === "c8") {
      felderVerzeichnis = zugAusführen(
        felderVerzeichnis,
        amZug,
        "a8",
        "d8",
        matt,
        rochadeWeiß,
        rochadeSchwarz
      )[0];
    }

    amZug = zugWechsel(amZug);
    felderVerzeichnis = dameBekommen(felderVerzeichnis, zu);
    return [
      felderVerzeichnis,
      amZug,
      geschlagen,
      matt,
      rochadeWeiß,
      rochadeSchwarz,
    ];
  }

  let amZug = "weiß";
  let matt = false;
  let inputVonNotwendig = true;

  while (!matt) {
    let von = "";
    let zu = "";

    while (von === "") {
      if (inputVonNotwendig) {
        von = await ask("Von?");
        von.toLowerCase;
      }

      let möglich = felderReal(felderVerzeichnis, [von]);
      if (möglich) {
        möglich = richtigerAmZug(felderVerzeichnis, von, amZug);
        if (möglich) {
          zu = await ask("Nach?");
          zu.toLowerCase;
          möglich = felderReal(felderVerzeichnis, [zu]);
          if (möglich) {
            let koordinateVon = feldZuKoordinate(von, felderVerzeichnis);
            let koordinateZu = feldZuKoordinate(zu, felderVerzeichnis);
            möglich = generellMoeglich(
              felderVerzeichnis,
              von,
              zu,
              rochadeWeiß,
              rochadeSchwarz
            );
            if (möglich) {
              let linie = linieErstellen(
                koordinateVon,
                koordinateZu,
                schachbrett,
                von,
                felderVerzeichnis,
                zu
              );
              möglich = explizitMoeglich(
                felderVerzeichnis,
                linie,
                zu,
                amZug,
                von
              );
              if (möglich) {
                answer = await confirm();
                if (answer.toLowerCase() != "ja") {
                  von = "";
                }
              } else {
                say("Da steht wohl jemand im Weg.", "red", "center");
                von = "";
              }
            } else {
              say(
                "Das ist kein für die Figur zulässiger Zug.",
                "red",
                "center"
              );
              von = "";
            }
          } else {
            say("Das Feld ist nicht real.", "red", "center");
            von = "";
          }
        } else {
          say(
            "Auf dem Feld steht keine " + amZug + "e Figur.",
            "red",
            "center"
          );
          von = "";
        }
      } else {
        say("Das Feld ist nicht real.", "red", "center");
        von = "";
      }
    }

    [felderVerzeichnis, amZug, geschlagen, matt, rochadeWeiß, rochadeSchwarz] =
      zugAusführen(
        felderVerzeichnis,
        amZug,
        von,
        zu,
        matt,
        rochadeWeiß,
        rochadeSchwarz
      );

    if (geschlagen) {
      say(
        `Es wurde ein ${amZug === "weiß" ? "schwarzer" : "weißer"} ${
          geschlagen.split("_")[0]
        } geschlagen.`,
        "#17E100",
        "center"
      );
    }

    if (!matt) {
      say(
        `${amZug} ist am Zug.`,
        amZug == "schwarz" ? "black" : "white",
        amZug == "schwarz" ? "right" : "left"
      );
      let children = dialog.children;
      for (let i = 0; i < children.length; i++) {
        if (children[i].style.color === "red") {
          dialog.removeChild(children[i]);
        }
      }
      console.log(amZug);
    }
  }

  say(`${amZug === "weiß" ? "Schwarz" : "Weiß"} gewinnt!`, "#17E100", "center");
}

document.addEventListener("DOMContentLoaded", (event) => {
  document.getElementById("nebelBtn").onclick = function () {
    document.body.innerHTML = "";
    console.log("clicked")
    starteSchachprogramm();
  };
});
