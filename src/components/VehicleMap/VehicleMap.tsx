import React, { useEffect, useState } from "react";
import {
    GoogleMap,
    LoadScript,
    MarkerF,
    InfoWindow
} from "@react-google-maps/api";
import { LocationVehicle } from "../../types/vehicles";
import { useAllVehicles } from "../../hooks/useAllVehicles";

const containerStyle = {
    width: "100%",
    height: "400px"
};

const defaultCenter = {
    lat: -23.55052,
    lng: -46.633308
};

const VehicleMap: React.FC = () => {

    const { data: allVehicles, isLoading, refetch } = useAllVehicles();

    const [veiculoSelecionado, setVeiculoSelecionado] = useState<LocationVehicle | null>(null);


    useEffect(() => {
        const interval = setInterval(() => {
            refetch();
        }, 2 * 60 * 1000);
        return () => clearInterval(interval);
    }, [refetch]);

    return (
        <LoadScript googleMapsApiKey="AIzaSyAsF0kIkQ11MVT9OHV0Tv5pJfwIaRCv3ek">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={defaultCenter}
                zoom={7}
            >
                {!isLoading &&
                allVehicles?.length &&
                allVehicles
                    .filter(v => v.lat && v.lng)
                    .map(vehicle => (
                    <MarkerF
                        key={`${vehicle.plate}-${vehicle.equipmentId}-${vehicle.createdAt}`}
                        position={{ lat: vehicle.lat, lng: vehicle.lng }}
                        title={`Placa: ${vehicle.plate} | Frota: ${vehicle.fleet}`}
                        onClick={() => setVeiculoSelecionado(vehicle)}
                    />
                ))}

                {veiculoSelecionado && (
                    <InfoWindow
                        position={{
                            lat: veiculoSelecionado.lat,
                            lng: veiculoSelecionado.lng,
                        }}
                        onCloseClick={() => setVeiculoSelecionado(null)}
                    >
                        <div style={{ color: "black", fontSize: "14px", lineHeight: "1.5" }}>
                            <strong>Placa:</strong> {veiculoSelecionado.plate}<br />
                            <strong>Frota:</strong> {veiculoSelecionado.fleet}<br />
                            <strong>Ignição:</strong> {veiculoSelecionado.ignition}<br />
                            <strong>Equipamento:</strong> {veiculoSelecionado.equipmentId}<br />
                            <strong>Provedor:</strong> {veiculoSelecionado.name}<br /><br />
                            <a
                                href={`https://www.google.com/maps?q=${veiculoSelecionado.lat},${veiculoSelecionado.lng}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#1a73e8", textDecoration: "underline" }}
                            >
                                Ver no Google Maps
                            </a>
                        </div>
                    </InfoWindow>

                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default VehicleMap;
