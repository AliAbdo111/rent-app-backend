import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ timestamps: true })
export class TeamMember extends Document {
    @Prop({ type: String })
    image: string;
    @Prop({ type: String })
    fullName: string;
    @Prop({ type: String })
  jobDescription: string;
}

export const TeamMemberScema = SchemaFactory.createForClass(TeamMember);
