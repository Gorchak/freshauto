import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Car } from 'src/app/core/models/car';
import { HttpClient } from '@angular/common/http';
import { MAIN_API_URL } from 'src/app/core/constants/httpRequests';
import { Observable, catchError, map } from 'rxjs';
import { HandleError } from './http-error-handler.service';
import { DropdownItem } from 'src/app/core/models/dropdownItem';

@Injectable({
  providedIn: 'root',
})
export class CarsDataService {
  public handleError!: HandleError;

  constructor(private router: Router, private http: HttpClient) {}

  getAllCars(): Observable<Car[]> {
    const url = `${MAIN_API_URL}/cars/GetOnSale`;

    const allCars = this.http.get<Car[]>(url).pipe(
      map((data: Car[]) => {
        return data;
      })
    );

    // const allCars = this.http.get('assets/tempData.json');
    return allCars;
  }

  getCarInfo(slug: string): any {
    const url = `${MAIN_API_URL}/cars/GetSingle/${slug}`;

    const carInfo = this.http.get<Car>(url).pipe(
      map((data: Car) => {
        return data;
      })
    );

    return carInfo;
  }

  transformEnumToArray(currentEnum: any): DropdownItem[] {
    const transformedArray: DropdownItem[] = [];
  
    for (const itemValue in currentEnum) {
      if (isNaN(Number(itemValue))) {
        transformedArray.push({ label: itemValue, value: currentEnum[itemValue] });
      }
      //  else if (!isNaN(Number(itemValue))) {
      //   transformedArray.push({ label: currentEnum[itemValue], value: currentEnum[itemValue] });
      // }
    }
    
    return transformedArray;
  }
}
