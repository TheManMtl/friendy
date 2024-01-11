import { Request, Response, NextFunction } from 'express';
import { authUser, authAdmin, logout, CustomRequest } from './src/middleware/auth';
describe('Authentication Middleware', () => {
    let req: CustomRequest;
    let res: Partial<Response>;
    let next: NextFunction;
  
    beforeEach(() => {
      req = {
        headers: {},
        cookies: {},
      } as CustomRequest;
  
      res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
        clearCookie: jest.fn(),
      };
  
      next = jest.fn();
    });
  
    it('should pass authentication and call next', async () => {
      req.headers['x-access-token'] = 'validToken';
      req.cookies['refreshToken'] = 'validRefreshToken';
      await authUser(req, res as Response, () => {
        console.log('Authentication middleware executed successfully');
        expect(res.status).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
      });
    });
  });