export const jwtConstants = {
  secret: String(process.env.JWT_SECRET_KEY),
  expiresIn: parseInt(process.env.JWT_EXPIREIN),
};
