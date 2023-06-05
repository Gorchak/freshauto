import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbartopComponent } from './components/navbartop/navbartop.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { FilterCarComponent } from './components/filter-car/filter-car.component';
import { CatalogueCarsComponent } from './pages/catalogue-cars/catalogue-cars.component';
import { AppRoutingModule } from './app-routing.module';
import { CarDetailsComponent } from './pages/car-details/car-details.component';
import { OrderCarComponent } from './pages/order-car/order-car.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OurExperienceComponent } from './components/our-experience/our-experience.component';
import { OurContactsComponent } from './components/our-contacts/our-contacts.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { APP_BASE_HREF } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleriaModule } from 'primeng/galleria';
import { NgwWowModule } from 'ngx-wow';

@NgModule({
  declarations: [
    AppComponent,
    NavbartopComponent,
    FooterComponent,
    HomepageComponent,
    FilterCarComponent,
    CatalogueCarsComponent,
    CarDetailsComponent,
    OrderCarComponent,
    OurExperienceComponent,
    OurContactsComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
    GalleriaModule,
    NgwWowModule
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
