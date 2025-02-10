import { ButtonHTMLAttributes, ReactNode } from 'react';

//Интерфейс для Button props
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
}
