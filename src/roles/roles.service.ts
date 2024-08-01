import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RoleEntity } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    private readonly prismaService: PrismaService,
  ) { }
  
  async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
    // check if role already exist
    //if exist throw error Role <name> already exists
    //if not continue with the request

    const checkRolesExists = await this.prismaService.role
      .findUnique({ where: { name: createRoleDto.name } })
    
    if (checkRolesExists) {
      throw new BadRequestException(`Role ${createRoleDto.name} already exists`);
    }
     
    return this.prismaService.role.create({
      data: createRoleDto,

    })
  }

  async findAll(): Promise<RoleEntity[]> {
    return this.prismaService.role.findMany();
  }

  async findOne(id: number): Promise<RoleEntity> {
   return this.checkIfRoleExists(id)
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    await this.checkIfRoleExists(id);

    const roleExist = await this.checkIfRolesExistByName(updateRoleDto.name, id)
    
    if (!roleExist) {
      throw new BadRequestException(`Role ${updateRoleDto.name} already exist`)
    }
    return this.prismaService.role
      .update({
        where: {
          id,
        },
        data: updateRoleDto,
    })
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }

  private async checkIfRoleExists(id: number): Promise<RoleEntity>{
    const role = await this.prismaService.role
      .findFirst({ where: { id } });
    if (!role) {
      throw new NotFoundException();
    }
    return role;
  }

  private async checkIfRolesExistByName(name: string, id?: number): Promise<boolean>{
    const role = await this.prismaService.role
      .findUnique({ where: { name } });
    if (id) {
      return role ? role.id === id : true;
    }
    return !!role;
  }
}
