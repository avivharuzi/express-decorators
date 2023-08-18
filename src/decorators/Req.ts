import { createParameterDecorator } from '../utils/index.js';

export const Req = () => createParameterDecorator((context) => context.req);
