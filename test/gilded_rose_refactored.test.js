import {GildedRose, NormalItem, AgedBrie} from "../src/gilded_rose_refactored";

describe("Gilded Rose", () => {
  describe("Normal Item", () => {
    it("quality and sellIn lowered by 1 every day", () => {
      const gildedRose = new GildedRose([new NormalItem(10, 4)]);
      const [item] = gildedRose.updateQuality();
      expect(item).toMatchObject({ sellIn: 9, quality: 3 });
    });

    it("quality lowered by 2 when sellIn is negative", () => {
      const gildedRose = new GildedRose([new NormalItem(-1, 4)]);
      const [item] = gildedRose.updateQuality();
      expect(item.quality).toBe(2);
    });

    it("quality is never negative", () => {
      const gildedRose = new GildedRose([new NormalItem(10, 0)]);
      const [item] = gildedRose.updateQuality();
      expect(item.quality).toBe(0);
    });
  });

  describe("Aged Brie", () => {
    it("quality increases by 1 every day till sellIn is negative", () => {
      const gildedRose = new GildedRose([new AgedBrie(10, 4)]);
      const [agedBrie] = gildedRose.updateQuality();
      expect(agedBrie.quality).toBe(5);
    });

    it("quality increases by 2 if sellIn is negative", () => {
      const gildedRose = new GildedRose([new AgedBrie(-1, 4)]);
      const [agedBrie] = gildedRose.updateQuality();
      expect(agedBrie.quality).toBe(6);
    });

    it("quality maximum is 50", () => {
      const gildedRose = new GildedRose([new AgedBrie(10, 50)]);
      const [agedBrie] = gildedRose.updateQuality();
      expect(agedBrie.quality).toBe(50);
    });
  });
});