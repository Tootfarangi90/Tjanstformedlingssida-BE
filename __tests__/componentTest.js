/**
 @group component
 */

 function sum(a,b) {
  return a+b
}

test('Integration test', () => {
  expect(sum(1, 2)).toBe(3);
});