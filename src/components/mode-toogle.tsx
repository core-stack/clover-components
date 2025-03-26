import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/theme';

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button variant="outline" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      { theme === "dark" ? <Sun /> : <Moon /> }
    </Button>
  )
}
