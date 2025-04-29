import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeCustomer } from '../typeCustomer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeCustomerService {

  private api: string = 'http://localhost:8080/types';
  constructor(private http: HttpClient) { }

  getTypeCustomerList(): Observable<TypeCustomer[]>{
      return this.http.get<TypeCustomer[]>(this.api);
    }

  getTypeCustomerById(id: number): Observable<any>{
    return this.http.get<TypeCustomer>(this.api+'/'+id);
  }

}
