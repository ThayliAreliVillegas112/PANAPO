import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import Alert, {
    msjConfirmacion,
    titleConfirmacion,
    titleError,
    msjError,
    msjExito,
    titleExito,
} from "../../../shared/plugins/alert";
import axios from "../../../shared/plugins/axios";

export const PersonalEdit = ({
    isOpenUpdate,
    handleClose,
    setPersonal,
    id,
    name,
    surname,
    secondSurname,
    email,
    dateBirth,
    phone,
    profession,
    status,
}) => {
    const [values, setValues] = useState({
        id: id,
        name: name,
        surname: surname,
        secondSurname: secondSurname,
        email: email,
        dateBirth: dateBirth,
        phone: phone,
        profession: profession,
        status: status,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues({ ...values, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(values);
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
                    url: "/person/",
                    method: "PUT",
                    data: JSON.stringify(values),
                })
                    .then((response) => {
                        console.log(response);
                        if (!response.error) {
                            setPersonal((personal) => [
                                ...personal.filter((it) => it.id !== values.id),
                                values,
                            ]);
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
        handleClose();
        setValues({});
    };

    useEffect(() => {
        setValues({
            id: id,
            name: name,
            surname: surname,
            secondSurname: secondSurname,
            email: email,
            dateBirth: dateBirth,
            phone: phone,
            profession: profession,
            status: status,
        });
    }, [id, name, surname, secondSurname, email, dateBirth, phone, profession, status]);

    return (
        <>
            <Modal show={isOpenUpdate} onHide={handleCloseForm}>
                <Modal.Header
                    closeButton
                    className="backgroundHeadModal"
                    closeVariant="white"
                >
                    <Modal.Title>Modificar datos del personal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="row" onSubmit={handleSubmit}>
                        <Form.Group className="col-md-4">
                            <Form.Label className="form-label">Nombre</Form.Label>
                            <Form.Control
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                            />
                            {/* {formik.errors.description ? (
                                     <span className="error-text">{formik.errors.description}</span>
                                 ) : null} */}
                        </Form.Group>
                        <Form.Group className="col-md-4">
                            <Form.Label className="form-label">Primer apellido</Form.Label>
                            <Form.Control
                                name="surname"
                                value={values.surname}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="col-md-4">
                            <Form.Label className="form-label">Segundo apellido</Form.Label>
                            <Form.Control
                                name="secondSurname"
                                value={values.secondSurname}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="col-md-6 topBottom">
                            <Form.Label className="form-label">Fecha de nacimiento</Form.Label>
                            <Form.Control
                                type="date"
                                name="dateBirth"
                                value={values.dateBirth}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="col-md-6 topBottom">
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control
                                type="tel"
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="col-md-6 topBottom">
                            <Form.Label>Rol</Form.Label>
                            <Form.Select aria-label="Seleccionar una opción" name="profession">
                                <option>Seleccione una opción</option>
                                <option value="1">Docente</option>
                                <option value="2">Becario</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-4 topBottom">
                            <Row>
                                <Col className="text-end">
                                    <Button
                                        variant="secondary"
                                        type="button"
                                        onClick={handleCloseForm}
                                    >
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

