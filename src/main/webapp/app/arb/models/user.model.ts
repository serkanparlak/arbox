export interface IArbUser {
  id?: number;
  login: string;
  email: string;
  password: string;
}

export class ArbUser implements IArbUser {
  public email: string;

  constructor(public login: string, public password: string, public id?: number) {
    this.email = login;
  }
}
