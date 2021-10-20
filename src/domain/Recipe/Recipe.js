const Assertion = require('../common/Assertion');

const NOT_NULL_MESSAGE = 'Invalid entries. Try again.';

class Recipe {
  constructor({ id, name, ingredients, preparation, userId }) {
    this.assertion = new Assertion();

    this.id = id;
    this.name = name;
    this.ingredients = ingredients;
    this.preparation = preparation;
    this.userId = userId;
  }

  set id(value) {
    this.assertion.assertNotNull(value, NOT_NULL_MESSAGE);
    this.aId = value;
  }

  get id() {
    return this.aId;
  }

  set name(value) {
    this.assertion.assertNotNull(value, NOT_NULL_MESSAGE);
    this.aName = value;
  }

  get name() {
    return this.aName;
  }

  set ingredients(value) {
    this.assertion.assertNotNull(value, NOT_NULL_MESSAGE);
    this.aIngredients = value;
  }

  get ingredients() {
    return this.aIngredients;
  }

  set preparation(value) {
    this.assertion.assertNotNull(value, NOT_NULL_MESSAGE);
    this.aPreparation = value;
  }

  get preparation() {
    return this.aPreparation;
  }

  set userId(value) {
    this.assertion.assertNotNull(value, NOT_NULL_MESSAGE);
    this.aUserId = value;
  }

  get userId() {
    return this.aUserId;
  }

  toJson() {
    return {
      _id: this.id,
      name: this.name,
      ingredients: this.ingredients,
      preparation: this.preparation,
      userId: this.userId,
    };
  }

  static fromJson({
    _id,
    name,
    ingredients,
    preparation,
    userId,
  }) {
    const recipe = new Recipe({
      id: _id,
      name,
      ingredients,
      preparation,
      userId,
    });

    return recipe;
  }
}

module.exports = Recipe;