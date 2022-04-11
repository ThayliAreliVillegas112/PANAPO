import React, { useState, useEffect } from "react";
import FeatherIcon from "feather-icons-react";
import { useNavigate } from "react-router-dom";
import {Button,Card,Col,Collapse,Container,Form,Row} from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import axios from "../../../shared/plugins/axios";
import { FilterComponent } from "../../../shared/components/FilterComponent";
import { CustomLoader } from "../../../shared/components/CustomLoader";
import { UserEdit } from "./UserEdit";
import { UserDetails } from "./UserDetails";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../shared/plugins/alert";


export const UserList = ({ handleClose }) => {

    let value = "";

    const navigation = useNavigate();

    const [filterText, setFilterText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [users, setUsers] = useState([]);
    const [person, setPerson] = useState([]);
    const [values, setValues] = useState({});

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    const [isOpenDetails, setIsOpenDetails] = useState(false);

    const setValue = (id) => {
        value = id;
    };

    useEffect(() => {
        setIsLoading(true);
        document.title = "PANAPO | Gestión de usuarios";
        getUser();
    }, []);

    const columns = [
        {
            name: <h6 >#</h6>,
            cell: (row, index) => <div><h6>{index + 1}</h6></div>,
            width: "4%"
        },
        {
            name: <h6 className="text-center">Nombre del Usuario</h6>,
            cell: (row) => <div className="txt4">{row.name + " "}{row.surname + " "}{row.lastname}</div>,
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
                            setValues(row);
                            setIsOpenUpdate(true);
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
                    <h6>Desactivar</h6>
                </div>
            ),
            cell: (row) => (
                <div>
                    <Button
                        variant="danger"
                        size="md"
                        onClick={() => {
                            setValues(row);
                            setIsOpenDelete(true);
                        }}
                    >
                        <FeatherIcon icon="slash" />
                    </Button>
                </div>
            ),
        },
    ];

    const getPerson = () => {
        axios({ url: "/person/", method: "GET" })
            .then((response) => {
                console.log(response);

                setPerson(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getUser = () => {
        axios({ url: "/user/", method: "GET" })
            .then((response) => {
                console.log(response);
                setUsers(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
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
        };
        return (
            <FilterComponent
                filterText={filterText}
                onFilter={(e) => setFilterText(e.target.value)}
                onSearch={search}
            />
        );
    }, [filterText]);

    const formik = useFormik({
        initialValues: {
            
            typeClient: 1

        },
        validationSchema: yup.object().shape({
           
            typeClient: yup
                .number()
                .required("Campo obligatorio")

        }),
        onSubmit: (values) => {
            const cliente = {
                ...values,
                typeClient: {
                    id: parseInt(values.typeClient)
                },
            };
            console.log(cliente);
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
                        url: "/client/",
                        method: "POST",
                        data: JSON.stringify(cliente),
                    })
                        .then((response) => {
                            console.log(response);
                            if (!response.error) {
                                // getClients();

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
        handleClose(false);
        
    };

    return (
        <div className="content-wrapper screenHeight">
            <Container fluid>
                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="font-weight-bold">Gestión de usuarios</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <Row>
                    <Col>
                        <Card className="mb-0">
                            <Card.Header
                                onClick={() => setIsOpen(!isOpen)}
                                aria-controls="example-collapse-text"
                                aria-expanded={isOpen}
                                className="backgroundHeadCard"
                                type="button"
                            >
                                <Row>
                                    <Col as="h6">Registrar Usuario</Col>
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
                                <Container fluid>
                                    <Card.Body>
                                        <div id="example-collapse-text">
                                            <Form className="row">
                                                <Form.Group className="col-md-6 mb-4" >
                                                    <Form.Label>Rol</Form.Label>
                                                    <Form.Select aria-label="Default select example">
                                                        <option value="1">Directivo</option>
                                                        <option value="1">Coordinador</option>
                                                        <option value="2">Responsable de proyecto</option>
                                                        <option value="3">Responsable de desarrollo</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Form.Group className="col-md-6 mb-4" >
                                                    <Form.Label>Correo</Form.Label>
                                                    <Form.Select aria-label="Default select example">
                                                        <option value="1">miri@gmail.com</option>
                                                        <option value="1">roy@gmail.com</option>
                                                        <option value="2">hola@gmail.com</option>
                                                    </Form.Select>
                                                </Form.Group>
                                            </Form>
                                        </div>
                                        <br />
                                        <div className="d-grid gap-2">
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
                                    </Card.Body>
                                </Container>

                            </Collapse>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Card>
                            <Card.Header className="backgroundHeadCard">
                                <Row>
                                    <Col as="h6">Usuarios Registrados</Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <DataTable
                                    columns={columns}
                                    data={users}
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    progressPending={isLoading}
                                    progressComponent={<CustomLoader />}
                                    subHeader
                                    subHeaderComponent={searchComponent}
                                />
                                <UserEdit
                                    isOpenUpdate={isOpenUpdate}
                                    handleClose={() => setIsOpenUpdate(false)}
                                    setUsers={setUsers}
                                    {...values}
                                />
                                <UserDetails
                                    isOpenDetails={isOpenDetails}
                                    handleClose={() => setIsOpenDetails(false)}
                                    setUsers={setUsers}
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
