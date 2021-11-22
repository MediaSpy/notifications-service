import { ApiProperty } from '@nestjs/swagger';

export class PatchSettingsDto {
  @ApiProperty()
  promotions?: boolean;
  @ApiProperty()
  social?: boolean;
}
