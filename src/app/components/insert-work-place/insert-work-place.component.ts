import { Component } from '@angular/core';
import {CreateWorkPlaceRequest, WorkPlace} from '../../interfaces/work-place';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {WorkPlaceService} from '../../services/work-place.service';
import {CountriesService} from '../../services/countries-service';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-insert-work-place',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './insert-work-place.component.html',
  styleUrl: './insert-work-place.component.css'
})
export class InsertWorkPlaceComponent {

  workPlaceForm: FormGroup;
  countries: string[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private workPlacesService: WorkPlaceService,
    private countriesService: CountriesService,
    private dialogRef: MatDialogRef<InsertWorkPlaceComponent>
  ) {

    this.workPlaceForm = this.fb.group({
      country: [{ value: '',}, [Validators.required]],
      name: ['', Validators.required],

    })}


  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries(): void {
    this.countriesService.getCountries().subscribe({
      next: (data) => {
        this.countries = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar los países:', err);
        this.loading = false;
      },
    });
  }
  onSubmit(): void {
    if (this.workPlaceForm.valid) {
      const newWorkPlace: CreateWorkPlaceRequest = this.workPlaceForm.value;

      this.workPlacesService.createWorkPlace(newWorkPlace).subscribe({
        next: (response:string) => {
          console.log('WorkPlace creado exitosamente:', response);
          this.dialogRef.close();
        },
        error: (err) => {
          console.error('Error al crear el WorkPlace:', err);
        },
      });
    } else {
      this.errorMessage = "complete el formulario antes de enviar los datos"
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

}
