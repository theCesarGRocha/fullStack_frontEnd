import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CustomerService } from '../../service/customer.service';
import { Customer } from '../../customer';
import { NgFor, NgIf } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TypeCustomer } from '../../typeCustomer';
import { TypeCustomerService } from '../../service/type-customer.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-customer-edit',
  imports: [NgIf, NgFor, FormsModule, ReactiveFormsModule],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.css'
})
export class CustomerEditComponent implements OnInit {

  customerId: number | null = 0;
  customer: Customer | undefined;
  typeCustomerList: TypeCustomer[] = [];
  typeCustomer!: TypeCustomer;

  customerForm = new FormGroup({
    id: new FormControl<number>(0),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    birthDate: new FormControl('', [Validators.required]),
    typeCustomer: new FormControl<number | null>(null, [Validators.required])
  });

  constructor(private route: ActivatedRoute, private customerService: CustomerService, 
    private router: Router, private typeCustomerService: TypeCustomerService ){
    
  }
  ngOnInit(): void {
    this.typeCustomerService.getTypeCustomerList().subscribe(data => {
      this.typeCustomerList = data;
    });

    this.route.paramMap.subscribe((params: ParamMap) => {
      let customerId = params.get('id');
      if(customerId != null){
        //this.customerId = +customerId!;
        this.customerService.getCustomerById(+customerId!).subscribe(
          response => {
              this.customer = response;
              console.log("Customer: ", this.customer);
              this.customerForm.setValue({
                id: Number(this.customer?.id),
                firstName: this.customer?.firstName || "",
                lastName: this.customer?.lastName || "",
                email: this.customer?.email || "",
                birthDate: this.customer?.birthDate || "",
                typeCustomer: this.customer?.typeCustomer?.id ?? null
              });
          }
        );
      }
      
    });
  }

  async updateCustomer(){
    if(this.customer){
      this.typeCustomer = await firstValueFrom( this.typeCustomerService.getTypeCustomerById(+this.customerForm.value.typeCustomer!) );
      
      this.customer = new Customer(
        Number(this.customerForm.value.id), 
        this.customerForm.value.firstName || "", 
        this.customerForm.value.lastName || "", 
        this.customerForm.value.email || "",
        this.customerForm.value.birthDate || "",
        this.typeCustomer);

      this.customerService.updateCustomer(this.customer).subscribe(
        data => {
          this.customer = data;
          this.router.navigateByUrl('');
        }
      );
    }
  }

}
