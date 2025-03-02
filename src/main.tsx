import axios from 'axios';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PREFIX } from './helpers/API.ts';
import './index.css';
import { Layout } from './layout/Layout/Layout.tsx';
import { Cart } from './pages/Cart/Cart.tsx';
import { Error as ErrorPage } from './pages/Error/Error.tsx';
import { Menu } from './pages/Menu/Menu.tsx';
import { Product } from './pages/Product/Product.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '/',
				element: <Menu />,
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
					await new Promise<void>(resolve => {
						setTimeout(() => {
							resolve();
						}, 0.5);
					});
					const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
					return data;
				},
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
		<RouterProvider router={router} />
	</StrictMode>
);
