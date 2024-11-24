import { Component, OnInit } from '@angular/core';
import { WorkPlace } from '../../interfaces/work-place';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {WorkPlaceService} from '../../services/work-place.service';
import {MatDialog} from '@angular/material/dialog';
import {InsertWorkPlaceComponent} from '../insert-work-place/insert-work-place.component';
import {EditWorkPlaceComponent} from '../edit-work-place/edit-work-place.component';
import { CountriesService } from '../../services/countries-service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit  {

  workPlaces: WorkPlace[] = [];
  visibleMenus: { [key: number]: boolean } = {};
  countryCodeMap: { [name: string]: string } = {};

  constructor(
    private plantService: WorkPlaceService,
    private dialog: MatDialog,
    private CountriesService:  CountriesService
  ) { }

  ngOnInit(): void {
    this.fetchPlants();
  }

  fetchPlants(): void {
    this.plantService.getPlants().subscribe({
      next: (data) => {
        this.workPlaces = data;
      },
      error: (error) => {
        console.error('Error al obtener plantas:', error);
      },
    });

    this.CountriesService.getCountryCodeMap().subscribe((map) => {
      this.countryCodeMap = map;
    });
  }

  openInsertPlantModal() {
    const dialogRef = this.dialog.open(InsertWorkPlaceComponent, {
      width: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchPlants();
    });
  }

  openEditWorkPlaceModal(workplace: WorkPlace) {
    const dialogRef = this.dialog.open(EditWorkPlaceComponent, {
      width: '1600px',
      disableClose: true,
      data: workplace
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchPlants();
    });
  }


  toggleMenu(index: number): void {
    this.visibleMenus = {};
    this.visibleMenus[index] = !this.visibleMenus[index];
  }

  closeMenu(): void {
    this.visibleMenus = {};
  }


  editWorkPlace(workplace: WorkPlace): void {
    this.openEditWorkPlaceModal(workplace)
    this.fetchPlants();
  }


  deleteWorkPlace(workplace: any): void {
    this. plantService.deleteWorkPlace(workplace.id).subscribe({
      next: () => {
        this.fetchPlants();
      },
      error: (error) => {
        console.error('Error al eliminar la planta:', error);
      }
    });
  }

  getCountryCode(country: string): string {
    return this.countryCodeMap[country] || 'unknown';
  }



}
