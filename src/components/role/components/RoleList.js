import React, { useState, useEffect } from "react";
import { Button, Row, Col, Container, Form, Card, Collapse } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import "../../../assets/css/main.css";
import "../../../assets/css/util.css";
import { RoleEdit } from "./RoleEdit";
import { CustomLoader } from "../../../shared/components/CustomLoader";
import { FilterComponent } from "../../../shared/components/FilterComponent";
import * as yup from "yup";
import { useFormik } from "formik";
import axios from "../../../shared/plugins/axios";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../shared/plugins/alert";


export const RoleList = () => {
    const [roles, setRoles] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [values, setValues] = useState({});
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);

    const filteredItems = roles.filter(
        (item) => item.description && item.description.toLowerCase().includes(filterText.toLowerCase()) || item.acronym && item.acronym.toLowerCase().includes(filterText.toLowerCase()) ,
    );

    
    const getRoles = () => {
        axios({ url: "/rol/", method: "GET" })
            .then((response) => {
                console.log(response);
                setRoles(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const formik = useFormik({
        initialValues: {
            acronym: "",
            description: ""
        },
        validationSchema: yup.object().shape({
            acronym: yup
                .string()
                .required("Campo obligatorio")
                .min(2, "Minimo 2 caracteres"),
            description: yup
                .string()
                .required("Campo obligatorio")
                .min(2, "Minimo 2 caracteres"),
        }),
        onSubmit: (values) => {
            const rol ={
                ...values
            };
            console.log(rol);
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
                    return axios({
                        url: "/rol/",
                        method: "POST",
                        data: JSON.stringify(rol)
                    })
                        .then((response) => {
                            console.log(response);
                            if (!response.error) {
                                getRoles();
                               
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
                        })
                        .catch((error) => {
                            console.log(error);
                            Alert.fire({
                                title: titleError,
                                text: msjError,
                                cancelButtonColor: "#198754",
                                icon: "error",
                                confirmButtonText: "Aceptar",
                            });
                        });
                },
                backdrop: true,
                allowOutsideClick: !Alert.isLoading,
            });
        },
    });


    const handleCloseForm = () => {
        formik.resetForm();
        setIsOpen(false);
    };

    useEffect(() => {
        setIsLoading(true);
        document.title = "PANAPO | Gestión de Roles";
        getRoles();
    }, []);

    const columns = [
        {
            name: <h6>#</h6>,
            cell: (row, index) => <h6>{index + 1}</h6>,
        },
        {
            name: <h6>Acrónimo</h6>,
            cell: (row) => <div className="txt4">{row.acronym}</div>,
        },
        {
            name: <h6>Rol</h6>,
            cell: (row) => <div className="txt4">{row.description}</div>,
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
        <div className="content-wrapper  screenHeight">
            <Container fluid >
                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="font-weight-bold">Gestión de roles</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <Row>
                <Col>
                    <Card>
                        <Card.Header onClick={() => setIsOpen(!isOpen)}
                            aria-controls="example-collapse-text"
                            aria-expanded={isOpen}
                            className="backgroundHeadCard"
                            type="button">
                            <Row>
                                <Col as="h6">Registrar roles</Col>
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
                                        <Form.Group className="col-md-6" >
                                            <Form.Label>Acrónimo</Form.Label>
                                            <Form.Control name="acronym" value={formik.values.acronym} onChange={formik.handleChange} type="text" placeholder="Ejemplo: Maria" />
                                            {formik.errors.acronym ? (
                                                <span className="text-danger">{formik.errors.acronym}</span>
                                            ) : null}
                                        </Form.Group>
                                        <Form.Group className="col-md-6" >
                                            <Form.Label>Nombre completo</Form.Label>
                                            <Form.Control name="description" value={formik.values.description} onChange={formik.handleChange} type="text" placeholder="Ejemplo: Maria" />
                                            {formik.errors.description ? (
                                                <span className="text-danger">{formik.errors.description}</span>
                                            ) : null}
                                        </Form.Group>
                                        <br />

                                        <div className="d-grid gap-2 topBottom">
                                            <Button type="submit" style={{ background: "#042B61", borderColor: "#042B61" }} size="lg" disabled={!(formik.isValid && formik.dirty)}>
                                                Registrar
                                            </Button>
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
                                <Col as="h6">Roles registrados</Col>
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
                            <RoleEdit
                                isOpenUpdate={isOpenUpdate}
                                handleClose={setIsOpenUpdate}
                                setRoles={setRoles}
                                getRoles={getRoles}
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