import { Injectable } from '@nestjs/common';
import { AdminUserEntity } from 'src/entity/user.entity';

@Injectable()
export class UsersService {
  async findOne(name: string): Promise<AdminUserEntity> {
    const test: AdminUserEntity = {
      admin_user_id: 'aaaa',
      name: 'テスト1',
      is_admin: false,
      email_address: 'oonuma.ryouyu@plus-zero.co.jp',
      password_hash: 'aaaa',
      created_at: new Date().toISOString(),
    }
    return test;
  }
}
