export interface IArbUser {
  login: string;
  email: string;
  password: string;
}

export class ArbUser implements IArbUser {
  login: string;
  email: string;
  password: string;

  constructor(username: string, password: string) {
    this.login = username;
    this.email = username;
    this.password = password;
  }
}
