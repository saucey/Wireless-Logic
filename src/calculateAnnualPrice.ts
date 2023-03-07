import { PaymentType, ProductInfo } from './types';

/**
* Calculates the annual price for a given product based on its monthly or yearly price and discount
* @param {ProductInfo} product - The product to calculate the annual price for
* @returns {Promise<number>} - The annual price of the product
* @example
*   const product = {
*     option: 'Basic: 6GB Data - 1 Year',
*     description: 'Up to 6GB of data per year including 240 SMS (5p / MB data and 4p / SMS thereafter)',
*     price: 66,
*     discount: 5.86
*   };
*   const annualPrice = await calculateAnnualPrice(product); // returns 60.14
*/
export async function calculateAnnualPrice(product: ProductInfo): Promise<number> {
	if (product.price <= 0) return 0;
	const period = product.paymentType === PaymentType.PM ? 12 : 1;
	return product.price * period;
}