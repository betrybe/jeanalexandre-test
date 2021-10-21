const AssertionError = require('./AssertionError');
const DuplicationError = require('./DuplicationError');

class Assertion {
  static assertEquals(anObject1, anObject2, aMessage) {
    if (anObject1 !== anObject2) {
      throw new AssertionError(aMessage);
    }
  }

  static assertNotEquals(anObject1, anObject2, aMessage) {
    if (anObject1 === anObject2) {
      throw new AssertionError(aMessage);
    }
  }

  static assertIsNullDuplicated(anObject1, aMessage) {
    if (anObject1) {
      throw new DuplicationError(aMessage);
    }
  }

  static assertNotNull(anObject, aMessage) {
    if (!anObject) {
      throw new AssertionError(aMessage); 
    }
  }

  static assertNull(anObject, aMessage) {
    if (anObject) {
      throw new AssertionError(aMessage);
    }
  }

  static assertTrue(anValue, aMessage) {
    if (!anValue) {
      throw new AssertionError(aMessage);
    }
  }

  static assertFalse(anValue, aMessage) {
    if (anValue) {
      throw new AssertionError(aMessage); 
    }
  }

  static assertNotEmpty(anValue = [], aMessage) {
    if (anValue.length === 0) {
      throw new AssertionError(aMessage);    
    }
  }

  static assertIsEmail(anValue = '', aMessage) {
    if (/\S+@\S+\.\S+/.test(anValue) === false) {
      throw new AssertionError(aMessage); 
    }
  }
}

module.exports = Assertion;