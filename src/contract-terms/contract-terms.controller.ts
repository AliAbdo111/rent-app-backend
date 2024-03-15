import { Controller, Get, Post, Body, Patch, Param, Delete, ServiceUnavailableException } from '@nestjs/common';
import { ContractTermsService } from './contract-terms.service';
import { CreateContractTermDto } from './dto/create-contract-term.dto';
import { UpdateContractTermDto } from './dto/update-contract-term.dto';

@Controller('contract-terms')
export class ContractTermsController {
  constructor(private readonly contractTermsService: ContractTermsService) { }


  @Post()
  async create(@Body() createContractTermDto: CreateContractTermDto) {
    try {
      const ContractTerm = await this.contractTermsService.create(createContractTermDto);
      return {
        success: true,
        status: 201,
        message: 'Contract Term Created Successfuly',
      }
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Contract Term Is Say :${error}`,
      );
    }
  }

  @Get()
  async findAll() {
    try {

      const data = await this.contractTermsService.findAll();
      return {
        success: true,
        status: 200,
        message: 'You Get All Contract Term Successfuly',
        data: data
      }
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Contract Terms Is Say :${error}`)
    }

  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const ContracTerms = await this.contractTermsService.findOne(id);
      if (!ContracTerms) {
        return {
          success: false,
          status: 404,
          message: ' Contract Term Not Found '
        }
      }
      return {
        success: true,
        status: 200,
        message: 'You Get One Contract Term Successfuly',
        data: ContracTerms
      }
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Contract Terms Is Say : ${error}`,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateContractTermDto,
  ) {
    try {
      const ContracTerms = await this.contractTermsService.update(
        id,
        updateDto,
      );
      if (!ContracTerms) {
        return {
          success: false,
          status: 404,
          message: ' Contract Terms  Not Found ',
        }
      }
      return {
        success: true,
        status: 200,
        message: ' Contract Terms  Successfuly',
        data: ContracTerms
      }
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Contract Terms Is Say :${error}`,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const contractTerm = await this.contractTermsService.remove(id);
      if (!contractTerm) {
        return {
          success: false,
          status: 404,
          message: ' contract Term Not Found '
        }
      }
      return {
        success: true,
        status: 200,
        message: ' Contract Term Deleted Successfuly',
      }
    } catch (error) {
      throw new ServiceUnavailableException(`Error From Service Contract Terms Is Say :${error}`)
    }
  }
}
