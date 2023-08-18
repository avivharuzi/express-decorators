import { createParameterDecorator } from '../utils/index.js';

export const Headers = (param?: string) =>
  createParameterDecorator(({ req }) => {
    if (param) {
      return req.headers[param];
    }

    return req.headers;
  });
