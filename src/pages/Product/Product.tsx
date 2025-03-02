import { useLoaderData } from 'react-router-dom';
import type { Product as ProductType } from '../../interfaces/product.interface';

export function Product() {
	const data = useLoaderData() as ProductType;
	return <>Product - {data.name}</>;
}
