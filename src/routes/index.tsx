import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { routes } from './routes';

export function AppRouter() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          >
            {route.children?.map((child) => (
              <Route
                key={child.path}
                path={child.path}
                element={child.element}
              />
            ))}
          </Route>
        ))}
      </Route>
    </Routes>
  );
}