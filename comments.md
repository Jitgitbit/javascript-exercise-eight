git init
git add .
git commit -m 'first'
[COMMIT 1]: (first)
gst
git remote add origin git@github.com:Jitgitbit/javascript-exercise-eight.git
git push -u origin master

npm init
npm install --save-dev jest
[COMMIT 2]: (prepped for jest)


COMMENT ON CODE:
===============
-> Once the sell by date has passed, quality degrades twice as fast, on sell date ?  -> the given code includes the selling date !
[COMMIT 3]: (tests for "Normal Items" on original code added)
--> "Aged Brie" actually increases in Quality the older it gets ! --> the given code shows it 2x on sell date and after !
[COMMIT 4]: (tests for "Aged Brie" on original code added)
[COMMIT 5]: (tests for "Sulfuras" on original code added)
---> "Quality drops to 0 during the concert, on sell date !" ---> the given code includes the sell date !
[COMMIT 6]: (tests for "Backstage Pass" on original code added)
[COMMIT 7]: (code cleanup)
===============

npm install babel-core --save-dev
npm install @babel/preset-env --save-dev
[COMMIT 8]: (prepped for babel)


[COMMIT 9]: (refactored "Normal Item" + test)

IMPORTANT NOTE:
--------------
to watch testrun for the refactored code specifically:
npm run test:watch + enter
press p to filter by filename
type for pattern: gilded_rose_refactored.test.js + enter
when done, control + c to exit
--------------

[COMMIT 10]: (important note on running test:watch added)

[COMMIT 11]: (refactored "Aged Brie" + test)
[COMMIT 12]: (refactored "Sulfuras" + test)
[COMMIT 13]: (refactored "Backstage Pass" + test)

[COMMIT 14]: (new class ConjuredItem for "Conjured" added + test)

[COMMIT 15]: (coverage test done, green)

[COMMIT 16]: (refactored "Backstage Pass" a bit more, all tests green)

[COMMIT 17]: (README updated)