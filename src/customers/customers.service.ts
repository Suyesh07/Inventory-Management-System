import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CustomerEntity } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(private readonly prismaService: PrismaService) { }
  
  async create(createCustomerDto: CreateCustomerDto): Promise<CustomerEntity> {
    const checkIfCustomerExists = await this.checkIfCustomerExistByName(createCustomerDto.name);
    
    if (checkIfCustomerExists) {
      throw new BadRequestException(`Item ${createCustomerDto.name} already exists`);
    }
    return this.prismaService.costumerVender.create({
      data: createCustomerDto,
    })
  }
  async findAll(): Promise<CustomerEntity[]> {
    return this.prismaService.costumerVender.findMany();
  }

  async findOne(id: number) {
    return this.checkIfCustomerExistByName('id');
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    await this.checkIfCustomerExists(id);
    const customerExist = await this.checkIfCustomerExistByName(updateCustomerDto.name, id)
    
    if (!customerExist) {
      throw new BadRequestException(` Item${updateCustomerDto.name} already exists `)
    }

    return this.prismaService.item.update({
      where: { id, },
      data: updateCustomerDto,
    })
  }

  async remove(id: number) {
    return ` #${id} item has been removed`;
  }

  private async checkIfCustomerExists(id: number){
    const customer = await this.prismaService.costumerVender
      .findFirst({ where: { id } });
    if (!customer) {
      throw new NotFoundException();
    }
    return customer;
  }

  private async checkIfCustomerExistByName(email: string, id?: number):
    Promise<boolean>{
    const customer = await this.prismaService.costumerVender
      .findFirst({ where: {email } });
    if (id) {
      return customer ? customer.id === id : true;
    }
    return !!customer;
  }
}

