export const getMerchantIdFromFirstOrderItem = (items: string | any[] | undefined) => items !== undefined && items.length > 0 && items[0].merchantId;