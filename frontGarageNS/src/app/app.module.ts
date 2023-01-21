import { MaterialModule } from './material/material.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginSigninComponent } from './components/login-signin/login-signin.component';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { TemplateComponent } from './pages/template/template.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddCarComponent } from './pages/add-car/add-car.component';
import { CarCardComponent } from './components/car-card/car-card.component';
import { CarDepositComponent } from './pages/car-deposit/car-deposit.component';
import { CarRepairProgressionComponent } from './pages/car-repair-progression/car-repair-progression.component';
import { CarInvoiceComponent } from './pages/car-invoice/car-invoice.component';
import { CarInvoiceDetailsComponent } from './pages/car-invoice-details/car-invoice-details.component';
import { HomeComponent } from './pages/home/home.component';
import { CarTypeColorComponent } from './components/car-type-color/car-type-color.component';
import { SliderComponent } from './components/slider/slider.component';
import { CarCardProgressComponent } from './components/car-card-progress/car-card-progress.component';
import { BoCarProgressionComponent } from './pages/bo-car-progression/bo-car-progression.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginSigninComponent,
    ErrorpageComponent,
    HeaderComponent,
    TemplateComponent,
    FooterComponent,
    AddCarComponent,
    CarCardComponent,
    CarDepositComponent,
    CarRepairProgressionComponent,
    CarInvoiceComponent,
    CarInvoiceDetailsComponent,
    HomeComponent,
    CarTypeColorComponent,
    SliderComponent,
    CarCardProgressComponent,
    BoCarProgressionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
