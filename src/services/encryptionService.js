import bcrypt from 'bcrypt';

// Function to hash a password
export const hashPassword = async (password) =>{
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

// Function to compare a password with its hash
export const comparePassword = async (inputPassword, hashedPassword) =>{
  try {
    const match = await bcrypt.compare(inputPassword, hashedPassword);
    return match;
  } catch (error) {
    throw error;
  }
}
