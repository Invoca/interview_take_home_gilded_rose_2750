const { Inventory, Item } = require('./index.js');
const { closingTime } = require('./index_refactor');

function addItemAndUpdatePrice_refactor(itemName, sellBy, price) {
    const item = new Item(itemName, sellBy, price);
    return closingTime([item])[0];
}

function addItemAndUpdatePrice(itemName, sellBy, price) {
    const item = new Item(itemName, sellBy, price);
    const inventory = new Inventory([item]);
    inventory.updatePrice();
    return item;
}

describe('Normal Items', () => {
    test('reduces price and sellBy for normal items', () => {
        updatedItem = addItemAndUpdatePrice_refactor('Normal Item', 10, 20);
        expect(updatedItem.sellBy).toBe(9);
        expect(updatedItem.price).toBe(19);
    });

    test('reduces price twice as fast for normal items past sellBy', () => {
        updatedItem = addItemAndUpdatePrice_refactor('Normal Item', -1, 20);
        expect(updatedItem.price).toBe(18);
    });

    test('does not allow price to go negative', () => {
        updatedItem = addItemAndUpdatePrice_refactor('Normal Item', 10, 0);
        expect(updatedItem.price).toBe(0);
    });
}); 

describe('Gold Coins', () => {
    test('does not allow gold coin price to exceed 80', () => {
        updatedItem = addItemAndUpdatePrice_refactor('Gold Coins', 10, 80);
        expect(updatedItem.price).toBe(80);
    });

    test('does not reduce sellBy time for gold coins', () => {
        updatedItem = addItemAndUpdatePrice_refactor('Gold Coins', 10, 80);
        expect(updatedItem.sellBy).toBe(10);
    });
}); 

describe('Fine Art', () => {
    test('increases price for Fine Art', () => {
        updatedItem = addItemAndUpdatePrice_refactor('Fine Art', 10, 20);
        expect(updatedItem.price).toBe(21);
    });

    test('does not allow price of appreciating items to exceed 50', () => {
        updatedItem = addItemAndUpdatePrice_refactor('Fine Art', 10, 50);
        expect(updatedItem.price).toBe(50);
    });
}); 

describe('Concert Tickets', () => {
    test('does not allow price of appreciating items to exceed 50', () => {
        updatedItem = addItemAndUpdatePrice('Concert Tickets', 10, 50);
        expect(updatedItem.price).toBe(50);
    });

    test('increases price for Concert Tickets by 1 when more than 10 days before sellBy', () => {
        updatedItem = addItemAndUpdatePrice('Concert Tickets', 12, 20);
        expect(updatedItem.price).toBe(21);
    });

    test('increases price for Concert Tickets by 2 when between 6 and 10 days before sellBy', () => {
        updatedItem = addItemAndUpdatePrice('Concert Tickets', 7, 20);
        expect(updatedItem.price).toBe(22);
    });

    test('increases price for Concert Tickets by 3 when less than 6 days before sellBy', () => {
        updatedItem = addItemAndUpdatePrice('Concert Tickets', 5, 20);
        expect(updatedItem.price).toBe(23);
    });

    test('reduces price to 0 when sellBy for Concert Tickets is zero', () => {
        updatedItem = addItemAndUpdatePrice('Concert Tickets', 0, 20);
        expect(updatedItem.price).toBe(0);
    });
});