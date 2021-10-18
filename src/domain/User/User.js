const Assertion = require('../common/Assertion');

class User {
  constructor({ id, name, email, password }) {
    this.assertion = new Assertion();

    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  set id(value) {
    this.assertion.assertNotNull(value);
    this.aId = value;
  }

  get id() {
    return this.aId;
  }

  set name(value) {
    this.assertion.assertNotNull(value);
    this.aName = value;
  }

  get name() {
    return this.aName;
  }

  set email(value) {
    this.assertion.assertNotNull(value);
    this.assertion.assertEmail(value);
    this.aEmail = value;
  }

  get email() {
    return this.aEmail;
  }

  set role(value) {
    this.assertion.assertNotNull(value);
    this.aRole = value;
  }

  get role() {
    return this.aRole;
  }

  set password(password) {
   // this.assertion.assertNotNull(criptografia, 'A senha não pode ficar vazia!', 'senha.criptografia');
   // this.assertion.assertInterval(tamanho, 6, 20, 'O tamanho da senha deve ser entre 6 e 20 caracteres!', 'senha.tamanho');
    this.aPassword = password;
  }

  get password() {
    return this.aPassword;
  }

  /*
  atribuirPassaportes(passaportes){
  this.assertion.assertNotNull(passaportes, "O passaporte não pode ser nulo!", "passaportes");
  this.assertion.assertNotEmpty(passaportes, "O passaporte não pode ser vazio!", "passaportes");
  
  for(let i = 0; i < passaportes.length; i++) {
  this.assertion.assertTrue(passaportes[i] instanceof Passaporte, 
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