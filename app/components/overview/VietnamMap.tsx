'use client';

import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '../../context/LanguageContext';

export const VietnamMap: React.FC = () => {
  const { t } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-[450px] w-full rounded-2xl bg-slate-900/50 border border-slate-800 animate-pulse flex items-center justify-center text-slate-500">
        {t('map.loading')}
      </div>
    );
  }

  // Dynamic import Leaflet components on client side
  const { MapContainer, TileLayer, Marker, Popup } = require('react-leaflet');
  const L = require('leaflet');

  // Custom marker icon fix
  const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const cities = [
    { name: 'Hà Nội', lat: 21.0285, lng: 105.8542, pop: '8.4M', gdpKey: 'map.role.hanoi' },
    { name: 'TP. Hồ Chí Minh', lat: 10.8231, lng: 106.6297, pop: '9.3M', gdpKey: 'map.role.hcm' },
    { name: 'Đà Nẵng', lat: 16.0544, lng: 108.2022, pop: '1.2M', gdpKey: 'map.role.danang' },
    { name: 'Hải Phòng', lat: 20.8449, lng: 106.6881, pop: '2.0M', gdpKey: 'map.role.haiphong' },
    { name: 'Cần Thơ', lat: 10.0452, lng: 105.7469, pop: '1.3M', gdpKey: 'map.role.cantho' },
  ];

  return (
    <div className="relative rounded-[2rem] border theme-card overflow-hidden shadow-xl">
      <MapContainer
        center={[16.047079, 108.20623]} // Vietnam Center Coordinates
        zoom={5}
        scrollWheelZoom={false}
        className="h-[450px] w-full z-10"
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a> Dark Matter'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        {cities.map((city, idx) => (
          <Marker key={idx} position={[city.lat, city.lng]} icon={customIcon}>
            <Popup className="custom-popup">
              <div className="p-1.5 font-sans text-slate-900">
                <h4 className="font-bold text-base">{city.name}</h4>
                <p className="text-xs text-slate-600">{t('map.popLabel')}: {city.pop}</p>
                <p className="text-xs font-semibold text-emerald-600">{t(city.gdpKey)}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
