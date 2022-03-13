const accessTokenAsCookie = (token: string) => `access_token=${token}; Path=/; HttpOnly; SameSite=Strict`;

export { accessTokenAsCookie };
