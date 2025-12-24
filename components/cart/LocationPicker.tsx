'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Search, MapPin, Crosshair } from 'lucide-react';

// Dynamically import the Map component to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('./MapComponent'), {
    ssr: false,
    loading: () => (
        <div className="h-full w-full bg-[#F2EDEA] flex items-center justify-center text-[#A0958F]">
            Loading Map...
        </div>
    ),
});

interface LocationPickerProps {
    onLocationSelect: (lat: number, lng: number, address?: string) => void;
    initialLat?: number;
    initialLng?: number;
}

interface SearchResult {
    display_name: string;
    lat: string;
    lon: string;
}

export default function LocationPicker({ onLocationSelect, initialLat = 26.2285, initialLng = 50.5860 }: LocationPickerProps) {
    const [position, setPosition] = useState<[number, number]>([initialLat, initialLng]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);

    // Search for address using Nominatim
    const searchAddress = async (query: string) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`
            );
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Search error:', error);
        } finally {
            setIsSearching(false);
        }
    };

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery) {
                searchAddress(searchQuery);
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Reverse geocode lat/lng to address
    const reverseGeocode = async (lat: number, lng: number) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
            );
            const data = await response.json();
            if (data && data.display_name) {
                setSearchQuery(data.display_name);
                return data.display_name;
            }
        } catch (error) {
            console.error('Reverse geocode error:', error);
        }
        return undefined;
    };

    const handleLocationUpdate = async (lat: number, lng: number) => {
        const newPosition: [number, number] = [lat, lng];
        setPosition(newPosition);

        // Get address for the new location
        const address = await reverseGeocode(lat, lng);
        onLocationSelect(lat, lng, address);
    };

    const handleSearchResultClick = (result: SearchResult) => {
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);

        setPosition([lat, lng]);
        setSearchQuery(result.display_name);
        setSearchResults([]);
        onLocationSelect(lat, lng, result.display_name);
    };

    const handleUseCurrentLocation = () => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

                    setPosition([lat, lng]);

                    // Get address for current location
                    const address = await reverseGeocode(lat, lng);
                    onLocationSelect(lat, lng, address);
                },
                (error) => {
                    console.error('Geolocation error:', error);
                    alert('Unable to get your location. Please ensure location permissions are enabled.');
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    };

    return (
        <div className="space-y-3">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A0958F]" size={16} />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for any location..."
                    className="w-full pl-10 pr-4 py-3 bg-[#F2EDEA] border-none rounded-sm text-sm text-[#1A1614] focus:ring-2 focus:ring-[#FF7A21] transition-all placeholder:text-[#A0958F]/60"
                />

                {/* Search Results Dropdown */}
                {searchResults.length > 0 && (
                    <div className="absolute z-[1000] w-full mt-1 bg-white border border-[#F2EDEA] rounded-sm shadow-lg max-h-48 overflow-y-auto">
                        {searchResults.map((result, index) => (
                            <button
                                key={index}
                                onClick={() => handleSearchResultClick(result)}
                                className="w-full px-4 py-2 text-left text-sm text-[#1A1614] hover:bg-[#FFFBF7] transition-colors border-b border-[#F2EDEA] last:border-none"
                            >
                                <div className="flex items-start gap-2">
                                    <MapPin size={14} className="text-[#FF7A21] mt-0.5 flex-shrink-0" />
                                    <span className="line-clamp-2">{result.display_name}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Current Location Button */}
            <button
                onClick={handleUseCurrentLocation}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-[#FF7A21]/10 text-[#FF7A21] rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-[#FF7A21]/20 transition-colors"
            >
                <Crosshair size={14} />
                Use My Current Location
            </button>

            {/* Map */}
            <div className="h-64 rounded-sm overflow-hidden border-2 border-[#F2EDEA] relative z-0">
                <MapComponent
                    position={position}
                    onPositionChange={handleLocationUpdate}
                />
            </div>

            {/* Coordinates Display */}
            <div className="text-xs text-[#A0958F] text-center">
                <span className="font-bold">Selected Location:</span> {position[0].toFixed(6)}, {position[1].toFixed(6)}
            </div>
        </div>
    );
}
