export interface Weather {
  city: string;
  country: string;
  description: string;
  latitude: number;
  longitude: number;
  temperature: number;
  feelsLikeTemperature: number;
  maximumTemperature: number;
  minimumTemperature: number;
  humidity: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
}
