const Assertion = require('../common/Assertion');

const NOT_NULL_MESSAGE = 'Invalid entries. Try again.';

class User {
  constructor({ id, name, email, password, role }) {
    this.assertion = new Assertion();

    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    if (!role) this.role = 'user';
    else this.role = role;
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

  set email(value) {
    this.assertion.assertNotNull(value, NOT_NULL_MESSAGE);
    this.assertion.assertIsEmail(value, NOT_NULL_MESSAGE);
    this.aEmail = value;
  }

  get email() {
    return this.aEmail;
  }

  set role(value) {
    this.assertion.assertNotNull(value, NOT_NULL_MESSAGE);
    this.aRole = value;
  }

  get role() {
    return this.aRole;
  }

  set password(value) {
    this.assertion.assertNotNull(value, NOT_NULL_MESSAGE);
    this.aPassword = value;
  }

  get password() {
    return this.aPassword;
  }

  toJson() {
    return {
      _id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      password: this.password,
    };
  }

  static fromJson({
    _id,
    name,
    email,
    password,
    role,
  }) {
    const user = new User({
      id: _id,
      name,
      email,
      password,
      role,
    });

    return user;
  }
}

module.exports = User;