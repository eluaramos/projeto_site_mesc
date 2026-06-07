import React, { useEffect, useRef } from 'react';
import { setOptions, importLibrary } from '@googlemaps/js-api-loader';

interface GoogleMapProps {
    apiKey: string;
    lat: number;
    lng: number;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ apiKey, lat, lng }) => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setOptions({
            key: apiKey,
            version: 'weekly',
        });

        const initMap = async () => {
            try {
                // Importa as bibliotecas necessárias conforme os padrões de 2024
                const { Map } = await importLibrary('maps') as google.maps.MapsLibrary;
                const { AdvancedMarkerElement, PinElement } = await importLibrary('marker') as google.maps.MarkerLibrary;

                if (mapRef.current) {
                    const position = { lat, lng };
                    
                    const map = new Map(mapRef.current, {
                        center: position,
                        zoom: 16,
                        // Nota: AdvancedMarkerElement REQUER um Map ID. 
                        // Se você não tiver um Map ID personalizado criado no Cloud Console (para estilos via Cloud),
                        // pode usar o ID 'DEMO_MAP_ID'.
                        mapId: 'DEMO_MAP_ID', 
                        disableDefaultUI: true,
                        zoomControl: true,
                        // Estilos clássicos ainda podem ser aplicados se você precisar de controle via código
                        styles: [
                            { "elementType": "geometry", "stylers": [{ "color": "#1d2c4d" }] },
                            { "elementType": "labels.text.fill", "stylers": [{ "color": "#8ec3b9" }] },
                            { "elementType": "labels.text.stroke", "stylers": [{ "color": "#1a3646" }] },
                            { "featureType": "administrative.country", "elementType": "geometry.stroke", "stylers": [{ "color": "#4b6878" }] },
                            { "featureType": "landscape.man_made", "elementType": "geometry.stroke", "stylers": [{ "color": "#334e87" }] },
                            { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#283d6a" }] },
                            { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#6f9ba5" }] },
                            { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#304a7d" }] },
                            { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#98a5be" }] },
                            { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#0e1626" }] }
                        ],
                    });

                    // Criando um marcador personalizado moderno (PinElement) para combinar com o site
                    const pin = new PinElement({
                        background: "#2a9d8f", // Verde do MESC
                        borderColor: "#162b4d", // Azul escuro do MESC
                        glyphColor: "#ffffff",
                    });

                    // AdvancedMarkerElement substitui o deprecated google.maps.Marker
                    new AdvancedMarkerElement({
                        map: map,
                        position: position,
                        title: "Instituto de Ciência e Tecnologia - UFF",
                        content: pin.element,
                    });
                }
            } catch (error) {
                console.error("Erro ao carregar o Google Maps:", error);
            }
        };

        initMap();
    }, [apiKey, lat, lng]);

    return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />;
};

export default GoogleMap;
