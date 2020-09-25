var X = 100;
var Y = 0;

function CalcularValores() {
  do {
    if (X >= 70) {
      Y = 5 * X;
      X = 5;
    } else {
      X -= 2;
    }
  } while (X >= 50);
}

function ImprimirValores() {
  console.log("X: " + X);
  console.log("Y: " + Y);
}

ImprimirValores();
CalcularValores();
ImprimirValores();
