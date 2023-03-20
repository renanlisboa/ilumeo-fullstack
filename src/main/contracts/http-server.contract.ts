export interface HttpServer {
  useRoute: (basePath: string, routes: any) => void;
  useMiddleware: (middleware: any) => void;
  listen: (port: number) => void;
}
