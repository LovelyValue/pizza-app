import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Success.module.css';

export function Success() {
	const navigate = useNavigate();

	return (
		<div className={styles['success']}>
			<img className={styles['success-image']} src='/pizza.jpg' alt='pizza' />
			<div className={styles['text']}>Ваш заказ успешно оформлен!</div>
			<Button appearance='big' onClick={() => navigate('/')}>
				Сделать новый
			</Button>
		</div>
	);
}
