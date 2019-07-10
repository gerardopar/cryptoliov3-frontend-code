export const AscCoinSort = (coins) => {
    return coins.sort((a, b) => {
        if(a.price > b.price) //sort price ascending
            return -1 
        if (a.price < b.price) 
            return 1
        return 0 //default return value (no sorting)
    })
};

export const DescCoinSort = (coins) => {
    return coins.sort((a, b) => {
        if(b.price > a.price) //sort price descending
            return -1 
        if (b.price < a.price) 
            return 1
        return 0 //default return value (no sorting)
    })
};