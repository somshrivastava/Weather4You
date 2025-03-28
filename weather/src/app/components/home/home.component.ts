import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Subscription } from 'rxjs';
import { Weather } from 'src/app/interfaces/weather.interface';
import { WeatherService } from 'src/app/services/weather.service';
import firebase from 'firebase/app';
import { Forecast } from 'src/app/interfaces/forecast.interface';
import { trigger, transition, animate, style } from '@angular/animations';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

declare const google: any;

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slideInFromLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate(
          '500ms ease-in',
          style({ transform: 'translateX(0%)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
    trigger('slideInFromRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '500ms ease-in',
          style({ transform: 'translateX(0%)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  private location: any;

  public todayWeather: Weather;

  public forecast: Forecast[];

  public date: any = {};

  public mapInformation: { center: any; zoom: number };

  public isPopUp: boolean;

  public popUpAction: string;

  public isLoaded: boolean = false;

  constructor(
    private weatherService: WeatherService,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.date = this.weatherService.returnDate(new Date());

    this.subscribeToLocation();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  subscribeToLocation() {
    this.weatherService.loadLocation();
    this.subscriptions.add(
      this.weatherService.location$.subscribe((location: any) => {
        if (location) {
          if (location.latitude == 'USER DENIED ACCESS') {
            this.router.navigate(['location-details']);
          } else {
            this.location = location;
            this.subscribeToWeatherInformation();
          }
        }
      })
    );
  }

  loadWeatherInformation() {
    const lastUpdated = this.weatherService.getFromLocalStorage('lastUpdated');
    let expectedMinutes = lastUpdated + 30;
    if (expectedMinutes > 60) {
      expectedMinutes - 60;
    }
    if (lastUpdated == null || new Date().getMinutes() >= expectedMinutes) {
      this.weatherService.loadTodayWeather(
        this.location['latitude'],
        this.location['longitude']
      );
      this.weatherService.loadForecast(
        this.location['latitude'],
        this.location['longitude']
      );
    } else {
      this.weatherService.loadTodayWeatherFromStorage();
      this.weatherService.loadForecastFromStorage();
    }
  }

  subscribeToWeatherInformation() {
    this.loadWeatherInformation();
    this.subscriptions.add(
      combineLatest(
        this.weatherService.todayWeather$,
        this.weatherService.forecast$
      ).subscribe(([todayWeather, forecast]: any) => {
        if (todayWeather && forecast) {
          this.loadTodayWeather(todayWeather);
          this.loadForecast(forecast);
          this.loadMap();
          this.isLoaded = true;
        }
      })
    );
  }

  loadTodayWeather(todayWeather: any) {
    this.todayWeather = {
      city: todayWeather.name,
      country: todayWeather.sys.country,
      latitude: todayWeather.coord.lat,
      longitude: todayWeather.coord.lon,
      temperature: this.weatherService.translateKelvinToFarenheit(
        todayWeather.main.temp
      ),
      feelsLikeTemperature: this.weatherService.translateKelvinToFarenheit(
        todayWeather.main.feels_like
      ),
      maximumTemperature: this.weatherService.translateKelvinToFarenheit(
        todayWeather.main.temp_max
      ),
      minimumTemperature: this.weatherService.translateKelvinToFarenheit(
        todayWeather.main.temp_min
      ),
      humidity: todayWeather.main.humidity,
      pressure: todayWeather.main.pressure,
      windSpeed: todayWeather.wind.speed,
      windDirection: todayWeather.wind.deg,
      description: todayWeather.weather[0].description
        .split(' ')
        .map((word: string) => {
          return word[0].toUpperCase() + word.substring(1);
        })
        .join(' '),
    };
  }

  loadForecast(forecast: any) {
    this.forecast = forecast.list
      .filter((data: any) => data.dt_txt.includes('3:00:00'))
      .map((data: any) => {
        return {
          date:
            data.dt_txt.split('-')[1] +
            '/' +
            data.dt_txt.split('-')[2].split(' ')[0],
          temperature: this.weatherService.translateKelvinToFarenheit(
            data.main.temp
          ),
          description: data.weather[0].description
            .split(' ')
            .map((word: string) => {
              return word[0].toUpperCase() + word.substring(1);
            })
            .join(' '),
        } as Forecast;
      });
  }

  loadMap() {
    setTimeout(() => {
      this.initMap();
    }, 1000);
  }

  initMap() {
    const location = {
      lat: this.location['latitude'],
      lng: this.location['longitude'],
    };
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: location,
    });
    const merchantMarker = new google.maps.Marker({
      position: location,
      map: map,
    });
  }

  openDialog(action: string) {
    this.isPopUp = true;
    this.popUpAction = action;
  }

  closeDialog() {
    this.isPopUp = false;
  }
}
