import { Locator } from 'playwright';
import { PaymentType, ProductInfo } from './types';

/**
 * Retrieves pricing information for all products listed on a given URL and returns it as an array of product objects.
 *
 * @param {Locator} element - The URL of the web page to scrape.
 * @returns {Promise<Product[]>} A Promise that resolves to an array of product objects.
 *
 * @example
 * [
 *   {
 *     optionTitle: 'Basic: 500MB Data - 12 Months',
 *     description: 'The basic starter subscription providing you with all you need to get your device up and running with inclusive Data and SMS services.',
 *     price: 5.99,
 *     discount: 0,
 *     annualPrice: 71.88,
 *		paymentType: 'PM'
 *   },
 *   {
 *     optionTitle: 'Standard: 1GB Data - 12 Months',
 *     description: 'The standard subscription providing you with enough service time to support the average user to enable your device to be up and running with inclusive Data and SMS services.',
 *     price: 9.99,
 *     discount: 0,
 *     annualPrice: 119.88,
 * 		 paymentType: 'PM'
 *   },
 *   {
 *     optionTitle: 'Optimum: 2 GB Data - 12 Months',
 *     description: 'The optimum subscription providing you with enough service time to support the above-average user to enable your device to be up and running with inclusive Data and SMS services',
 *     price: 191.88,
 *     discount: 0,
 *     annualPrice: 191.88,
 *		 paymentType: 'PA'
 *   }
 * ]
 */
export async function getProductInfo(element: Locator): Promise<ProductInfo> {
	const title = (await element.locator('.header h3')?.textContent() ?? '').trim();
	const description = (await element.locator('.package-description')?.textContent() ?? '').trim();
	const priceText = await element.locator('.package-price .price-big')?.textContent() ?? '0.00';
	const paymentType = (await element.locator('.package-price')?.textContent())?.includes('Per Month') ? PaymentType.PM : PaymentType.PA;
	const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
	let discountText = '0.00';
	try {
		discountText = await element.locator('.package-price p')?.textContent() ?? '0.00';
	} catch (e) {}
	const discount = parseFloat(discountText.replace(/[^\d.]/g, ''));
	return { title, description, price, discount, paymentType };
}
