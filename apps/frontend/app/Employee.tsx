'use client'
import { useState, useEffect } from "react";
import { Container, Stack, Alert, Form, Button } from "react-bootstrap";
import ShowTodaysEmployees from "./employees/page";
// import { useEmployee } from "../context/EmployeeContext";

// const FRONTEND_URL = process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3001";
const FRONTEND_URL = process.env.NODE_ENV === 'production' ? '' : "http://localhost:3001/";

console.log('My frontend url: AttendancePage', FRONTEND_URL);

interface Employee {
  id: number;
  name: string;
  checkInTime: string;
  transponderId?: string;
}

export default function AttendancePage() {
  const [transponderId, setTransponderId] = useState("");
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [isNewEmployee, setIsNewEmployee] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const currentHour = new Date().getHours();
  const greeting = currentHour >= 5 && currentHour < 12 ? "Guten Morgen" :
                   currentHour >= 12 && currentHour < 18 ? "Guten Tag" : 
                   "Guten Abend";

  useEffect(() => {
    if (transponderId.length === 8) {
      checkEmployee(transponderId);
    }
  }, [transponderId]);

  const checkEmployee = async (id: string) => {
    try {
      const response = await fetch(`${FRONTEND_URL}api/employees?transponderId=${id}`);
      
      if (!response.ok) throw new Error('Mitarbeiter nicht gefunden');
      
      const data = await response.json();
      
      if (data) {
        setEmployee(data);
        setIsNewEmployee(false);
        setError("");
        setTimeout(() => {
          setTransponderId("");
          setEmployee(null);
        }, 3000);
      }
    } catch (err) {
      setEmployee(null);
      setIsNewEmployee(true);
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    }
  };

  const handleCreateEmployee = async () => {
    if (!name || !transponderId) {
      setError("Bitte alle Felder ausfüllen");
      return;
    }

    // try {
    //   await createEmployee({
    //     name,
    //     checkInTime: new Date().toISOString(),
    //     transponderId
    //   });

    //   await refetchEmployee();
    //   setTransponderId("");
    //   setName("");
    //   setIsNewEmployee(false);
    //   setError("");
    // } catch (err) {
    //   setError(err instanceof Error ? err.message : "Erstellung fehlgeschlagen");
    // }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Anwesenheitsmanagement</h1>
      
      <Container className="mb-4">
        <h3>{greeting}, schön, dass Du da bist!</h3>
        
        <Form.Group className="mb-3">
          <Form.Label>Transponder ID</Form.Label>
          <Form.Control
            type="text"
            value={transponderId}
            onChange={(e) => setTransponderId(e.target.value)}
            placeholder="Transponder ID eingeben (8-stellig)"
            maxLength={8}
          />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        {employee && (
          <Alert variant="success">
            Willkommen zurück, {employee.name}!
          </Alert>
        )}

        {isNewEmployee && (
          <div className="mt-3">
            <Form.Group className="mb-3">
              <Form.Label>Neuer Mitarbeiter</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Vollständiger Name"
              />
            </Form.Group>
            <Button 
              variant="primary"
              onClick={handleCreateEmployee}
            >
              Mitarbeiter anlegen
            </Button>
          </div>
        )}
      </Container>

      <Stack gap={5}>
        <ShowTodaysEmployees />
      </Stack>
    </div>
  );
}