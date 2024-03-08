var b = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0]);
var simulate = false;

var combinations = [
    [0, 2, 5, 6, 7],
    [4, 6, 7, 8],
    [0, 2, 3, 7, 8],
    [2, 4, 5, 8],
    [1, 3, 4, 5, 7],
    [0, 3, 4, 6],
    [0, 1, 5, 6, 8],
    [0, 1, 2, 4],
    [1, 2, 3, 6, 8]];

function activate(img) {
    if (document.getElementById("solve").disabled == true) return;

    if (simulate) {
        const id = parseInt(img.id);
        replace(img);
        const up = id >= 3 ? id - 3 : undefined;
        const down = id < 6 ? id + 3 : undefined;
        const left = id % 3 !== 0 ? id - 1 : undefined;
        const right = (id + 1) % 3 !== 0 ? id + 1 : undefined;
        if (up != undefined) replace(document.getElementById(up));
        if (down != undefined) replace(document.getElementById(down));
        if (left != undefined) replace(document.getElementById(left));
        if (right != undefined) replace(document.getElementById(right));
    } else {
       replace(img);
    }
}

function replace(img) {
    console.log(img.id)
    if (img.src.match("images/green.gif")) {
        b[parseInt(img.id)] = 0;
        img.src = "images/red.gif";
    } else {
        b[parseInt(img.id)] = 1;
        img.src = "images/green-in-between.gif";
        setTimeout(function() {
            img.src = "images/green.gif"
        }, 650);
    }
}

function toggleSimulation(document) {
    simulate = !simulate;
    if (simulate) {
        document.getElementById("simulate").innerHTML = "Stop Simulation";
    } else {
        document.getElementById("simulate").innerHTML = "Simulate";
    }
}

function solve(document) {
    let solutions = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (let i = 0; i < combinations.length; i++) {
        for (let j = 0; j < combinations[i].length; j++) {
            solutions[i] ^= (1 ^ b[combinations[i][j]]);
        }
    }

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