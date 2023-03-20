import express, { Express, Router, Response, Request } from 'express';

import { HttpServer } from '../main/contracts';
import { HttpRequest, HttpResponse } from '../presentation/contracts';

class HttpServerAdapter implements HttpServer {
  server: Express;

  constructor() {
    this.server = express();
    this.useMiddleware(express.json());
  }

  useRoute(basePath = '/api', routes: any): void {
    this.server.use(basePath, routes);
  }

  useMiddleware(middleware: any): void {
    this.server.use(middleware);
  }

  listen(port = 3333): void {
    this.server.listen(port, () => {
      console.log('HTTP Server Running ');
    });
  }
}

type CallbackFunction = (
  request: Request,
  response: Response,
) => Promise<Response>;

type ControllerFactory = (httpRequest: HttpRequest) => Promise<HttpResponse>;

const adaptRoute = (controllerFactory: ControllerFactory): CallbackFunction => {
  return async (
    request: Request | any,
    response: Response,
  ): Promise<Response> => {
    const httpRequest = {
      params: request.params,
      query: request.query,
      body: request.body,
    };
    const { statusCode, data }: HttpResponse = await controllerFactory(
      httpRequest,
    );
    return response.status(statusCode).json(data);
  };
};

const RouterAdapter = Router;

export {
  HttpServerAdapter,
  RouterAdapter,
  adaptRoute,
  type Request,
  type Response,
};
