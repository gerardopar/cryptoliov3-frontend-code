export const AscCoinSort = coins => coins.sort((a, b) => {
    if (a.price > b.price) { return -1; } 
    if (a.price < b.price) { return 1; }
    return 0; // default return value (no sorting)
});

export const DescCoinSort = coins => coins.sort((a, b) => {
    if (b.price > a.price) { return -1; } 
    if (b.price < a.price) { return 1; }
    return 0; // default return value (no sorting)
});
