import { createParameterDecorator } from '../utils/index.js';

export const Res = () => createParameterDecorator((context) => context.res);
