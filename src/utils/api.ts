//TODO: Change api key configurations
const OPEN_WEATHER_API_KEY = '7bdeee8d663b099d290d1adb7c26749e';

export interface OpenWeatherData {
  name: string;
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: {
    description: string;
    icon: string;
    id: number;
    main: string;
  }[];
  wind: {
    speed: number;
    deg: number;
  };
}

export type OpenWeatherTempScale = 'metric' | 'imperial';

export async function fetchOpenWeatherData(
  city: string,
  tempScale: OpenWeatherTempScale
): Promise<OpenWeatherData>{
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempScale}&appid=${OPEN_WEATHER_API_KEY}`
  );
  if (!res.ok) {
    throw new Error('City is not found');
  }

  const data: OpenWeatherData = await res.json();
  return data;
}
