// import Image from "next/image";
// import styles from "./page.module.css";
import { Layout } from '@/components/ClientLayout';
import AttendancePage from './Employee';
// import ShowTodaysEmployees from './employees/page'
import '../scss/main.scss';

export default function Home() {
  return (
    <>
      {/* <ShowTodaysEmployees /> */}
      <Layout>
        <AttendancePage />
      </Layout>
    </>
  );
}
