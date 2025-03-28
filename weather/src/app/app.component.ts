import { Component, OnInit } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slideInFromTop', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('300ms ease-in', style({ transform: 'translateY(0%)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateY(-100%)' })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'weather';

  public showAddLocationButton: boolean = true;

  constructor(
    private router: Router,
    private messageService: MessageService,
    public weatherService: WeatherService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (this.router.url.includes('location-details')) {
        this.showAddLocationButton = false;
      } else {
        this.showAddLocationButton = true;
      }
    });
    if (
      this.weatherService.getFromSessionStorage('notified') == null ||
      this.weatherService.getFromSessionStorage('notified') == false
    ) {
      setTimeout(() => {
        this.messageService.add({
          severity: 'info',
          sticky: true,
          summary: 'Please Note',
          detail: 'All Data Will Be Updated Every Thirty Minutes!',
        });
      }, 1000);
      this.weatherService.createInSessionStorage('notified', true);
    }
  }
}
