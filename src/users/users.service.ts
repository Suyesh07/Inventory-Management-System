import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEntity } from './entities/user.entity';
import { hash } from 'bcrypt';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
  ) {}
  
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
     const checkUserExists = await this.prismaService.user
      .findUnique({ where: { email : createUserDto.email } })
    
    if (checkUserExists) {
      throw new BadRequestException(`This email has already been taken`);
    }

    createUserDto.password = await hash(
      createUserDto.password,
      parseInt(process.env.SALT_ROUND)
    )
    
    return this.prismaService.user.create({
      data: createUserDto,
      include: {
        role: true,
      }
    })
  }

  async findAll(): Promise<UserEntity[]>  {
    console.log("fetch")
    return this.prismaService.user.findMany({
      include: {
        role: true,
      },
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    console.log({id})
    const user = await this.prismaService.user.findFirst({
      where: { id },include: {
        role: true,
      }
    })
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.prismaService.user.findFirst({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    const userExists = await this.checkIfUserExistByEmail(
      updateUserDto.email, id
    );
    if (!userExists) {
      throw new BadRequestException(`This email ${updateUserDto} has already been taken`);
    }
    if (updateUserDto.password) {
      updateUserDto.password = await hash(
        updateUserDto.password,
        parseInt(process.env.SALT_ROUND)
      );
    }
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
      include: {
        role: true,
      }
    });
  }

  async remove(id: number): Promise<UserEntity> {
    const user = await this.prismaService.user.findFirst({
      where: { id },
    })
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
      }
    return this.prismaService.user.delete({
      where: {id,},
      include: {
        role: true,
      }})
  }

  private async checkIfUserExistByEmail(email: string, id?: number): Promise<boolean>{
    const checkUserExists = await this.prismaService.user
      .findUnique({ where: { email } });
    if (id) {
      return checkUserExists ? checkUserExists.id === id : true;
    }
    return !!this.checkIfUserExistByEmail;
  }
}
