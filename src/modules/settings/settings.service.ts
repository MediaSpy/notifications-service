import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as _ from 'lodash';
import { SettingsRepository } from './settings.repository';
import * as util from 'util';

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly settingsRepository: SettingsRepository,
  ) {}

  mapUserEmailSettings(userSettings) {
    const defaultValues = this.configService.get<Record<string, boolean>>(
      'notifications.defaultValues',
      {},
    );
    const data = _.pick(userSettings, ['userId', 'promotions', 'social']);
    this.logger.debug(util.inspect(data));
    return {
      ...defaultValues,
      ...data,
    };
  }

  async getUserEmailSettings(userId: number) {
    try {
      const settings = await this.settingsRepository.getUserEmailSettings(userId);

      return this.mapUserEmailSettings({ userId, ...(settings || {}) });
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
