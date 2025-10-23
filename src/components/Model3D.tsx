import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface Model3DProps {
  selectedColor: string;
  length: number;
  dreadType: string;
  gender: 'male' | 'female';
}

const Model3D = ({ selectedColor, length, dreadType, gender }: Model3DProps) => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    setRotation(prev => prev + delta * 0.5);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getDreadCount = () => {
    switch (dreadType) {
      case 'thin': return 40;
      case 'thick': return 15;
      case 'braids': return 12;
      case 'mixed': return 25;
      default: return 30;
    }
  };

  const getDreadWidth = () => {
    switch (dreadType) {
      case 'thin': return 'w-1.5';
      case 'thick': return 'w-3';
      case 'braids': return 'w-2.5';
      default: return 'w-2';
    }
  };

  const renderDreads = (side: 'front' | 'left' | 'right' | 'back') => {
    const dreadCount = getDreadCount();
    const dreadWidth = getDreadWidth();
    const actualLength = length * 1.2;

    const positions = {
      front: Array.from({ length: dreadCount }, (_, i) => ({
        left: `${10 + (i / dreadCount) * 80}%`,
        top: '0%',
        zOffset: Math.sin((i / dreadCount) * Math.PI) * 15,
      })),
      left: Array.from({ length: Math.floor(dreadCount * 0.5) }, (_, i) => ({
        left: `${20 + (i / Math.floor(dreadCount * 0.5)) * 30}%`,
        top: '0%',
        zOffset: 0,
      })),
      right: Array.from({ length: Math.floor(dreadCount * 0.5) }, (_, i) => ({
        left: `${50 + (i / Math.floor(dreadCount * 0.5)) * 30}%`,
        top: '0%',
        zOffset: 0,
      })),
      back: Array.from({ length: dreadCount }, (_, i) => ({
        left: `${10 + (i / dreadCount) * 80}%`,
        top: '0%',
        zOffset: -Math.sin((i / dreadCount) * Math.PI) * 15,
      })),
    };

    return positions[side].map((pos, i) => (
      <div
        key={`${side}-${i}`}
        className={`${dreadWidth} rounded-full absolute transition-all duration-500`}
        style={{
          backgroundColor: selectedColor,
          height: `${actualLength}px`,
          left: pos.left,
          top: pos.top,
          transform: `translateX(-50%) translateZ(${pos.zOffset}px) rotateZ(${Math.random() * 6 - 3}deg)`,
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          filter: `brightness(${1 + pos.zOffset / 100})`,
        }}
      />
    ));
  };

  const getCurrentView = () => {
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    if (normalizedRotation < 45 || normalizedRotation >= 315) return 'front';
    if (normalizedRotation >= 45 && normalizedRotation < 135) return 'right';
    if (normalizedRotation >= 135 && normalizedRotation < 225) return 'back';
    return 'left';
  };

  const currentView = getCurrentView();

  const renderHumanSilhouette = (view: 'front' | 'left' | 'right' | 'back') => {
    const skinColor = '#D4A574';
    const clothingColor = '#4A90E2';
    const pantsColor = '#2C3E50';
    
    if (view === 'left' || view === 'right') {
      const flip = view === 'left';
      
      if (gender === 'female') {
        return (
          <svg width="100" height="450" viewBox="0 0 100 450" className="transition-all duration-500" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
            <defs>
              <linearGradient id={`bodyGradientSide-${view}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C49563" />
                <stop offset="50%" stopColor={skinColor} />
                <stop offset="100%" stopColor="#B38556" />
              </linearGradient>
            </defs>
            
            <ellipse cx="50" cy="35" rx="20" ry="28" fill={`url(#bodyGradientSide-${view})`} />
            
            <ellipse cx="58" cy="28" rx="3" ry="4" fill="#1a1a1a" />
            <path d="M 40 30 Q 45 32 50 30" stroke="#8B6F47" strokeWidth="1" fill="none" />
            <path d="M 48 42 Q 52 44 56 42" stroke="#8B6F47" strokeWidth="1.5" fill="none" />
            
            <path d="M 48 60 Q 52 62 56 60 L 58 72 Q 54 74 48 72 Z" fill={skinColor} />
            
            <path d="M 30 75 Q 48 70 65 78 L 58 135 Q 48 138 38 135 Z" fill={clothingColor} />
            
            <path d="M 65 78 Q 72 82 74 95 L 70 125 Q 62 122 58 130" fill={clothingColor} />
            
            <path d="M 38 135 L 35 210 L 38 360 Q 38 365 35 370 L 33 440 Q 33 445 38 448 L 45 448 Q 50 445 50 440 L 48 370 Q 47 365 48 360 L 50 210 L 52 145" 
                  fill={pantsColor} />
            <path d="M 58 135 L 60 210 L 58 360 Q 58 365 60 370 L 62 440 Q 62 445 57 448 L 50 448 L 52 210 L 52 145" 
                  fill={pantsColor} />
            
            <path d="M 38 135 Q 42 150 52 150 L 58 135 L 56 195 Q 48 200 40 195 Z" fill={pantsColor} />
          </svg>
        );
      } else {
        return (
          <svg width="100" height="450" viewBox="0 0 100 450" className="transition-all duration-500" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
            <defs>
              <linearGradient id={`bodyGradientMaleSide-${view}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#C49563" />
                <stop offset="50%" stopColor={skinColor} />
                <stop offset="100%" stopColor="#B38556" />
              </linearGradient>
            </defs>
            
            <ellipse cx="50" cy="35" rx="22" ry="30" fill={`url(#bodyGradientMaleSide-${view})`} />
            
            <ellipse cx="58" cy="28" rx="3" ry="4" fill="#1a1a1a" />
            <path d="M 40 30 Q 45 32 50 30" stroke="#8B6F47" strokeWidth="1" fill="none" />
            <path d="M 48 42 Q 52 43 56 42" stroke="#8B6F47" strokeWidth="1.5" fill="none" />
            
            <path d="M 48 62 Q 52 64 56 62 L 58 76 Q 54 78 48 76 Z" fill={skinColor} />
            
            <path d="M 25 78 Q 48 72 70 80 L 65 145 Q 48 148 35 145 Z" fill={clothingColor} />
            
            <path d="M 70 80 Q 78 85 80 100 L 76 135 Q 68 132 65 140" fill={clothingColor} />
            
            <path d="M 35 145 L 38 205 L 40 360 Q 40 365 38 370 L 36 440 Q 36 445 41 448 L 48 448 Q 53 445 53 440 L 51 370 Q 50 365 51 360 L 53 205 L 54 150" 
                  fill={pantsColor} />
            <path d="M 65 145 L 62 205 L 60 360 Q 60 365 62 370 L 64 440 Q 64 445 59 448 L 52 448 L 54 205 L 54 150" 
                  fill={pantsColor} />
            
            <path d="M 35 145 Q 42 155 54 155 L 65 145 L 62 195 Q 50 200 38 195 Z" fill={pantsColor} />
          </svg>
        );
      }
    }

    if (view === 'back') {
      if (gender === 'female') {
        return (
          <svg width="140" height="450" viewBox="0 0 140 450" className="transition-all duration-500">
            <defs>
              <linearGradient id="bodyGradientBack" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#B38556" />
                <stop offset="100%" stopColor="#A67A4F" />
              </linearGradient>
            </defs>
            
            <ellipse cx="70" cy="40" rx="24" ry="30" fill="url(#bodyGradientBack)" />
            
            <rect x="60" y="68" width="20" height="10" rx="5" fill="#A67A4F" />
            
            <path d="M 45 82 Q 70 78 95 82 L 90 135 Q 70 138 50 135 Z" fill={clothingColor} />
            
            <path d="M 95 82 Q 110 87 115 100 L 110 130 Q 100 127 90 132" fill={clothingColor} />
            <path d="M 45 82 Q 30 87 25 100 L 30 130 Q 40 127 50 132" fill={clothingColor} />
            
            <path d="M 50 135 L 45 210 Q 45 215 50 220 L 58 360 Q 58 365 54 370 L 50 440 Q 50 445 55 448 L 62 448 Q 67 445 67 440 L 63 370 Q 62 365 63 360 L 68 220 Q 68 215 70 210 L 70 145" 
                  fill={pantsColor} />
            <path d="M 90 135 L 95 210 Q 95 215 90 220 L 82 360 Q 82 365 86 370 L 90 440 Q 90 445 85 448 L 78 448 Q 73 445 73 440 L 77 370 Q 78 365 77 360 L 72 220 Q 72 215 70 210 L 70 145" 
                  fill={pantsColor} />
            
            <path d="M 50 135 Q 60 148 70 148 Q 80 148 90 135 L 85 205 Q 70 210 55 205 Z" fill={pantsColor} />
          </svg>
        );
      } else {
        return (
          <svg width="140" height="450" viewBox="0 0 140 450" className="transition-all duration-500">
            <defs>
              <linearGradient id="bodyGradientMaleBack" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#B38556" />
                <stop offset="100%" stopColor="#A67A4F" />
              </linearGradient>
            </defs>
            
            <ellipse cx="70" cy="40" rx="26" ry="32" fill="url(#bodyGradientMaleBack)" />
            
            <rect x="60" y="70" width="20" height="12" rx="6" fill="#A67A4F" />
            
            <path d="M 40 84 Q 70 78 100 84 L 98 150 Q 70 153 42 150 Z" fill={clothingColor} />
            
            <path d="M 100 84 Q 118 90 122 105 L 118 140 Q 108 137 98 143" fill={clothingColor} />
            <path d="M 40 84 Q 22 90 18 105 L 22 140 Q 32 137 42 143" fill={clothingColor} />
            
            <path d="M 42 150 L 48 210 L 52 360 Q 52 365 48 370 L 46 440 Q 46 445 51 448 L 60 448 Q 65 445 65 440 L 63 370 Q 62 365 63 360 L 66 210 L 70 155" 
                  fill={pantsColor} />
            <path d="M 98 150 L 92 210 L 88 360 Q 88 365 92 370 L 94 440 Q 94 445 89 448 L 80 448 Q 75 445 75 440 L 77 370 Q 78 365 77 360 L 74 210 L 70 155" 
                  fill={pantsColor} />
            
            <path d="M 42 150 Q 55 160 70 160 Q 85 160 98 150 L 94 200 Q 70 205 46 200 Z" fill={pantsColor} />
          </svg>
        );
      }
    }

    if (gender === 'female') {
      return (
        <svg width="140" height="450" viewBox="0 0 140 450" className="transition-all duration-500">
          <defs>
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={skinColor} />
              <stop offset="100%" stopColor="#C49563" />
            </linearGradient>
          </defs>
          
          <ellipse cx="70" cy="35" rx="24" ry="28" fill="url(#bodyGradient)" />
          
          <ellipse cx="60" cy="28" rx="3" ry="4" fill="#1a1a1a" />
          <ellipse cx="80" cy="28" rx="3" ry="4" fill="#1a1a1a" />
          <path d="M 60 42 Q 70 45 80 42" stroke="#8B6F47" strokeWidth="1.5" fill="none" />
          
          <rect x="60" y="60" width="20" height="12" rx="6" fill={skinColor} />
          
          <path d="M 45 75 Q 70 70 95 75 L 90 130 Q 70 135 50 130 Z" fill={clothingColor} />
          
          <path d="M 95 75 Q 110 80 115 95 L 110 125 Q 100 122 90 125" fill={clothingColor} />
          <path d="M 45 75 Q 30 80 25 95 L 30 125 Q 40 122 50 125" fill={clothingColor} />
          
          <path d="M 50 130 L 45 210 Q 45 215 50 220 L 58 360 Q 58 365 54 370 L 50 440 Q 50 445 55 448 L 62 448 Q 67 445 67 440 L 63 370 Q 62 365 63 360 L 68 220 Q 68 215 70 210 L 70 140" 
                fill={pantsColor} />
          <path d="M 90 130 L 95 210 Q 95 215 90 220 L 82 360 Q 82 365 86 370 L 90 440 Q 90 445 85 448 L 78 448 Q 73 445 73 440 L 77 370 Q 78 365 77 360 L 72 220 Q 72 215 70 210 L 70 140" 
                fill={pantsColor} />
          
          <path d="M 50 130 Q 60 145 70 145 Q 80 145 90 130 L 85 200 Q 70 205 55 200 Z" fill={pantsColor} />
        </svg>
      );
    } else {
      return (
        <svg width="140" height="450" viewBox="0 0 140 450" className="transition-all duration-500">
          <defs>
            <linearGradient id="bodyGradientMale" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={skinColor} />
              <stop offset="100%" stopColor="#C49563" />
            </linearGradient>
          </defs>
          
          <ellipse cx="70" cy="35" rx="26" ry="30" fill="url(#bodyGradientMale)" />
          
          <ellipse cx="60" cy="28" rx="3" ry="4" fill="#1a1a1a" />
          <ellipse cx="80" cy="28" rx="3" ry="4" fill="#1a1a1a" />
          <path d="M 60 42 Q 70 44 80 42" stroke="#8B6F47" strokeWidth="1.5" fill="none" />
          
          <rect x="60" y="62" width="20" height="14" rx="7" fill={skinColor} />
          
          <path d="M 40 78 Q 70 72 100 78 L 98 145 Q 70 148 42 145 Z" fill={clothingColor} />
          
          <path d="M 100 78 Q 118 85 122 100 L 118 135 Q 108 132 98 138" fill={clothingColor} />
          <path d="M 40 78 Q 22 85 18 100 L 22 135 Q 32 132 42 138" fill={clothingColor} />
          
          <path d="M 42 145 L 48 205 L 52 360 Q 52 365 48 370 L 46 440 Q 46 445 51 448 L 60 448 Q 65 445 65 440 L 63 370 Q 62 365 63 360 L 66 205 L 70 150" 
                fill={pantsColor} />
          <path d="M 98 145 L 92 205 L 88 360 Q 88 365 92 370 L 94 440 Q 94 445 89 448 L 80 448 Q 75 445 75 440 L 77 370 Q 78 365 77 360 L 74 205 L 70 150" 
                fill={pantsColor} />
          
          <path d="M 42 145 Q 55 155 70 155 Q 85 155 98 145 L 94 195 Q 70 200 46 195 Z" fill={pantsColor} />
        </svg>
      );
    }
  };

  return (
    <div className="space-y-4">
      <div
        className="aspect-[3/4] bg-gradient-to-br from-orange-100 via-pink-100 to-purple-100 rounded-2xl flex items-center justify-center relative overflow-hidden cursor-grab active:cursor-grabbing"
        style={{
          borderImage: 'linear-gradient(135deg, #FF6B35, #F7931E, #C71585, #10B981) 1',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-200/20 via-pink-200/20 to-purple-200/20 animate-gradient-shift bg-[length:200%_200%]" />
        
        <div 
          className="relative transition-transform duration-300"
          style={{ 
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          <div className="relative" style={{ height: '450px', transformStyle: 'preserve-3d' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2" style={{ transformStyle: 'preserve-3d' }}>
              {renderHumanSilhouette(currentView)}
            </div>
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32" style={{ transformStyle: 'preserve-3d' }}>
              {renderDreads(currentView)}
            </div>
          </div>
        </div>

        <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2">
          <Icon name="RotateCw" size={14} />
          <span>Поверните модель</span>
        </div>

        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-medium">
          {currentView === 'front' && '👁️ Спереди'}
          {currentView === 'back' && '🔄 Сзади'}
          {currentView === 'left' && '👈 Слева'}
          {currentView === 'right' && '👉 Справа'}
        </div>
      </div>

      <div className="flex justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRotation(0)}
          className="text-xs"
        >
          <Icon name="Eye" size={14} className="mr-1" />
          Спереди
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRotation(90)}
          className="text-xs"
        >
          <Icon name="MoveRight" size={14} className="mr-1" />
          Справа
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRotation(180)}
          className="text-xs"
        >
          <Icon name="MoveLeft" size={14} className="mr-1" />
          Сзади
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setRotation(270)}
          className="text-xs"
        >
          <Icon name="ChevronLeft" size={14} className="mr-1" />
          Слева
        </Button>
      </div>
    </div>
  );
};

export default Model3D;
