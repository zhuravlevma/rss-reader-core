import { Module } from '@nestjs/common';
import { XmlService } from './xml.service';

@Module({
  providers: [
    {
      provide: XmlService,
      useFactory: async () => {
        return new XmlService();
      },
    },
  ],
})
export class XmlModule {}
