import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as _ from 'lodash';
import { EmailSettingsResponseDto } from '../common/dto/response';
import { EmailSettings } from '../common/types';
import { EmailSettingsRepository } from './emailSettings.repository';

@Injectable()
export class EmailSettingsService {
  private readonly logger = new Logger(EmailSettingsService.name);
  private readonly defaultSettings: Omit<EmailSettings, 'userId' | 'createdAt' | 'updatedAt'>;

  constructor(
    private readonly configService: ConfigService,
    private readonly emailSettingsRepository: EmailSettingsRepository,
  ) {
    this.defaultSettings = this.configService.get<
      Omit<EmailSettings, 'userId' | 'createdAt' | 'updatedAt'>
    >('notifications.email.defaultSettings');
  }

  mapSettings(userSettings) {
    const data = _.pick(userSettings, ['userId', 'promotions', 'social']);
    return Object.assign(this.defaultSettings, data);
  }

  async getSettings(userId: number): Promise<EmailSettingsResponseDto> {
    try {
      const settings = await this.emailSettingsRepository.getSettings(userId);

      return {
        userId,
        ...this.mapSettings(settings),
      };
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async patchSettings(
    userId: number,
    settingsData: Partial<Omit<EmailSettings, 'userId'>>,
  ): Promise<EmailSettingsResponseDto> {
    try {
      const settings = await this.emailSettingsRepository.getSettings(userId);

      let newSettings = _.mergeWith({ userId }, settings || this.defaultSettings, settingsData);
      newSettings = await this.emailSettingsRepository.updateSettings(newSettings);

      return this.mapSettings(newSettings);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
