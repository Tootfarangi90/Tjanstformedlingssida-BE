/**
 @group component
 */

 const sum = require('./sum');

test('Integration test', () => {
  expect(sum(1, 2)).toBe(3);
});