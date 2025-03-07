import axios from 'axios';
import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PREFIX } from './helpers/API.ts';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import './index.css';
import { AuthLayout } from './layout/Auth/AuthLayout.tsx';
import { Layout } from './layout/Layout/Layout.tsx';
import { Cart } from './pages/Cart/Cart.tsx';
import { Error as ErrorPage } from './pages/Error/Error.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Product } from './pages/Product/Product.tsx';
import { Register } from './pages/Register/Register.tsx';
import { store } from './store/store.ts';

const Menu = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequireAuth>
				<Layout />
			</RequireAuth>
		),
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<>Loading...</>}>
						<Menu />
					</Suspense>
				),
			},
			{
				path: '/cart',
				element: <Cart />,
			},
			{
				path: 'product/:id',
				element: <Product />,
				errorElement: <>Ошибка</>,
				loader: async ({ params }) => {
					return axios
						.get(`${PREFIX}/products/${params.id}`)
						.then(response => ({ data: response.data }))
						.catch(e => {
							console.log(e);
						});
				},
			},
		],
	},
	{
		path: 'auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />,
			},
			{
				path: 'register',
				element: <Register />,
			},
		],
	},

	{
		path: '*',
		element: <ErrorPage />,
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</StrictMode>
);
