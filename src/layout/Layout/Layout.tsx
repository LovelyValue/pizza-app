import cn from 'classnames';
import { NavLink, Outlet } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Layout.module.css';

export function Layout() {
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
					<NavLink
						to='/'
						className={({ isActive }) =>
							cn(styles['link'], {
								[styles.active]: isActive,
							})
						}
					>
						<img src='/menu-icon.svg' alt='menu-icon'></img>
						Меню
					</NavLink>
					<NavLink
						to='/cart'
						className={({ isActive }) =>
							cn(styles['link'], {
								[styles.active]: isActive,
							})
						}
					>
						<img src='/cart-icon.svg' alt='cart-icon'></img>
						Корзина
					</NavLink>
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
