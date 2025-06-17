import { PrismaService } from '../prisma/prisma.service';
import { UpdateEmployeeDto } from './update-employee.dto';
export declare class EmployeeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        name: string;
        checkInTime: Date;
        transponderId: string | null;
        id: number;
    }[]>;
    create(input: {
        name: string;
        checkInTime: Date;
    }): Promise<{
        name: string;
        checkInTime: Date;
        transponderId: string | null;
        id: number;
    }>;
    update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<{
        name: string;
        checkInTime: Date;
        transponderId: string | null;
        id: number;
    }>;
}
