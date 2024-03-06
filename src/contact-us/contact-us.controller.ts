import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ContactUsService } from './contact-us.service';
import { CreateContactUsDto } from './dto/create-contact-us.dto';
import { UpdateContactUsDto } from './dto/update-contact-us.dto';

@Controller('contact-us')
export class ContactUsController {
  constructor(private readonly contactUsService: ContactUsService) {}

  @Post()
  create(@Body() createContactUsDto: CreateContactUsDto) {
    try {
      return this.contactUsService.create(createContactUsDto);
    } catch (error) {
      throw new ServiceUnavailableException(
        `Error From Service Contact Us${error} `,
      );
    }
  }

  @Get()
  findAll() {
    try {
      return this.contactUsService.findAll();
    } catch (error) {
      throw new ServiceUnavailableException(`Error Is ${error}`);
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactUsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContactUsDto: UpdateContactUsDto,
  ) {
    return this.contactUsService.update(+id, updateContactUsDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactUsService.remove(+id);
  }
}
