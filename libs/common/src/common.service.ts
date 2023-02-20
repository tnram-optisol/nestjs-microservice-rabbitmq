import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ResponseData } from './interface/responseData.interface';

@Injectable()
export class CommonService {
  response(code: string, data: any): ResponseData | RpcException {
    switch (code) {
      case '200':
        return {
          code: 'SUCCESS',
          statusCode: 200,
          data,
        };
      case '400':
        throw new RpcException({
          message: data,
          status: HttpStatus.BAD_REQUEST,
        });
      case '403':
        throw new RpcException({
          message: data,
          status: HttpStatus.UNAUTHORIZED,
        });
      default:
        throw new RpcException({
          data: 'Oops! An error occured',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          cause: new Error('Oops! An error occured'),
        });
    }
  }
}
