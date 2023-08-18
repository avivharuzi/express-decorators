export type ClassType<T = any> = new (...args: any[]) => T;

export type ClassInstance = { constructor: Function };
