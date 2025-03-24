let tour = "X";
let cases = document.querySelectorAll(".case");
let recommencer = document.getElementById("recommencer");

// Fonction pour jouer un coup
function jouerCoup(caseId) {
    let caseCourante = document.getElementById(caseId);
    if (caseCourante.textContent === "") {
        caseCourante.textContent = tour;
        verifierGagnant();
        tour = (tour === "X")? "O" : "X";
    }
}

// Fonction pour vérifier si il y a un gagnant
function verifierGagnant() {
    let combinaisons = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ];
    for (let i = 0; i < combinaisons.length; i++) {
        let case1 = document.getElementById(`case-${combinaisons[i][0]}`);
        let case2 = document.getElementById(`case-${combinaisons[i][1]}`);
        let case3 = document.getElementById(`case-${combinaisons[i][2]}`);
        if (case1.textContent === case2.textContent && case2.textContent === case3.textContent && case1.textContent!== "") {
            alert(`Le joueur ${case1.textContent} a gagné!`);
            recommencer.style.display = "block";
            return;
        }
    }
    if (tour === "X" &&!verifierMatchNul()) {
        alert("Match nul!");
        recommencer.style.display = "block";
    }
}

// Fonction pour vérifier si c'est un match nul
function verifierMatchNul() {
    for (let i = 0; i < cases.length; i++) {
        if (cases[i].textContent === "") {
            return true;
        }
    }
    return false;
}

// Ajouter un événement click sur chaque case
for (let i = 0; i < cases.length; i++) {
    cases[i].addEventListener("click", function() {
        jouerCoup(cases[i].id);
    });
}

// Ajouter un événement click sur le bouton recommencer
recommencer.addEventListener("click", function() {
    for (let i = 0; i < cases.length; i++) {
        cases[i].textContent = "";
    }
    tour = "X";
    recommencer.style.display = "none";
});