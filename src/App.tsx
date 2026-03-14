/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import GraphTab from './components/GraphTab';
import UnitCircleTab from './components/UnitCircleTab';
import IdentitiesTab from './components/IdentitiesTab';
import { Activity, Circle, Table } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <h1 className="text-2xl font-bold text-center">Explorador de Funciones Trigonométricas</h1>
      </header>
      
      <div className="flex justify-center bg-white border-b border-slate-200 shadow-sm overflow-x-auto">
        <button 
          className={`flex items-center px-6 py-3 font-medium transition-colors whitespace-nowrap ${activeTab === 0 ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-indigo-500'}`}
          onClick={() => setActiveTab(0)}
        >
          <Activity className="w-5 h-5 mr-2" />
          Gráficas
        </button>
        <button 
          className={`flex items-center px-6 py-3 font-medium transition-colors whitespace-nowrap ${activeTab === 1 ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-indigo-500'}`}
          onClick={() => setActiveTab(1)}
        >
          <Circle className="w-5 h-5 mr-2" />
          Círculo Unitario
        </button>
        <button 
          className={`flex items-center px-6 py-3 font-medium transition-colors whitespace-nowrap ${activeTab === 2 ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-indigo-500'}`}
          onClick={() => setActiveTab(2)}
        >
          <Table className="w-5 h-5 mr-2" />
          Identidades
        </button>
      </div>

      <main className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full">
        {activeTab === 0 && <GraphTab />}
        {activeTab === 1 && <UnitCircleTab />}
        {activeTab === 2 && <IdentitiesTab />}
      </main>
    </div>
  );
}
