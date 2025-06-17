import { EmployeeService } from './employee.service';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    getAllEmployees(): Promise<{
        name: string;
        id: number;
        transponderId: string | null;
        checkInTime: Date;
    }[]>;
    create(body: {
        name: string;
        checkInTime: string;
    }): Promise<{
        name: string;
        id: number;
        transponderId: string | null;
        checkInTime: Date;
    }>;
}
