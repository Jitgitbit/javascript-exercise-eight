export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const minQuality = 0;
const maxQuality = 50;

export class GildedRose {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    return this.items.map(item => item.updateQuality());
  }
}