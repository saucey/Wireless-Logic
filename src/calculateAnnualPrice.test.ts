import { calculateAnnualPrice } from './calculateAnnualPrice';
import { PaymentType, ProductInfo } from './types';

describe('calculateAnnualPrice', () => {
	test('calculates annual price for monthly subscription', async () => {
		const product: ProductInfo = {
			title: 'Standard: 1GB Data - 12 Months',
			description: 'Up to 1 GB data per month including 35 SMS(5p / MB data and 4p / SMS thereafter)',
			price: 9.99,
			discount: 0,
			paymentType: PaymentType.PM
		};
		const expected = 119.88;
		const actual = await calculateAnnualPrice(product);
		expect(actual).toEqual(expected);
	});

	test('calculates annual price for yearly subscription', async () => {
		const product: ProductInfo = {
			title: 'Basic: 6GB Data - 1 Year',
			description: 'Up to 6GB of data per year including 240 SMS(5p / MB data and 4p / SMS thereafter)',
			price: 66.0,
			discount: 5.86,
			paymentType: PaymentType.PA
		};
		const expected = 66;
		const actual = await calculateAnnualPrice(product);
		expect(actual).toEqual(expected);
	});
});