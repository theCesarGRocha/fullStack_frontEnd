import { Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { CustomerAddComponent } from './components/customer-add/customer-add.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';

export const routes: Routes = [
    { path: '', component: CustomerListComponent },
    { path: 'customer/add', component: CustomerAddComponent },
    { path: 'customer/edit/:id', component: CustomerEditComponent }
];
