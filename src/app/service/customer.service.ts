import { Injectable } from '@angular/core';
import { Customer } from '../customer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private api: string = 'http://localhost:8080/customer';
  constructor(private http: HttpClient) { }

  getCustomerList(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.api);
  }

  createCustomer(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(this.api+'/save', customer)
  }

  deleteCustomerById(id: number): Observable<any>{
    return this.http.delete(this.api+'/delete/'+id);
  }

  getCustomerById(id: number): Observable<any>{
    return this.http.get(this.api+'/'+id);
  }
  
  updateCustomer(customer: Customer): Observable<any>{
    return this.http.put(this.api+'/update', customer );
  }
}
