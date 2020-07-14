import {GildedRose, NormalItem} from "../src/gilded_rose_refactored";

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
});