declare namespace Express {
  export interface Request {
    login: Function;
    logout: Function;
    flash: Function;
    user;
  }
}