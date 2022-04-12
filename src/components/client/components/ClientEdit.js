import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../shared/plugins/alert";
import axios from "../../../shared/plugins/axios";


export const ClientEdit = ({
    isOpenUpdate,
    handleClose,
    setClients,
    getClients,
    id,
    phoneClient,
    emailClient,
    nameRepre,
    surnameRepre,
    secondSurnameRepre,
    phoneRepre,
    emailRepre,
    status
}) => {

    const [values, setValues] = useState({
        id: id,
        phoneClient: phoneClient,
        emailClient: emailClient,
        nameRepre: nameRepre,
        surnameRepre: surnameRepre,
        secondSurnameRepre: secondSurnameRepre,
        phoneRepre: phoneRepre,
        emailRepre: emailRepre,
        status: status
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const cliente = {
            ...values
        };
        console.log(cliente);
        Alert.fire({
            title: titleConfirmacion,
            text: msjConfirmacion,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Cancelar",
            showCancelButton: true,
            reverseButtons: true,
            showLoaderOnConfirm: true,
            icon: "warning",
            preConfirm: () => {
                return axios({
                    url: "/client/",
                    method: "PUT",
                    data: JSON.stringify(cliente),
                })
                    .then((response) => {
                        console.log(response);
                        if (!response.error) {
                            handleCloseForm();
                            getClients();
                            handleCloseForm();
                            Alert.fire({
                                title: titleExito,
                                text: msjExito,
                                icon: "success",
                                confirmButtonText: "Aceptar",
                            });
                        }
                        return response;
                    })
                    .catch((error) => {
                        Alert.fire({
                            title: titleError,
                            confirmButtonColor: "#198754",
                            text: msjError,
                            icon: "error",
                            confirmButtonText: "Aceptar",
                        });
                    });
            },
            backdrop: true,
            allowOutsideClick: !Alert.isLoading,
        });
    };

    const handleCloseForm = () => {
        handleClose(false);
        setValues({});
    };

    useEffect(() => {
        setValues({
            id: id,
            status: status,
            phoneClient: phoneClient,
            emailClient: emailClient,
            nameRepre: nameRepre,
            surnameRepre: surnameRepre,
            secondSurnameRepre: secondSurnameRepre,
            phoneRepre: phoneRepre,
            emailRepre: emailRepre,
        });
    }, [id, status, phoneClient, emailClient, nameRepre, surnameRepre, secondSurnameRepre, phoneRepre, emailRepre]);

    return (
        <>
            <Modal show={isOpenUpdate} onHide={handleCloseForm}>
                <Modal.Header closeButton className="backgroundHeadModal" closeVariant="white">
                    <Modal.Title>Modificar datos del cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="row" onSubmit={handleSubmit}>
                        <Form.Group className="col-md-6" >
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control name="phoneClient" type="tel" placeholder="7778895412" value={values.phoneClient} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="col-md-6" >
                            <Form.Label>Correo eléctronico</Form.Label>
                            <Form.Control name="emailClient" type="email" placeholder="Email" value={values.emailClient} onChange={handleChange} />
                        </Form.Group>
                        <br />
                        <Form.Group className="md-12 topBottom" >
                            <h5>Información del representante del cliente</h5>
                        </Form.Group>
                        <Form.Group className="col-md-4" >
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control name="nameRepre" type="text" placeholder="María" value={values.nameRepre} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="col-md-4" >
                            <Form.Label>Primer apellido</Form.Label>
                            <Form.Control name="surnameRepre" type="text" placeholder="Valdez" value={values.surnameRepre} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="col-md-4" >
                            <Form.Label>Segundo apellido</Form.Label>
                            <Form.Control name="secondSurnameRepre" type="text" placeholder="Díaz" value={values.secondSurnameRepre} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="col-md-6" >
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control name="phoneRepre" type="tel" placeholder="" value={values.phoneRepre} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="col-md-6" >
                            <Form.Label>Correo eléctronico</Form.Label>
                            <Form.Control name="emailRepre" type="email" placeholder="Email" value={values.emailRepre} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group className="mb-4 topBottom">
                            <Row>
                                <Col className="text-end">
                                    <Button variant="secondary" type="button" onClick={handleCloseForm} >
                                        Cerrar
                                    </Button>
                                    <Button
                                        style={{ background: "#042B61", borderColor: "#042B61" }}
                                        className="ms-3"
                                        type="submit"
                                        disabled={false}
                                    >
                                        Guardar
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};