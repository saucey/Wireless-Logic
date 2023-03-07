import { getProducts } from './getProducts';

(async () => {
	const url = 'https://wltest.dns-systems.net/';
	const products = await getProducts(url);
	console.log(JSON.stringify(products, null, 2));
})();
