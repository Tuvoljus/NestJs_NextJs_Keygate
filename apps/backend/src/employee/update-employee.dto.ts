import { IsOptional, IsString, IsISO8601 } from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsISO8601()
  checkInTime?: Date;

  @IsOptional()
  @IsString()
  transponderId?: string;
}