import { Body, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNoContentResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { env } from '../../config';
import { ApiAuthentication, ApiController, ApiCreate, DefaultResponseDto, Url, ValidationErrorDto } from '../../shared';
import { LoginHandler, RegisterAsPartnerHandler, RegisterAsUserHandler } from '../domain';
import { LoginDto } from './LoginDto';
import { RegisterAsPartnerDto } from './RegisterAsPartnerDto';
import { RegisterAsUserDto } from './RegisterAsUserDto';

@ApiController({ path: 'auth', name: 'Auth', description: 'Operations about authentication and registration' })
class AuthController {
  constructor(
    private readonly registerAsPartnerHandler: RegisterAsPartnerHandler,
    private readonly registerAsUserHandler: RegisterAsUserHandler,
    private readonly loginHandler: LoginHandler,
  ) {}

  @ApiCreate({ path: 'register/partner', name: 'partner' })
  async registerAsPartner(
    @Body() dto: RegisterAsPartnerDto,
    @Res({ passthrough: true }) res: Response,
    @Url() url: URL,
  ) {
    await this.registerAsPartnerHandler.exec(dto);
    res.setHeader('Location', `${url.origin}/api/partners/profile`);
  }

  @ApiCreate({ path: 'register/user', name: 'user' })
  async registerAsUser(@Body() dto: RegisterAsUserDto, @Res({ passthrough: true }) res: Response, @Url() url: URL) {
    await this.registerAsUserHandler.exec(dto);
    res.setHeader('Location', `${url.origin}/api/users/profile`);
  }

  @ApiOperation({ summary: 'Store auth token in cookies.' })
  @ApiNoContentResponse({ description: 'Auth token successfully received as cookie.' })
  @ApiBadRequestResponse({
    description: 'Parameters are not valid or they are missing.',
    type: ValidationErrorDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials.',
    type: DefaultResponseDto,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { accessToken } = await this.loginHandler.exec(dto);
    res.cookie(env.ACCESS_TOKEN_NAME, accessToken, {
      expires: dto.rememberMe ? new Date(Date.now() + env.ACCESS_TOKEN_EXPIRATION_TIME * 1000) : undefined,
      sameSite: 'strict',
      secure: env.NODE_ENV === 'production',
      httpOnly: true,
    });
  }

  @ApiAuthentication()
  @ApiOperation({ summary: 'Remove auth token from cookies.' })
  @ApiNoContentResponse({ description: 'Auth token successfully removed from cookies.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(env.ACCESS_TOKEN_NAME);
  }
}

export { AuthController };
