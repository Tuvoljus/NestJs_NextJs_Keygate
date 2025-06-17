// apps/frontend/components/AddEmployeeModal.tsx
'use client';

import { Form, Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useEmployee } from '../context/EmployeeContext';

// const FRONTEND_URL = process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_FRONTEND_URL : "http://localhost:3001";
const FRONTEND_URL = process.env.NODE_ENV === 'production' ? '' : "http://localhost:3001/";

interface AddEmployeeModalProps {
  openAddEmployeeModal: string | null;
  closeModal: (value: string | null) => void;
}

const AddEmployeeModal = ({ openAddEmployeeModal, closeModal }: AddEmployeeModalProps) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { employees, refetchEmployee } = useEmployee();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dateString = new Date().toISOString();

    // Prüfung auf doppelte Namen
    const exists = employees.some(emp => emp.name.toLowerCase() === name.toLowerCase());

    if (exists) {
      alert(`Mitarbeiter "${name}" existiert bereits!`);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${FRONTEND_URL}api/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          checkInTime: dateString
        }),
      });

      if (!response.ok) throw new Error('Request failed');

      await refetchEmployee();
      setName('');
      closeModal(null);
    } catch (error) {
      console.error('Fehler:', error);
      alert(error instanceof Error ? error.message : 'Unbekannter Fehler');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      show={openAddEmployeeModal === 'addEmployee'}
      onHide={() => closeModal(null)}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Mitarbeiter hinzufügen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              minLength={2}
              disabled={isSubmitting}
            />
          </Form.Group>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Wird gespeichert...' : 'Speichern'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEmployeeModal;