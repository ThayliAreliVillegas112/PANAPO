import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../shared/plugins/alert";
import axios from "../../../shared/plugins/axios";
import { Link, useNavigate } from 'react-router-dom';

export const PersonalDetails = ({
    isOpenDetails,
    handleClose,
    id,
    name,
    surname,
    secondSurname,
    email,
    profession,
    status
}) => {
    const [values, setValues] = useState({
        id: id,
        name: name,
        surname: surname,
        secondSurname: secondSurname,
        email: email,
        profession: profession,
        status: status,
    });

    const handleChange = (event) =>{
      const { name, value } = event.target;
      setValues({ ...values, [name]: value});
    }  

    const handleCloseForm = () => {
        handleClose(false);
        setValues({});
    };

    useEffect(() => {
        setValues({
            id: id,
            name: name,
            surname: surname,
            secondSurname: secondSurname,
            email: email,
            profession: profession,
            status: status,
        });
    }, [id, name, surname, secondSurname, email, profession, status]);
    return (
        <>
            <Modal show={isOpenDetails} onHide={handleCloseForm}>
                <Modal.Header closeButton className="backgroundHeadModal" closeVariant="white">
                    <Modal.Title>Detalles del personal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="row">
                        <Form.Group className="col-md-4">
                            <Form.Label className="form-label">Nombre</Form.Label>
                            <Form.Control
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="col-md-4">
                            <Form.Label className="form-label">Primer apellido</Form.Label>
                            <Form.Control
                                name="surname"
                                value={values.surname}
                                onChange={handleChange}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="col-md-4">
                            <Form.Label className="form-label">Segundo apellido</Form.Label>
                            <Form.Control
                                name="secondSurname"
                                value={values.secondSurname}
                                onChange={handleChange}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="col-md-6 topBottom">
                            <Form.Label className="form-label">Correo</Form.Label>
                            <Form.Control
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                readOnly
                            />
                        </Form.Group>
                        {/* <Form.Group className="col-md-6 topBottom">
                            <Form.Label className="form-label">Fecha de nacimiento</Form.Label>
                            <Form.Control
                                name="dateBirth"
                                value={values.dateBirth}
                                onChange={handleChange}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="col-md-6 topBottom">
                            <Form.Label className="form-label">Teléfono</Form.Label>
                            <Form.Control
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                readOnly
                            />
                        </Form.Group> */}
                        <Form.Group className="col-md-6 topBottom">
                            <Form.Label>Rol</Form.Label>
                            <Form.Control
                                name="profession"
                                value={values.profession}
                                onChange={handleChange}
                                readOnly
                            />
                        </Form.Group>
                        <Form.Group className="mb-4 topBottom">
                            <Row>
                                <Col className="text-end">
                                    <Button variant="secondary" type="button" onClick={handleCloseForm}>
                                        Cerrar
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