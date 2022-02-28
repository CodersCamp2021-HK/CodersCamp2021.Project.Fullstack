import { Injectable } from '@nestjs/common';
import { pbkdf2, randomBytes } from 'crypto';

import { PasswordHasher } from '../domain';

type Pbkdf2PasswordHasherOptions = {
  hashBytes: number;
  saltBytes: number;
  iterations: number;
};

@Injectable()
class Pbkdf2PasswordHasher extends PasswordHasher {
  constructor(private readonly options: Readonly<Pbkdf2PasswordHasherOptions>) {
    super();
  }

  hash(str: string) {
    return new Promise<string>((resolve, reject) => {
      randomBytes(this.options.saltBytes, (err, salt) => {
        if (err) {
          return reject(err);
        }

        pbkdf2(str, salt, this.options.iterations, this.options.hashBytes, 'sha512', (err, hash) => {
          if (err) {
            return reject(err);
          }

          const combined = Buffer.alloc(hash.length + salt.length);
          salt.copy(combined, 0);
          hash.copy(combined, salt.length);
          resolve(combined.toString('hex'));
        });
      });
    });
  }

  match(provided: string, expected: string) {
    return new Promise<boolean>((resolve, reject) => {
      const buff = Buffer.from(expected, 'hex');
      const salt = buff.slice(0, this.options.saltBytes);
      const pass = buff.slice(this.options.saltBytes);
      pbkdf2(provided, salt, this.options.iterations, this.options.hashBytes, 'sha512', (err, hash) => {
        if (err) {
          return reject(err);
        }

        return resolve(pass.compare(hash) === 0);
      });
    });
  }
}

export { Pbkdf2PasswordHasher };
export type { Pbkdf2PasswordHasherOptions };
