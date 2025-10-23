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
        left: `${(i / dreadCount) * 100}%`,
        top: '0%',
      })),
      left: Array.from({ length: Math.floor(dreadCount * 0.4) }, (_, i) => ({
        left: `${-10 + (i / Math.floor(dreadCount * 0.4)) * 20}%`,
        top: '0%',
      })),
      right: Array.from({ length: Math.floor(dreadCount * 0.4) }, (_, i) => ({
        left: `${90 + (i / Math.floor(dreadCount * 0.4)) * 20}%`,
        top: '0%',
      })),
      back: Array.from({ length: dreadCount }, (_, i) => ({
        left: `${(i / dreadCount) * 100}%`,
        top: '0%',
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
          transform: `translateX(-50%) rotateZ(${Math.random() * 6 - 3}deg)`,
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }}
      />
    ));
  };

  const getBodyWidth = () => gender === 'male' ? 'w-24' : 'w-20';
  const getShoulderWidth = () => gender === 'male' ? 'w-32' : 'w-28';
  const getHipWidth = () => gender === 'male' ? 'w-24' : 'w-28';

  const getCurrentView = () => {
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    if (normalizedRotation < 45 || normalizedRotation >= 315) return 'front';
    if (normalizedRotation >= 45 && normalizedRotation < 135) return 'right';
    if (normalizedRotation >= 135 && normalizedRotation < 225) return 'back';
    return 'left';
  };

  const currentView = getCurrentView();

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
          className="relative transition-transform duration-200"
          style={{ transform: `rotateY(${rotation}deg)`, transformStyle: 'preserve-3d' }}
        >
          <div className="flex flex-col items-center gap-1 relative" style={{ height: '450px' }}>
            <div className="relative mb-2">
              <div 
                className="w-16 h-20 rounded-full relative z-10" 
                style={{ backgroundColor: '#D4A574' }}
              >
                <div className="absolute top-1/3 left-1/4 w-2 h-2 rounded-full bg-gray-800" />
                <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-gray-800" />
                <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gray-700/30" />
              </div>
              
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-24">
                {currentView === 'front' && renderDreads('front')}
                {currentView === 'left' && renderDreads('left')}
                {currentView === 'right' && renderDreads('right')}
                {currentView === 'back' && renderDreads('back')}
              </div>
            </div>

            <div 
              className="h-6 bg-gray-700 rounded-sm"
              style={{ width: '50px' }}
            />

            <div 
              className={`h-20 bg-gradient-to-b from-blue-400 to-blue-500 rounded-lg ${getShoulderWidth()}`}
            />

            <div 
              className={`h-32 bg-gray-600 rounded-lg ${getBodyWidth()}`}
            />

            <div 
              className={`h-8 bg-gray-700 rounded-sm ${getHipWidth()}`}
            />

            <div className="flex gap-2">
              <div className="w-10 h-40 bg-blue-600 rounded-lg" />
              <div className="w-10 h-40 bg-blue-600 rounded-lg" />
            </div>

            <div className="flex gap-2 mt-1">
              <div className="w-8 h-12 bg-gray-800 rounded-md" />
              <div className="w-8 h-12 bg-gray-800 rounded-md" />
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
