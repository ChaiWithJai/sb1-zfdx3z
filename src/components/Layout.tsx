import { Outlet } from 'react-router-dom';
import { ThemeProvider } from './theme-provider';

export function Layout() {
  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background">
        <Outlet />
      </div>
    </ThemeProvider>
  );
}