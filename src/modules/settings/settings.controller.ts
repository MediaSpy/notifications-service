import { JwtAuthGuard } from '@mediaspy/auth-tools';
import {
  Controller,
  Get,
  HttpCode,
  Logger,
  NotImplementedException,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { BadRequestResponseDto } from '../common/dto/response';
import { GetUserEmailSettingsResponseDto } from './dto/response';
import { SettingsService } from './settings.service';

@ApiTags('notifications', 'settings')
@Controller('/settings')
export class SettingsController {
  private readonly logger = new Logger(SettingsController.name);

  constructor(private readonly settingsService: SettingsService) {}

  @Get('/email')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get email settings' })
  @ApiBearerAuth()
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  @ApiOkResponse({ type: GetUserEmailSettingsResponseDto })
  async getEmailSettings(@Request() req) {
    try {
      const response = await this.settingsService.getUserEmailSettings(req.user.userId);
      return response;
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  @Patch('/email')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Patch email settings' })
  @ApiBearerAuth()
  @ApiBadRequestResponse({ type: BadRequestResponseDto })
  @ApiOkResponse({ type: 'TODO:' }) // TODO: add ok model
  async patchEmailSettings(@Request() req) {
    try {
      throw new NotImplementedException();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
