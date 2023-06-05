import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, filter } from 'rxjs';
import { Car } from 'src/app/core/models/car';
import { DropdownItem } from 'src/app/core/models/dropdownItem';
import { CarModels } from 'src/app/shared/constants/carModels';
import { FuelType } from 'src/app/shared/constants/fuelType';
import { Transmission } from 'src/app/shared/constants/transmission';
import { Years } from 'src/app/shared/constants/years';
import { CarsDataService } from 'src/app/shared/services/cars-data.service';

@Component({
  selector: 'fa-catalogue-cars',
  templateUrl: './catalogue-cars.component.html',
  styleUrls: ['./catalogue-cars.component.scss'],
})
export class CatalogueCarsComponent implements OnInit {
  cars!: Car[];
  filteredCars!: Car[];
  @Input() isShortList = false;
  filterOn = false;
  isEmptyList = false;
  filterForm!: FormGroup;
  models!: DropdownItem[];
  years!: any[];
  transmission!: DropdownItem[];
  fuelType!: DropdownItem[];
  transformedFilterCars: any = {
    byBrand: [],
    byTransmission: [],
    byYear: [],
    byFuel: [],
    byMaxPrice: [],
    byMaxMileage: [],
  };

  constructor(
    private carsDataService: CarsDataService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.models = this.carsDataService.transformEnumToArray(CarModels);
    this.transmission = this.carsDataService.transformEnumToArray(Transmission);
    this.fuelType = this.carsDataService.transformEnumToArray(FuelType);
    this.years = Years.map((x) => ({label: x,
      value: x}));
    this.getCars();

    // const filteredCars = this.cars.filter(this.filterCars);

    this.filterForm = this.formBuilder.group({
      byBrand: new FormControl(),
      byTransmission: new FormControl(),
      byYear: new FormControl(),
      byFuelType: new FormControl(),
      byMaxPrice: new FormControl(),
      byMaxMileage: new FormControl(),
    });

    this.filterForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((filters) => {
        for (let key in filters) {
          if (Array.isArray(filters[key])) {
            if (filters[key]) {
              this.transformedFilterCars[key] = filters[key].map(
                (element: any) => element.value
              );
            }
          } else {
            this.transformedFilterCars[key] = filters[key];
          }
        }
        this.applyFilters();
      });
  }

  applyFilters(): void {
    const filters = this.transformedFilterCars;
    this.filteredCars = this.cars.filter((car: Car) => {
      const isBrandMatch =
        !filters.byBrand ||
        filters.byBrand.length === 0 ||
        filters.byBrand.includes(car.mark);
      const isTransmissionMatch =
        !filters.byTransmission ||
        filters.byTransmission.length === 0 ||
        filters.byTransmission.includes(car.transmission);
      const isFuelTypeMatch =
        !filters.byFuelType ||
        filters.byFuelType.length === 0 ||
        filters.byFuelType.includes(car.fuel);
      const isMaxPriceMatch =
        !filters.byMaxPrice ||
        filters.byMaxPrice.length === 0 ||
        car.priceOnSale <= filters.byMaxPrice;

      const isYearMatch =
        !filters.byYear ||
        filters.byYear.length === 0 ||
        filters.byYear.includes(car.year);
      const isMaxMileageMatch =
        !filters.byMaxMileage ||
        filters.byMaxMileage.length === 0 ||
        car.odometr <= filters.byMaxMileage / 1000;

      return (
        isBrandMatch &&
        isTransmissionMatch &&
        isFuelTypeMatch &&
        isMaxPriceMatch &&
        isMaxMileageMatch &&
        isYearMatch
      );
    });
    if (this.filteredCars) {
      this.isEmptyList = true
    } else {
      this.isEmptyList = false
    }
  }

  getCars(): void {
    this.carsDataService.getAllCars().subscribe((data: Car[]) => {
      this.cars = data;
      if (this.filterOn) {
        this.cars = data.filter((car) =>
          this.CheckAllFilters(car, this.transformedFilterCars)
        );
      } else {
        this.cars = data;
      }
      if (this.isShortList) {
        this.cars.splice(8);
      }
    });
  }

  resetFilters(): void {
    this.transformedFilterCars = {
      byBrand: [],
      byTransmission: [],
      byYear: [],
      byFuel: [],
      byMaxPrice: [],
      byMaxMileage: [],
    };
    this.filterForm.reset();
    this.filteredCars = [];
  }

  navigateToCarDetails(carSlug: string): void {
    this.router.navigate(['cars', carSlug]);
  }

  // filterCarsByBrand()

  CheckAllFilters(car: Car, filters: any): boolean {
    // Умови для фільтрування
    // const brand = cars.some(car=> filters.byBrand.indexOf(car.mark) >= 0);
    // const transmission = cars.some(car=> filters.byTransmission.indexOf(car.transmission) >= 0);
    // const fuel = cars.some(car=> filters.byFuel.indexOf(car.fuel) >= 0);
    // const maxPrice = cars.some(car=> car.priceOnSale <= filters.byMaxPrice);
    // const maxMileage = cars.some(car=> car.odometr <= filters.byMaxMileage / 1000);
    const brand = filters.byBrand.indexOf(car.mark) >= 0;
    const transmission = filters.byTransmission === car.transmission;
    const fuel = filters.byFuel.indexOf(car.fuel) >= 0;
    const maxPrice = car.priceOnSale <= filters.byMaxPrice;
    const maxMileage = car.odometr <= filters.byMaxMileage;

    const test = brand && transmission && fuel && maxPrice && maxMileage;
    // Поєднання умов в одну
    return brand || transmission || fuel || maxPrice || maxMileage;
  }
}
