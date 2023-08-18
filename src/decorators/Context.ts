import { createParameterDecorator } from '../utils/index.js';

export const Context = () => createParameterDecorator((context) => context);
