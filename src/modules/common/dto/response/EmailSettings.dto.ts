import { ApiProperty } from '@nestjs/swagger';

export class EmailSettingsResponseDto {
  @ApiProperty()
  userId: number;
  @ApiProperty()
  promotions: boolean;
  @ApiProperty()
  social: boolean;
}
