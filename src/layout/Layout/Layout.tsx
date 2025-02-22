import cn from 'classnames';
import { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Layout.module.css';

export function Layout() {
	const location = useLocation();
	useEffect(() => {
		console.log(location);
	}, [location]);

	return (
		<div className={styles['layout']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<img
						className={styles['avatar']}
						src='/avatar.png'
						alt='avatar'
					></img>
					<div className={styles['name']}>Last Value</div>
					<div className={styles['email']}>last@.yahoo.com</div>
				</div>
				<div className={styles['menu']}>
					<Link
						to='/'
						className={cn(styles['link'], {
							[styles.active]: location.pathname === '/',
						})}
					>
						<img src='/menu-icon.svg' alt='menu-icon'></img>
						Меню
					</Link>
					<Link to='/cart' className={styles['link']}>
						<img src='/cart-icon.svg' alt='cart-icon'></img>
						Корзина
					</Link>
				</div>
				<Button className={styles['exit']}>
					<img src='/exit-icon.svg' alt='exit-icon'></img>
					Выход
				</Button>
			</div>
			<div>
				<Outlet />
			</div>
		</div>
	);
}
