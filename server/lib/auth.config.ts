const secret = process.env.AUTH_SECRET_KEY;
const jwtExpiration = 3600;
const jwtRefreshExpiration = 86400;

export { secret, jwtExpiration, jwtRefreshExpiration };
