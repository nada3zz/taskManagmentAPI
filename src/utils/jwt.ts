import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;

export const signJwt = (payload: object, options?: jwt.SignOptions): string => {
  return jwt.sign(payload, accessTokenSecret, {
    ...options,
  });
};

export const verifyJwt = (
  token: string,
  options?: jwt.VerifyOptions
): object | null => {
  try {
    return jwt.verify(token, accessTokenSecret, {
      ...options,
    }) as object;
  } catch (error) {
    return null;
  }
};
