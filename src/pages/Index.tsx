import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import Model3D from '@/components/Model3D';

const colorPalette = [
  { name: 'Огненный', value: '#FF6B35' },
  { name: 'Золотой', value: '#F7931E' },
  { name: 'Розовый', value: '#F7953E' },
  { name: 'Пурпурный', value: '#C71585' },
  { name: 'Изумруд', value: '#10B981' },
  { name: 'Океан', value: '#8BBC6' },
  { name: 'Лаванда', value: '#C7A4FF' },
  { name: 'Черный', value: '#1F2937' },
];

const dreadTypes = [
  { value: 'classic', label: 'Классические дреды' },
  { value: 'thin', label: 'Тонкие дреды' },
  { value: 'thick', label: 'Толстые дреды' },
  { value: 'braids', label: 'Косы' },
  { value: 'mixed', label: 'Микс' },
];

const Index = () => {
  const [selectedColor, setSelectedColor] = useState('#FF6B35');
  const [length, setLength] = useState([50]);
  const [dreadType, setDreadType] = useState('classic');
  const [gender, setGender] = useState<'male' | 'female'>('female');

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            DREAD CONSTRUCTOR 3D
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Создай уникальный дизайн дредов. Выбирай цвет, длину и стиль для своего образа
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-xl animate-scale-in border-2 hover:shadow-2xl transition-shadow duration-300">
            <Model3D 
              selectedColor={selectedColor}
              length={length[0]}
              dreadType={dreadType}
              gender={gender}
            />

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 mb-2">Текущий выбор:</p>
              <div className="flex items-center justify-center gap-4 text-sm font-medium flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full border-2 border-gray-300" style={{ backgroundColor: selectedColor }} />
                  <span>{colorPalette.find(c => c.value === selectedColor)?.name}</span>
                </div>
                <span>•</span>
                <span>{length[0]} см</span>
                <span>•</span>
                <span>{dreadTypes.find(t => t.value === dreadType)?.label}</span>
                <span>•</span>
                <span>{gender === 'male' ? '👨 Мужчина' : '👩 Женщина'}</span>
              </div>
            </div>
          </Card>

          <div className="space-y-6 animate-fade-in">
            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl border-2 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Users" size={24} className="text-blue-500" />
                Пол модели
              </h3>
              
              <ToggleGroup type="single" value={gender} onValueChange={(value) => value && setGender(value as 'male' | 'female')} className="justify-start">
                <ToggleGroupItem value="female" aria-label="Женщина" className="flex-1 data-[state=on]:bg-pink-500 data-[state=on]:text-white">
                  <Icon name="User" size={18} className="mr-2" />
                  Женщина
                </ToggleGroupItem>
                <ToggleGroupItem value="male" aria-label="Мужчина" className="flex-1 data-[state=on]:bg-blue-500 data-[state=on]:text-white">
                  <Icon name="UserCircle" size={18} className="mr-2" />
                  Мужчина
                </ToggleGroupItem>
              </ToggleGroup>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl border-2 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Palette" size={24} className="text-orange-500" />
                Палитра цветов
              </h3>
              
              <div className="grid grid-cols-4 gap-3">
                {colorPalette.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setSelectedColor(color.value)}
                    className={`group relative aspect-square rounded-xl transition-all duration-300 hover:scale-110 ${
                      selectedColor === color.value
                        ? 'ring-4 ring-orange-500 ring-offset-2 scale-105'
                        : 'hover:ring-2 hover:ring-gray-300'
                    }`}
                    style={{ backgroundColor: color.value }}
                  >
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {color.name}
                    </span>
                    {selectedColor === color.value && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon name="Check" size={24} className="text-white drop-shadow-lg" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl border-2 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Ruler" size={24} className="text-pink-500" />
                Длина дредов
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base">Длина: {length[0]} см</Label>
                  <div className="flex gap-2">
                    <span className="text-sm text-gray-500">Короткие</span>
                    <span className="text-sm text-gray-500">→</span>
                    <span className="text-sm text-gray-500">Длинные</span>
                  </div>
                </div>
                <Slider
                  value={length}
                  onValueChange={setLength}
                  min={20}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            </Card>

            <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl border-2 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Icon name="Sparkles" size={24} className="text-purple-500" />
                Тип дредов
              </h3>
              
              <Select value={dreadType} onValueChange={setDreadType}>
                <SelectTrigger className="w-full text-base h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {dreadTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value} className="text-base">
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Card>

            <Button 
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 hover:from-orange-600 hover:via-pink-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Icon name="Save" size={24} className="mr-2" />
              Сохранить дизайн
            </Button>
          </div>
        </div>

        <div className="mt-12 text-center animate-fade-in">
          <p className="text-sm text-gray-500">
            💡 Совет: экспериментируй с комбинациями цветов и стилей для создания уникального образа
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;