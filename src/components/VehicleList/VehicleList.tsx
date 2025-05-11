import React, { useState, useEffect, useRef } from "react";
import { useVehicles } from "../../hooks/useVehicles";
import { Vehicle } from "../../types/vehicles";

interface VehicleListProps {
  scrollContainerId: string;
}

const VehicleList: React.FC<VehicleListProps> = ({ scrollContainerId }) => {
  const [page, setPage] = useState(1);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastVehicleRef = useRef<HTMLTableRowElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  
  const { data, isLoading, isFetching } = useVehicles(page, 20);
  
  useEffect(() => {
    if (data) {
      if (page === 1) {
        setVehicles(data.vehicles);
      } else {
        setVehicles(prev => [...prev, ...data.vehicles]);
      }
      
      setHasMore(page < data.totalPages);
    }
  }, [data, page]);
  
  // Este efeito obtém a referência do contêiner de scroll pelo ID
  useEffect(() => {
    const scrollElement = document.getElementById(scrollContainerId);
    if (scrollElement) {
      scrollContainerRef.current = scrollElement as HTMLDivElement;
    }
  }, [scrollContainerId]);
  
  // Configure o IntersectionObserver com o contêiner de scroll
  useEffect(() => {
    if (isLoading || !scrollContainerRef.current) return;
    
    if (observer.current) observer.current.disconnect();
    
    const options = {
      root: scrollContainerRef.current,
      rootMargin: '200px',
      threshold: 0
    };
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !isFetching) {
        console.log("Carregando mais veículos...");
        setPage(prevPage => prevPage + 1);
      }
    }, options);
    
    if (lastVehicleRef.current) {
      observer.current.observe(lastVehicleRef.current);
    }
  }, [isLoading, isFetching, hasMore, vehicles.length]);
  
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "em viagem":
        return "text-green-400";
      case "em manutenção":
        return "text-yellow-400";
      case "disponível":
        return "text-blue-400";
      default:
        return "text-white";
    }
  };
  
  // Função para criar uma linha de carregamento visual
  const renderLoadingRow = () => (
    <tr>
      <td colSpan={5} className="py-3 px-4 text-center">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-150"></div>
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-300"></div>
          <span className="ml-2 text-slate-300">Carregando mais veículos...</span>
        </div>
      </td>
    </tr>
  );
  
  return (
    <table className="w-full text-sm border-collapse">
      <thead className="sticky top-0 z-10 shadow-md after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-slate-600">
        <tr className="bg-[#002D44] border-b border-slate-700">
          <th className="py-3 px-4 font-semibold text-left">Placa</th>
          <th className="py-3 px-4 font-semibold text-left">Frota</th>
          <th className="py-3 px-4 font-semibold text-left">Tipo</th>
          <th className="py-3 px-4 font-semibold text-left">Modelo</th>
          <th className="py-3 px-4 font-semibold text-left">Status</th>
        </tr>
      </thead>
      <tbody className="bg-[#002D44] divide-y divide-slate-700">
        {vehicles.length > 0 ? (
          <>
            {vehicles.map((vehicle, index) => (
              <tr 
                key={vehicle.id} 
                ref={vehicles.length === index + 1 ? lastVehicleRef : null}
                className="hover:bg-[#003a59] transition-colors"
              >
                <td className="py-3 px-4 font-medium text-cyan-400">{vehicle.plate}</td>
                <td className="py-3 px-4 text-slate-300">{vehicle.fleet || "000000"}</td>
                <td className="py-3 px-4 text-slate-300">{vehicle.type}</td>
                <td className="py-3 px-4 text-slate-300">{vehicle.model}</td>
                <td className={`py-3 px-4 ${getStatusClass(vehicle.status)}`}>{vehicle.status}</td>
              </tr>
            ))}
            {isFetching && renderLoadingRow()}
          </>
        ) : isLoading ? (
          <tr>
            <td colSpan={5} className="py-4 text-center">Carregando...</td>
          </tr>
        ) : (
          <tr>
            <td colSpan={5} className="py-4 text-center">Nenhum veículo encontrado</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default VehicleList;
