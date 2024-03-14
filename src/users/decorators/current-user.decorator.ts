import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const req = context.switchToHttp.getRequest(); // FIX THIS
    console.log(req.session.userId);
    return 'hi there!';
  },
);
