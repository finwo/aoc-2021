import { Request, Response } from 'express';
import { Container } from 'typedi';

const routes      = new Map();
const controllers = [];

export enum Method {
  DELETE = 'delete',
  GET    = 'get',
  POST   = 'post',
  PUT    = 'put',
};

export function Controller(prefix?: string): ClassDecorator {
  return function(constructor: Function) {
    const router           = Container.get('router');
    const controllerRoutes = routes.get(constructor) || [];
    for(const route of controllerRoutes) {
      const path = ['',prefix,route.path].join('/').replace(/\/+/g,'/');
      router[route.method](path, async (req: Request, res: Response, next: Function) => {
        const controller = Container.get(constructor);
        await controller[route.name]({ req, res });
        if (!res.writableEnded) next();
      });
    }
  }
}

export function Route(method: Method, path: string): MethodDecorator {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor): void {
    const map = routes.get(target.constructor) || [];
    map.push({ path, method, name: propertyKey });
    routes.set(target.constructor, map);
  };
}

export function Delete(path: string): MethodDecorator {
  return Route(Method.DELETE, path);
}

export function Get(path: string): MethodDecorator {
  return Route(Method.GET, path);
}

export function Post(path: string): MethodDecorator {
  return Route(Method.POST, path);
}

export function Put(path: string): MethodDecorator {
  return Route(Method.PUT, path);
}
