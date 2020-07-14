export class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const minQuality = 0;

export class GildedRose {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    return this.items.map(item => item.updateQuality());
  }
}

export class NormalItem extends Item {
  constructor(sellIn, quality) {
    super("Normal", sellIn, quality);
  }

  updateQuality() {
    this.lowerQuality();
    this.lowerSellIn();
    if (this.isSellInNegative()) this.lowerQuality();

    return this;
  }
  lowerQuality() {
    if (this.quality > minQuality) {
      this.quality = this.quality - 1;
    }
  }
  lowerSellIn() {
    this.sellIn = this.sellIn - 1;
  }
  isSellInNegative() {
    return this.sellIn < 0;
  }
}