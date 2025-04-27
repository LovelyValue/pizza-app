import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';
import { AppDispatch } from '../../store/store';
import styles from './CartItem.module.css';
import { CartItemProps } from './CartItem.props';

function CartItem(props: CartItemProps) {
	const dispatch = useDispatch<AppDispatch>();

	const increase = () => {
		dispatch(cartActions.add(props.id));
	};

	const decreases = () => {
		dispatch(cartActions.delete(props.id));
	};

	const remove = () => {
		dispatch(cartActions.remove(props.id));
	};

	return (
		<div className={styles['item']}>
			<div
				className={styles['image']}
				style={{ backgroundImage: `url('${props.image}')` }}
			></div>
			<div className={styles['description']}>
				<div className={styles['name']}>{props.name}</div>
				<div className={styles['price']}>{props.price}&nbsp;₽</div>
			</div>
			<div className={styles['actions']}>
				<button className={styles['minus']} onClick={decreases}>
					<img src='/minus-icon.svg' alt='-' />
				</button>
				<div className={styles['number']}>{props.count}</div>
				<button className={styles['plus']} onClick={increase}>
					<img src='/plus-icon.svg' alt='+' />
				</button>

				<button className={styles['remove']} onClick={remove}>
					<img src='/delete-icon.svg' alt='x' />
				</button>
			</div>
		</div>
	);
}

export default CartItem;
