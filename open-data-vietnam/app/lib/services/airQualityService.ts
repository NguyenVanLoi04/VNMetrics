import { IAQIDataPoint, AQIStatusEnum } from '../interface';

export const airQualityService = {
  async getAirQualityData(): Promise<IAQIDataPoint[]> {
    const citiesData: IAQIDataPoint[] = [
      { city: 'Hà Nội', lat: 21.0285, lng: 105.8542, aqi: 135, status: AQIStatusEnum.UNHEALTHY, pm25: 49.2, pm10: 82.1, lastUpdated: 'Vừa cập nhật' },
      { city: 'TP. Hồ Chí Minh', lat: 10.8231, lng: 106.6297, aqi: 78, status: AQIStatusEnum.MODERATE, pm25: 24.8, pm10: 45.0, lastUpdated: 'Vừa cập nhật' },
      { city: 'Đà Nẵng', lat: 16.0544, lng: 108.2022, aqi: 42, status: AQIStatusEnum.GOOD, pm25: 10.2, pm10: 22.5, lastUpdated: 'Vừa cập nhật' },
      { city: 'Hải Phòng', lat: 20.8449, lng: 106.6881, aqi: 110, status: AQIStatusEnum.UNHEALTHY, pm25: 38.6, pm10: 68.4, lastUpdated: 'Vừa cập nhật' },
      { city: 'Cần Thơ', lat: 10.0452, lng: 105.7469, aqi: 52, status: AQIStatusEnum.MODERATE, pm25: 14.1, pm10: 31.0, lastUpdated: 'Vừa cập nhật' },
      { city: 'Nha Trang', lat: 12.2388, lng: 109.1967, aqi: 35, status: AQIStatusEnum.GOOD, pm25: 8.4, pm10: 18.2, lastUpdated: 'Vừa cập nhật' },
      { city: 'Huế', lat: 16.4637, lng: 107.5909, aqi: 45, status: AQIStatusEnum.GOOD, pm25: 11.0, pm10: 24.0, lastUpdated: 'Vừa cập nhật' },
    ];

    return citiesData;
  },
};
