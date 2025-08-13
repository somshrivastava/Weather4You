# Weather App ☀️🌧️

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Description

Weather App is a responsive web application that allows users to search for weather forecasts by location, view detailed weather information, and visualize locations on a map. Built with Angular and Firebase, it demonstrates modern frontend development and cloud deployment best practices.

## Features

- Search for weather by city or zip code
- View current weather and multi-day forecasts
- Google Maps integration for location details
- Responsive design for mobile and desktop
- Toast notifications for user feedback

## Tech Stack

- Angular
- TypeScript
- Firebase Hosting
- PrimeNG UI Components
- Google Maps JavaScript API

## Installation

1. Clone the repository:

```sh
git clone https://github.com/somshrivastava/weather.git
cd weather/weather
```

2. Install dependencies:

```sh
npm install --legacy-peer-deps
```

3. Build the project:

```sh
npx ng build --prod
```

## Usage

### Local Development

```sh
npx ng serve
# Visit http://localhost:4200
```

### Deploy to Firebase

```sh
firebase login
npx ng build --prod
firebase deploy
```

## License

This project is licensed under the MIT License.
