import { Component, OnInit } from '@angular/core';
import { Customer } from '../../customer';
import { CustomerService } from '../../service/customer.service';
import { DatePipe, NgClass, NgFor, NgStyle, UpperCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  imports: [RouterModule, NgFor, UpperCasePipe, DatePipe, NgClass],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];
  hoveredId: number | null = null;
 
  constructor(private customerService : CustomerService){
  }
  ngOnInit(): void {
    this.listCustomers();
  }


  listCustomers(){
    this.customerService.getCustomerList().subscribe(
      data=> {
        this.customers = data;
      }
    );
  }

  deleteCustomer(id: number){
    this.customerService.deleteCustomerById(id).subscribe(
      ()=> this.listCustomers()
    );
  }

}
