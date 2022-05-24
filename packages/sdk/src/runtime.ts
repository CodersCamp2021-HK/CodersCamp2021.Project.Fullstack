/* tslint:disable */
/* eslint-disable */
/**
 * JeszCoChcesz API 🍲🍝🍜
 * JeszCoChcesz is an online food delivery system connecting restaurants with health-conscious users.
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

export const BASE_PATH = 'http://localhost'.replace(/\/+$/, '');

export interface ConfigurationParameters {
  basePath?: string; // override base path
  fetchApi?: FetchAPI; // override for fetch implementation
  middleware?: Middleware[]; // middleware to apply before/after fetch requests
  queryParamsStringify?: (params: HTTPQuery) => string; // stringify function for query strings
  username?: string; // parameter for basic security
  password?: string; // parameter for basic security
  apiKey?: string | ((name: string) => string); // parameter for apiKey security
  accessToken?: string | Promise<string> | ((name?: string, scopes?: string[]) => string | Promise<string>); // parameter for oauth2 security
  headers?: HTTPHeaders; //header params we want to use on every request
  credentials?: RequestCredentials; //value for the credentials param we want to use on each request
}

export class Configuration {
  constructor(private configuration: ConfigurationParameters = {}) {}

  set config(configuration: Configuration) {
    this.configuration = configuration;
  }

  get basePath(): string {
    return this.configuration.basePath != null ? this.configuration.basePath : BASE_PATH;
  }

  get fetchApi(): FetchAPI | undefined {
    return this.configuration.fetchApi;
  }

  get middleware(): Middleware[] {
    return this.configuration.middleware || [];
  }

  get queryParamsStringify(): (params: HTTPQuery) => string {
    return this.configuration.queryParamsStringify || querystring;
  }

  get username(): string | undefined {
    return this.configuration.username;
  }

  get password(): string | undefined {
    return this.configuration.password;
  }

  get apiKey(): ((name: string) => string) | undefined {
    const apiKey = this.configuration.apiKey;
    if (apiKey) {
      return typeof apiKey === 'function' ? apiKey : () => apiKey;
    }
    return undefined;
  }

  get accessToken(): ((name?: string, scopes?: string[]) => string | Promise<string>) | undefined {
    const accessToken = this.configuration.accessToken;
    if (accessToken) {
      return typeof accessToken === 'function' ? accessToken : async () => accessToken;
    }
    return undefined;
  }

  get headers(): HTTPHeaders | undefined {
    return this.configuration.headers;
  }

  get credentials(): RequestCredentials | undefined {
    return this.configuration.credentials;
  }
}

export const DefaultConfig = new Configuration();

/**
 * This is the base class for all generated API classes.
 */
export class BaseAPI {
  private middleware: Middleware[];

  constructor(protected configuration = DefaultConfig) {
    this.middleware = configuration.middleware;
  }

  withMiddleware<T extends BaseAPI>(this: T, ...middlewares: Middleware[]) {
    const next = this.clone<T>();
    next.middleware = next.middleware.concat(...middlewares);
    return next;
  }

  withPreMiddleware<T extends BaseAPI>(this: T, ...preMiddlewares: Array<Middleware['pre']>) {
    const middlewares = preMiddlewares.map((pre) => ({ pre }));
    return this.withMiddleware<T>(...middlewares);
  }

  withPostMiddleware<T extends BaseAPI>(this: T, ...postMiddlewares: Array<Middleware['post']>) {
    const middlewares = postMiddlewares.map((post) => ({ post }));
    return this.withMiddleware<T>(...middlewares);
  }

  protected async request(context: RequestOpts, initOverrides?: RequestInit | InitOverideFunction): Promise<Response> {
    const { url, init } = await this.createFetchParams(context, initOverrides);
    const response = await this.fetchApi(url, init);
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    throw new ResponseError(response, 'Response returned an error code');
  }

  private async createFetchParams(context: RequestOpts, initOverrides?: RequestInit | InitOverideFunction) {
    let url = this.configuration.basePath + context.path;
    if (context.query !== undefined && Object.keys(context.query).length !== 0) {
      // only add the querystring to the URL if there are query parameters.
      // this is done to avoid urls ending with a "?" character which buggy webservers
      // do not handle correctly sometimes.
      url += '?' + this.configuration.queryParamsStringify(context.query);
    }

    const headers = Object.assign({}, this.configuration.headers, context.headers);
    Object.keys(headers).forEach((key) => (headers[key] === undefined ? delete headers[key] : {}));

    const initOverrideFn = typeof initOverrides === 'function' ? initOverrides : async () => initOverrides;

    const initParams = {
      method: context.method,
      headers,
      body: context.body,
      credentials: this.configuration.credentials,
    };

    const overridedInit: RequestInit = {
      ...initParams,
      ...(await initOverrideFn({
        init: initParams,
        context,
      })),
    };

    const init: RequestInit = {
      ...overridedInit,
      body:
        isFormData(overridedInit.body) || overridedInit.body instanceof URLSearchParams || isBlob(overridedInit.body)
          ? overridedInit.body
          : JSON.stringify(overridedInit.body),
    };

    return { url, init };
  }

  private fetchApi = async (url: string, init: RequestInit) => {
    let fetchParams = { url, init };
    for (const middleware of this.middleware) {
      if (middleware.pre) {
        fetchParams =
          (await middleware.pre({
            fetch: this.fetchApi,
            ...fetchParams,
          })) || fetchParams;
      }
    }
    let response = await (this.configuration.fetchApi || fetch)(fetchParams.url, fetchParams.init);
    for (const middleware of this.middleware) {
      if (middleware.post) {
        response =
          (await middleware.post({
            fetch: this.fetchApi,
            url: fetchParams.url,
            init: fetchParams.init,
            response: response.clone(),
          })) || response;
      }
    }
    return response;
  };

  /**
   * Create a shallow clone of `this` by constructing a new instance
   * and then shallow cloning data members.
   */
  private clone<T extends BaseAPI>(this: T): T {
    const constructor = this.constructor as any;
    const next = new constructor(this.configuration);
    next.middleware = this.middleware.slice();
    return next;
  }
}

function isBlob(value: any): value is Blob {
  return typeof Blob !== 'undefined' && value instanceof Blob;
}

function isFormData(value: any): value is FormData {
  return typeof FormData !== 'undefined' && value instanceof FormData;
}

export class ResponseError extends Error {
  name: 'ResponseError' = 'ResponseError';
  constructor(public response: Response, msg?: string) {
    super(msg);
  }
}

export class RequiredError extends Error {
  name: 'RequiredError' = 'RequiredError';
  constructor(public field: string, msg?: string) {
    super(msg);
  }
}

export const COLLECTION_FORMATS = {
  csv: ',',
  ssv: ' ',
  tsv: '\t',
  pipes: '|',
};

export type FetchAPI = WindowOrWorkerGlobalScope['fetch'];

export type Json = any;
export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD';
export type HTTPHeaders = { [key: string]: string };
export type HTTPQuery = {
  [key: string]: string | number | null | boolean | Array<string | number | null | boolean> | HTTPQuery;
};
export type HTTPBody = Json | FormData | URLSearchParams;
export type HTTPRequestInit = {
  headers?: HTTPHeaders;
  method: HTTPMethod;
  credentials?: RequestCredentials;
  body?: HTTPBody;
};
export type ModelPropertyNaming = 'camelCase' | 'snake_case' | 'PascalCase' | 'original';

export type InitOverideFunction = (requestContext: {
  init: HTTPRequestInit;
  context: RequestOpts;
}) => Promise<RequestInit>;

export interface FetchParams {
  url: string;
  init: RequestInit;
}

export interface RequestOpts {
  path: string;
  method: HTTPMethod;
  headers: HTTPHeaders;
  query?: HTTPQuery;
  body?: HTTPBody;
}

export function exists(json: any, key: string) {
  const value = json[key];
  return value !== null && value !== undefined;
}

export function querystring(params: HTTPQuery, prefix: string = ''): string {
  return Object.keys(params)
    .map((key) => {
      const fullKey = prefix + (prefix.length ? `[${key}]` : key);
      const value = params[key];
      if (value instanceof Array) {
        const multiValue = value
          .map((singleValue) => encodeURIComponent(String(singleValue)))
          .join(`&${encodeURIComponent(fullKey)}=`);
        return `${encodeURIComponent(fullKey)}=${multiValue}`;
      }
      if (value instanceof Date) {
        return `${encodeURIComponent(fullKey)}=${encodeURIComponent(value.toISOString())}`;
      }
      if (value instanceof Object) {
        return querystring(value as HTTPQuery, fullKey);
      }
      return `${encodeURIComponent(fullKey)}=${encodeURIComponent(String(value))}`;
    })
    .filter((part) => part.length > 0)
    .join('&');
}

export function mapValues(data: any, fn: (item: any) => any) {
  return Object.keys(data).reduce((acc, key) => ({ ...acc, [key]: fn(data[key]) }), {});
}

export function canConsumeForm(consumes: Consume[]): boolean {
  for (const consume of consumes) {
    if ('multipart/form-data' === consume.contentType) {
      return true;
    }
  }
  return false;
}

export interface Consume {
  contentType: string;
}

export interface RequestContext {
  fetch: FetchAPI;
  url: string;
  init: RequestInit;
}

export interface ResponseContext {
  fetch: FetchAPI;
  url: string;
  init: RequestInit;
  response: Response;
}

export interface Middleware {
  pre?(context: RequestContext): Promise<FetchParams | void>;
  post?(context: ResponseContext): Promise<Response | void>;
}

export interface ApiResponse<T> {
  raw: Response;
  value(): Promise<T>;
}

export interface ResponseTransformer<T> {
  (json: any): T;
}

export class JSONApiResponse<T> {
  constructor(public raw: Response, private transformer: ResponseTransformer<T> = (jsonValue: any) => jsonValue) {}

  async value(): Promise<T> {
    return this.transformer(await this.raw.json());
  }
}

export class VoidApiResponse {
  constructor(public raw: Response) {}

  async value(): Promise<void> {
    return undefined;
  }
}

export class BlobApiResponse {
  constructor(public raw: Response) {}

  async value(): Promise<Blob> {
    return await this.raw.blob();
  }
}

export class TextApiResponse {
  constructor(public raw: Response) {}

  async value(): Promise<string> {
    return await this.raw.text();
  }
}
