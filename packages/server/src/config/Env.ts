import { Expose, plainToInstance } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsPositive, IsString, validateSync } from 'class-validator';
import dotenv from 'dotenv';

dotenv.config();

const NODE_ENV_VALUES = ['development', 'test', 'production'] as const;

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
};


const env = plainToInstance(EnvVariables, process.env, {
  excludeExtraneousValues: true,
  enableImplicitConversion: true
});

const errors = validateSync(env);

if(errors.length > 0) {
  throw errors;
}

export { env };
