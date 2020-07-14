const {Shop, Item} = require("../src/gilded_rose");

function runUpdateQuality(item) {
  const gildedRose = new Shop([item]);
  const items = gildedRose.updateQuality();
  return items[0];
}

describe("Gilded Rose", function() {
  // it("should foo", function() {
  //   const gildedRose = new Shop([new Item("foo", 0, 0)]);
  //   const items = gildedRose.updateQuality();
  //   expect(items[0].name).toBe("foo");
  // });

  describe("Normal Item", () => {
    it("At the end of each day our system lowers quality for every item by 1, before sell date", () => {
      const item = new Item("normal", 10, 9);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.quality).toBe(8);
    });
    it("Once the sell by date has passed, quality degrades twice as fast, on sell date !", () => {      //-> see comments!
      const item = new Item("normal", 0, 9);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.quality).toBe(7);
    });
    it("Once the sell by date has passed, quality degrades twice as fast, after sell date", () => {
      const item = new Item("normal", -3, 9);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.quality).toBe(7);
    });

    it("At the end of each day our system lowers sellIn for every item by 1, before sell date", () => {
      const item = new Item("normal", 10, 9);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.sellIn).toBe(9);
    });
    it("At the end of each day our system lowers sellIn for every item by 1, on sell date", () => {
      const item = new Item("normal", 0, 9);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.sellIn).toBe(-1);
    });
    it("At the end of each day our system lowers sellIn for every item by 1, after sell date", () => {
      const item = new Item("normal", -3, 9);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.sellIn).toBe(-4);
    });

    it("The Quality of an item is never negative", () => {
      const item = new Item("normal", 10, 0);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.quality).toBe(0);
    });
  });

  describe("Aged Brie", () => {
    it("Aged Brie actually increases in quality the older it gets by 1 before sell date", () => {
      const item = new Item("Aged Brie", 10, 9);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.quality).toBe(10);
    });
    it("Aged Brie actually increases in quality the older it gets by 2 on sell date !", () => {         //--> see comments !
      const item = new Item("Aged Brie", 0, 9);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.quality).toBe(11);
    });
    it("Aged Brie actually increases in quality the older it gets by 2 after sell date !", () => {      //--> see comments !
      const item = new Item("Aged Brie", -3, 9);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.quality).toBe(11);
    });

    it("At the end of each day our system lowers sellIn for every item by 1, before sell date", () => {
      const item = new Item("Aged Brie", 10, 9);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.sellIn).toBe(9);
    });
    it("At the end of each day our system lowers sellIn for every item by 1, on sell date", () => {
      const item = new Item("Aged Brie", 0, 9);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.sellIn).toBe(-1);
    });
    it("At the end of each day our system lowers sellIn for every item by 1, after sell date", () => {
      const item = new Item("Aged Brie", -3, 9);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.sellIn).toBe(-4);
    });

    it("The quality of an item is never more than 50", () => {
      const item = new Item("Aged Brie", 10, 50);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.quality).toBe(50);
    });
    it("The quality of an item is never more than 50, also near sell date", () => {
      const item = new Item("Aged Brie", 0, 49);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.quality).toBe(50);
    });
  });

  describe("Sulfuras", () => {
    it("Sulfuras quality is 80 and it never alters, including before sell date", () => {
      const item = new Item("Sulfuras, Hand of Ragnaros", 10, 80);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.quality).toBe(80);
    });
    it("Sulfuras quality is 80 and it never alters, including on sell date", () => {
      const item = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.quality).toBe(80);
    });
    it("Sulfuras quality is 80 and it never alters, including after sell date", () => {
      const item = new Item("Sulfuras, Hand of Ragnaros", -3, 80);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.quality).toBe(80);
    });

    it("Sulfuras sellIn never decreases, including before sell date", () => {
      const item = new Item("Sulfuras, Hand of Ragnaros", 10, 80);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.sellIn).toBe(10);
    });
    it("Sulfuras sellIn never decreases, including on sell date", () => {
      const item = new Item("Sulfuras, Hand of Ragnaros", 0, 80);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.sellIn).toBe(0);
    });
    it("Sulfuras sellIn never decreases, including after sell date", () => {
      const item = new Item("Sulfuras, Hand of Ragnaros", -3, 80);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.sellIn).toBe(-3);
    });
  });

  describe("Backstage Pass", () => {
    it("Backstage passes, like aged brie, increases in quality as its sellIn value approaches, by 1, when more than 10 days before sell date", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 20, 9);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.quality).toBe(10);
    });
    it("Backstage passes increases in quality as its sellIn value approaches, by 2 when between 10 and 5 days before sell date", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 9);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.quality).toBe(11);
    });
    it("Backstage passes increases in quality as its sellIn value approaches, by 3 when 5 or less days before sell date", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 9);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.quality).toBe(12);
    });
    it("Quality drops to 0 during the concert, on sell date !", () => {                   //---> see comments !
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 9);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.quality).toBe(0);
    });
    it("Quality drops to 0 after the concert, after sell date", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", -3, 9);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.quality).toBe(0);
    });

    it("At the end of each day our system lowers sellIn for every item by 1 (except sulfuras), before sell date", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 9);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.sellIn).toBe(9);
    });
    it("At the end of each day our system lowers sellIn for every item by 1 (except sulfuras), on sell date", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 9);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.sellIn).toBe(-1);
    });
    it("At the end of each day our system lowers sellIn for every item by 1 (except sulfuras), after sell date", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", -3, 9);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.sellIn).toBe(-4);
    });

    it("The quality of an item is never more than 50 (except sulfuras), including when more than 10 days before sell date", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 20, 50);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.quality).toBe(50);
    });
    it("The quality of an item is never more than 50 (except sulfuras), including when between 10 and 5 days before sell date", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.quality).toBe(50);
    });
    it("The quality of an item is never more than 50 (except sulfuras), including when 5 or less days before sell date", () => {
      const item = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 48);
      const updatedItem = runUpdateQuality(item);
      expect(updatedItem.quality).toBe(50);
    });
  });
});
