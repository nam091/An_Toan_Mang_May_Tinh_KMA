import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile, VerifyCallback } from 'passport-keycloak-oauth2-oidc';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, 'keycloak') {
  constructor(private cs: ConfigService) {
    super({
      clientID: cs.get('keycloak.clientId'),
      clientSecret: cs.get('keycloak.clientSecret'),
      callbackURL: 'http://localhost:3000/api/auth/callback',
      realm: new URL(cs.get('keycloak.issuer') as string).pathname.split('/').pop(),
      authServerURL: (cs.get('keycloak.issuer') as string).replace(/\/realms.*/, ''),
      idpLogout: true,
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) {
    const user = {
      sub: profile.id,
      email: profile.emails?.[0],
      firstName: profile.name?.givenName,
      lastName: profile.name?.familyName,
    };
    done(null, user);
  }
}