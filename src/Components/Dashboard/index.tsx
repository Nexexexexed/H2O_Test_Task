import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FinancialData, generateData } from "../../utils/generateData";
import styles from "./styles.module.css";

const Dashboard = () => {
  const [data, setData] = useState<FinancialData[]>([]);

  useEffect(() => {
    setData(generateData());
  }, []);

  console.log(data);

  return (
    <Container className={styles.dashboard}>
      <Row className="mb-4">
        <Col>
          <h1>Сводный отчет</h1>
        </Col>
      </Row>

      {/* Здесь будут компоненты */}
    </Container>
  );
};

export default Dashboard;
