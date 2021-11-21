import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEmailSettings } from './models';

@Injectable()
export class SettingsRepository {
  private readonly logger = new Logger(SettingsRepository.name);

  constructor(
    @InjectModel(UserEmailSettings.name)
    private readonly userEmailSettingsModel: Model<UserEmailSettings>,
  ) {}

  static mapUserEmailSettings(rawSettings: any) {
    return {
      userId: rawSettings.user_id,
      promotion: rawSettings.promotion_enabled,
      social: rawSettings.social_enabled,
      createdAt: rawSettings.created_at.toISOString(),
      updatedAt: rawSettings.updated_at && rawSettings.updated_at.toISOString(),
    };
  }

  async getUserEmailSettings(userId: number): Promise<any> {
    try {
      const userEmailSettings = await this.userEmailSettingsModel
        .findOne({ user_id: userId })
        .exec();
      if (!userEmailSettings) {
        return null;
      }

      return SettingsRepository.mapUserEmailSettings(userEmailSettings);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException();
    }
  }
}
