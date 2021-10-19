const AssertionError = require('./AssertionError');
const DuplicationError = require('./DuplicationError');

class Assertion {
  constructor() {
    this.stance = null;
  }

  assertEquals(anObject1, anObject2, aMessage) {
    if (anObject1 !== anObject2)
       throw new AssertionError(aMessage);
  }

  assertNotEquals(anObject1, anObject2, aMessage) {
    if (anObject1 === anObject2)
      throw new AssertionError(aMessage);
  }

  assertIsNullDuplicated(anObject1, aMessage) {
    if (anObject1)
      throw new DuplicationError(aMessage);
  }

  assertNotNull(anObject, aMessage) {
    if (!anObject)
      throw new AssertionError(aMessage); 
  }

  assertNull(anObject, aMessage) {
    if (anObject)
      throw new AssertionError(aMessage);
  }

  assertTrue(anValue, aMessage) {
    if (!anValue)
      throw new AssertionError(aMessage);
  }

  assertFalse(anValue, aMessage) {
    if (anValue)
      throw new AssertionError(aMessage); 
  }

  assertNotEmpty(anValue = [], aMessage) {
    if (anValue.length === 0)
      throw new AssertionError(aMessage);    
  }

  assertIsEmail(anValue = '', aMessage) {
    if(/\S+@\S+\.\S+/.test(anValue) === false)
      throw new AssertionError(aMessage); 
  }
}

module.exports = Assertion;