import { createParameterDecorator } from '../utils/index.js';

export const Body = (param?: string) =>
  createParameterDecorator(({ req }) => {
    if (param) {
      return req.body[param];
    }

    return req.body;
  });
