'use client';

import { Badge, Col, Container, Row } from 'react-bootstrap';
// import { useEffect, useState } from 'react';
import { useEmployee } from '../../context/EmployeeContext';

// const FRONTEND_URL =
//   process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3001';

// interface Employee {
//   id: number;
//   name: string;
//   transponderId?: string;
//   checkInTime: string;
// }

const ShowTodaysEmployees = () => {
  // const [employees, setEmployees] = useState<Employee[]>([]);
  const { employees } = useEmployee();

  console.log('employees', employees);

  // useEffect(() => {
  //   const fetchEmployees = async () => {
  //     try {
  //       const res = await fetch(`${FRONTEND_URL}/api/employees`);
  //       const data: Employee[] = await res.json();
  //       setEmployees(data);
  //     } catch (err) {
  //       console.error('Fehler beim Laden der Mitarbeiter:', err);
  //     }
  //   };

  //   fetchEmployees();
  // }, []);

  const today = new Date().toDateString();

  const filteredEmployees = employees.filter((employee) => {
    const checkInDate = new Date(employee.checkInTime).toDateString();
    return checkInDate === today;
  });

  const rows = [];
  for (let i = 0; i < filteredEmployees.length; i += 3) {
    rows.push(filteredEmployees.slice(i, i + 3));
  }

  rows.map((group) => {
    group.map((employee) => {
      console.log('Rows', employee.name);
    });
  });

  const badgeColors = [
    '#FF5733',
    '#33FF57',
    '#0d551a',
    '#3357FF',
    '#F333FF',
    '#FF33F3',
    '#33FFF3',
    '#b1ba39',
    '#FFC300',
    '#DAF7A6',
    '#581845',
    '#900C3F',
    '#C70039',
  ];

  return (
    <Container>
      {rows.map((group, groupIndex) => (
        <Row key={`group-${groupIndex}`} className="mb-3">
          {group.map((employee) => {
            const randomColor =
              badgeColors[Math.floor(Math.random() * badgeColors.length)];

            console.log('RandomColor', randomColor);
            return (
              <Col key={employee.id} xs={6} md={4} lg={3}>
                <Badge
                  pill
                  className="m-1"
                  style={{        
                    backgroundColor: `${randomColor} !important`,
                    fontSize: '1.3rem',
                    color: '#fff',
                  }}
                >
                  {employee.name}
                </Badge>
              </Col>
            );
          })}
        </Row>
      ))}
    </Container>
  );
};

export default ShowTodaysEmployees;
