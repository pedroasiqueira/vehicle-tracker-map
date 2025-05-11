// hooks/useAllVehicles.ts
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import type { VehiclesResponse, LocationVehicle } from "../types/vehicles";

export function useAllVehicles() {
  return useQuery<LocationVehicle[]>({
    queryKey: ["all-vehicles"],
    queryFn: async (): Promise<LocationVehicle[]> => {
      const perPage = 50;
      const first = await api.get<{ content: VehiclesResponse }>(
        `vehicles/list-with-paginate?type=tracked&page=1&perPage=${perPage}`
      );

      const totalPages = first.data.content.totalPages;
      const rest = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_ , i) =>
          api.get<{ content: VehiclesResponse }>(
            `vehicles/list-with-paginate?type=tracked&page=${i + 2}&perPage=${perPage}`
          )
        )
      );

      return [
        ...first.data.content.locationVehicles,
        ...rest.flatMap(r => r.data.content.locationVehicles)
      ];
    },
    refetchInterval: 120_000, // 2 min
    staleTime: 0              // já fica "stale", forçando refetch no intervalo
    // → remova keepPreviousData: sua versão do lib não tem essa flag
  });
}
