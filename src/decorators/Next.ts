import { createParameterDecorator } from '../utils/index.js';

export const Next = () => createParameterDecorator((context) => context.next);
