import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { WeatherService } from 'src/app/services/weather.service';
import { trigger, transition, animate, style } from '@angular/animations'

@Component({
  selector: 'location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.scss'],
  animations: [
    trigger('slideInFromTop', [
      transition(':enter', [
        style({ opacity: 0}),
        animate('500ms ease-in', style({ opacity: 1}))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({}))
      ])
    ]),
  ]
})
export class LocationDetailsComponent implements OnInit {
  zipcode: number | any;

  constructor(private weatherService: WeatherService, private messageService: MessageService) { }

  ngOnInit() {
  }

  geocodeZipCode() {
    if (this.zipcode < 0) {
      this.messageService.add({severity:'error', summary:'Location Error', detail: 'Please Provide A Valid Number! It Must Be Positive'});
    } else {
      this.zipcode = this.pad(this.zipcode, 5);
      this.weatherService.geocodeLocation(this.zipcode);
    }
    this.zipcode = null;
  }

  pad(number: number, length: number) {
    let str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
  }
}
