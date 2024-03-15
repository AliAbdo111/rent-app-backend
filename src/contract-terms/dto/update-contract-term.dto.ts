import { PartialType } from '@nestjs/mapped-types';
import { CreateContractTermDto } from './create-contract-term.dto';

export class UpdateContractTermDto extends PartialType(CreateContractTermDto) {}
