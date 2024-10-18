# Weather Monitoring Application

## Introduction
This application is a real-time weather monitoring system that retrieves weather data from the OpenWeatherMap API and displays it for multiple cities. It features real-time data retrieval, daily weather summaries, user-configurable alert thresholds, and historical data visualization.

## Features
1. **Real-Time Data Retrieval**  
   The application fetches real-time weather data for multiple cities at regular intervals using the OpenWeatherMap API.

2. **Daily Weather Summary**  
   The app calculates daily weather aggregates, including:
   - Average temperature
   - Maximum temperature
   - Minimum temperature
   - Dominant weather condition

3. **Alerting Thresholds**  
   Users can set thresholds for temperature or specific weather conditions. The system tracks weather data and triggers alerts if thresholds are breached for consecutive updates.

4. **Data Visualization**  
   The app provides historical temperature data visualizations through line charts, showing temperature trends and weather summaries over time.

## Technology Stack
- **Frontend**: React, **Shadcn**, **TailwindCSS** for UI styling, and Chart.js for data visualization.
- **Backend**: Node.js, Express, MongoDB
- **API**: OpenWeatherMap API

## Setup Instructions

### Prerequisites
1. **Node.js** and **npm** installed on your system.
2. A **MongoDB** database setup.
3. A valid **OpenWeatherMap API Key**.

### How to Run

1. **Clone the repository**:
    ```bash
    git clone https://github.com/itssouray/WeatherMonitoringApp
    cd WeatherMonitoringApp
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root of your project and add your OpenWeatherMap API key:
    ```
    REACT_APP_WEATHER_API_KEY=your_api_key_here
    ```

4. **Start the development server**:
    ```bash
    npm run dev
    ```

5. **Backend**:
   - Make sure you have MongoDB running.
   - Run the backend server:
     ```bash
     node run start
     ```

## Testing and Verification
The weather monitoring app was thoroughly tested for:
- Correctness in real-time data retrieval from the OpenWeatherMap API.
- Accuracy in calculating daily weather summaries (average, max, min temperatures, and dominant condition).
- Proper handling of user-configurable thresholds for temperature and weather condition alerts.
- Historical data visualization using Chart.js line charts.

## Setting Up API Keys
Use a `.env` file in the root directory of the project to store your OpenWeatherMap API key:


## Frontend Libraries Used

- **React**: A JavaScript library for building user interfaces.
- **Shadcn**: A React component library for building beautiful UI components.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.

## Conclusion
The Weather Monitoring Application efficiently retrieves, displays, and visualizes weather data in real-time, providing useful summaries, configurable alerts, and beautiful visualizations, all built using a modern frontend and backend stack.

