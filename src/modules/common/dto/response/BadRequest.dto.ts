import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponseDto {
  @ApiProperty()
  message: string | string[];
  @ApiProperty({ default: 400 })
  statusCode: number;
  @ApiProperty()
  error: string;
}
