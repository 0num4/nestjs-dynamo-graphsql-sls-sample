// import先が'passport-local'では無い事に注意！
import { ExtractJwt, Strategy as BaseJwtStrategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
// import { JwtPayload } from './auth.interface';
// import { User } from 'src/users/user.entity';
import {
  AdminUserEntity,
  PasswordOmitAdminUserEntity,
} from 'src/entity/user.entity';

interface JWTPayload {
  admin_user_id: AdminUserEntity['admin_user_id'];
  name: AdminUserEntity['name'];
}

/**
 * @description JWTの認証処理を行うクラス
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(BaseJwtStrategy) {
  constructor() {
    super({
      // Authorization bearerからトークンを読み込む関数を返す
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 有効期間を無視するかどうか
      ignoreExpiration: false,
      // envファイルから秘密鍵を渡す
      secretOrKey: 'JWT_SECRET_KEY',
    });
  }

  // ここでPayloadを使ったバリデーション処理を実行できる
  // Payloadは、AuthService.login()で定義した値
  async validate(payload: JWTPayload): Promise<any> {
    return { admin_user_id: payload.admin_user_id, name: payload.name };
  }
}
