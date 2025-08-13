# Weather App ☀️🌧️

### Live Demo

The app is deployed and available at: [https://weather4you.web.app/](https://weather4you.web.app/)

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


**Note:** This project requires Node.js 16. Please use [nvm](https://github.com/nvm-sh/nvm) to ensure the correct version is used before running any npm commands.
```sh
# Install nvm if you haven't already
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Load nvm (restart your terminal if needed)
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install and use Node.js 16
nvm install 16
nvm use 16
```

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

## License

This project is licensed under the MIT License.
