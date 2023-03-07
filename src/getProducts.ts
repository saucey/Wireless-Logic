import { chromium } from 'playwright';
import { getProductInfo } from './getProductInfo';
import { calculateAnnualPrice } from './calculateAnnualPrice';
import { Product } from './types';

/**
 * Fetches product information from a pricing table on a webpage.
 *
 * @param {string} url - The URL of the webpage to fetch product information from.
 * @returns {Promise<Product[]>} - A Promise that resolves to an array of Product objects containing the title, description, price, discount, and annual price of each product.
 */
export async function getProducts(url: string): Promise<Product[]> {
	const browser = await chromium.launch();
	const context = await browser.newContext();
	const page = await context.newPage();
	await page.goto(url, { timeout: 50000});

	const pricingTableLocator = page.locator('.package');
	const htmlElements = await pricingTableLocator.all()


	const products = await Promise.all(htmlElements.map(getProductInfo));
	const annualPrices = await Promise.all(products.map(calculateAnnualPrice));
	const results = products.map((product, i) => ({
		...product,
		annualPrice: annualPrices[i],
	}));
	// results.sort((a, b) => a.annualPrice - b.annualPrice);
	results.sort((a, b) => b.annualPrice - a.annualPrice);
	
	await browser.close();
	return results;
}
