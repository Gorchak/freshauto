import { NgModule } from '@angular/core';
import { CarSpinnerComponent } from './components/car-spinner/car-spinner.component';
import { MultiSelectModule } from 'primeng/multiselect';

@NgModule({
  imports: [
  ],
  declarations: [
    CarSpinnerComponent
  ],
  schemas: [
  ],
  exports: [
    CarSpinnerComponent,
    MultiSelectModule,
  ]
})
export class SharedModule {
}
