import * as bcrypt from 'bcrypt';

export class Encryption {
  public static encryptPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
  }

  public static decryptPassword(password: string, testPassword: string): Promise<any> {
    return new Promise((resolve, reject) => {
      return bcrypt.compare(testPassword, password, (err: any, res: any) => {
        if (err) {
          return reject(err);
        }
        return resolve(res);
      });
    });
  }
}