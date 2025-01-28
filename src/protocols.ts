export interface HttpResponse<T> {
  statusCode: number;
  body: T;
}

export interface HttpRequest<B> {
  body?: B;
  params?: unknown;
  headers?: unknown;
}