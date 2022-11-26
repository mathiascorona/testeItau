import { CountryService } from './../../services/country.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-country-chart',
  templateUrl: './country-chart.component.html',
  styleUrls: ['./country-chart.component.scss']
})
export class CountryChartComponent implements OnInit {
  countries!: Country[];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  constructor(
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.countryService.countries.subscribe({
      next: (res) => {
        this.countries = res;
        this.countries = [...this.countries];
      }
    });
  }
}
