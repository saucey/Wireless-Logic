import { Page, chromium } from 'playwright';
import { getProductInfo } from './getProductInfo';
import { PaymentType } from './types';

jest.setTimeout(60000);

describe('getProductInfo', () => {
	let page: Page;

	beforeAll(async () => {
		const browser = await chromium.launch();
		const context = await browser.newContext();
		page = await context.newPage();
		await page.setContent(`
      <div class="pricing-table">
        <div class="header">
          <h3>Basic Plan</h3>
        </div>
        <div class="package-description">
          The basic plan includes 500MB of data and SMS services.
        </div>
        <div class="package-price"><span class="price-big">£9.99</span><br>(inc. VAT)<br>Per Month</div>
      </div>
    `);
	});

	afterAll(async () => {
		await page.close();
	});

	it('should return product information', async () => {
		const element = page.locator('.pricing-table');
		const result = await getProductInfo(element);
		expect(result).toEqual({
			title: 'Basic Plan',
			description: 'The basic plan includes 500MB of data and SMS services.',
			price: 9.99,
			discount: 0,
			paymentType: PaymentType.PM
		});
	});
});
