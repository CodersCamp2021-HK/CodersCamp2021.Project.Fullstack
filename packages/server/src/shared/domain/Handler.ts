interface Handler<TRequest, TResponse> {
  exec(req: TRequest): Promise<TResponse>;
}

export type { Handler };
