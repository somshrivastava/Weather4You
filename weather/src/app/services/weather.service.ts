import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.deve';
import firebase from 'firebase/app';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {
  public location$ = new BehaviorSubject(null);

  public todayWeather$ = new BehaviorSubject(null);

  public forecast$ = new BehaviorSubject(null);

  private localStorage = window.localStorage;
  
  private sessionStorage = window.sessionStorage;

  private days: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  constructor(private http: HttpClient, private messageService: MessageService, private router: Router) { }

  public loadLocation() {
    if (this.getFromLocalStorage("location") == null) {
      navigator.geolocation.getCurrentPosition(position => {
        const location: any = { latitude: position.coords.latitude, longitude: position.coords.longitude };
        this.createInLocalStorage("location", location);
        this.location$.next(location);
      }, error => {
        this.location$.next({ latitude: "USER DENIED ACCESS", longitude: "USER DENIED ACCESS"} as any);
      })  
    } else {
      this.location$.next(this.getFromLocalStorage("location") as any);
    }
  }

  public loadTodayWeather(latitude: number, longitude: number) {
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${environment.WEATHER_API_KEY}`).subscribe(response => {
      this.createInLocalStorage("weather", response);
      this.createInLocalStorage("lastUpdated", new Date().getMinutes());
      this.todayWeather$.next(this.getFromLocalStorage("weather"));
    }, error => {
      this.loadTodayWeatherFromStorage();
    })  
  }

  public loadForecast(latitude: number, longitude: number) {
    this.http.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${environment.WEATHER_API_KEY}`).subscribe(response => {
      this.createInLocalStorage("forecast", response);
      this.createInLocalStorage("lastUpdated", new Date().getMinutes());
      this.forecast$.next(this.getFromLocalStorage("forecast"));
    }, error => {
      this.loadForecastFromStorage();
    })  
  }

  public loadTodayWeatherFromStorage() {
    this.todayWeather$.next(this.getFromLocalStorage("weather"));
  }

  public loadForecastFromStorage() {
    this.forecast$.next(this.getFromLocalStorage("forecast"));
  }

  public geocodeLocation(zipcode: number) {
    this.http.get(`https://api.openweathermap.org/geo/1.0/zip?zip=${zipcode}&appid=${environment.WEATHER_API_KEY}`).subscribe((response: any) => {
      const location = { latitude: response.lat, longitude: response.lon };
      this.createInLocalStorage("location", location);
      this.loadTodayWeather(location['latitude'], location['longitude']);
      this.loadForecast(location['latitude'], location['longitude']);
      this.location$.next(location as any);
      this.messageService.add({severity:'success', sticky: true, summary:'Location Success', detail: 'Your Location Details Were Successfully Loaded!'});
      this.router.navigate(['home']);
    }, error => {
      console.log(error);
      this.router.navigate(['location-details']);
      this.messageService.add({severity:'error', summary:'Location Error', sticky: true, detail: 'There Was An Error In Loading Your Location Details!  You May Have Entered An Invalid Zipcode!  Try Again!'});
    })  
  }

  public translateKelvinToFarenheit(kelvin: number): number {
    return (kelvin - 273.15) * 9/5 + 32;
  }

  public getFromLocalStorage(key: string): any {
    return JSON.parse(this.localStorage.getItem(key) as any);
  }

  public createInLocalStorage(key: string, value: any) {
    this.localStorage.setItem(key, JSON.stringify(value))
  }

  public getFromSessionStorage(key: string) {
    return JSON.parse(this.sessionStorage.getItem(key) as any);
  }

  public createInSessionStorage(key: string, value: any) {
    this.sessionStorage.setItem(key, JSON.stringify(value))
  }

  public returnDate(timestamp: Date) {
    var suffix: string = "";
    var hours: any = 0;
    var minutes: any = 0;
    if (timestamp.getHours() > 12) {
      suffix = "PM";
      hours = timestamp.getHours() - 12;
    } else {
      suffix = "AM";
      hours = timestamp.getHours();
    }
    if (timestamp.getMinutes().toString().length == 1) {
      minutes = `0${timestamp.getMinutes()}`
    } else {
      minutes = timestamp.getMinutes(); 
    }
    return `${this.days[timestamp.getDay()]}, ${hours}:${minutes} ${suffix}`;
  }
}
