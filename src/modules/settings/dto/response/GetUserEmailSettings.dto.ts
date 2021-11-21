import { ApiProperty } from '@nestjs/swagger';

export class GetUserEmailSettingsResponseDto {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  promotions: boolean;
  @ApiProperty()
  social: boolean;
}
