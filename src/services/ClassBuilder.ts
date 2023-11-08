import 'reflect-metadata';

import { Constructable } from '@/store/baseModule/baseIndex';

export default abstract class ClassBuilder {
  static BuildPrimitives(passedClass: { [key: string]: any }, arg?: { [key: string]: any }): void {
    if (!arg) {
      return;
    }
    Object.keys(arg).forEach((key) => {
      const prop = arg[key];
      if (this.isPrimitive(prop)) {
        if (passedClass[key] instanceof Date) {
          passedClass[key] = new Date(prop);
        } else {
          passedClass[key] = prop;
        }
      } else if (prop !== null && !Array.isArray(prop)) {
        if (passedClass[key] && passedClass[key].constructor) {
          passedClass[key] = new passedClass[key].constructor(prop);
        }
      }
      if (Array.isArray(prop)) {
        const constructor = Reflect.getMetadata(key, passedClass);
        if (constructor && typeof constructor[key] === 'function') {
          passedClass[key] = prop.map((t) => new constructor[key](t));
        }
      }
    });
  }

  static GetClassConstructorForArray = <T>(construct: Constructable<T>): PropertyDecorator => {
    return (targetClass, propertyName) => {
      const metadataSingleton = Reflect.getMetadata(`property:${propertyName as string}`, targetClass) || {};
      metadataSingleton[propertyName] = construct;
      Reflect.defineMetadata(propertyName, metadataSingleton, targetClass);
    };
  };

  private static isPrimitive(prop: any): boolean {
    return prop !== null && typeof prop !== 'undefined' && prop !== Object(prop);
  }
}
