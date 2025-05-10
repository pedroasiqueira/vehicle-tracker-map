import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export interface Vehicle {
  id: string;
  plate: string;
  fleet: string | null;
  type: string;
  model: string;
  nameOwner: string;
  status: string;
  createdAt: string;
}

export interface LocationVehicle {
    id: string;
    fleet: string;
    plate: string;
    ignition: string;
    lat: number;
    lng: number;
    createdAt: string;
    equipmentId: string;
    name: string;
  }
  

interface VehiclesResponse {
  vehicles: Vehicle[];
  locationVehicles: LocationVehicle[];
  totalPages: number;
  page: number;
  perPage: number;
}

export function useVehicles(page: number, perPage = 10) {
  return useQuery({
    queryKey: ["vehicles", page, perPage],
    queryFn: async () => {
      const { data } = await api.get<{ content: VehiclesResponse }>(
        `vehicles/list-with-paginate?type=tracked&page=${page}&perPage=${perPage}`
      );
      return data.content;
    },
    staleTime: 2 * 60 * 1000, // 2 minutos
  });
}
