import { useEffect } from 'react';
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
} from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

interface UniversityMapProps {
    lat: number;
    lng: number;
}

function MapUpdater({ lat, lng }: UniversityMapProps) {
    const map = useMap();

    useEffect(() => {
        map.setView([lat, lng], 16);
    }, [map, lat, lng]);

    return null;
}

const universityIcon = L.divIcon({
    className: '',
    html: `
        <div
            style="
                width: 24px;
                height: 24px;
                background: #2a9d8f;
                border: 3px solid #162b4d;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.35);
            "
        >
            <div
                style="
                    width: 8px;
                    height: 8px;
                    background: white;
                    border-radius: 50%;
                    position: absolute;
                    top: 5px;
                    left: 5px;
                "
            ></div>
        </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
});

const UniversityMap = ({ lat, lng }: UniversityMapProps) => {
    const position: L.LatLngExpression = [lat, lng];

    return (
        <div className="group relative h-full w-full">
            <MapContainer
                center={position}
                zoom={16}
                scrollWheelZoom={false}
                zoomControl={true}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker
                    position={position}
                    icon={universityIcon}
                >
                    <Popup>
                        Instituto de Ciência e Tecnologia - UFF
                    </Popup>
                </Marker>

                <MapUpdater lat={lat} lng={lng} />
            </MapContainer>

            <a
                href="https://maps.app.goo.gl/TeZyfwL3TTaEtT4a7"
                target="_blank"
                rel="noopener noreferrer"
                className="
                    absolute bottom-3 left-3 z-[1000]
                    rounded-md
                    bg-white/95
                    px-4 py-2
                    text-sm font-semibold
                    text-[#162b4d]
                    opacity-0
                    shadow-md
                    transition-all
                    duration-200
                    hover:bg-white
                    group-hover:opacity-100
                    group-focus-within:opacity-100
                "
            >
                Abrir no Google Maps ↗
            </a>
        </div>
    );
};

export default UniversityMap;
