import React, { useEffect, useState, useCallback } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px"
};

const defaultCenter = {
  lat: -23.55052,
  lng: -46.633308
};

type Veiculo = {
  id: string;
  placa: string;
  frota: string;
  latitude: number;
  longitude: number;
};

const VehicleMap: React.FC = () => {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

  const carregarVeiculos = useCallback(() => {
    const dadosSimulados: Veiculo[] = [
      {
        id: "1",
        placa: "ABC1234",
        frota: "1583",
        latitude: -23.6234,
        longitude: -46.6846
      },
      {
        id: "2",
        placa: "XYZ9876",
        frota: "2589",
        latitude: -23.615,
        longitude: -46.678
      }
    ];
    setVeiculos(dadosSimulados);
  }, []);

  useEffect(() => {
    carregarVeiculos();
    const interval = setInterval(carregarVeiculos, 2 * 60 * 1000);
    return () => clearInterval(interval);
  }, [carregarVeiculos]);

  return (
    <LoadScript googleMapsApiKey="AIzaSyAsF0kIkQ11MVT9OHV0Tv5pJfwIaRCv3ek">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={12}
      >
        {veiculos.map((veiculo) => (
          <Marker
            key={veiculo.id}
            position={{ lat: veiculo.latitude, lng: veiculo.longitude }}
            title={`Placa: ${veiculo.placa} | Frota: ${veiculo.frota}`}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default VehicleMap;
