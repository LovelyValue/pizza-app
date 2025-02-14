import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Cart } from './pages/Cart/Cart.tsx';
import { Error } from './pages/Error/Error.tsx';
import { Menu } from './pages/Menu/Menu.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Menu />,
	},
	{
		path: '/cart',
		element: <Cart />,
	},
	{
		path: '*',
		element: <Error />,
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
