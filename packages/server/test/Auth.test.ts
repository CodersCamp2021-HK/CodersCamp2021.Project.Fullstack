import { Get, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongodb';

import { ApiAuthentication, ApiAuthorization, ApiController, PartnerId, Role, UserId } from '../src/shared';
import { loginDto, registerPartnerDto, registerUserDto } from './ApiDtoUtils';
import { initE2eFixture } from './E2eFixture';
import { accessTokenAsCookie } from './shared';

const PATH = '/api/auth';
const REGISTER_AS_PARTNER_REL_PATH = '/register/partner';
const REGISTER_AS_PARTNER_PATH = `${PATH}${REGISTER_AS_PARTNER_REL_PATH}`;
const REGISTER_AS_USER_REL_PATH = '/register/user';
const REGISTER_AS_USER_PATH = `${PATH}${REGISTER_AS_USER_REL_PATH}`;
const LOGIN_REL_PATH = '/login';
const LOGIN_PATH = `${PATH}${LOGIN_REL_PATH}`;
const LOGOUT_REL_PATH = '/logout';
const LOGOUT_PATH = `${PATH}${LOGOUT_REL_PATH}`;
const GUARDED_TEST_PATH = '/api/test/guarded';
const GUARDED_TEST_PARTNER_PATH = `${GUARDED_TEST_PATH}/partner`;
const GUARDED_TEST_USER_PATH = `${GUARDED_TEST_PATH}/user`;

@ApiController({ path: 'test', name: 'Tests' })
class GuardedTestController {
  @Get('guarded')
  @ApiAuthentication()
  guarded() {
    return 'OK';
  }

  @Get('guarded/partner')
  @ApiAuthorization(Role.Partner)
  guardedPartner(@PartnerId() id: string) {
    return id;
  }
  @Get('guarded/user')
  @ApiAuthorization(Role.User)
  guardedUser(@UserId() id: string) {
    return id;
  }
}

describe(`${PATH}`, () => {
  const fixture = initE2eFixture({ testControllers: [GuardedTestController] });

  describe(`POST ${REGISTER_AS_PARTNER_REL_PATH}`, () => {
    describe(`should return 400`, () => {
      const validRequest = registerPartnerDto({ email: 'partner.invalid@email.com' });

      it.each([
        { key: 'email', val: 'email.com' },
        { key: 'password', val: 'Passw12' },
        { key: 'nip', val: '1234456' },
        { key: 'phoneNumber', val: 'asddaaffsd' },
      ])('when invalid ($key: $val)', async ({ key, val }) => {
        // Given
        const invalidReqBody = { ...validRequest, [key]: val };

        // When
        const res = await fixture.req.post(REGISTER_AS_PARTNER_PATH).send(invalidReqBody);

        // Then
        expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(await fixture.db.authModel.find({ email: val })).toHaveLength(0);
      });
    });

    it('should return 201 with location url when request succeeded and should return 409 when partner with requested email already exists', async () => {
      // Given
      const validRequest = registerPartnerDto({ email: 'partner.valid@email.com' });
      // When
      const res0 = await fixture.req.post(REGISTER_AS_PARTNER_PATH).send(validRequest);

      // Then
      expect(res0.statusCode).toBe(HttpStatus.CREATED);
      expect(res0.headers['location']).toMatch(/:\d+\/api\/partners\/profile$/);
      expect(await fixture.db.authModel.find({ email: validRequest.email })).toHaveLength(1);

      // When
      const res1 = await fixture.req.post(REGISTER_AS_PARTNER_PATH).send(validRequest);

      // Then
      expect(res1.statusCode).toBe(HttpStatus.CONFLICT);
      expect(await fixture.db.authModel.find({ email: validRequest.email })).toHaveLength(1);
    });
  });

  describe(`POST ${REGISTER_AS_USER_REL_PATH}`, () => {
    describe(`should return 400`, () => {
      const validRequest = registerUserDto({ email: 'user.invalid@email.com' });

      it.each([
        { key: 'email', val: 'email.com' },
        { key: 'password', val: 'Passw12' },
      ])('when invalid ($key: $val)', async ({ key, val }) => {
        // Given
        const invalidReqBody = { ...validRequest, [key]: val };

        // When
        const res = await fixture.req.post(REGISTER_AS_USER_PATH).send(invalidReqBody);

        // Then
        expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
        expect(await fixture.db.authModel.find({ email: val })).toHaveLength(0);
      });
    });

    it('should return 201 with location url when request succeeded and should return 409 when user with requested email already exists', async () => {
      // Given
      const validRequest = registerUserDto({ email: 'user.valid@email.com' });

      // When
      const res0 = await fixture.req.post(REGISTER_AS_USER_PATH).send(validRequest);

      // Then
      expect(res0.statusCode).toBe(HttpStatus.CREATED);
      expect(res0.headers['location']).toMatch(/:\d+\/api\/users\/profile$/);
      expect(await fixture.db.authModel.find({ email: validRequest.email })).toHaveLength(1);

      // When
      const res1 = await fixture.req.post(REGISTER_AS_USER_PATH).send(validRequest);

      // Then
      expect(res1.statusCode).toBe(HttpStatus.CONFLICT);
      expect(await fixture.db.authModel.find({ email: validRequest.email })).toHaveLength(1);
    });
  });

  describe(`POST ${LOGIN_REL_PATH}`, () => {
    describe(`should return 400`, () => {
      const validRequest = loginDto({ email: 'user.login.invalid@email.com' });

      it.each([
        { key: 'email', val: 'email.com' },
        { key: 'password', val: 'Passw12' },
      ])('when invalid ($key: $val)', async ({ key, val }) => {
        // Given
        const invalidReqBody = { ...validRequest, [key]: val };

        // When
        const res = await fixture.req.post(LOGIN_PATH).send(invalidReqBody);

        // Then
        expect(res.statusCode).toBe(HttpStatus.BAD_REQUEST);
      });
    });

    describe('Given registered user', () => {
      const validRequest = loginDto({ email: 'user.login.valid@email.com' });

      beforeAll(async () => {
        await fixture.db.authModel.create({
          email: validRequest.email,
          password:
            '050d685f8b21323e9bcb4907cd7609e4a92275dfbd41fa8eafe7c531d46523094ee5292b70f17ef1276fb4cd116e3c333fc5ac2a63f556faaf35f261c2e4a8ab4b81ad822ae9d005fc599366e193635f',
          role: Role.User,
          entityId: new ObjectId('6217b84156c087ec80710223'),
          verified: true,
        });
      });

      it('should return 401 when invalid password provided', async () => {
        // Given
        const invalidPassword = 'Password2';

        // When
        const res = await fixture.req.post(LOGIN_PATH).send({ ...validRequest, password: invalidPassword });

        // Then
        expect(res.statusCode).toBe(HttpStatus.UNAUTHORIZED);
      });

      it('should return 204 with cookie access_token when signed in successfully', async () => {
        // When
        const res = await fixture.req.post(LOGIN_PATH).send(validRequest);

        // Then
        expect(res.statusCode).toBe(HttpStatus.NO_CONTENT);
        expect(res.headers['set-cookie'][0]).toMatch(new RegExp(accessTokenAsCookie(/\S+\.\S+\.\S+/.source)));
      });
    });
  });

  describe(`POST ${LOGOUT_REL_PATH}`, () => {
    it('should return 401 when user did not provide cookie', async () => {
      // When
      const res = await fixture.req.post(LOGOUT_PATH);

      // Then
      expect(res.statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });

    it('should return 401 when user provided invalid cookie', async () => {
      // Given
      const invalidAccessToken = accessTokenAsCookie(
        'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MjE2NzdjYTY5MGZiODFjZDkwMmUzOWQiLCJyb2xlIjoiVXNlciIsImlhdCI6MTY0NTcxNzczNSwiZXhwIjoxNjQ4MzA5NzM1LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjQwMDAifQ.mBMvY4HSvNwzoGJHzO_D-EAfSPoltLcFmZuFbeqCWRKVyEAPJXiPPFEL2L0tvG4LsrwU_uitRxkIadyWuuKPkQ',
      );
      const agent = fixture.agent();

      // When
      const res = await agent.post(LOGOUT_PATH).set('Cookie', [invalidAccessToken]).send();

      // Then
      expect(res.statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });

    it('should return 204 when user provided valid cookie', async () => {
      // Given
      const accessToken = fixture.app.get(JwtService).sign({});
      const validAccessToken = accessTokenAsCookie(accessToken);
      const agent = fixture.agent();

      // When
      const res = await agent.post(LOGOUT_PATH).set('Cookie', [validAccessToken]).send();

      // Then
      expect(res.statusCode).toBe(HttpStatus.NO_CONTENT);
    });
  });

  describe('Features', () => {
    it('User should register, login and logout with specific privileges', async () => {
      // Given
      const registerBody = registerUserDto({ email: 'user.feat@email.com' });
      const loginReq = loginDto({ ...registerBody });
      const agent = fixture.agent();

      // When
      const res0 = await fixture.req.post(REGISTER_AS_USER_PATH).send(registerBody);

      // Then
      expect(res0.statusCode).toBe(HttpStatus.CREATED);

      // When
      const res1 = await agent.post(LOGIN_PATH).send(loginReq);

      // Then
      expect(res1.statusCode).toBe(HttpStatus.NO_CONTENT);

      // When
      const res2 = await agent.get(GUARDED_TEST_PATH);

      // Then
      expect(res2.statusCode).toBe(HttpStatus.OK);

      // When
      const res3 = await agent.get(GUARDED_TEST_USER_PATH);

      // Then
      expect(res3.statusCode).toBe(HttpStatus.OK);

      // When
      const res4 = await agent.get(GUARDED_TEST_PARTNER_PATH);

      // Then
      expect(res4.statusCode).toBe(HttpStatus.FORBIDDEN);

      // When
      const res5 = await agent.post(LOGOUT_PATH);

      // Then
      expect(res5.statusCode).toBe(HttpStatus.NO_CONTENT);

      // When
      const res6 = await agent.get(GUARDED_TEST_PATH);

      // Then
      expect(res6.statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });

    it('Partner should register, login and logout with specific privileges', async () => {
      // Given
      const registerBody = registerPartnerDto({ email: 'partner.feat@email.com' });
      const loginBody = loginDto({
        email: registerBody.email,
        password: registerBody.password,
        role: Role.Partner,
      });
      const agent = fixture.agent();

      // When
      const res0 = await fixture.req.post(REGISTER_AS_PARTNER_PATH).send(registerBody);

      // Then
      expect(res0.statusCode).toBe(HttpStatus.CREATED);

      // When
      const res1 = await agent.post(LOGIN_PATH).send(loginBody);

      // Then
      expect(res1.statusCode).toBe(HttpStatus.NO_CONTENT);

      // When
      const res2 = await agent.get(GUARDED_TEST_PATH);

      // Then
      expect(res2.statusCode).toBe(HttpStatus.OK);

      // When
      const res3 = await agent.get(GUARDED_TEST_USER_PATH);

      // Then
      expect(res3.statusCode).toBe(HttpStatus.FORBIDDEN);

      // When
      const res4 = await agent.get(GUARDED_TEST_PARTNER_PATH);

      // Then
      expect(res4.statusCode).toBe(HttpStatus.OK);

      // When
      const res5 = await agent.post(LOGOUT_PATH);

      // Then
      expect(res5.statusCode).toBe(HttpStatus.NO_CONTENT);

      // When
      const res6 = await agent.get(GUARDED_TEST_PATH);

      // Then
      expect(res6.statusCode).toBe(HttpStatus.UNAUTHORIZED);
    });
  });
});
