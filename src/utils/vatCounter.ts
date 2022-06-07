const vatCounter = (items: any) => {
    interface vatTable {
        [index: string]: number;
    }

    // eslint-disable-next-line @typescript-eslint/no-redeclare
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
