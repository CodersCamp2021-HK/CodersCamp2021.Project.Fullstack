interface IHandler<TRequest, TResponse> {
  exec(req: TRequest): Promise<TResponse>;
}

export type { IHandler };
