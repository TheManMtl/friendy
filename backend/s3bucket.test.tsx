import { Response, NextFunction } from 'express';
import { attachS3Info } from './src/middleware/S3Middleware';
import { S3Client } from '@aws-sdk/client-s3';

jest.mock('@aws-sdk/client-s3');

describe('attachS3Info middleware', () => {
  it('attaches S3 client and bucketName to the request object', async () => {
    const req: any = {};
    const res: Response = {} as Response;
    const next: NextFunction = jest.fn();
    await attachS3Info(req, res, next);
    expect(req.s3).toBeInstanceOf(S3Client);
    expect(req.bucketName).toBe('friendy-bucket');
  });
});
