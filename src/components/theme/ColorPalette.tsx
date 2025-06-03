
import { colorPalette, semanticColors } from '@/config/theme';

/**
 * Color palette showcase component for theme documentation and testing
 * This component displays all available colors in an organized grid
 */
export function ColorPalette() {
  const colorNames = Object.keys(colorPalette) as Array<keyof typeof colorPalette>;
  
  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Brand Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {colorNames.map((colorName) => (
            <div key={colorName} className="space-y-2">
              <h3 className="text-lg font-semibold capitalize">{colorName}</h3>
              <div className="grid grid-cols-5 gap-2">
                {Object.entries(colorPalette[colorName]).map(([shade, hex]) => (
                  <div key={shade} className="text-center">
                    <div 
                      className="w-16 h-16 rounded-lg shadow-sm border border-gray-200"
                      style={{ backgroundColor: hex }}
                    />
                    <div className="text-xs mt-1">
                      <div className="font-medium">{shade}</div>
                      <div className="text-gray-500">{hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Semantic Colors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Light Theme</h3>
            <div className="space-y-2">
              {Object.entries(semanticColors.light).map(([name, value]) => (
                <div key={name} className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded border border-gray-200"
                    style={{ backgroundColor: value }}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{name}</div>
                    <div className="text-sm text-gray-500">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Dark Theme</h3>
            <div className="space-y-2">
              {Object.entries(semanticColors.dark).map(([name, value]) => (
                <div key={name} className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded border border-gray-200"
                    style={{ backgroundColor: value }}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{name}</div>
                    <div className="text-sm text-gray-500">{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Component Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="btn-primary">Primary Button</div>
          <div className="btn-secondary">Secondary Button</div>
          <div className="modern-card p-4">Modern Card</div>
          <div className="glass p-4">Glass Effect</div>
          <div className="form-input p-2">Form Input Style</div>
          <div className="bg-primary text-primary-foreground p-4 rounded">Primary Background</div>
        </div>
      </div>
    </div>
  );
}
