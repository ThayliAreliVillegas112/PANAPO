import React, { useState, useEffect } from "react";
import { Button, Row, Col, Container, Form, Card, Badge, InputGroup, FormControl, Collapse, ProgressBar } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import { ProjectEdit } from './ProjectEdit'
import { ProjectDetails } from './ProjectDetails'
import { ProjectDetailsProspect } from "./ProjectDetailsProspect";
import { ProjectEditProspect } from "./ProjectEditProspect";
import { ProjectStart } from "./ProjectStart";
import { CustomLoader } from "../../../../shared/components/CustomLoader";
import { FilterComponent } from "../../../../shared/components/FilterComponent";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../../shared/plugins/alert";
import { Link, useNavigate } from 'react-router-dom';
import "../../../../assets/css/main.css";
import "../../../../assets/css/util.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as yup from "yup";
import axios from "../../../../shared/plugins/axios";
import { useFormik } from "formik";

export const ProjectList = () => {

    let value = "";
    const navigation = useNavigate();

    const handleReport = () => {
        navigation('/report', { state: { id: value } });
    }

    const setValue = (id) => {
        value = id;
    }

    const [filterText, setFilterText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingProspect, setIsLoadingProspect] = useState(false);

    const [projects, setProjects] = useState([]);
    const [projectsProspect, setProjectsProspect] = useState([]);
    const [values, setValues] = useState({});

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [isOpenDetails, setIsOpenDetails] = useState(false);
    const [isOpenReports, setIsOpenReports] = useState(false);

    const [isOpenProspect, setIsOpenProspect] = useState(false);
    const [isOpenData, setIsOpenData] = useState(false);
    const [isOpenClient, setIsOpenClient] = useState(false);
    const [isOpenQuote, setIsOpenQuote] = useState(false);
    const [isOpenUpdateP, setIsOpenUpdateP] = useState(false);
    const [isOpenDetailsP, setIsOpenDetailsP] = useState(false);
    const [isOpenStart, setIsOpenStart] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getProjects();
        getProspectProject();
    }, []);

    const getProspectProject = () => {
        axios({ url: "/project/", method: "GET" })
            .then((response) => {
                let data = response.data;
                let prospectTemp = data.filter(item => item.statusProject.description === "Prospecto")
                setProjectsProspect(prospectTemp);
                setIsLoading(false);
                
            })
            .catch((error) => {
                console.log(error);
            });
    };

    

    let project = [
        {
            "name": "hola",
            "status": "pausado",
            "phase": "requerimientos",
            "progress": 50,
            "id": 134
        },
        {
            "name": "roy",
            "status": "activo",
            "phase": "inicio",
            "progress": 80,
            "id": 135
        },
        {
            "name": "te",
            "status": "cancelado",
            "phase": "inicio",
            "progress": 20,
            "id": 136
        },
        {
            "name": "amo",
            "status": "cerrado",
            "phase": "inicio",
            "progress": 95,
            "id": 137
        }
    ];

    // const handleCloseForm = () => {
    //     formik.resetForm();
    //     setIsOpen(false);
    // };

    const columns = [
        {
            name: <h6>#</h6>,
            cell: (row, index) => <div><h6>{index + 1}</h6></div>,
            center: true,
            width: "4%"
        },
        {
            name: <h6 className="text-center">Identificador</h6>,
            cell: (row) => <div className="txt4">{row.name}</div>,
        },
        {
            name: <h6 style={{ width: "100%" }}>Avance real del proyecto</h6>,
            cell: (row) => <div className="txt4">
                <ProgressBar now={row.progress} variant="success" />
                <small>{row.progress}% completado</small>
            </div>,
        },
        {
            name: <h6>Estado</h6>,
            cell: (row) =>
                <>
                    {
                        row.status === "activo" ? (
                            <h6>
                                <Badge bg="success">
                                    <div>{row.status}</div>
                                </Badge>
                            </h6>
                        ) : (row.status === "cancelado" ?
                            <h6>
                                <Badge bg="danger">
                                    <div>{row.status}</div>
                                </Badge>
                            </h6> : (row.status === "pausado" ?
                                <h6>
                                    <Badge bg="warning">
                                        <div>{row.status}</div>
                                    </Badge>
                                </h6> :
                                <h6>
                                    <Badge bg="primary">
                                        <div>{row.status}</div>
                                    </Badge>
                                </h6>
                            )
                        )
                    }
                </>
        },
        {
            name: <h6>Prioridad</h6>,
            cell: (row) =>
                <>
                    {
                        row.status === "activo" ? (
                            <h6>
                                <Badge bg="success">
                                    <div>{row.status}</div>
                                </Badge>
                            </h6>
                        ) : (row.status === "pausado" ?
                            <h6>
                                <Badge bg="warning">
                                    <div>{row.status}</div>
                                </Badge>
                            </h6> :
                            <h6>
                                <Badge bg="danger">
                                    <div>{row.status}</div>
                                </Badge>
                            </h6>
                        )
                    }
                </>
        },
        {
            name: <div><h6>Detalles</h6></div>,
            cell: (row) => <div>
                <Button variant="primary" size="md"
                    onClick={() => {
                        setValues(row)
                        setIsOpenDetails(true)
                    }}>
                    <FeatherIcon icon="info" />
                </Button>
            </div>
        },
        {
            name: <div><h6>Modificar</h6></div>,
            cell: (row) => <div>
                <Button variant="warning" size="md"
                    onClick={() => {
                        setValues(row)
                        setIsOpenUpdate(true)
                    }}>
                    <FeatherIcon icon="edit" />
                </Button>
            </div>
        },
        {
            name: <div><h6>Reportes</h6></div>,
            cell: (row) => <div>
                <Button variant="success" size="md" onClick={() => {
                    setValue(row.id)
                    handleReport()
                }}
                >
                    <FeatherIcon icon="file" />
                </Button>
            </div>
        },
    ];

    const columnsP = [
        {
            name: <h6 width="70%">#</h6>,
            cell: (row, index) => <div><h6>{index + 1}</h6></div>,
        },
        {
            name: <h6 className="text-center">Identificador</h6>,
            cell: (row) => <div className="txt4">{row.name}</div>,
        },
        {
            name: <h6 style={{ width: "100%" }}>Cliente</h6>,
            cell: (row) => <div className="txt4">{row.client.name}</div>,
        },
        {
            name: <h6 style={{ width: "100%" }}>Tiempo estimado</h6>,
            cell: (row) => <div className="txt4">{row.months}</div>,
        },
        {
            name: <h6 style={{ width: "100%" }}>Cantidad de becarios</h6>,
            cell: (row) => <div className="txt4">{row.numberBeca}</div>,
        },
        {
            name: <h6>Estado</h6>,
            cell: (row) =>
                <h6>
                    <Badge bg="secondary">
                        <div>{row.statusProject.description}</div>
                    </Badge>
                </h6>
        },
        {
            name: <div><h6>Detalles</h6></div>,
            cell: (row) => <div>
                <Button variant="primary" size="md"
                    onClick={() => {
                        setValues(row)
                        setIsOpenDetailsP(true)
                    }}>
                    <FeatherIcon icon="info" />
                </Button>
            </div>
        },
        {
            name: <div><h6>Modificar</h6></div>,
            cell: (row) => <div>
                <Button variant="warning" size="md"
                    onClick={() => {
                        setValues(row)
                        setIsOpenUpdateP(true)
                    }}>
                    <FeatherIcon icon="edit" />
                </Button>
            </div>
        },
        {
            name: <div><h6>Iniciar</h6></div>,
            cell: (row) => <div>
                <Button variant="success" size="md"
                    onClick={() => {
                        setValues(row)
                        setIsOpenStart(true)
                    }}>
                    <FeatherIcon icon="play" />
                </Button>
            </div>
        },
    ];

    const getProjects = () => {
        setProjects(project);
        setIsLoading(false);
    };

    

    const paginationOptions = {
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: "de",
    };

    const searchComponent = React.useMemo(() => {
        const search = () => {
            if (filterText) {
                setFilterText("");
            }
        }
        return <FilterComponent filterText={filterText} onFilter={e => setFilterText(e.target.value)} onSearch={search} />
    }, [filterText]);

    return (
        <div className="content-wrapper screenHeight">
            <Container fluid>
                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="font-weight-bold">Gestión de proyectos</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <Row>
                    <Col>
                        <Card className="mb-0">
                            <Card.Header onClick={() => setIsOpen(!isOpen)}
                                aria-controls="example-collapse-text"
                                aria-expanded={isOpen}
                                className="backgroundHeadCard"
                                type="button">
                                <Row>
                                    <Col as="h6">Registrar proyecto</Col>
                                    <Col className="text-end">
                                        <Col>
                                            {isOpen ? (
                                                <FeatherIcon icon="minus" />
                                            ) : (
                                                <FeatherIcon icon="plus" />
                                            )}
                                        </Col>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Collapse in={isOpen}>
                                <div id="example-collapse-text">
                                    <Container fluid>
                                        <Card.Body>
                                            {/* DATOS DEL PROYECTO */}
                                            <Card className="mb-3" bg="white">
                                                <Card.Header onClick={() => setIsOpenData(!isOpenData)}
                                                    aria-controls="example-collapse-text"
                                                    aria-expanded={isOpenData}
                                                    type="button">
                                                    <Row>
                                                        <Col as="h6" className="text-bold">Datos del proyecto</Col>
                                                        <Col className="text-end">
                                                            <Col>
                                                                {isOpenData ? (
                                                                    <FeatherIcon icon="minus"
                                                                        color="grey" />
                                                                ) : (
                                                                    <FeatherIcon icon="plus"
                                                                        color="grey" />
                                                                )}
                                                            </Col>
                                                        </Col>
                                                    </Row>
                                                </Card.Header>
                                                <Collapse in={isOpenData}>
                                                    <div id="example-collapse-text">
                                                        <Card.Body>
                                                            <Form className="row">
                                                                <Form.Group className="col-md-6 mb-4" >
                                                                    <Form.Label>Proyecto anterior</Form.Label>
                                                                    <Form.Select aria-label="Default select example">
                                                                        <option value="1">Nuevo</option>
                                                                        <option value="1">One</option>
                                                                        <option value="2">Two</option>
                                                                        <option value="3">Three</option>
                                                                    </Form.Select>
                                                                    <Form.Text muted>
                                                                        Solo seleccionar un proyecto si se requiere
                                                                        un nuevo ciclo del mismo
                                                                    </Form.Text>
                                                                    <small></small>
                                                                </Form.Group>
                                                                <Form.Group className="col-md-6 mb-4" >
                                                                    <Form.Label>Ciclo del proyecto</Form.Label>
                                                                    <Form.Control type="number" readOnly placeholder="2" />
                                                                    <Form.Text muted>
                                                                        El ciclo es calculado en base al anterior
                                                                        proyecto
                                                                    </Form.Text>
                                                                </Form.Group>
                                                                <Form.Group className="col-md-6 mb-4" >
                                                                    <Form.Label>Nombre del proyecto</Form.Label>
                                                                    <Form.Control type="text" />
                                                                </Form.Group>
                                                                <Form.Group className="col-md-6 mb-4" >
                                                                    <Form.Label>Estado</Form.Label>
                                                                    <Form.Control type="number" readOnly placeholder="Prospecto" />
                                                                </Form.Group>
                                                                <Form.Group className="col-md-12 mb-4" >
                                                                    <Form.Label>Descripción del proyecto</Form.Label>
                                                                    <Form.Control
                                                                        as="textarea"
                                                                        style={{ height: '100px' }}
                                                                    />
                                                                </Form.Group>
                                                            </Form>
                                                        </Card.Body>
                                                    </div>
                                                </Collapse>
                                            </Card>
                                            {/* DATOS DEL CLIENTE */}
                                            <Card className="mb-3" bg="white">
                                                <Card.Header onClick={() => setIsOpenClient(!isOpenClient)}
                                                    aria-controls="example-collapse-text"
                                                    aria-expanded={isOpenClient}
                                                    type="button">
                                                    <Row>
                                                        <Col as="h6" className="text-bold">Cliente del proyecto</Col>
                                                        <Col className="text-end">
                                                            <Col>
                                                                {isOpenClient ? (
                                                                    <FeatherIcon icon="minus" color="grey" />
                                                                ) : (
                                                                    <FeatherIcon icon="plus" color="grey" />
                                                                )}
                                                            </Col>
                                                        </Col>
                                                    </Row>
                                                </Card.Header>
                                                <Collapse in={isOpenClient}>
                                                    <div id="example-collapse-text">
                                                        <Card.Body>
                                                            <Row>
                                                                <Col className="text-end">
                                                                    <Col>
                                                                        <Button variant="warning" size="md"
                                                                        >
                                                                            <FeatherIcon icon="refresh-cw" />
                                                                        </Button>
                                                                        <Button style={{ background: "#042B61", borderColor: "#042B61" }} size="md" className="ms-3"
                                                                        >
                                                                            <FeatherIcon icon="plus" />&nbsp;Añadir un cliente
                                                                        </Button>
                                                                    </Col>
                                                                </Col>
                                                            </Row>
                                                            <Form className="row">
                                                                <Form.Group className="col-md-6 mb-4" >
                                                                    <Form.Label>Selecciona un cliente</Form.Label>
                                                                    <Form.Select>
                                                                        <option value="1">Roy</option>
                                                                        <option value="2">Miriam</option>
                                                                        <option value="3">Thayli</option>
                                                                    </Form.Select>
                                                                </Form.Group>
                                                            </Form>
                                                        </Card.Body>
                                                    </div>
                                                </Collapse>
                                            </Card>
                                            {/* DATOS DE LA COTIZACIÓN */}
                                            <Card className="mb-3" bg="white">
                                                <Card.Header onClick={() => setIsOpenQuote(!isOpenQuote)}
                                                    aria-controls="example-collapse-text"
                                                    aria-expanded={isOpenQuote}
                                                    type="button">
                                                    <Row>
                                                        <Col as="h6" className="text-bold">Cotización del proyecto</Col>
                                                        <Col className="text-end">
                                                            <Col>
                                                                {isOpenQuote ? (
                                                                    <FeatherIcon icon="minus" color="grey" />
                                                                ) : (
                                                                    <FeatherIcon icon="plus" color="grey" />
                                                                )}
                                                            </Col>
                                                        </Col>
                                                    </Row>
                                                </Card.Header>
                                                <Collapse in={isOpenQuote}>
                                                    <div id="example-collapse-text">
                                                        <Card.Body>
                                                            <Form className="row">
                                                                <Form.Group className="col-md-6 mb-4" >
                                                                    <Form.Label>Presupuesto</Form.Label>
                                                                    <Form.Control type="number" />
                                                                </Form.Group>
                                                                <Form.Group className="col-md-6 mb-4" >
                                                                    <Form.Label>Precio al cliente</Form.Label>
                                                                    <Form.Control type="number" />
                                                                </Form.Group>
                                                                <Form.Group className="col-md-6 mb-4" >
                                                                    <Form.Label>Tiempo estimado (meses)</Form.Label>
                                                                    <Form.Control type="number" />
                                                                </Form.Group>
                                                                <Form.Group className="col-md-6 mb-4" >
                                                                    <Form.Label>Cantidad de becarios</Form.Label>
                                                                    <Form.Control type="number" />
                                                                </Form.Group>
                                                            </Form>
                                                        </Card.Body>
                                                    </div>
                                                </Collapse>
                                            </Card>
                                            <div className="d-grid gap-2">
                                                <Button type="submit" style={{ background: "#042B61", borderColor: "#042B61" }} >
                                                    Registrar
                                                </Button>
                                                {/* <Button type="submit" className="button-style" size="lg">Registrar</Button> */}
                                            </div>
                                        </Card.Body>
                                    </Container>
                                </div>
                            </Collapse>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Card>
                            <Card.Header
                                onClick={() => setIsOpenProspect(!isOpenProspect)}
                                aria-controls="example-collapse-text"
                                aria-expanded={isOpenProspect}
                                type="button"
                                className="backgroundHeadCard">
                                <Row>
                                    <Col as="h6">Proyectos prospecto</Col>
                                    <Col className="text-end">
                                        <Col>
                                            {isOpenProspect ? (
                                                <FeatherIcon icon="minus" />
                                            ) : (
                                                <FeatherIcon icon="plus" />
                                            )}
                                        </Col>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Collapse in={isOpenProspect}>
                                <div id="example-collapse-text">
                                    <Card.Body>
                                        <DataTable
                                            columns={columnsP}
                                            data={projectsProspect}
                                            noDataComponent="No hay registros"
                                            pagination
                                            paginationComponentOptions={paginationOptions}
                                            progressPending={isLoadingProspect}
                                            progressComponent={<CustomLoader />}
                                        />
                                        <ProjectEditProspect
                                            isOpenUpdate={isOpenUpdateP}
                                            handleClose={setIsOpenUpdateP}
                                            setProjectsProspect={setProjectsProspect}
                                            {...values}
                                        />
                                        <ProjectDetailsProspect
                                            isOpenDetailsP={isOpenDetailsP}
                                            handleClose={setIsOpenDetailsP}
                                            {...values}
                                        />
                                        <ProjectStart
                                            isOpenStart={isOpenStart}
                                            handleClose={setIsOpenStart}
                                            setProjectsProspect={setProjectsProspect}
                                            {...values}
                                        />
                                    </Card.Body>
                                </div>
                            </Collapse>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header
                                className="backgroundHeadCard">
                                <Row>
                                    <Col as="h6">Proyectos</Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <DataTable
                                    columns={columns}
                                    data={projects}
                                    noDataComponent="No hay registros"
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    progressPending={isLoading}
                                    progressComponent={<CustomLoader />}
                                    subHeader
                                    subHeaderComponent={searchComponent}
                                />
                                <ProjectEdit
                                    isOpenUpdate={isOpenUpdate}
                                    handleClose={() => setIsOpenUpdate(false)}
                                    setProjects={setProjects}
                                    {...values}
                                />
                                <ProjectDetails
                                    isOpenDetails={isOpenDetails}
                                    handleClose={() => setIsOpenDetails(false)}
                                    setProjects={setProjects}
                                    {...values}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}