import {Component, OnInit} from '@angular/core';
import { TableComponent } from "../table/table.component";
import { CardData } from '../../interfaces/card-data';
import { CardService } from '../../services/card-service';
import {CommonModule} from '@angular/common';
import { SidebarComponent } from "../sidebar/sidebar.component";
import {WorkPlaceService} from '../../services/work-place.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-dash-board',
  standalone: true,
  imports: [TableComponent, CommonModule, SidebarComponent],
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent{

  yellowAlerts: number = 0;
  redAlerts: number = 0;
  sensors: number = 0;
  readings: number = 0;

  cards: CardData[] = [];
  cardsDown: CardData[] = [];

  userName: string = '';

  constructor(private cardService: CardService, private workPlaceService: WorkPlaceService ) {

   }

  ngOnInit(): void {
    this.workPlaceService.getSummary().subscribe(
      (summary) => {
        console.log(summary);
        this.yellowAlerts = summary.yellowAlerts;
        this.redAlerts = summary.redAlerts;
        this.sensors = summary.sensors;
        this.readings = summary.readings;

        this.cardService.getCardsUp().subscribe((data: CardData[]) => {
          this.cards = data.map((card) => {
            switch (card.title) {
              case 'Alertas medias':
                card.count = this.yellowAlerts;
                break;
              case 'Alertas Rojas':
                card.count = this.redAlerts;
                break;
              case 'Sensores deshabilitados':
                card.count = this.sensors;
                break;
              case 'Lecturas ok':
                card.count = this.readings;
                break;
            }
            return card;
          });
        });

        this.cardService.getCardsDown().subscribe(data => {
          this.cardsDown = data;
        });

        this.setUserNameFromToken();
      },
      (error) => {
        console.error('Error al obtener los datos del resumen:', error);
      }
    );
  }

  setUserNameFromToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const helper = new JwtHelperService();

      const decodedToken = helper.decodeToken(token);
  

      this.userName = decodedToken.userDate.username || '';
    }
  }






}
