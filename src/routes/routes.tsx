import { Navigate } from 'react-router-dom';
import { DealRoom } from '@/components/DealRoom';
import { UploadView } from '@/views/UploadView';
import { AnalysisView } from '@/views/AnalysisView';
import { CriteriaView } from '@/views/CriteriaView';
import { MemoView } from '@/views/MemoView';

export const routes = [
  {
    path: '/',
    element: <Navigate to="/deal-room" replace />
  },
  {
    path: '/deal-room',
    element: <DealRoom />,
    children: [
      {
        path: '',
        element: <UploadView />
      },
      {
        path: ':docId/analysis',
        element: <AnalysisView />
      },
      {
        path: ':docId/criteria',
        element: <CriteriaView />
      },
      {
        path: ':docId/memo',
        element: <MemoView />
      }
    ]
  }
];