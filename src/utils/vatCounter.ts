const vatCounter = (items: any) => {
    interface vatTable {
        [index: string]: number;
    }

    let vatTable = {} as vatTable;

    items.forEach((item: any) => {        

        if (!vatTable[item.vatPercentage]) {
            vatTable[item.vatPercentage] = 0;
        }

        if (item.rowPriceVat) {
            vatTable[item.vatPercentage] += +item.rowPriceVat;
        }
        
    })  
    
    return vatTable;
};

export {vatCounter};
