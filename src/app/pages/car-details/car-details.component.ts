import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Car } from 'src/app/core/models/car';
import { CarsDataService } from 'src/app/shared/services/cars-data.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
})
export class CarDetailsComponent implements OnInit {
  slug: string | undefined;
  carDetails!: Car;

  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private carsDataService: CarsDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(switchMap((params) => params.getAll('slug')))
      .subscribe((data) => {
        this.slug = data;

        this.getCarInfo(this.slug);
      });
  }

  getCarInfo(carName: any): void {
    this.carsDataService.getCarInfo(carName).subscribe((data: Car) => {
      this.carDetails = data;
    });
  }

  goToCatalogue(): void {
    this.router.navigate(['cars']);
    // this.router.navigate(['cars', carSlug])
  }
}
