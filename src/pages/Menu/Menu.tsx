import axios, { AxiosError } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import Heading from '../../components/Heading/Heading';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import { MenuList } from '../MenuList/MenuList';
import styles from './Menu.module.css';

function Menu() {
	const [products, setProducts] = useState<Product[]>([]);

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const [error, setError] = useState<string | undefined>();

	const [filter, setFilter] = useState<string>();

	const getMenu = async (name?: string) => {
		try {
			setIsLoading(true);
			const { data } = await axios.get<Product[]>(`${PREFIX}/products`, {
				params: {
					name,
				},
			});
			setProducts(data);
			setIsLoading(false);
		} catch (e) {
			if (e instanceof AxiosError) {
				setError(e.message);
			}
			setIsLoading(false);
			return;
		}
	};

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};

	useEffect(() => {
		getMenu(filter);
	}, [filter]);

	return (
		<>
			<div className={styles['head']}>
				<Heading>Меню</Heading>
				<Search
					placeholder='Введите блюдо или состав'
					onChange={updateFilter}
				/>
			</div>
			<div>
				{error && <>{error}</>}
				{!isLoading && products.length > 0 && <MenuList products={products} />}
				{isLoading && <>Loading...</>}
				{!isLoading && products.length == 0 && <>Not found</>}
			</div>
		</>
	);
}

export default Menu;
