import React from "react";
import VehicleMap from "./components/VehicleMap/VehicleMap";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-5xl rounded-xl bg-slate-800 p-4 shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Mapa rastreador</h2>
        <div className="rounded-lg overflow-hidden border border-slate-700">
          <VehicleMap />
        </div>
      </div>
    </div>
  );
};

export default App;
