import { hash, compare } from "bcryptjs";

import IHashProvider from "../models/IHashProvider";

/**
 * This provider implements the bcrypt hash module.
 * Used to generate password hash and compare password string with password hash
 */

class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}

export default BCryptHashProvider;
