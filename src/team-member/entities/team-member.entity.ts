import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SourceImage } from 'src/services/upload-image/upload-image.service';
@Schema({ timestamps: true })
export class TeamMember extends Document {
  @Prop({
    type: Object
  })
  image: SourceImage;

  @Prop({ type: String })
  fullName: string;

  @Prop({ type: String })
  jobDescription: string;
}

export const TeamMemberScema = SchemaFactory.createForClass(TeamMember);
