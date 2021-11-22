import { JwtAuthGuard } from '@mediaspy/auth-tools';
import { AjvValidationPipe } from '@mediaspy/common';
import { Body, Controller, Get, HttpCode, Logger, Patch, Request, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PatchSettingsDto } from './dto/request';
import { BadRequestResponseDto } from '../common/dto/response';
import { GetSettingsResponseDto, PatchSettingsResponseDto } from './dto/response';
import { EmailSettingsService } from './emailSettings.service';
import { PatchSettingsSchema } from './schema';

@ApiTags('notifications', 'settings', 'email')
@Controller('/settings/email')
export class EmailSettingsController {
  private readonly logger = new Logger(EmailSettingsController.name);

  constructor(private readonly emailSettingsService: EmailSettingsService) {}

  @Get('/')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get email settings' })
  @ApiBearerAuth()
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  @ApiOkResponse({ type: GetSettingsResponseDto })
  async getSettings(@Request() req): Promise<GetSettingsResponseDto> {
    try {
      const response = await this.emailSettingsService.getSettings(req.user.userId);
      return response;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Patch('/')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Patch email settings' })
  @ApiBearerAuth()
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  @ApiOkResponse({ type: PatchSettingsResponseDto })
  async patchSettings(
    @Request() req,
    @Body(new AjvValidationPipe(PatchSettingsSchema)) dto: PatchSettingsDto,
  ): Promise<PatchSettingsResponseDto> {
    try {
      const response = await this.emailSettingsService.patchSettings(req.user.userId, dto);
      return response;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
