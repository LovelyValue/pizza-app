import { FormEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import { AppDispatch, RootState } from '../../store/store'; // т
import { login, userActions } from '../../store/user.slice';
import styles from './Login.module.css';

export type LoginForm = {
	email: { value: string };
	password: { value: string };
};

export function Login() {
	const navigate = useNavigate();

	const dispatch = useDispatch<AppDispatch>();

	const { jwt, loginErrorMessage } = useSelector((s: RootState) => s.user);

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		dispatch(userActions.clearLoginError());

		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;

		dispatch(login({ email: email.value, password: password.value })); // Убрали лишнюю функцию
	};

	useEffect(() => {
		if (jwt) {
			navigate('/');
		}
	}, [jwt, navigate]);

	return (
		<div className={styles['login']}>
			<Heading>Вход</Heading>
			{loginErrorMessage && (
				<div className={styles['error']}>{loginErrorMessage}</div>
			)}
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor='email'>Ваш email</label>
					<Input id='email' placeholder='Email' name='email' />{' '}
				</div>
				<div className={styles['field']}>
					<label htmlFor='password'>Ваш пароль</label>
					<Input
						id='password'
						type='password'
						placeholder='Password'
						name='password'
					/>
				</div>
				<Button appearance='big'>Вход</Button>
			</form>
			<div className={styles['links']}>
				<div>Нет аккаунта?</div>
				<Link to='/auth/register'>Зарегистрироваться</Link>
			</div>
		</div>
	);
}
