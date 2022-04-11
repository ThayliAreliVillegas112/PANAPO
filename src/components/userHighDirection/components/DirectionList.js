import React, { useState, useEffect } from "react";
import FeatherIcon from "feather-icons-react";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Card,
    Col,
    Collapse,
    Container,
    Form,
    Row
} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { FilterComponent } from "../../../shared/components/FilterComponent";
import { CustomLoader } from "../../../shared/components/CustomLoader";
import { DirectionDetails } from "./DirectionDetails"
import { DirectionEdit } from "./DirectionEdit";
import * as yup from "yup";
import axios from "../../../shared/plugins/axios";
import { useFormik } from "formik";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../shared/plugins/alert";

export const DirectionList = () => {

    const [filterText, setFilterText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [directives, setDirectives] = useState([]);
    const [values, setValues] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [isOpenDetails, setIsOpenDetails] = useState(false);

    const filteredItems = directives.filter(
        (item) => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
    );

    const getDirectives = () => {
        axios({ url: "/person/", method: "GET" })
            .then((response) => {
                let data = response.data;
                console.log(data)
                let directivesTemp = data.filter(item => item.profession?.description === "Directivo")
                console.log(directivesTemp)

                setDirectives(directivesTemp); 
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            secondSurname: "",
            email: "",
            profession: 1
        },
        validationSchema: yup.object().shape({
            name: yup.string().required("Campo obligatorio"),
            surname: yup.string().required("Campo obligatorio"),
            secondSurname: yup.string().required("Campo obligatorio"),
            profession: yup.number().required("Campo obligatorio"),
        }),
        onSubmit: (values) => {
            const person = {
                password: values.email,
                person: {
                    name: values.name,
                    surname: values.surname,
                    secondSurname: values.secondSurname,
                    email: values.email,
                    profession: {
                        id: 3,
                        description: "Directivo"
                    },
                    status: {
                        id: 1,
                        description: "Activo"
                    }
                },
                authorities: [
                    {
                        id: 1,
                        description: "Directivo"
                    }
                ],
                status: {
                    id: 1,
                    description: "Activo"
                }
            };
            console.log(person)
            Alert.fire({
                title: titleConfirmacion,
                text: msjConfirmacion,
                confirmButtonText: "Aceptar",
                cancelButtonText: "Cancelar",
                confirmButtonColor: "#198754",
                cancelButtonColor: "#dc3545",
                showCancelButton: true,
                reverseButtons: true,
                showLoaderOnConfirm: true,
                icon: "warning",
                preConfirm: () => {
                    return axios({ url: "/person/", method: "POST", data: JSON.stringify(person) })
                        .then((response) => {
                            console.log(response)
                            if (!response.error) {
                                // ... significa agregar un objeto a una lista
                                //setPersonal(personal => [...personal, response.data])
                                getDirectives();
                                Alert.fire({
                                    title: titleExito,
                                    text: msjExito,
                                    confirmButtonColor: "#198754",
                                    icon: "success",
                                    confirmButtonText: "Aceptar",
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                        handleCloseForm();
                                    }
                                });
                            }
                            return response;
                        }).catch((error) => {
                            console.log(error)
                            Alert.fire({
                                title: titleError,
                                text: msjError,
                                cancelButtonColor: "#198754",
                                icon: "error",
                                confirmButtonText: "Aceptar"
                            });
                        });
                },
                backdrop: true,
                allowOutsideClick: !Alert.isLoading
            });
        },
    });

    const handleCloseForm = () => {
        formik.resetForm();
        setIsOpen(false);
    };

    useEffect(() => {
        setIsLoading(true);
        document.title = "PANAPO | Gestión de usuarios de alta dirección";
        getDirectives();
    }, []);

    const columns = [
        {
            name: <h6 >#</h6>,
            cell: (row, index) => <div><h6>{index + 1}</h6></div>,
            width: "4%"
        },
        {
            name: <h6>Nombre del directivo</h6>,
            cell: (row) => <div className="txt4">{row.name + " "}{row.surname + " "}{row.secondSurname}</div>,
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
                    <h6>Modificar</h6>
                </div>
            ),
            cell: (row) => (
                <div>
                    <Button
                        variant="warning"
                        size="md"
                        onClick={() => {
                            setValues(row)
                            setIsOpenUpdate(true)
                            console.log(row)
                        }}
                    >
                        <FeatherIcon icon="edit" />
                    </Button>
                </div>
            ),
        },
        {
            name: (
                <div>
                    <h6>Eliminar</h6>
                </div>
            ),
            cell: (row) => (
                <div>
                    <Button
                        variant="danger"
                        size="md"
                        onClick={() => {
                            setValues(row);
                        }}
                    >
                        <FeatherIcon icon="trash" />
                    </Button>
                </div>
            ),
        },
    ];

    const paginationOptions = {
        rowsPerPageText: "Filas por página",
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
                                <h1 class="font-weight-bold">Gestión de usuarios de alta dirección</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header
                                onClick={() => setIsOpen(!isOpen)}
                                aria-controls="example-collapse-text"
                                aria-expanded={isOpen}
                                className="backgroundHeadCard"
                                type="button"
                            >
                                <Row>
                                    <Col as="h6">Registrar</Col>
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
                                            <Row>
                                                <Col as="h6" className="text-bold">
                                                    Datos del directivo
                                                </Col>
                                            </Row>
                                            <div id="example-collapse-text">
                                                <Form className="row">
                                                    <Form.Group className="col-md-4 ">
                                                        <Form.Label>Nombre(s)</Form.Label>
                                                        <Form.Control type="text" placeholder="Emmanuel" name="name" value={formik.values.name}
                                                            onChange={formik.handleChange} />
                                                        {formik.errors.name ? (
                                                            <span className='error-text'>{formik.errors.name}</span>
                                                        ) : null}
                                                    </Form.Group>
                                                    <Form.Group className="col-md-4 ">
                                                        <Form.Label>Primer Apellido</Form.Label>
                                                        <Form.Control type="text" placeholder="Herrera" name="surname" value={formik.values.name}
                                                            onChange={formik.handleChange} />
                                                        {formik.errors.surname ? (
                                                            <span className='error-text'>{formik.errors.surname}</span>
                                                        ) : null}
                                                    </Form.Group>
                                                    <Form.Group className="col-md-4 ">
                                                        <Form.Label>Segundo Apellido</Form.Label>
                                                        <Form.Control type="text" placeholder="Ibarra" name="secondSurname" value={formik.values.secondSurname}
                                                            onChange={formik.handleChange} />
                                                        {formik.errors.secondSurname ? (
                                                            <span className='error-text'>{formik.errors.secondSurname}</span>
                                                        ) : null}
                                                    </Form.Group>
                                                    <Form.Group className="col-md-4 ">
                                                        <Form.Label>Correo Electrónico</Form.Label>
                                                        <Form.Control
                                                            type="email"
                                                            placeholder="utez@utez.edu.mx" name="email" value={formik.values.email}
                                                            onChange={formik.handleChange} />
                                                        {formik.errors.email ? (
                                                            <span className='error-text'>{formik.errors.email}</span>
                                                        ) : null}
                                                    </Form.Group>
                                                    <div className="d-grid gap-2 topBottom">
                                                        <Button
                                                            type="submit"
                                                            style={{
                                                                background: "#042B61",
                                                                borderColor: "#042B61",
                                                            }}
                                                        >
                                                            Registrar
                                                        </Button>
                                                    </div>
                                                </Form>
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
                            <Card.Header className="backgroundHeadCard">
                                <Row>
                                    <Col as="h6">Directivos</Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <DataTable
                                    columns={columns}
                                    data={filteredItems}
                                    noDataComponent="No hay registros"
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    progressPending={isLoading}
                                    progressComponent={<CustomLoader />}
                                    subHeader
                                    subHeaderComponent={searchComponent}
                                />
                                <DirectionEdit
                                    isOpenUpdate={isOpenUpdate}
                                    handleClose={() => setIsOpenUpdate(false)}
                                    setDirectives={setDirectives}
                                    {...values}
                                />
                                <DirectionDetails
                                    isOpenDetails={isOpenDetails}
                                    handleClose={() => setIsOpenDetails(false)}
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
