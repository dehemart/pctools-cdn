import * as bcrypt from 'bcrypt';

const saltRounds = 10; // Increase this for stronger hashing (more time-consuming)

export async function hashPassword(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw new Error('Error hashing password: ' + error);
  }
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  try {
    const match = await bcrypt.compare(password, hash);
    return match;
  } catch (error) {
    throw new Error('Error comparing password: ' + error);
  }
}