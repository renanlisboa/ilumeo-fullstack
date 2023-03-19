export type HttpRequest = {
  params?: any;
  query?: Record<string, string>;
  body?: any;
};

export type HttpResponse = {
  statusCode: number;
  data: any;
};
