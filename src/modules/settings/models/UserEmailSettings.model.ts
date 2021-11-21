import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class UserEmailSettings extends Document {
  @Prop({ unique: true, required: true })
  user_id?: number;
  @Prop()
  promotion_enabled?: boolean;
  @Prop()
  social_enabled?: boolean;
  @Prop()
  created_at?: Date;
  @Prop()
  updated_at?: Date;
}

export const UserEmailSettingsSchema = SchemaFactory.createForClass(UserEmailSettings);
