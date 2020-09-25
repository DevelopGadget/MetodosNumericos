const Cantidad = 100000;
const Interes = 0.02;
const Index = 4;

var Result = 0;
var Compuesto = 0;
var ResultFor = Cantidad;

function CalcularInteres() {
  if (Index < 0) console.log("debe ingresar un Index mayor o igual a 0");
  else {
    Result = RecursiveFunction(Index);
    SolutionWithFor();
    Compuesto = Math.pow((1 + Interes), Index) * Cantidad;
  }
}

function RecursiveFunction(index) {
  if (index === 0) return Cantidad;
  return (1 + Interes) * RecursiveFunction(index - 1);
}

function SolutionWithFor() {
  for (let a = 1; a <= Index; a++) {
    ResultFor = (1 + Interes) * ResultFor;
  }
}

function ImprimirInteres() {
  console.log("Cantidad original del préstamo: " + Cantidad);
  console.log("Interés fraccional : " + Interes);
  console.log("Posición a buscar : " + Index);
  console.log("El interés compuesto es formula 1 : " + Compuesto);
  console.log("El interés compuesto es estructura repetiva: " + Result);
  console.log("El interés compuesto es estructura for: " + ResultFor);
}

CalcularInteres();
ImprimirInteres();
