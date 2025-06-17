'use client';
import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { useEmployee } from "../context/EmployeeContext";

// const FRONTEND_URL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_FRONTEND_URL : "http://localhost:3001";
const FRONTEND_URL = process.env.NODE_ENV === 'production' ? '' : "http://localhost:3001/";

console.log('My frontend url: AddExistingEmployeeFromListModal', FRONTEND_URL);

interface AddExistingEmployeeFromListModalProps {
    openAddExistingEmployeeFromListModal: string | null;
    closeModal: (value: string | null) => void;
  }

const AddExistingEmployeeFromListModal = (props: AddExistingEmployeeFromListModalProps) => {
  const { employees, refetchEmployee } = useEmployee();
  const [searchTerm, setSearchTerm] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateVisitingTime = async (employeeId: number) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`${FRONTEND_URL}api/employees/${employeeId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          checkInTime: new Date().toISOString()
        })
      });

      if (!response.ok) throw new Error('Aktualisierung fehlgeschlagen');

      await refetchEmployee();
      props.closeModal(null);
      alert('Check-in-Zeit erfolgreich aktualisiert!');
    } catch (error) {
      console.error('Fehler:', error);
      alert(error instanceof Error ? error.message : 'Ein Fehler ist aufgetreten');
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const employeeRows = [];
  for (let i = 0; i < filteredEmployees.length; i += 5) {
    employeeRows.push(filteredEmployees.slice(i, i + 5));
  }

  return (
    <Modal
    show={props.openAddExistingEmployeeFromListModal === "choseEmployee"}
    size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={() => props.closeModal(null)}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Mitarbeiter auswählen
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <h4>Hey, schön, dass Du da bist!</h4>
        <p>Wähle deinen Namen aus der Liste aus:</p>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Suche nach Namen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>

        {filteredEmployees.length > 0 ? (
          employeeRows.map((row, rowIndex) => (
            <Row key={rowIndex} className="mb-2">
              {row.map((employee) => (
                <Col key={employee.id} xs={12} sm={6} md={4} lg={3}>
                  <Button
                    onClick={() => handleUpdateVisitingTime(employee.id)}
                    disabled={isUpdating}
                    style={{ width: "100%", marginBottom: "5px" }}
                  >
                    {employee.name}
                  </Button>
                </Col>
              ))}
            </Row>
          ))
        ) : (
          <p>Keine Mitarbeiter gefunden</p>
        )}
      </Modal.Body>

      <Modal.Footer>
      <Button onClick={() => props.closeModal(null)}>Schließen</Button>

      </Modal.Footer>
    </Modal>
  );
};

export default AddExistingEmployeeFromListModal;