import { Component, OnInit } from '@angular/core';
import {EmpleadoService} from '../../services/empleado.service'
import { NgForm } from '@angular/forms';
import { Empleado } from 'src/app/model/empleado';


declare var M: any


@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
  providers:[EmpleadoService]
})
export class EmpleadosComponent implements OnInit {

  public ListValue: Array<any> = [];

  constructor(private empleadoService: EmpleadoService ) { }

  ngOnInit() {
  }

  calcular(form: NgForm){

    this.ListValue = [];

    let h:number = 1;
    let x:number = 0.1;
    let method:number = 0;
    let derivada:number = 0;
    let value:number = 0;

    do {

      method = this.method(x)
      derivada = this.derivada(x)

      value = x - method / derivada

      this.ListValue.push({
        x: x,
        method:method,
        derivada:derivada,
        value:value,
        valueOld:value - x
      })

      x = value;

      h++

    } while (h <= 3);


  }

  method(h: number): number{

   return 30 + (Math.PI * Math.pow(h , 3) / 3) - (3*Math.PI*Math.pow(h , 2))

  }

  derivada(h: number): number{

    return Math.PI * Math.pow(h , 2) - 6 * Math.PI * h

  }

}
