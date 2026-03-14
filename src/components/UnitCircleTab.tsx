import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const ANGLES = [0, 30, 45, 60, 90, 120, 135, 150, 180, 210, 225, 240, 270, 300, 315, 330, 360];

const getExactValue = (fn: 'sin' | 'cos' | 'tan', deg: number) => {
  const normDeg = ((deg % 360) + 360) % 360;
  
  const exactMap: Record<number, {sin: string, cos: string, tan: string}> = {
    0: { sin: '0', cos: '1', tan: '0' },
    30: { sin: '1/2', cos: '√3/2', tan: '√3/3' },
    45: { sin: '√2/2', cos: '√2/2', tan: '1' },
    60: { sin: '√3/2', cos: '1/2', tan: '√3' },
    90: { sin: '1', cos: '0', tan: '∞' },
    120: { sin: '√3/2', cos: '-1/2', tan: '-√3' },
    135: { sin: '√2/2', cos: '-√2/2', tan: '-1' },
    150: { sin: '1/2', cos: '-√3/2', tan: '-√3/3' },
    180: { sin: '0', cos: '-1', tan: '0' },
    210: { sin: '-1/2', cos: '-√3/2', tan: '√3/3' },
    225: { sin: '-√2/2', cos: '-√2/2', tan: '1' },
    240: { sin: '-√3/2', cos: '-1/2', tan: '√3' },
    270: { sin: '-1', cos: '0', tan: '-∞' },
    300: { sin: '-√3/2', cos: '1/2', tan: '-√3' },
    315: { sin: '-√2/2', cos: '√2/2', tan: '-1' },
    330: { sin: '-1/2', cos: '√3/2', tan: '-√3/3' },
  };

  if (exactMap[normDeg]) {
    return exactMap[normDeg][fn];
  }

  const rad = normDeg * Math.PI / 180;
  if (fn === 'sin') return Math.sin(rad).toFixed(2);
  if (fn === 'cos') return Math.cos(rad).toFixed(2);
  if (fn === 'tan') {
    const t = Math.tan(rad);
    return Math.abs(t) > 100 ? '∞' : t.toFixed(2);
  }
  return '0';
};

export default function UnitCircleTab() {
  const [angleDeg, setAngleDeg] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const requestRef = useRef<number>(null);
  const lastTimeRef = useRef<number>(null);

  const animate = () => {
    setAngleDeg(prev => {
      let newAngle = prev + 0.5;
      if (newAngle >= 360) newAngle = 0;
      return newAngle;
    });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isPlaying) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying]);

  const angleRad = (angleDeg * Math.PI) / 180;
  
  // Circle SVG
  const cSize = 280;
  const cCenter = cSize / 2;
  const radius = 100;
  
  const px = cCenter + radius * Math.cos(angleRad);
  const py = cCenter - radius * Math.sin(angleRad);

  // Sine Wave SVG
  const wWidth = 1000;
  const wHeight = 160;
  const wCenterY = wHeight / 2;
  const wScaleX = wWidth / (2 * Math.PI);
  const wScaleY = 60;

  const generateSineWave = () => {
    let path = `M 0 ${wCenterY}`;
    for (let a = 0; a <= angleRad; a += 0.05) {
      const x = a * wScaleX;
      const y = wCenterY - Math.sin(a) * wScaleY;
      path += ` L ${x} ${y}`;
    }
    return path;
  };

  const generateCosineWave = () => {
    let path = `M 0 ${wCenterY - wScaleY}`;
    for (let a = 0; a <= angleRad; a += 0.05) {
      const x = a * wScaleX;
      const y = wCenterY - Math.cos(a) * wScaleY;
      path += ` L ${x} ${y}`;
    }
    return path;
  };

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-120px)] min-h-[700px] w-full">
      
      {/* Top Row: Slider, Circle/Pendulums, Table */}
      <div className="flex flex-col lg:flex-row gap-4 h-[65%] min-h-[400px]">
        
        {/* Left: Vertical Slider & Controls */}
        <div className="w-full lg:w-24 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-row lg:flex-col items-center justify-between gap-4 shrink-0">
          <div className="flex lg:flex-col gap-3">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-sm"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button 
              onClick={() => { setAngleDeg(0); setIsPlaying(false); }}
              className="p-3 bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 transition-colors shadow-sm"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
          
          <div className="font-mono font-bold text-xl text-slate-700">{Math.round(angleDeg)}°</div>
          
          <div className="relative h-48 w-8 mx-auto hidden lg:block">
            <input 
              type="range" min="0" max="360" step="1" 
              value={angleDeg} 
              onChange={(e) => { setAngleDeg(parseFloat(e.target.value)); setIsPlaying(false); }} 
              className="w-48 h-2 accent-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 origin-center cursor-pointer" 
            />
          </div>
          <div className="flex-grow lg:hidden">
            <input 
              type="range" min="0" max="360" step="1" 
              value={angleDeg} 
              onChange={(e) => { setAngleDeg(parseFloat(e.target.value)); setIsPlaying(false); }} 
              className="w-full accent-indigo-600 cursor-pointer" 
            />
          </div>
        </div>

        {/* Center: Unit Circle & Pendulums */}
        <div className="flex-grow bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center overflow-hidden">
          <div className="grid grid-cols-[max-content_max-content] gap-4 scale-90 xl:scale-100">
            
            {/* Circle */}
            <div className="relative">
              <svg width={cSize} height={cSize} className="bg-slate-50 rounded-xl border border-slate-200" viewBox={`0 0 ${cSize} ${cSize}`}>
                {/* Axes */}
                <line x1={0} y1={cCenter} x2={cSize} y2={cCenter} stroke="#94a3b8" strokeWidth="1" />
                <line x1={cCenter} y1={0} x2={cCenter} y2={cSize} stroke="#94a3b8" strokeWidth="1" />
                
                {/* Circle */}
                <circle cx={cCenter} cy={cCenter} r={radius} fill="none" stroke="#64748b" strokeWidth="2" />
                
                {/* Coordinates */}
                <text x={cCenter + radius + 8} y={cCenter + 4} fontSize="10" fill="#64748b" fontWeight="bold">(1,0)</text>
                <text x={cCenter - radius - 28} y={cCenter + 4} fontSize="10" fill="#64748b" fontWeight="bold">(-1,0)</text>
                <text x={cCenter - 12} y={cCenter - radius - 8} fontSize="10" fill="#64748b" fontWeight="bold">(0,1)</text>
                <text x={cCenter - 14} y={cCenter + radius + 14} fontSize="10" fill="#64748b" fontWeight="bold">(0,-1)</text>
                
                {/* Angle Arc */}
                <path 
                  d={`M ${cCenter + 15} ${cCenter} A 15 15 0 ${angleDeg > 180 ? 1 : 0} 0 ${cCenter + 15 * Math.cos(angleRad)} ${cCenter - 15 * Math.sin(angleRad)}`} 
                  fill="none" stroke="#f59e0b" strokeWidth="2" 
                />

                {/* Triangle */}
                <line x1={cCenter} y1={cCenter} x2={px} y2={py} stroke="#334155" strokeWidth="2" />
                <line x1={cCenter} y1={cCenter} x2={px} y2={cCenter} stroke="#3b82f6" strokeWidth="2" />
                <line x1={px} y1={cCenter} x2={px} y2={py} stroke="#ef4444" strokeWidth="2" />

                <circle cx={px} cy={py} r={4} fill="#1e293b" />
              </svg>
            </div>

            {/* Sine Pendulum */}
            <div className="flex flex-col items-center">
              <div className="text-xs font-bold text-red-600 mb-1">Seno</div>
              <svg width="60" height={cSize} className="bg-slate-50 rounded-xl border border-slate-200">
                <line x1="30" y1={0} x2="30" y2={cSize} stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4" />
                <text x="38" y={cCenter - radius + 4} fontSize="10" fill="#ef4444" fontWeight="bold">1</text>
                <text x="38" y={cCenter + radius + 4} fontSize="10" fill="#ef4444" fontWeight="bold">-1</text>
                <line x1="25" y1={cCenter - radius} x2="35" y2={cCenter - radius} stroke="#ef4444" strokeWidth="2" />
                <line x1="25" y1={cCenter + radius} x2="35" y2={cCenter + radius} stroke="#ef4444" strokeWidth="2" />
                
                <line x1="30" y1={cCenter} x2="30" y2={cCenter - Math.sin(angleRad) * radius} stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                <circle cx="30" cy={cCenter - Math.sin(angleRad) * radius} r="6" fill="#ef4444" />
                <line x1="0" y1={cCenter - Math.sin(angleRad) * radius} x2="30" y2={cCenter - Math.sin(angleRad) * radius} stroke="#ef4444" strokeWidth="1" strokeDasharray="2" opacity="0.4" />
              </svg>
            </div>

            {/* Cosine Pendulum */}
            <div className="flex flex-col items-start col-span-2">
              <div className="text-xs font-bold text-blue-600 mb-1">Coseno</div>
              <svg width={cSize} height="60" className="bg-slate-50 rounded-xl border border-slate-200">
                <line x1={0} y1="30" x2={cSize} y2="30" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4" />
                <text x={cCenter + radius - 4} y="20" fontSize="10" fill="#3b82f6" fontWeight="bold">1</text>
                <text x={cCenter - radius - 8} y="20" fontSize="10" fill="#3b82f6" fontWeight="bold">-1</text>
                <line x1={cCenter + radius} y1="25" x2={cCenter + radius} y2="35" stroke="#3b82f6" strokeWidth="2" />
                <line x1={cCenter - radius} y1="25" x2={cCenter - radius} y2="35" stroke="#3b82f6" strokeWidth="2" />

                <line x1={cCenter} y1="30" x2={cCenter + Math.cos(angleRad) * radius} y2="30" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                <circle cx={cCenter + Math.cos(angleRad) * radius} cy="30" r="6" fill="#3b82f6" />
                <line x1={cCenter + Math.cos(angleRad) * radius} y1="0" x2={cCenter + Math.cos(angleRad) * radius} y2="30" stroke="#3b82f6" strokeWidth="1" strokeDasharray="2" opacity="0.4" />
              </svg>
            </div>

          </div>
        </div>

        {/* Right: Vertical Table */}
        <div className="w-full lg:w-72 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col shrink-0 overflow-hidden">
          <div className="p-3 border-b border-slate-200 bg-slate-50">
            <h3 className="text-sm font-bold text-center">Valores Exactos</h3>
          </div>
          <div className="overflow-y-auto flex-grow custom-scrollbar">
            <table className="w-full text-xs text-center">
              <thead className="sticky top-0 bg-slate-100 shadow-sm z-10">
                <tr>
                  <th className="py-2 px-1 font-semibold text-slate-600">Grados</th>
                  <th className="py-2 px-1 font-semibold text-red-600">Seno</th>
                  <th className="py-2 px-1 font-semibold text-blue-600">Coseno</th>
                  <th className="py-2 px-1 font-semibold text-emerald-600">Tangente</th>
                </tr>
              </thead>
              <tbody>
                {ANGLES.map(deg => {
                  const isActive = Math.abs(angleDeg - deg) <= 5;
                  return (
                    <tr key={deg} className={`border-b border-slate-100 ${isActive ? 'bg-indigo-50' : ''}`}>
                      <td className={`py-2 px-1 font-bold ${isActive ? 'text-indigo-700' : 'text-slate-600'}`}>{deg}°</td>
                      <td className={`py-2 px-1 font-mono ${isActive ? 'text-red-700 font-bold' : 'text-slate-600'}`}>{getExactValue('sin', deg)}</td>
                      <td className={`py-2 px-1 font-mono ${isActive ? 'text-blue-700 font-bold' : 'text-slate-600'}`}>{getExactValue('cos', deg)}</td>
                      <td className={`py-2 px-1 font-mono ${isActive ? 'text-emerald-700 font-bold' : 'text-slate-600'}`}>{getExactValue('tan', deg)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Bottom Row: Wave Formation */}
      <div className="flex-grow bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col min-h-[180px]">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-bold">Formación de Ondas</h3>
          <div className="flex gap-4 text-xs font-bold">
            <span className="text-red-600 flex items-center gap-1"><div className="w-2 h-2 bg-red-500 rounded-full"></div> Seno</span>
            <span className="text-blue-600 flex items-center gap-1"><div className="w-2 h-2 bg-blue-500 rounded-full"></div> Coseno</span>
          </div>
        </div>
        <div className="flex-grow relative w-full h-full">
          <svg preserveAspectRatio="xMidYMid meet" className="absolute inset-0 w-full h-full bg-slate-50 rounded-xl border border-slate-200" viewBox={`0 0 ${wWidth} ${wHeight}`}>
            <line x1={0} y1={wCenterY} x2={wWidth} y2={wCenterY} stroke="#94a3b8" strokeWidth="1" />
            
            {[0.5, 1, 1.5, 2].map(mult => (
              <React.Fragment key={mult}>
                <line x1={mult * Math.PI * wScaleX} y1={0} x2={mult * Math.PI * wScaleX} y2={wHeight} stroke="#e2e8f0" strokeWidth="1" />
                <text x={mult * Math.PI * wScaleX} y={wCenterY + 15} fontSize="12" fill="#64748b" textAnchor="middle" fontWeight="bold">
                  {mult === 0.5 ? 'π/2' : mult === 1 ? 'π' : mult === 1.5 ? '3π/2' : '2π'}
                </text>
              </React.Fragment>
            ))}

            <path d={generateSineWave()} fill="none" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
            <circle cx={angleRad * wScaleX} cy={wCenterY - Math.sin(angleRad) * wScaleY} r={5} fill="#ef4444" />

            <path d={generateCosineWave()} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
            <circle cx={angleRad * wScaleX} cy={wCenterY - Math.cos(angleRad) * wScaleY} r={5} fill="#3b82f6" />
          </svg>
        </div>
      </div>
    </div>
  );
}
