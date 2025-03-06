import axios, { AxiosError } from 'axios';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import Input from '../../components/Input/Input';
import { PREFIX } from '../../helpers/API';
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

	const submit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);
		const target = e.target as typeof e.target & LoginForm;
		const { email, password } = target;
		await sendLogin(email.value, password.value);
	};

	const sendLogin = async (email: string, password: string) => {
		try {
			const { data } = await axios.post(`${PREFIX}/auth/login`, {
				email,
				password,
			});
			console.log(data);
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
