
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Theme = 'theme-1' | 'theme-2' | 'theme-3';

const ThemeSwitcher: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('theme-1');

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key === 'q') {
        // Cycle through themes
        setCurrentTheme(prevTheme => {
          let newTheme: Theme;
          switch (prevTheme) {
            case 'theme-1':
              newTheme = 'theme-2';
              break;
            case 'theme-2':
              newTheme = 'theme-3';
              break;
            case 'theme-3':
            default:
              newTheme = 'theme-1';
              break;
          }
          
          toast(`Switched to ${newTheme.replace('-', ' ')}`, {
            position: 'bottom-right',
          });
          
          return newTheme;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Apply theme to document body
  useEffect(() => {
    // Remove all theme classes
    document.body.classList.remove('theme-1', 'theme-2', 'theme-3');
    // Add current theme class
    document.body.classList.add(currentTheme);
  }, [currentTheme]);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2">
      <div className="text-xs opacity-70 text-center mb-1">
        Press Alt+Q to switch themes
      </div>
      {(['theme-1', 'theme-2', 'theme-3'] as Theme[]).map((theme) => (
        <button
          key={theme}
          onClick={() => setCurrentTheme(theme)}
          className={`w-6 h-6 rounded-full border transition-all ${
            currentTheme === theme ? 'ring-2 ring-offset-1 scale-110' : ''
          }`}
          style={{
            backgroundColor: 
              theme === 'theme-1' ? '#9b87f5' : 
              theme === 'theme-2' ? '#2a3950' : 
              '#f97316'
          }}
          title={`Switch to ${theme.replace('-', ' ')}`}
          aria-label={`Switch to ${theme.replace('-', ' ')}`}
        />
      ))}
    </div>
  );
};

export default ThemeSwitcher;
