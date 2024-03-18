import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  APIURL: string = 'localhost:8090/api/document?tipoDocumento'
  constructor(private httpClient: HttpClient) { }
  
  postProduct(selectProduct: any){
    
    return this.httpClient.post<any>(this.APIURL, selectProduct)
  }
}