import { Body, Controller, Get, Post, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { UpdateEmployeeDto } from './update-employee.dto';

@Controller('api/employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getAllEmployees() {
    return this.employeeService.findAll();
  }

  @Post()
  async create(@Body() body: { name: string; checkInTime: string }) {
    return this.employeeService.create({
      name: body.name,
      checkInTime: new Date(body.checkInTime),
    });
  }

  @Patch(':id')
async updateEmployee(
  @Param('id', ParseIntPipe) id: number,
  @Body() updateEmployeeDto: UpdateEmployeeDto
) {
  return this.employeeService.update(id, updateEmployeeDto);
}
}
