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
  
  export interface VehiclesResponse {
    vehicles: Vehicle[];
    locationVehicles: LocationVehicle[];
    totalPages: number;
    page: number;
    perPage: number;
  }
  