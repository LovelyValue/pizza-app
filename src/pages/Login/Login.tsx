import axios, { AxiosError } from 'axios';
import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import { PREFIX } from '../../helpers/API';
import { LoginResponse } from '../../interfaces/auth.interface';
import { AppDispatch } from '../../store/store';
import { userActions } from '../../store/user.slice';
import styles from './Login.module.css';

export type LoginForm = {
	email: {
		value: string;
	};
	password: {
		value: string;
	};
};

export function Login() {
	const [error, setError] = useState<string | null>();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		await sendLogin(email.value, password.value);
	};

	const sendLogin = async (email: string, password: string) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email,
				password,
			});

			dispatch(userActions.addJwt(data.access_token));
			navigate('/');
		} catch (e) {
			if (e instanceof AxiosError) {
				console.log(e);
				setError(e.response?.data.message);
			}
		}
	};

	return (
		<div className={styles['login']}>
			<Heading>Вход</Heading>
			{error && <div className={styles['error']}>{error}</div>}
			<form className={styles['form']} onSubmit={submit}>
				<div className={styles['field']}>
					<label htmlFor='email'>Ваш email</label>
					<Input id='email' placeholder='Email' name='login' />
				</div>
				<div className={styles['field']}>
					<label htmlFor='password'>Ваш email</label>
					<Input
						id='password'
						type='password'
						placeholder='Passwords'
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
