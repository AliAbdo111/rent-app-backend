import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { SNS } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class NotificationService {

    private sns: SNS;
    constructor(
        private readonly configService: ConfigService
    ) {
        const awsConfig = this.configService.get('aws');
        this.sns = new SNS(awsConfig.sns);
    }
    async publishMessage(topicArn: string, message: string) {
        try {
            const param = {
                TopicArn: topicArn,
                Message: message,
            };
            const result = await this.sns.publish(param).promise()
            console.log(result)
        } catch (error) {
            throw new ServiceUnavailableException(
                `Error From Service Notificatin : ${error}`)
       }
    }
}
// arn:aws:sns:eu-north-1:905418202818:units.fifo
