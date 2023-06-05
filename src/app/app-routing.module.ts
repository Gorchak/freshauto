import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CatalogueCarsComponent } from './pages/catalogue-cars/catalogue-cars.component';
import { CarsDataService } from './shared/services/cars-data.service';
import { CarDetailsComponent } from './pages/car-details/car-details.component';
import { OrderCarComponent } from './pages/order-car/order-car.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'cars', component: CatalogueCarsComponent },
  { path: 'cars/:slug', component: CarDetailsComponent },
  { path: 'order-car', component: OrderCarComponent },
  { path: 'about-us', component: AboutUsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CarsDataService],
})
export class AppRoutingModule {}
