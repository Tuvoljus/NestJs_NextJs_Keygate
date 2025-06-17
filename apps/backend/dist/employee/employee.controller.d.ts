import { EmployeeService } from './employee.service';
import { UpdateEmployeeDto } from './update-employee.dto';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    getAllEmployees(): Promise<{
        name: string;
        checkInTime: Date;
        transponderId: string | null;
        id: number;
    }[]>;
    create(body: {
        name: string;
        checkInTime: string;
    }): Promise<{
        name: string;
        checkInTime: Date;
        transponderId: string | null;
        id: number;
    }>;
    updateEmployee(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<{
        name: string;
        checkInTime: Date;
        transponderId: string | null;
        id: number;
    }>;
}
