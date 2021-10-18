const AssertionError = require('./AssertionError');
//const NotFoundError = require('./NotFoundError').default;

class Assertion {

  assertEquals(anObject1, anObject2) {
    if (anObject1 !== anObject2) {
       throw new AssertionError; 
    }
  }

  assertNotEquals(anObject1, anObject2) {
    if (anObject1 === anObject2) {
      throw new AssertionError;
    }
  }

  assertNotNull(anObject) {
    if (!anObject) {
      throw new AssertionError; 
    }
  }

  assertNull(anObject) {
    if (anObject) {
      throw new AssertionError;
    }
  }

  assertTrue(anValue) {
    if (!anValue) {
      throw new AssertionError; 
    }
  }

  assertFalse(anValue) {
    if (anValue) {
      throw new AssertionError; 
    }
  }

  assertNotEmpty(anValue = []) {
    if (anValue.length === 0) {
      throw new AssertionError; 
    }
  }

  assertEmail(anValue = '') {
    return /\S+@\S+\.\S+/.test(anValue);
  }
/*
  assertNotFound(anObject) {
    if (!anObject) {
      throw new NotFoundError({
              detail: aMessage,
              source: aSource,
            }); 
      }
  }

  assertInterval(anValue, aMin, aMax) {
    if (anValue < aMin || anValue > aMax) {
      throw new AssertionError({
              detail: aMessage,
              source: aSource,
            }); 
      }
  }*/
}

module.exports = Assertion;