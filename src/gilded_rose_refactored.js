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

export class AgedBrie extends Item {
  constructor(sellIn, quality) {
    super("Aged Brie", sellIn, quality);
  }

  updateQuality() {
    this.increaseQuality();
    this.lowerSellIn();
    if (this.isSellInNegative()) this.increaseQuality();

    return this;
  }
  increaseQuality() {
    if (this.quality < maxQuality) {
      this.quality = this.quality + 1;
    }
  }
  lowerSellIn() {
    this.sellIn = this.sellIn - 1;
  }
  isSellInNegative() {
    return this.sellIn < 0;
  }
}

export class SulfurasItem extends Item {
  constructor(sellIn, quality) {
    super("Sulfuras, Hand of Ragnaros", sellIn, quality);
  }

  updateQuality() {
    return this;
  }
}

export class BackstagePass extends Item {
  constructor(sellIn, quality) {
    super("Backstage passes to a TAFKAL80ETC concert", sellIn, quality);
  }

  updateQuality() {
    this.increaseQuality();
    if (this.sellIn <= 10) {
      this.increaseQuality();
    };
    if (this.sellIn <= 5) {
      this.increaseQuality();
    };
    this.lowerSellIn();
    if (this.isSellInNegative()) {
      this.setQualityToZero();
    };
    return this;
  }
  increaseQuality() {
    if (this.quality < maxQuality) {
      this.quality = this.quality + 1;
    }
  }
  lowerSellIn() {
    this.sellIn = this.sellIn - 1;
  }
  setQualityToZero() {
    this.quality = 0;
  }
  isSellInNegative() {
    return this.sellIn < 0;
  }
}