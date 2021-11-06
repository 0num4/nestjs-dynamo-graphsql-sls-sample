import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import {
  AdminUserEntity,
  PasswordOmitAdminUserEntity,
} from '../entity/user.entity';
import { UsersService } from '../users/users.service';

// type PasswordOmitUser = Omit<User, 'password'>;

interface JWTPayload {
  admin_user_id: AdminUserEntity['admin_user_id'];
  name: AdminUserEntity['name'];
}

/**
 * @description Passportでは出来ない認証処理をするクラス
 */
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  // ユーザーを認証する
  async validateUser(
    name: AdminUserEntity['name'],
    pass: AdminUserEntity['password_hash'],
  ): Promise<PasswordOmitAdminUserEntity | null> {
    const user = await this.usersService.findOne(name); // DBからUserを取得
    // DBに保存されているpasswordはハッシュ化されている事を想定しているので、
    // bcryptなどを使ってパスワードを判定する
    if (user && bcrypt.compareSync(pass, user.password_hash)) {
      const { password_hash, ...result } = user; // パスワード情報を外部に出さないようにする

      return result;
    }

    return null;
  }

  // jwt tokenを返す
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async login(user: PasswordOmitAdminUserEntity): Promise<any> {
    // jwtにつけるPayload情報
    const payload = {
      admin_user_id: user.admin_user_id,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
