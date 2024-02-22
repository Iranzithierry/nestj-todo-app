
import * as bcrypt from 'bcrypt';

export  const hashPassword = async (password: string | Buffer) => {
    return await bcrypt.hash(password, 12);
}
export const comparePassword = async (plainPassword: string | Buffer, hashedPassword: string) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
}