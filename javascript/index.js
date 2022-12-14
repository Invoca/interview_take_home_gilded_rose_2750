const MAX_PRICE = 50;
const GOLD_PRICE = 80;
const BEFORE_EXP_RATE = 1;
const EXP_RATE = 2;

const updateNormalItem = (item) => {
  let price = item.price;
  if (item.sellBy - 1 < 0) {
    if (item.price - EXP_RATE > 0) price -= EXP_RATE; //Ensure price doesn't go negative
  } else {
    if (item.price - 1 > 0) price -= BEFORE_EXP_RATE;
  }
  return new Item(item.name, item.sellBy - 1, price);
};

const updateFlowers = (item) => {
  let price = item.price;
  if (item.sellBy - 1 < 0) {
    if (item.price - (2 * EXP_RATE) > 0) price -= (2 * EXP_RATE); //Ensure price doesn't go negative
  } else {
    if (item.price - 1 > 0) price -= (2 * BEFORE_EXP_RATE);
  }
  return new Item(item.name, item.sellBy - 1, price);
};

const updateTicket = (item) => {
  return new Item(item.name, item.sellBy - 1, limit(getTicketPrice(item)));
};

const getTicketPrice = (item) => {
  const nextSellBy = item.sellBy - 1;
  if(nextSellBy < 0) return 0;
  if(nextSellBy < 6) return item.price + 3;
  if(nextSellBy < 11) return item.price + 2;
  if(nextSellBy < MAX_PRICE) return item.price + 1;
  return item.price;
}

const limit = (price) => price > MAX_PRICE ? MAX_PRICE : price;

const updateArt = (item) => {
  let price = item.price;
  if (item.price + 1 < MAX_PRICE) price++;
  return new Item(item.name, item.sellBy - 1, price);
};

const updateGold = (item) => new Item(item.name, item.sellBy, GOLD_PRICE);

//Add any new item types here with its own separate update function
const specialItemList = {
  "Normal Item": updateNormalItem,
  "Gold Coins": updateGold,
  "Fine Art": updateArt,
  "Concert Tickets": updateTicket,
  "Flowers": updateFlowers,
};

const updatePrice = (item) => {
  return specialItemList[item.name]?.(item) ?? updateNormalItem(item);
};

const updatePrices = (items) => {
  return items.map(updatePrice);
};

class Item {
  constructor(name, sellBy, price) {
    this.name = name;
    this.sellBy = sellBy;
    this.price = price;
  }

  toString() {
    return `${this.name}, ${this.sellBy}, ${this.price}`;
  }
}

module.exports = { Item, updatePrices, updateNormalItem, updateGold, updateArt, updateTicket };
