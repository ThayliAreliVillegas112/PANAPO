import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  Container,
  Form,
  Card,
  Badge,
  InputGroup,
  FormControl,
  Collapse,
  ProgressBar,
} from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import { ProjectDetailsRape } from "./ProjectDetailsRape";
import { CustomLoader } from "../../../../shared/components/CustomLoader";
import { FilterComponent } from "../../../../shared/components/FilterComponent";
import Alert, {
  msjConfirmacion,
  titleConfirmacion,
  titleError,
  msjError,
  msjExito,
  titleExito,
} from "../../../../shared/plugins/alert";
import { useNavigate } from "react-router-dom";
import { ProjectCreate } from "./ProjectCreate";

export const ProjectListRape = () => {
  let value = "";
  const navigation = useNavigate();

  const handleReport = () => {
    navigation("/report", { state: { id: value } });
  };

  const setValue = (id) => {
    value = id;
  };

  const [filterText, setFilterText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [projectsRape, setProjectsRape] = useState([]);
  const [values, setValues] = useState({});

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCreateReport, setIsOpenCreateReport] = useState(false);
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [isOpenReports, setIsOpenReports] = useState(false);
  const [isOpenData, setIsOpenData] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getProjectsRape();
  }, []);

  let projectRape = [
    {
      name: "PANAPO",
      progress: 80,
      status: "activo",
      priority: "alta",
      id: 134,
    },
    {
      name: "TEMANTRA",
      progress: 50,
      status: "pausado",
      priority: "media",
      id: 135,
    },
    {
      name: "SIGEH",
      progress: 20,
      status: "cancelado",
      priority: "baja",
      id: 136,
    },
  ];

  const columns = [
    {
      name: <h6 width="70%">#</h6>,
      cell: (row, index) => (
        <div>
          <h6>{index + 1}</h6>
        </div>
      ),
      width: "4%",
      center: true,
      compact: true,
    },
    {
      name: <h6 className="text-center">Identificador</h6>,
      cell: (row) => <div className="txt4">{row.name}</div>,
    },
    {
      name: <h6 style={{ width: "100%" }}>Avance real del proyecto</h6>,
      cell: (row) => (
        <div className="txt4">
          <ProgressBar now={row.progress} variant="success" />
          <small>{row.progress}% completado</small>,
        </div>
      ),
    },
    {
      name: <h6>Estado</h6>,
      cell: (row) => (
        <>
          {row.status === "activo" ? (
            <h6>
              <Badge bg="success">
                <div>{row.status}</div>
              </Badge>
            </h6>
          ) : row.status === "cancelado" ? (
            <h6>
              <Badge bg="danger">
                <div>{row.status}</div>
              </Badge>
            </h6>
          ) : row.status === "pausado" ? (
            <h6>
              <Badge bg="warning">
                <div>{row.status}</div>
              </Badge>
            </h6>
          ) : (
            <h6>
              <Badge bg="primary">
                <div>{row.status}</div>
              </Badge>
            </h6>
          )}
        </>
      ),
    },
    {
      name: <h6>Prioridad</h6>,
      cell: (row) => (
        <>
          {row.priority === "alta" ? (
            <h6>
              <Badge bg="danger">
                <div>{row.priority}</div>
              </Badge>
            </h6>
          ) : row.priority === "media" ? (
            <h6>
              <Badge bg="warning">
                <div>{row.priority}</div>
              </Badge>
            </h6>
          ) : (
            <h6>
              <Badge bg="success">
                <div>{row.priority}</div>
              </Badge>
            </h6>
          )}
        </>
      ),
    },
    {
      name: (
        <div>
          <h6>Detalles</h6>
        </div>
      ),
      cell: (row) => (
        <div>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              setValues(row);
              setIsOpenDetails(true);
            }}
          >
            <FeatherIcon icon="info" />
          </Button>
        </div>
      ),
    },
    {
      name: (
        <div>
          <h6>Hacer reporte</h6>
        </div>
      ),
      cell: (row) => (
        <div>
          <Button
            variant="warning"
            size="md"
            onClick={() => {
              setValues(row);
              setIsOpenCreateReport(true);
            }}
          >
            <FeatherIcon icon="file-plus" />
          </Button>
        </div>
      ),
      center: true,
    },
    {
      name: (
        <div>
          <h6>Ver reportes</h6>
        </div>
      ),
      cell: (row) => (
        <div>
          <Button
            variant="success"
            size="md"
            onClick={() => {
              setValue(row.id);
              handleReport();
            }}
          >
            <FeatherIcon icon="file" />
          </Button>
        </div>
      ),
      center: true,
    },
  ];

  const getProjectsRape = () => {
    setProjectsRape(projectRape);
    setIsLoading(false);
  };

  const paginationOptions = {
    rowsPerPageText: "Filas por p??gina",
    rangeSeparatorText: "de",
  };

  const searchComponent = React.useMemo(() => {
    const search = () => {
      if (filterText) {
        setFilterText("");
      }
    };
    return (
      <FilterComponent
        filterText={filterText}
        onFilter={(e) => setFilterText(e.target.value)}
        onSearch={search}
      />
    );
  }, [filterText]);

  return (
    <div className="content-wrapper screenHeight">
      <Container fluid>
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="font-weight-bold">Gesti??n de proyectos</h1>
              </div>
            </div>
          </div>
        </section>
        <Row>
          <Col>
            <Card className="mb-0">
              <Card.Header className="backgroundHeadCard">
                <Row>
                  <Col as="h6">Proyectos</Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <DataTable
                  columns={columns}
                  data={projectsRape}
                  pagination
                  paginationComponentOptions={paginationOptions}
                  progressPending={isLoading}
                  progressComponent={<CustomLoader />}
                  subHeader
                  subHeaderComponent={searchComponent}
                />
                <ProjectDetailsRape
                  isOpenDetails={isOpenDetails}
                  handleClose={() => setIsOpenDetails(false)}
                  setProjectsRape={setProjectsRape}
                  {...values}
                />
                <ProjectCreate
                  isOpenCreateReport={isOpenCreateReport}
                  handleClose={() => setIsOpenCreateReport(false)}
                  setProjectsRape={setProjectsRape}
                  {...values}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
