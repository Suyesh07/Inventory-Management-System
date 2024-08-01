import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ItemEntity } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }


  async create(createItemDto: CreateItemDto) {
    const checkIfItemExists = await this.checkIfItemExistByName(createItemDto.name);
    
    if (checkIfItemExists) {
      throw new BadRequestException(`Item ${createItemDto.name} already exists`);
    }
     
    return this.prismaService.item.create({
      data: createItemDto,
    })
  }

  findAll() {
    return this.prismaService.item.findMany();
  }

  findOne(id: number) {
    return this.checkIfItemExistByName('id');
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    await this.checkIfItemExists(id);
    const itemExist = await this.checkIfItemExistByName(updateItemDto.name, id)
    
    if (!itemExist) {
      throw new BadRequestException(` Item${updateItemDto.name} already exists `)
    }

    return this.prismaService.item.update({
      where: { id, },
      data: updateItemDto,
    })
  }

  remove(id: number) {
    return ` #${id} item has been removed`;
  }

  private async checkIfItemExists(id: number): Promise<ItemEntity>{
    const item = await this.prismaService.item
      .findFirst({ where: { id } });
    if (!item) {
      throw new NotFoundException();
    }
    return item;
  }

  private async checkIfItemExistByName(name: string, id?: number): Promise<boolean>{
    const item = await this.prismaService.item
      .findUnique({ where: { name } });
    if (id) {
      return item ? item.id === id : true;
    }
    return !!item;
  }
}
