import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormInterface } from 'src/app/model/form';
import { FormModel } from 'src/app/model/form-model';
import iziToast from 'iziToast';
import { EmpleadoService } from '../../services/empleado.service'

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  providers: [EmpleadoService]
})
export class EmpleadosComponent implements OnInit {

  public createForm = new FormModel(this.fb);
  public isCalc: boolean = false;
  public isDerivada: boolean = true;

  public formModel: FormGroup;
  public functionsCp: FormArray;

  public t1: number = 0;
  public t2: number = 0;
  public i: number = 0;
  //numero de moles
  public moles: number = 1;
  //H = numeros de intervalos
  public h: number = 0;
  //puntos en los intervalos
  public tableT: number[] = [];
  public defaultValueH: number[] = [25.186, 27.254, 29.408, 31.64, 33.942, 36.307, 38.732,
    41.209, 43.736, 46.307, 48.919, 51.568, 54.252, 58.966, 59.71];

  public defaultValueCP: number[] = [40.461, 42.256, 43.881, 45.355, 46.695, 47.917, 49.034,
      50.055, 50.989, 51.843, 52.624, 53.339, 53.994, 54.593, 55.144];

  orderForm: FormGroup = new FormGroup({

  });
  resultado: number;

  constructor(public fb: FormBuilder) {

  }

  ngOnInit() {
    this.formModel = this.createForm.FormModel();
  }

  //Este metodo permite calcular el salto entre punto
  private calcularIntervalos(temperature1: number, temperature2: number, iteraciones: number): number {
    return (temperature2 - temperature1) / iteraciones;
  }

  //ete metodo permite calcular el valor de un punto
  private calcularValorEntreIntervalor(i: number, h: number, temperature1: number): number {
    return i * h + temperature1;
  }

  private integral(): number {
    return this.moles * (this.h * (this.functionsCpGet.controls[0].get('functionCP').value / 2 +
      this.sumatoria(1, this.i + 1, 0) + this.functionsCpGet.controls[this.functionsCpGet.controls.length - 1].get('functionCP').value / 2));
  }

  private sumatoria(currentIndex: number, limit: number, currentValue: number): number {
    if (currentIndex > limit) return currentValue;
    return this.sumatoria(currentIndex + 1, this.functionsCpGet.length - 2, currentValue + this.functionsCpGet.controls[currentIndex].get('functionCP').value);
  }

  get functionsCpGet(): FormArray {
    return this.formModel.get('functionsCP') as FormArray;
  }

  crear(isDerivada: boolean) {
    this.isCalc = false;
    this.isDerivada = isDerivada;
    this.t1 = this.formModel.get('temperatura1').value;
    this.t2 = this.formModel.get('temperatura2').value;
    this.i = this.formModel.get('numIteraciones').value;
    this.moles = this.formModel.get('mol').value;
    this.h = this.calcularIntervalos(this.t1, this.t2, this.i);
    this.tableT = Array.from({ length: this.i + 1 }, (_, index) => {
      this.functionsCpGet.push(this.createForm.FormModelArray());
      return this.calcularValorEntreIntervalor(index, this.h, this.t1);
    });
  }

  public calcularIntegral() {

    this.resultado = this.integral()
    this.isCalc = true;
    console.log(this.tableT)

  }


  public areaBajoLacurva(index: number): number {
    if (!index) return 0;
    return (this.tableT[index] - this.getValueRow(this.tableT, index)) *
      (this.functionsCpGet.controls[index].get('functionCP').value + this.getValueRowControls(index)) / 2
  }

  public acumuladoCurva(index: number): number {
    if (!index) return 0;
    return this.areaBajoLacurva(index) + this.acumuladoCurva(index - 1);
  }

  private getValueRow(table: number[], index: number): any {
    return typeof table[index - 1] === 'number' ? table[index - 1] : 0;
  }

  private getValueRowControls(index: number): any {
    const numberIndex = this.functionsCpGet.controls[index - 1].get('functionCP').value;
    return typeof numberIndex === 'number' ? numberIndex : 0;
  }

  public derivadaNumerica(index: number): number {
    const numberIndexCurrent = this.functionsCpGet.controls[index].get('functionCP').value;
    const numberIndexNew = this.functionsCpGet.controls[index + 1].get('functionCP').value;
    return (numberIndexNew - numberIndexCurrent) / (this.tableT[index + 1] -this.tableT[index])
  }

  valoresDefault() {
    this.functionsCpGet.controls.forEach((item, index) => {
      item.get('functionCP').setValue(this.isDerivada ? this.defaultValueH[index] : this.defaultValueCP[index]);
    });
  }

}
