import { Module } from '@nestjs/common';
import { ContractTermsService } from './contract-terms.service';
import { ContractTermsController } from './contract-terms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ContractTermSchema } from './entities/contract-term.entity';

@Module({
  imports:[
  
    MongooseModule.forFeature([
      {
        name: 'ContractTerm',
        schema: ContractTermSchema
      }
    ])
  ],
  controllers: [ContractTermsController],
  providers: [ContractTermsService],
})
export class ContractTermsModule {}
