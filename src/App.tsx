import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes';
import { Toaster } from '@/components/ui/toaster';
import { DealRoomProvider } from '@/context/DealRoomContext';

export default function App() {
  return (
    <BrowserRouter>
      <DealRoomProvider>
        <AppRouter />
        <Toaster />
      </DealRoomProvider>
    </BrowserRouter>
  );
}