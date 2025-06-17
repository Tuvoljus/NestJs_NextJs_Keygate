import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {UpdateEmployeeDto} from './update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.employee.findMany();
  }

  async create(input: { name: string; checkInTime: Date }) {
    const exists = await this.prisma.employee.findFirst({
      where: { name: input.name },
    });

    if (exists) {
      throw new BadRequestException(
        `Employee with name '${input.name}' already exists.`,
      );
    }

    return this.prisma.employee.create({
      data: {
        name: input.name,
        checkInTime: input.checkInTime,
      },
    });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.prisma.employee.update({
      where: { id },
      data: updateEmployeeDto
    });
  }

}