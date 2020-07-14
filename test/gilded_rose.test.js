const {Shop, Item} = require("../src/gilded_rose");

function runUpdateQuality(item) {
  const gildedRose = new Shop([item]);
  const items = gildedRose.updateQuality();
  return items[0];
}

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

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
});
