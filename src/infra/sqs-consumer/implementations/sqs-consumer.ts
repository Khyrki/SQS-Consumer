import { ISQSConsumerProvider } from '@domain/sqs-consumer/provider/sqs-consumer-provider';
import { SQS } from 'aws-sdk';
import { Agent } from 'https';
import { Consumer } from 'sqs-consumer';

export class SQSConsumer implements ISQSConsumerProvider {
  private consumer: Consumer;

  constructor() {
    this.SQSConsumer();
    this.consumer.start();
  }

  SQSConsumer() {
    this.consumer = Consumer.create({
      queueUrl: process.env.SQS_URL,
      handleMessage: async (message) => {
        // tratar a messagem como quiser
      },

      sqs: new SQS({
        httpOptions: {
          agent: new Agent({
            keepAlive: true
          })
        },
        region: process.env.SQS_REGION,
        ...(process.env.AWS_ACCESS_KEY_ID && {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID
        }),
        ...(process.env.AWS_SECRET_ACCSS_KEY && {
          secretAccessKey: process.env.AWS_SECRET_ACCSS_KEY
        }),
        ...(process.env.AWS_SESSION_TOKEN && {
          sessionToken: process.env.AWS_SESSION_TOKEN
        }),
    })
    });
  }
}
