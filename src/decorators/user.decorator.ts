import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { VerifiedUser } from '../types.js';

export const CurrentUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as VerifiedUser;
  },
);
