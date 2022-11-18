import { getMerchantIdFromFirstOrderItem } from "../../utils/OrderItemUtils";

describe('OrderItemUtils unit tests', () => {
    it('Should return false if orderItem[0].merchantId exists', () => {
        expect(getMerchantIdFromFirstOrderItem([])).toStrictEqual(false)
    });

    it('Should return true if orderItem[0].merchantId exists', () => {
        const merchantId = 'merchantId';
        expect(getMerchantIdFromFirstOrderItem([
            {
                merchantId: merchantId
            }
        ])).toStrictEqual(merchantId)
    });
});
