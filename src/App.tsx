import React from "react";
import VehicleMap from "./components/VehicleMap/VehicleMap";
import VehicleList from "./components/VehicleList/VehicleList";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto py-4">
        {/* Card do Mapa */}
        <div className="w-full rounded-xl bg-[#002D44] shadow-lg overflow-hidden mb-4">
          <div className="p-4 pb-2">
            <h2 className="text-lg font-semibold">Mapa rastreador</h2>
          </div>
          
          <div className="overflow-hidden">
            <VehicleMap />
          </div>
        </div>
        
        {/* Card da Lista - Sem padding para a tabela preencher todo o espaço */}
        <div className="w-full rounded-xl overflow-hidden bg-[#002D44] shadow-lg">
          <div id="vehicle-list-scroll-container" className="h-[400px] overflow-auto">
            <div className="min-w-full">
              <VehicleList scrollContainerId="vehicle-list-scroll-container" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
