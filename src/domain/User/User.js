const Assertion = require('../common/Assertion');

class User {
  constructor({
    id, name, email,
    role, password }) {
    this._assertion = new Assertion();

    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    //this.role = role;
  }

  set id(value) {
    this._assertion.assertNotNull(value);
    this._id = value;
  }

  get id() {
    return this._id;
  }

  set name(value) {
    this._assertion.assertNotNull(value);
    this._name = value;
  }

  get name() {
    return this._name;
  }

  set email(value) {
    this._assertion.assertNotNull(value);
    this._email = value;
  }

  get email() {
    return this._email;
  }

  set role(value) {
    this._assertion.assertNotNull(value, 'O role não pode ficar vazio!', 'role');
    this._role = value;
  }

  get role() {
    return this._role;
  }

  set password({ password }) {
   // this._assertion.assertNotNull(criptografia, 'A senha não pode ficar vazia!', 'senha.criptografia');
   // this._assertion.assertInterval(tamanho, 6, 20, 'O tamanho da senha deve ser entre 6 e 20 caracteres!', 'senha.tamanho');
    this._password = password;
  }

  get password() {
    return this._password;
  }

  /*
  atribuirPassaportes(passaportes){
  this._assertion.assertNotNull(passaportes, "O passaporte não pode ser nulo!", "passaportes");
  this._assertion.assertNotEmpty(passaportes, "O passaporte não pode ser vazio!", "passaportes");
  
  for(let i = 0; i < passaportes.length; i++) {
  this._assertion.assertTrue(passaportes[i] instanceof Passaporte, 
  `O passaporte na posição ${i + 1} não é válido!`, `passaportes[${i}]`);
  }
  
  this._passaportes.push(...passaportes);
  }
  
  removerPassaportes(passaportes = []){
  this._passaportes = this._passaportes.filter(item => !passaportes.includes(item.name) );
  }
  */
  toJson() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      password: this.password,
    };
  }

  static fromJson({
    id,
    name,
    email,
    password,
    role,
  }) {
    const user = new User({
      id,
      name,
      email,
      password,
      role,
    });

    return user;
  }
}

module.exports = User;