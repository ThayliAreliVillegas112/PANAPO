import React, { useState, useEffect } from "react";
import { Button, Row, Col, Container, Form, Card, InputGroup, FormControl, Collapse } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import "../../../assets/css/main.css";
import "../../../assets/css/util.css";
import { PersonalDetails } from "./PersonalDetails";
import { PersonalEdit } from "./PersonalEdit"
import { CustomLoader } from "../../../shared/components/CustomLoader";
import { FilterComponent } from "../../../shared/components/FilterComponent";
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup";
import axios from "../../../shared/plugins/axios";
import { useFormik } from "formik";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../shared/plugins/alert";

export const PersonalList = () => {
    const [personal, setPersonal] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [values, setValues] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [isOpenDetails, setIsOpenDetails] = useState(false);

    const filteredItems = personal.filter(
        (item) => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()) || 
            item.surname && item.surname.toLowerCase().includes(filterText.toLowerCase()) ||
            item.secondSurname && item.secondSurname.toLowerCase().includes(filterText.toLowerCase())
    );

    //Obtener todos los registros
    const getPersonal = () => {
        axios({ url: "/person/", method: "GET"})
            .then((response) => {
                //filtrar que no aparezcan los directivos
                let data = response.data;
                let personalTemp = data.filter(item => item.profession.description != "Directivo")

                

                setPersonal(personalTemp);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    //consultar las profesiones (se hace en el front directamente)
    const formik = useFormik({
        initialValues: {
            name: "",
            surname: "",
            secondSurname: "",
            email: "",
            dateBirth: "",
            phone: "",
            profession: 1,
        },
        validationSchema: yup.object().shape({
            name: yup.string().required("Campo obligatorio"),
            surname: yup.string().required("Campo obligatorio"),
            secondSurname: yup.string().required("Campo obligatorio"),
            email: yup.string().email("Ingresa un correo correcto").required("Campo obligatorio"),
            dateBirth: yup.string().required("Campo obligatorio"),
            phone: yup.string().required("Campo obligatorio"),
            profession: yup.number().required("Campo obligatorio"),
        }),
        onSubmit: (values) => {
            const person = {
                ...values,
                profession: {
                    id: parseInt(values.profession)
                },
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
                                getPersonal();
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
        getPersonal();
    }, []);

    const columns = [
        {
            name: <h6>#</h6>,
            cell: (row, index) => <div><h6>{index + 1}</h6></div>,
            width: "4%"
        },
        {
            name: <h6>Nombre</h6>,
            cell: (row) => <div className="txt4">{row.name + " "} {row.surname + " "} {row.secondSurname}</div>,
        },
        {
            name: <h6>Correo</h6>,
            cell: (row) => <div className="txt4">{row.email}</div>,
        },
        {
            name: <div><h6>Detalles</h6></div>,
            cell: (row) => <div>
                <Button variant="primary" size="md"
                    onClick={() => {
                        setValues({...row,
                            "profession": row.profession.description
                        })
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
                        setValues({...row,
                            "profession": row.profession.description
                        })
                        setIsOpenUpdate(true)
                    }}>
                    <FeatherIcon icon="edit" />
                </Button>
            </div>
        },
        {
            name: <div><h6>Desactivar</h6></div>,
            cell: (row) => <div>
                <Button variant="danger" size="md"
                    onClick={() => {
                        setValues(row)
                    }}>
                    <FeatherIcon icon="slash" />
                </Button>
            </div>

        }
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
                                <h1 class="font-weight-bold">Gestión de personal</h1>
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
                                    <Col as="h6">Registrar personal</Col>
                                    <Col className="text-end">
                                        <Col>
                                            {isOpen ? (
                                                <FeatherIcon icon="minus" onClick={() => setIsOpen(!isOpen)}
                                                    aria-controls="example-collapse-text"
                                                    aria-expanded={isOpen} />
                                            ) : (
                                                <FeatherIcon icon="plus" onClick={() => setIsOpen(!isOpen)}
                                                    aria-controls="example-collapse-text"
                                                    aria-expanded={isOpen} />
                                            )}
                                        </Col>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Collapse in={isOpen}>
                                <div id="example-collapse-text">
                                    <Card.Body>
                                        <Form className="row" onSubmit={formik.handleSubmit}>
                                            <Form.Group className="col-md-4" >
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control type="text" name="name" value={formik.values.name}
                                                    onChange={formik.handleChange} />
                                                {formik.errors.name ? (
                                                    <span className='error-text'>{formik.errors.name}</span>
                                                ) : null}
                                            </Form.Group>
                                            <Form.Group className="col-md-4" >
                                                <Form.Label>Primer apellido</Form.Label>
                                                <Form.Control type="text" name="surname" value={formik.values.surname}
                                                    onChange={formik.handleChange} />
                                                {formik.errors.surname ? (
                                                    <span className='error-text'>{formik.errors.surname}</span>
                                                ) : null}
                                            </Form.Group>
                                            <Form.Group className="col-md-4" >
                                                <Form.Label>Segundo apellido</Form.Label>
                                                <Form.Control type="text" name="secondSurname" value={formik.values.secondSurname}
                                                    onChange={formik.handleChange} />
                                                {formik.errors.secondSurname ? (
                                                    <span className='error-text'>{formik.errors.secondSurname}</span>
                                                ) : null}
                                            </Form.Group>
                                            <Form.Group className="col-md-6" >
                                                <Form.Label>Fecha de nacimiento</Form.Label>
                                                <Form.Control type="date" name="dateBirth" value={formik.values.dateBirth}
                                                    onChange={formik.handleChange} />
                                                {formik.errors.dateBirth ? (
                                                    <span className='error-text'>{formik.errors.dateBirth}</span>
                                                ) : null}
                                            </Form.Group>
                                            <Form.Group className="col-md-6 mb-4" >
                                                <Form.Label>Correo eléctronico</Form.Label>
                                                <Form.Control type="email" name="email" value={formik.values.email}
                                                    onChange={formik.handleChange} />
                                                {formik.errors.email ? (
                                                    <span className='error-text'>{formik.errors.email}</span>
                                                ) : null}
                                            </Form.Group>
                                            <Form.Group className="col-md-6 mb-4" >
                                                <Form.Label>Teléfono</Form.Label>
                                                <Form.Control type="tel" name="phone" value={formik.values.phone}
                                                    onChange={formik.handleChange} />
                                                {formik.errors.phone ? (
                                                    <span className='error-text'>{formik.errors.phone}</span>
                                                ) : null}
                                            </Form.Group>
                                            <Form.Group className="col-md-6 mb-4" >
                                                <Form.Label>Rol</Form.Label>
                                                <Form.Select aria-label="Seleccionar rol" name="profession"
                                                    value={formik.values.profession}
                                                    onChange={formik.handleChange}>

                                                    <option value="">Seleccione una opción</option>
                                                    <option value="1">Docente</option>
                                                    <option value="2">Becario</option>
                                                </Form.Select>
                                                {formik.errors.profession ? (
                                                    <span className='error-text'>{formik.errors.profession}</span>
                                                ) : null}
                                            </Form.Group>
                                            <div className="d-grid gap-2">
                                                <Button type="submit" style={{ background: "#042B61", borderColor: "#042B61" }} size="lg"
                                                    disabled={!(formik.isValid && formik.dirty)}>
                                                    Registrar
                                                </Button>
                                                {/* <Button type="submit" className="button-style" size="lg">Registrar</Button> */}
                                            </div>
                                        </Form>
                                    </Card.Body>
                                </div>
                            </Collapse>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Card>
                            <Card.Header
                                className="backgroundHeadCard">
                                <Row>
                                    <Col as="h6">Personal registrado</Col>
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
                                <PersonalEdit
                                    isOpenUpdate={isOpenUpdate}
                                    handleClose={() => setIsOpenUpdate(false)}
                                    setPersonal={setPersonal}
                                    {...values}
                                />
                                <PersonalDetails
                                    isOpenDetails={isOpenDetails}
                                    handleClose={setIsOpenDetails}
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