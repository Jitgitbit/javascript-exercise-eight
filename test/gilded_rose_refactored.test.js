import {GildedRose, NormalItem, AgedBrie, SulfurasItem, BackstagePass} from "../src/gilded_rose_refactored";

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

  describe("Sulfuras", () => {
    it("quality and sellIn properties remain unchanged", () => {
      const gildedRose = new GildedRose([new SulfurasItem(10, 80)]);
      const [sulfuras] = gildedRose.updateQuality();
      expect(sulfuras).toMatchObject({ sellIn: 10, quality: 80 });
    });

    it("quality and sellIn properties remain unchanged, including when sellIn is negative", () => {
      const gildedRose = new GildedRose([new SulfurasItem(-1, 80)]);
      const [sulfuras] = gildedRose.updateQuality();
      expect(sulfuras).toMatchObject({ sellIn: -1, quality: 80 });
    });
  });

  describe("Backstage Pass", () => {
    function gradualQualityIncrease(qualityIncrease, sellIn) {
      it(`quality increases by ${qualityIncrease} when sellIn is ${sellIn}`, () => {
        const initialQuality = 4;
        const gildedRose = new GildedRose([
          new BackstagePass(sellIn, initialQuality)
        ]);
        const [backstagePass] = gildedRose.updateQuality();
        expect(backstagePass.quality).toBe(initialQuality + qualityIncrease);
      });
    }
    gradualQualityIncrease(1, 20);
    gradualQualityIncrease(1, 19);
    gradualQualityIncrease(1, 11);
    gradualQualityIncrease(2, 10);
    gradualQualityIncrease(2, 9);
    gradualQualityIncrease(2, 6);
    gradualQualityIncrease(3, 5);
    gradualQualityIncrease(3, 3);
    gradualQualityIncrease(3, 1);

    it("quality becomes 0 when sellIn is 0", () => {
      const gildedRose = new GildedRose([new BackstagePass(0, 4)]);
      const [backstagePass] = gildedRose.updateQuality();
      expect(backstagePass.quality).toBe(0);
    });

    it("quality is never negative", () => {
      const gildedRose = new GildedRose([new BackstagePass(-3, 4)]);
      const [backstagePass] = gildedRose.updateQuality();
      expect(backstagePass.quality).toBe(0);
    });
  });
});