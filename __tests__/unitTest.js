/**
 * Unit test

@group unit

*/


function sum(a,b) {
  return a+b
}

test('This is a unit test', () => {
  expect(sum(1, 2)).toBe(3);
});
