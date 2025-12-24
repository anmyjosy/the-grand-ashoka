'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon in Next.js
const customIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

interface MapComponentProps {
    position: [number, number];
    onPositionChange: (lat: number, lng: number) => void;
}

function MapClickHandler({ onLocationClick }: { onLocationClick: (lat: number, lng: number) => void }) {
    useMapEvents({
        click: (e: L.LeafletMouseEvent) => {
            onLocationClick(e.latlng.lat, e.latlng.lng);
        },
    });
    return null;
}

function MapUpdater({ position }: { position: [number, number] }) {
    const map = useMapEvents({});
    useEffect(() => {
        map.setView(position, map.getZoom());
    }, [position, map]);
    return null;
}

export default function MapComponent({ position, onPositionChange }: MapComponentProps) {
    const markerRef = useRef<L.Marker>(null);

    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker) {
                    const { lat, lng } = marker.getLatLng();
                    onPositionChange(lat, lng);
                }
            },
        }),
        [onPositionChange],
    );

    return (
        <MapContainer
            center={position}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
                draggable={true}
                eventHandlers={eventHandlers}
                position={position}
                icon={customIcon}
                ref={markerRef}
            />
            <MapClickHandler onLocationClick={onPositionChange} />
            <MapUpdater position={position} />
        </MapContainer>
    );
}
