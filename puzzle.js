let simulate = false;
const b = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0]);

function activate(img) {
    if (document.getElementById("solve").disabled == true) return;

    const id = parseInt(img.id);
    replace(img);
    if (simulate) {
        const up = id >= 3 ? id - 3 : undefined;
        const down = id < 6 ? id + 3 : undefined;
        const left = id % 3 !== 0 ? id - 1 : undefined;
        const right = (id + 1) % 3 !== 0 ? id + 1 : undefined;
        if (up != undefined) replace(document.getElementById(up));
        if (down != undefined) replace(document.getElementById(down));
        if (left != undefined) replace(document.getElementById(left));
        if (right != undefined) replace(document.getElementById(right));
    }
}

function replace(img) {
    const id = parseInt(img.id);
    if (img.src.match("images/green.gif")) {
        b[id] = 0;
        img.src = "images/red.gif";
    } else {
        b[id] = 1;
        img.src = "images/green-in-between.gif";
        setTimeout(function() {
            img.src = "images/green.gif"
        }, 650);
    }
}

function toggleSimulation(document) {
    simulate = !simulate;
    document.getElementById("simulate").innerHTML = simulate ? "Stop Simulation" : "Simulate";
}

function solve(document) {

    const combinations = [
        [0, 2, 5, 6, 7],
        [4, 6, 7, 8],
        [0, 2, 3, 7, 8],
        [2, 4, 5, 8],
        [1, 3, 4, 5, 7],
        [0, 3, 4, 6],
        [0, 1, 5, 6, 8],
        [0, 1, 2, 4],
        [1, 2, 3, 6, 8]];


    const solutions = combinations.map(combination => combination.reduce((acc, index) => acc ^ (1 ^ b[index]), 0));

    for (let i = 0; i < solutions.length; i++) {
        if (solutions[i] != 1) document.getElementById(i).style = "opacity: 0.3;"
    }
    document.getElementById("solve").disabled = true;
}

function reset(document) {
    for (let i = 0; i < b.length; i++) {
        b[i] = 0;
        document.getElementById(i).src = "images/red.gif";
        document.getElementById(i).style = "opacity: 1;"
    }
    document.getElementById("solve").disabled = false;
}

function newPuzzle(document) {
    reset(document)
    for (let i = 0; i < b.length; i++) {
        b[i] = Math.floor(Math.random() * 2);
        if (b[i] == 1) replace(document.getElementById(i))
    }
}
