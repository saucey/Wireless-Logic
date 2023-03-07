/**
 * Represents a product's information
 * @interface
 * @property {string} title - The title or option of the product
 * @property {string} description - The description of the product
 * @property {number} price - The price of the product
 * @property {number} discount - The discount or savings on the product
 */
export interface ProductInfo {
	title: string;
	description: string;
	price: number;
	paymentType: PaymentType
	discount: number;
}

export enum PaymentType {
	PM = 'PM',
	PA = 'PA'
}

/**
 * Represents a product and its annual price
 * @interface
 * @extends {ProductInfo}
 * @property {number} annualPrice - The annual price of the product, calculated from its monthly or yearly price
 */
export interface Product extends ProductInfo {
	annualPrice: number;
}