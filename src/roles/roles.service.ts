import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }
  
  create(createRoleDto: CreateRoleDto) {
    // check if role already exist
    //if exist throw error Role <name> already exists
    //if not continue with the request
    return this.prismaService.role.create({
      data: createRoleDto,
    })
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}