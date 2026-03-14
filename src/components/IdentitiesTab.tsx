import React from 'react';

export default function IdentitiesTab() {
  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 w-full mx-auto">
      
      <div className="space-y-12">
        {/* Triangle Graphic */}
        <div className="flex flex-col xl:flex-row gap-8 items-center justify-between bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <div className="flex-shrink-0 mr-auto ml-auto xl:ml-0">
            <svg width="380" height="280" viewBox="0 0 400 300" className="overflow-visible drop-shadow-sm">
              {/* Triangle Fill */}
              <polygon points="50,250 300,250 300,50" fill="#f8fafc" stroke="none" />
              
              {/* Right angle square */}
              <polyline points="270,250 270,220 300,220" fill="#e2e8f0" stroke="#64748b" strokeWidth="2" />
              
              {/* Angle theta at A (50, 250) */}
              <path d="M 110 250 A 60 60 0 0 0 96 214" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
              <text x="125" y="235" fontSize="24" fill="#db2777" fontWeight="bold">θ</text>
              
              {/* Sides */}
              {/* Adjacent (b) - Bottom */}
              <line x1="50" y1="250" x2="300" y2="250" stroke="#3b82f6" strokeWidth="6" strokeLinecap="round" />
              {/* Opposite (a) - Right */}
              <line x1="300" y1="250" x2="300" y2="50" stroke="#ef4444" strokeWidth="6" strokeLinecap="round" />
              {/* Hypotenuse (c) - Diagonal */}
              <line x1="50" y1="250" x2="300" y2="50" stroke="#4f46e5" strokeWidth="6" strokeLinecap="round" />

              {/* Labels */}
              <text x="175" y="280" fontSize="18" fill="#3b82f6" textAnchor="middle" fontWeight="bold">Cateto Adyacente (b)</text>
              
              <g transform="translate(330, 150) rotate(-90)">
                <text x="0" y="0" fontSize="18" fill="#ef4444" textAnchor="middle" fontWeight="bold">Cateto Opuesto (a)</text>
              </g>
              
              {/* Hypotenuse label, rotated */}
              <g transform="translate(155, 130) rotate(-38.6)">
                <text x="0" y="0" fontSize="18" fill="#4f46e5" textAnchor="middle" fontWeight="bold">Hipotenusa (c)</text>
              </g>

              {/* Vertices */}
              <text x="25" y="260" fontSize="24" fill="#0f172a" fontWeight="bold">A</text>
              <text x="315" y="270" fontSize="24" fill="#0f172a" fontWeight="bold">C</text>
              <text x="315" y="35" fontSize="24" fill="#0f172a" fontWeight="bold">B</text>
            </svg>
          </div>
          
          <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto">
            <div className="text-2xl font-mono font-bold text-indigo-700 bg-white p-4 rounded-xl border border-indigo-100 shadow-sm text-center">
              c² = a² + b²
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <div className="text-xl font-mono font-bold text-red-600 bg-white p-4 rounded-xl border border-red-100 shadow-sm flex justify-between items-center">
                  <span>sin(θ)</span> <span>= a / c</span>
                </div>
                <div className="text-xl font-mono font-bold text-blue-600 bg-white p-4 rounded-xl border border-blue-100 shadow-sm flex justify-between items-center">
                  <span>cos(θ)</span> <span>= b / c</span>
                </div>
                <div className="text-xl font-mono font-bold text-emerald-600 bg-white p-4 rounded-xl border border-emerald-100 shadow-sm flex justify-between items-center">
                  <span>tan(θ)</span> <span>= a / b</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="text-xl font-mono font-bold text-orange-600 bg-white p-4 rounded-xl border border-orange-100 shadow-sm flex justify-between items-center">
                  <span>csc(θ)</span> <span>= c / a</span>
                </div>
                <div className="text-xl font-mono font-bold text-purple-600 bg-white p-4 rounded-xl border border-purple-100 shadow-sm flex justify-between items-center">
                  <span>sec(θ)</span> <span>= c / b</span>
                </div>
                <div className="text-xl font-mono font-bold text-teal-600 bg-white p-4 rounded-xl border border-teal-100 shadow-sm flex justify-between items-center">
                  <span>cot(θ)</span> <span>= b / a</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Identidades */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Básicas */}
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="text-lg font-bold mb-4 text-slate-800">Básicas y Pitagóricas</h4>
            <ul className="space-y-3 font-mono text-base">
              <li>sin(θ) = 1 / csc(θ)</li>
              <li>cos(θ) = 1 / sec(θ)</li>
              <li>tan(θ) = 1 / cot(θ)</li>
              <li>tan(θ) = sin(θ) / cos(θ)</li>
              <li>cot(θ) = cos(θ) / sin(θ)</li>
              <li className="pt-3 border-t border-slate-200 font-bold text-indigo-700">sin²(θ) + cos²(θ) = 1</li>
              <li className="font-bold text-indigo-700">1 + tan²(θ) = sec²(θ)</li>
              <li className="font-bold text-indigo-700">1 + cot²(θ) = csc²(θ)</li>
            </ul>
          </div>

          {/* Ángulo Doble y Medio */}
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="text-lg font-bold mb-4 text-slate-800">Ángulo Doble</h4>
            <ul className="space-y-3 font-mono text-base">
              <li>sin(2θ) = 2sin(θ)cos(θ)</li>
              <li>cos(2θ) = cos²(θ) - sin²(θ)</li>
              <li>cos(2θ) = 1 - 2sin²(θ)</li>
              <li>cos(2θ) = 2cos²(θ) - 1</li>
              <li>tan(2θ) = 2tan(θ) / (1 - tan²(θ))</li>
            </ul>
            <h4 className="text-lg font-bold mt-6 mb-3 text-slate-800">Ángulo Medio</h4>
            <ul className="space-y-3 font-mono text-base">
              <li>sin(θ/2) = ±√((1 - cos(θ)) / 2)</li>
              <li>cos(θ/2) = ±√((1 + cos(θ)) / 2)</li>
              <li>tan(θ/2) = ±√((1 - cos(θ)) / (1 + cos(θ)))</li>
            </ul>
          </div>

          {/* Suplemento y Complemento */}
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="text-lg font-bold mb-4 text-slate-800">Suplemento y Complemento</h4>
            <ul className="space-y-3 font-mono text-base">
              <li>sin(π ± θ) = ∓sin(θ)</li>
              <li>cos(π ± θ) = -cos(θ)</li>
              <li>sin(π/2 - θ) = cos(θ)</li>
              <li>cos(π/2 - θ) = sin(θ)</li>
              <li>tan(π/2 - θ) = cot(θ)</li>
            </ul>
            <h4 className="text-lg font-bold mt-6 mb-3 text-slate-800">Paridad (Par / Impar)</h4>
            <ul className="space-y-3 font-mono text-base">
              <li>sin(-θ) = -sin(θ)</li>
              <li>cos(-θ) = cos(θ)</li>
              <li>tan(-θ) = -tan(θ)</li>
            </ul>
          </div>

          {/* Suma y Resta (Full Width) */}
          <div className="col-span-1 lg:col-span-3 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h4 className="text-lg font-bold mb-4 text-slate-800">Suma y Resta de Ángulos</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-base">
              <div className="bg-white p-4 rounded-lg border border-slate-200">sin(α ± β) = sin(α)cos(β) ± sin(β)cos(α)</div>
              <div className="bg-white p-4 rounded-lg border border-slate-200">cos(α ± β) = cos(α)cos(β) ∓ sin(α)sin(β)</div>
              <div className="bg-white p-4 rounded-lg border border-slate-200">tan(α ± β) = (tan(α) ± tan(β)) / (1 ∓ tan(α)tan(β))</div>
            </div>
          </div>

          {/* Suma a Producto y Producto a Suma (Full Width) */}
          <div className="col-span-1 lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="text-lg font-bold mb-4 text-slate-800">Suma a Producto</h4>
              <ul className="space-y-4 font-mono text-base">
                <li className="bg-white p-3 rounded-lg border border-slate-200">sin(α) + sin(β) = 2sin((α+β)/2)cos((α-β)/2)</li>
                <li className="bg-white p-3 rounded-lg border border-slate-200">sin(α) - sin(β) = 2sin((α-β)/2)cos((α+β)/2)</li>
                <li className="bg-white p-3 rounded-lg border border-slate-200">cos(α) + cos(β) = 2cos((α+β)/2)cos((α-β)/2)</li>
                <li className="bg-white p-3 rounded-lg border border-slate-200">cos(α) - cos(β) = -2sin((α+β)/2)sin((α-β)/2)</li>
              </ul>
            </div>
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h4 className="text-lg font-bold mb-4 text-slate-800">Producto a Suma</h4>
              <ul className="space-y-4 font-mono text-base">
                <li className="bg-white p-3 rounded-lg border border-slate-200">sin(α)sin(β) = ½[cos(α-β) - cos(α+β)]</li>
                <li className="bg-white p-3 rounded-lg border border-slate-200">cos(α)cos(β) = ½[cos(α-β) + cos(α+β)]</li>
                <li className="bg-white p-3 rounded-lg border border-slate-200">sin(α)cos(β) = ½[sin(α+β) + sin(α-β)]</li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
