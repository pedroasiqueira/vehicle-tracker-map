import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import type { VehiclesResponse } from "../types/vehicles";

export function useVehicles(page: number, perPage = 10) {
  return useQuery({
    queryKey: ["vehicles", page, perPage],
    queryFn: async () => {
      const { data } = await api.get<{ content: VehiclesResponse }>(
        `vehicles/list-with-paginate?type=tracked&page=${page}&perPage=${perPage}`
      );
      return data.content;
    },
    staleTime: 2 * 60 * 1000,
  });
}
