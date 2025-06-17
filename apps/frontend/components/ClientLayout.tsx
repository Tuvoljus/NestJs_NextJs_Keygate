// import 'bootstrap/dist/css/bootstrap.min.css'; 
'use client';

import React, { ReactNode, useState } from "react";
import Menu from "./Menu";
import { Container } from "react-bootstrap";
// import Footer from "./Footer";
import AddEmployeeModal from "./AddEmployeeModal";
import { EmployeeProvider } from "../context/EmployeeContext";
import AddExistingEmployeeFromListModal from "./AddExistingEmployeeFromListModal";

interface LayoutProps {
    children: ReactNode
}

export interface ModalStateI {
    modalState: ModalState
}

 type ModalState = 'addEmployee' | 'choseEmployee' | null;

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [openModal, setOpenModal] = useState<string | null>(null);

    console.log("whichModal", openModal);

    return (
        <>
            {/* <StripeContact */}
            <EmployeeProvider>
                <Menu openModal={(e) => setOpenModal(e)}/>
            <Container>               
                {children}
            </Container>
            <AddEmployeeModal openAddEmployeeModal={openModal} closeModal={(e) => setOpenModal(e)}/>
                <AddExistingEmployeeFromListModal openAddExistingEmployeeFromListModal={openModal} closeModal={(e) => setOpenModal(e)}/>
            </EmployeeProvider>
            
            {/* <Footer /> */}
            
        </>
    )
}