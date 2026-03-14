import React, { useState } from 'react';

export default function GraphTab() {
  const [fnType, setFnType] = useState<'sin' | 'cos' | 'tan'>('sin');
  const [A, setA] = useState(1);
  const [B, setB] = useState(1);
  const [C, setC] = useState(0);
  const [D, setD] = useState(0);

  // SVG dimensions for viewBox
  const width = 1400;
  const height = 700;
  const cx = width / 2;
  const cy = height / 2;
  const scaleX = 120; // 1 unit = 120px
  const scaleY = 120;

  const generatePath = () => {
    let path = '';
    let isFirst = true;
    let prevY = 0;

    for (let px = 0; px <= width; px += 2) {
      const x = (px - cx) / scaleX;
      let y = 0;
      
      if (fnType === 'sin') y = A * Math.sin(B * (x - C)) + D;
      else if (fnType === 'cos') y = A * Math.cos(B * (x - C)) + D;
      else if (fnType === 'tan') y = A * Math.tan(B * (x - C)) + D;

      const py = cy - y * scaleY;

      // Handle asymptotes for tangent
      if (fnType === 'tan') {
        if (!isFirst && Math.abs(y - prevY) > 10) {
          isFirst = true; // Break the line
        }
      }

      if (isFirst) {
        path += `M ${px} ${py} `;
        isFirst = false;
      } else {
        path += `L ${px} ${py} `;
      }
      prevY = y;
    }
    return path;
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)] min-h-[700px]">
      <div className="w-full lg:w-80 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col shrink-0 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Configuración</h2>
        
        <div className="flex flex-col gap-2 mb-6">
          <button onClick={() => setFnType('sin')} className={`py-2 rounded-lg font-medium transition-colors ${fnType === 'sin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Seno</button>
          <button onClick={() => setFnType('cos')} className={`py-2 rounded-lg font-medium transition-colors ${fnType === 'cos' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Coseno</button>
          <button onClick={() => setFnType('tan')} className={`py-2 rounded-lg font-medium transition-colors ${fnType === 'tan' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>Tangente</button>
        </div>

        <div className="space-y-6 flex-grow">
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-slate-700">Amplitud (A): {A}</label>
            </div>
            <input type="range" min="-5" max="5" step="0.1" value={A} onChange={(e) => setA(parseFloat(e.target.value))} className="w-full accent-indigo-600" />
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-slate-700">Frecuencia (B): {B}</label>
            </div>
            <input type="range" min="0.1" max="5" step="0.1" value={B} onChange={(e) => setB(parseFloat(e.target.value))} className="w-full accent-indigo-600" />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-slate-700">Desfase (C): {C}</label>
            </div>
            <input type="range" min="-5" max="5" step="0.1" value={C} onChange={(e) => setC(parseFloat(e.target.value))} className="w-full accent-indigo-600" />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-sm font-medium text-slate-700">Desplazamiento (D): {D}</label>
            </div>
            <input type="range" min="-5" max="5" step="0.1" value={D} onChange={(e) => setD(parseFloat(e.target.value))} className="w-full accent-indigo-600" />
          </div>
        </div>

        <div className="mt-6 p-6 bg-slate-50 rounded-xl border border-slate-200 text-center flex-grow flex flex-col justify-center">
          <p className="text-base text-slate-500 mb-2">Función actual</p>
          <p className="text-2xl font-mono font-bold text-indigo-700 break-words">
            y = {A !== 1 ? A : ''}{fnType}({B !== 1 ? B : ''}(x {C !== 0 ? (C > 0 ? `- ${C}` : `+ ${-C}`) : ''})){D !== 0 ? (D > 0 ? ` + ${D}` : ` - ${-D}`) : ''}
          </p>
        </div>
      </div>

      <div className="flex-1 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex justify-center items-center overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" className="w-full h-full bg-slate-50 rounded-xl border border-slate-200">
          {/* Grid */}
          {Array.from({ length: 31 }).map((_, i) => {
            const x = cx + (i - 15) * scaleX * Math.PI / 2;
            return <line key={`vx-${i}`} x1={x} y1={0} x2={x} y2={height} stroke="#e2e8f0" strokeWidth="1" />;
          })}
          {Array.from({ length: 21 }).map((_, i) => {
            const y = cy + (i - 10) * scaleY;
            return <line key={`hy-${i}`} x1={0} y1={y} x2={width} y2={y} stroke="#e2e8f0" strokeWidth="1" />;
          })}
          
          {/* Axes */}
          <line x1={0} y1={cy} x2={width} y2={cy} stroke="#94a3b8" strokeWidth="2" />
          <line x1={cx} y1={0} x2={cx} y2={height} stroke="#94a3b8" strokeWidth="2" />

          {/* Labels */}
          <text x={cx + scaleX * Math.PI} y={cy + 35} fontSize="28" fontWeight="bold" fill="#64748b" textAnchor="middle">π</text>
          <text x={cx + scaleX * 2 * Math.PI} y={cy + 35} fontSize="28" fontWeight="bold" fill="#64748b" textAnchor="middle">2π</text>
          <text x={cx + scaleX * 3 * Math.PI} y={cy + 35} fontSize="28" fontWeight="bold" fill="#64748b" textAnchor="middle">3π</text>
          <text x={cx + scaleX * 4 * Math.PI} y={cy + 35} fontSize="28" fontWeight="bold" fill="#64748b" textAnchor="middle">4π</text>
          <text x={cx - scaleX * Math.PI} y={cy + 35} fontSize="28" fontWeight="bold" fill="#64748b" textAnchor="middle">-π</text>
          <text x={cx - scaleX * 2 * Math.PI} y={cy + 35} fontSize="28" fontWeight="bold" fill="#64748b" textAnchor="middle">-2π</text>
          <text x={cx - scaleX * 3 * Math.PI} y={cy + 35} fontSize="28" fontWeight="bold" fill="#64748b" textAnchor="middle">-3π</text>
          <text x={cx - scaleX * 4 * Math.PI} y={cy + 35} fontSize="28" fontWeight="bold" fill="#64748b" textAnchor="middle">-4π</text>

          {/* Function Path */}
          <path d={generatePath()} fill="none" stroke="#4f46e5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
