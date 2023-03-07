import { Browser, chromium } from 'playwright';
import { getProducts } from './getProducts';

jest.setTimeout(60000);

describe('getProducts function', () => {
	let browser: Browser;

	beforeAll(async () => {
		browser = await chromium.launch();
	});

	afterAll(async () => {
		await browser.close();
	});

	test('should return an array of products', async () => {
		const url = 'file://' + __dirname + '/testdata/pricing-table-1.html';
		const products = await getProducts(url);
		expect(Array.isArray(products)).toBe(true);
		expect(products.length).toBeGreaterThan(0);

		const firstProduct = products[0];
		expect(firstProduct.title).toBe('Basic: 6GB Data - 1 Year');
		 expect(firstProduct.description).toBe(
			'Up to 6GB of data per year including 240 SMS(5p / MB data and 4p / SMS thereafter)'
		);
		expect(firstProduct.price).toBe(66);
		expect(firstProduct.discount).toBe(5.86);
		expect(firstProduct.annualPrice).toBe(66);
	});

	test('should return an empty array when no products found', async () => {
		const url = 'file://' + __dirname + '/testdata/empty.html';
		const products = await getProducts(url);
		expect(Array.isArray(products)).toBe(true);
		expect(products.length).toBe(0);
	});

	test('should handle error when page is not found', async () => {
		const url = 'http://localhost:8080/notfound.html';
		await expect(getProducts(url)).rejects.toThrow('net::ERR_CONNECTION_REFUSED');
	});
});
