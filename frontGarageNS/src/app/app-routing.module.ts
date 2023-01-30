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
import { BoTemplateComponent } from './pages/bo-template/bo-template.component';
import { BoDepotComponent } from './pages/bo-depot/bo-depot.component';
import { BoCarProgressionComponent } from './pages/bo-car-progression/bo-car-progression.component';
import { BoCarDepotDetailComponent } from './pages/bo-car-depot-detail/bo-car-depot-detail.component';
import { BoInvoiceDetailsComponent } from './pages/bo-invoice-details/bo-invoice-details.component';
import { BoInvoiceComponent } from './pages/bo-invoice/bo-invoice.component';

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
      { path: "cars-invoice-details/:id", component: CarInvoiceDetailsComponent },
      { path: "home", component: HomeComponent },
    ]
  },
  {
    path: "Bo", component: BoTemplateComponent,
    children: [
      { path: "depot", component: BoDepotComponent },
      { path: "depot-details/:id", component: BoCarDepotDetailComponent },
      { path: "progression", component: BoCarProgressionComponent },
      { path: "cars-invoice-details/:id", component: BoInvoiceDetailsComponent },
      { path: "cars-invoice", component: BoInvoiceComponent }
    ]
  },
  { path: "**", component: ErrorpageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
