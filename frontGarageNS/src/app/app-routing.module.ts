import { HomeComponent } from './pages/home/home.component';
import { CarInvoiceDetailsComponent } from './pages/car-invoice-details/car-invoice-details.component';
import { CarInvoiceComponent } from './pages/car-invoice/car-invoice.component';
import { CarRepairProgressionComponent } from './pages/car-repair-progression/car-repair-progression.component';
import { CarDepositComponent } from './pages/car-deposit/car-deposit.component';
import { AddCarComponent } from './pages/add-car/add-car.component';
import { TemplateComponent } from './pages/template/template.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginSigninComponent } from './components/login-signin/login-signin.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
const routes: Routes = [
  { path: "", redirectTo: 'login', pathMatch: 'full' },
  { path: "login", component: LoginSigninComponent },
  {
    path: "template", component: TemplateComponent,
    children: [
      { path: "your-cars", component: AddCarComponent },
      { path: "cars-deposit", component: CarDepositComponent },
      { path: "cars-reparation", component: CarRepairProgressionComponent },
      { path: "cars-invoice", component: CarInvoiceComponent },
      { path: "cars-invoice-details", component: CarInvoiceDetailsComponent },
      { path: "home", component: HomeComponent },
    ]
  },
  { path: "**", component: ErrorpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
