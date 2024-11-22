import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {WorkPlaceService} from '../services/work-place.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {WorkPlace} from '../interfaces/work-place';
import {NgForOf, NgIf} from '@angular/common';
import {CountriesService} from '../countries-service';

@Component({
  selector: 'app-edit-work-place',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './edit-work-place.component.html',
  styleUrl: './edit-work-place.component.css'
})
export class EditWorkPlaceComponent implements OnInit {
  workPlaceForm: FormGroup;
  countries: string[] = [];
  loading = true;

  constructor(
    private fb: FormBuilder,
    private workPlaceService: WorkPlaceService,
    private countriesService: CountriesService,
    public dialogRef: MatDialogRef<EditWorkPlaceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WorkPlace
  ) {
    console.log('Data recibida en el constructor:', this.data);
    this.workPlaceForm = this.fb.group({
      id: [this.data.id],
      name: [this.data.name, Validators.required],
      country: [this.data.country, Validators.required],
      readings: [this.data.readings, [Validators.required, Validators.min(0)]],
      yellowAlerts: [this.data.yellowAlerts, [Validators.required, Validators.min(0)]],
      redAlerts: [this.data.redAlerts, [Validators.required, Validators.min(0)]],
      sensors: [this.data.sensors, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.loadCountries()
  }

  onSubmit(): void {
    if (this.workPlaceForm.valid) {
      const workPlace = this.workPlaceForm.value;
      const id = workPlace.id;

      this.workPlaceService.updateWorkPlace(id, workPlace).subscribe({
        next: () => {
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error al actualizar la planta:', err);
        },
      });
    }
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

  onCancel(): void {
    this.dialogRef.close();
  }
}
