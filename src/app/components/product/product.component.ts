import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  standalone: true,
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
})
export class ProductComponent {

  serviceForm!: FormGroup;

  headers: HttpHeaders;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
    })
  }

  alerts(data: any) {
    Swal.fire({
      title: 'Error!',
      text: data,
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }

  ngOnInit(): void {
    this.serviceForm = this.formBuilder.group({
      inputField: ['', Validators.pattern(/[0-9]/g)],
      selectField: [''],
      ciudad_residencia: new FormControl({ value: '', disabled: true }), 
      direccion: new FormControl({ value: '', disabled: true }),
      primer_nombre: new FormControl({ value: '', disabled: true }),
      segundo_nombre: new FormControl({ value: '', disabled: true }),
      primer_apellido: new FormControl({ value: '', disabled: true }), 
      segundo_apellido: new FormControl({ value: '', disabled: true }), 
      telefono: new FormControl({ value: '', disabled: true }),
    });
  }

  send() {
    console.log('Valores', this.serviceForm.value)
    const request = this.serviceForm.value
    let data: any = {
      tipoDocumento: request.selectField,
      numeroDocumento: request.inputField
    }
    this.postProduct(data).subscribe(
      (response) => {
        console.log('respuesta final del flujo', response);
        this.serviceForm.patchValue(response)
      },
      (error) => {
        console.log(error);
        this.serviceForm.reset()
        if(error.status === 404){
          this.alerts(error.error.mensaje_error)
        }
      }
    );
  }
  
  validNumInput(event: { target: any }): void {
    const input = event.target;
    const inputValue = input.value;
    const number = /^[0-9]+$/;
    if (!number.test(inputValue)) {
      input.value = inputValue.replace(/\D/g, '');
    }
  }

  APIURL: string = 'http://localhost:8090/api/document'


  postProduct(selectProduct: any) {
    const headers = this.headers
    return this.httpClient.post<any>(this.APIURL, selectProduct, { headers })
  }

}
