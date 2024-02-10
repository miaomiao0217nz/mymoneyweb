import dayjs from 'dayjs';
import { lazy, Suspense,useState, useEffect } from 'react';
import { Outlet, Navigate, useRoutes, useNavigate, useLocation } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const ImportPage = lazy(() => import('src/pages/import'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const SignUpPage = lazy(() => import('src/pages/signup'));
export const CashflowPage = lazy(() => import('src/pages/cashflow'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const navigate = useNavigate();
  const route = useLocation();
  const [date, setDate] = useState(dayjs('2023-11-17'));

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token === null || token === 'null') {
      if (route.pathname !== '/signup' && route.pathname !== '/login')
        navigate("/login");
    }
  }, [navigate, route]);

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout date={date} setDate={setDate}>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage date={date} />, index: true },
        { path: 'cashflow', element: <CashflowPage date={date} /> },
        { path: 'import', element: <ImportPage /> }
      ],
    },
    {
      path: 'signup',
      element: <SignUpPage />
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
