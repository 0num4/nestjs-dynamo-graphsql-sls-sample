import { Model, PartitionKey, DynamoStore } from '@shiftcoders/dynamo-easy';
import { BaseEntity } from './base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Model({ tableName: `AdminUser_${process.env.STAGE}` })
export class AdminUserEntity extends BaseEntity {
  @PartitionKey()
  @ApiProperty({ description: '管理者id', example: 'uuid' })
  admin_user_id: string;
  @ApiProperty({ description: '管理者の名前', example: 'テスト1' })
  name: string;
  @ApiProperty({ description: '管理者かどうか', example: 'true' })
  is_admin: boolean;
  @ApiProperty({
    description: 'メールアドレス',
    example: 'oonuma.ryouyu@plus-zero.co.jp',
  })
  email_address: string;
  @ApiProperty({
    description: 'ハッシュ化されたパスワード(bcrypt.hash())',
    example: '$2a$10$BYdHaVyMHu2tBvrl11sWqOXNxn4EEX240Zi298IYA/DPXpSjT/RvG',
  })
  password_hash: string;
  @ApiProperty({
    description: '作成日時',
    example: 'new Date()', // date-fnsを使う
  })
  created_at: string;
}

export type PasswordOmitAdminUserEntity = Omit<
  AdminUserEntity,
  'password_hash'
>;

export const AdminUserStore = new DynamoStore(AdminUserEntity);
