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

	const decreases = () => {};

	const remove = () => {};

	return (
		<div className={styles['item']}>
			<div
				className={styles['image']}
				style={{ backgroundImage: `url('${props.image}')` }}
			></div>
			<div className={styles['description']}>
				<div className={styles['name']}>{props.name}</div>
				<div className={styles['currency']}>{props.price}&nbsp;₽</div>
			</div>
			<div className={styles['actions']}>
				<button className={styles['button']} onClick={increase}>
					<img src='/card-button-icon.svg' alt='add' />
				</button>
				<div>{props.count}</div>
				<button className={styles['button']} onClick={decreases}>
					<img src='/card-button-icon.svg' alt='delete' />
				</button>
				<button className={styles['button']} onClick={remove}>
					<img src='/card-button-icon.svg' alt='remove' />
				</button>
			</div>
		</div>
	);
}

export default CartItem;
