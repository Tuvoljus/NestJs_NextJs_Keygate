import { PrismaService } from '../prisma/prisma.service';
export declare class EmployeeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        name: string;
        id: number;
        transponderId: string | null;
        checkInTime: Date;
    }[]>;
    create(input: {
        name: string;
        checkInTime: Date;
    }): Promise<{
        name: string;
        id: number;
        transponderId: string | null;
        checkInTime: Date;
    }>;
}
