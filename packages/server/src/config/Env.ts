import { Exclude, Expose, plainToInstance } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsPositive, IsString, validateSync } from 'class-validator';
import dotenv from 'dotenv';

const isProduction = process.env['NODE_ENV'] === 'production';

dotenv.config({ path: isProduction ? undefined : '.env.dev' });

const NODE_ENV_VALUES = ['development', 'test', 'production'] as const;

@Exclude()
class EnvVariables {
  @Expose()
  @IsIn(NODE_ENV_VALUES)
  readonly NODE_ENV: typeof NODE_ENV_VALUES[number];

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly MONGO_URL: string;

  @Expose()
  @IsInt()
  @IsPositive()
  readonly PORT: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly SERVER_URL: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly JWT_SECRET: string;

  @Expose()
  @IsInt()
  @IsNotEmpty()
  readonly ACCESS_TOKEN_EXPIRATION_TIME: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly ACCESS_TOKEN_NAME: string;
}

const env = plainToInstance(EnvVariables, process.env, {
  excludeExtraneousValues: true,
  enableImplicitConversion: true,
});

const errors = validateSync(env);

if (errors.length > 0) {
  throw errors;
}

export { env };
