import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent implements OnInit {
  countries: Country[] = [];
  formCountry!: FormGroup;
  isEditing: boolean = false;
  indexEdit!: number;

  constructor(
    private coutryService: CountryService,
    private formBuilder: FormBuilder
  ) {
    this.coutryService.initData();
  }

  ngOnInit() {
    this.countries = this.coutryService.getCountries();

    this.formCountry = this.formBuilder.group({
      name: ['' ,Validators.required],
      value: ['', Validators.required],
      code: ['', Validators.required]
    });
  }

  removeCountry(index: number) {
    if (this.isEditing && index == this.indexEdit) {
      this.isEditing = false;
      this.formCountry.reset();
    } else {
      this.countries.splice(index, 1);
    }
    this.coutryService.setCountries(this.countries);
    this.indexEdit = -1;
  }

  submit() {
    const formValues = this.formCountry.getRawValue();
    if (this.isEditing) {
      this.countries[this.indexEdit] = {
        name: formValues.name,
        value: formValues.value,
        extra: {
          code: formValues.code
        }
      }
      this.isEditing = false;
    } else {
      const newCountry: Country = {
        name: formValues.name,
        value: formValues.value,
        extra: {
          code: formValues.code
        }
      }
      this.countries.push(newCountry);
    }
    this.coutryService.setCountries(this.countries);
    this.formCountry.reset();
    this.indexEdit = -1;
  }

  onEdit(index: number) {
    this.isEditing = true;
    this.indexEdit = index;

    this.formCountry.get('name')?.setValue(this.countries[this.indexEdit].name);
    this.formCountry.get('value')?.setValue(this.countries[this.indexEdit].value);
    this.formCountry.get('code')?.setValue(this.countries[this.indexEdit].extra.code);
  }
}
