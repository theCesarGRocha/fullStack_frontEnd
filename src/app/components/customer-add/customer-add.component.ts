import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from '../../customer';
import { CustomerService } from '../../service/customer.service';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { TypeCustomer } from '../../typeCustomer';
import { TypeCustomerService } from '../../service/type-customer.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-customer-add',
  imports: [NgIf, NgFor, ReactiveFormsModule ],
  standalone: true,
  providers: [DatePipe],
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.css'
})
export class CustomerAddComponent implements OnInit {

  constructor(private customerService: CustomerService, public datepipe: DatePipe,
    private typeCustomerService: TypeCustomerService
  ){
    console.log("constructor");
  }

  customerForm!: FormGroup; // Declaración del formulario
  customer: Customer | undefined;
  typeCustomerSelected!: TypeCustomer;
  typeCustomerList: TypeCustomer[] = [];
  
  ngOnInit(): void {
    this.getAllTypeCustomer();
    this.customerForm = new FormGroup({
      id: new FormControl(''),
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthDate: new FormControl('', [Validators.required]),
      typeCustomer: new FormControl<number | null>(null, [Validators.required])
    });
  }

  async addCustomer(){
    this.typeCustomerSelected = await firstValueFrom(
      this.typeCustomerService.getTypeCustomerById(this.customerForm.value.typeCustomer)
    );

    this.customer = new Customer( undefined, 
      this.customerForm.value.firstName, this.customerForm.value.lastName, 
      this.customerForm.value.email,     this.customerForm.value.birthDate,
      this.typeCustomerSelected
      //this.datepipe.transform(this.customerForm.value.birthDate, 'yyyy-MM-dd') 
    );

    console.log(this.customer);
    this.customerService.createCustomer(this.customer).subscribe(
      response => {
        console.log("Se Guardo el customer: " , response);
        this.customerForm.reset();
      }
    );
  }
  
  getAllTypeCustomer(){
    this.typeCustomerService.getTypeCustomerList().subscribe(
      response => {
        this.typeCustomerList = response;
      }
    );
  }
}
