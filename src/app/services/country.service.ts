import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CountryService {
  API_KEY = 'countries';
  data: Country[] = [
    {
      "name": "Germany",
      "value": 40632,
      "extra": {
        "code": "de"
      }
    },
    {
      "name": "United States",
      "value": 50000,
      "extra": {
        "code": "us"
      }
    },
    {
      "name": "France",
      "value": 36745,
      "extra": {
        "code": "fr"
      }
    },
    {
      "name": "United Kingdom",
      "value": 36240,
      "extra": {
        "code": "uk"
      }
    },
    {
      "name": "Spain",
      "value": 33000,
      "extra": {
        "code": "es"
      }
    },
    {
      "name": "Italy",
      "value": 35800,
      "extra": {
        "code": "it"
      }
    }
  ];

  _coutries = new BehaviorSubject<Country[]>([]);

  constructor() {}

  initData() {
    window.localStorage.setItem(this.API_KEY, JSON.stringify(this.data));
    this._coutries.next(this.data);
  }

  setCountries(payload: Country[]) {
    window.localStorage.setItem(this.API_KEY, JSON.stringify(payload));
    this._coutries.next(payload);
  }

  getCountries(): Country[] {
    const data = window.localStorage.getItem(this.API_KEY);
    if (typeof(data) === 'string') {
      return JSON.parse(data);
    } else {
      return [];
    }
  }

  get countries() {
    return this._coutries.asObservable();
  }
}
