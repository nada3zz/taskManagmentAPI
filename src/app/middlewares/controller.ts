import { Request, Response, NextFunction } from "express";

const controller = (service: (req: Request, res: Response) => Promise<any>) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const result = await service(req, res);
      const { status = 200, data = null, message = "" } = result || {};
      res.json({
        status,
        data,
        message,
      });
    } catch (error) {
      next(error);
    }
  };
};

export { controller };
