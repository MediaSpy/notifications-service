import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmailSettings } from '../common/types';
import { UserEmailSettings } from './models';

@Injectable()
export class EmailSettingsRepository {
  private readonly logger = new Logger(EmailSettingsRepository.name);

  constructor(
    @InjectModel(UserEmailSettings.name)
    private readonly userEmailSettingsModel: Model<UserEmailSettings>,
  ) {}

  static mapSettings(rawSettings: UserEmailSettings): EmailSettings {
    return {
      userId: rawSettings.user_id,
      promotions: rawSettings.promotions_enabled,
      social: rawSettings.social_enabled,
      createdAt: rawSettings.created_at.toISOString(),
      updatedAt: rawSettings.updated_at && rawSettings.updated_at.toISOString(),
    };
  }

  async getSettings(userId: number): Promise<EmailSettings | null> {
    try {
      const userEmailSettings = await this.userEmailSettingsModel
        .findOne({ user_id: userId })
        .exec();
      if (!userEmailSettings) {
        return null;
      }

      return EmailSettingsRepository.mapSettings(userEmailSettings);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }

  async updateSettings(settingsData: EmailSettings): Promise<EmailSettings> {
    try {
      const { userId, promotions, social } = settingsData;

      let updatedSettings = await this.userEmailSettingsModel
        .findOneAndUpdate(
          { user_id: userId },
          {
            promotions_enabled: promotions,
            social_enabled: social,
          },
        )
        .exec();
      if (!updatedSettings) {
        updatedSettings = await this.userEmailSettingsModel.create({
          user_id: userId,
          promotions_enabled: promotions,
          social_enabled: social,
        });
      }

      return EmailSettingsRepository.mapSettings(updatedSettings);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
