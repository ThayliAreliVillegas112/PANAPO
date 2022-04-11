import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../shared/plugins/alert";
import axios from "../../../shared/plugins/axios";


export const ClientEdit = ({
    isOpenUpdate,
    handleClose,
    setClients,
    phoneClient,
    emailClient,
    nameRepre,
    surnameRepre,
    secondSurnameRepre,
    phoneRepre,
    emailRepre,
    status
}) => {

    const [values, setValues] = useState({ phoneClient: phoneClient, emailClient: emailClient, nameRepre: nameRepre, surnameRepre: surnameRepre, secondSurnameRepre: secondSurnameRepre, phoneRepre: phoneRepre, emailRepre: emailRepre, status: status });

    // const handleChange = (event) =>{
    //   const { name, value } = event.target;
    //   setValues({ ...values, [name]: value});
    // }  

    // const handleSubmit = (event) =>{
    //   event.preventDefault();
    //   console.log(values);
    //   Alert.fire({
    //   title: titleConfirmacion,
    //   text: msjConfirmacion,
    //   confirmButtonText: "Aceptar",
    //   cancelButtonText: "Cancelar",
    //   showCancelButton: true,
    //   reverseButtons: true,
    //   showLoaderOnConfirm: true,
    //   icon: "warning",
    //   preConfirm: () => {
    //     return axios({
    //       url: "/category/",
    //       method: "PUT",
    //       data: JSON.stringify(values),
    //     })
    //       .then((response) => {
    //         console.log(response);
    //         if (!response.error) {
    //           setCategories((categories) => [
    //             ...categories.filter((it) => it.id !== values.id),
    //             values,
    //           ]);
    //           handleCloseForm();
    //           Alert.fire({
    //             title: titleExito,
    //             text: msjExito,
    //             icon: "success",
    //             confirmButtonText: "Aceptar",
    //           });
    //         }
    //         return response;
    //       })
    //       .catch((error) => {
    //         Alert.fire({
    //           title: titleError,
    //           confirmButtonColor: "#198754",
    //           text: msjError,
    //           icon: "error",
    //           confirmButtonText: "Aceptar",
    //         });
    //       });
    //   },
    //   backdrop: true,
    //   allowOutsideClick: !Alert.isLoading,
    //   });
    // };

    const handleCloseForm = () => {
        handleClose();
        setValues({});
    };

    useEffect(() => {
        setValues({
            phoneClient: phoneClient,
            emailClient: emailClient,
            nameRepre: nameRepre,
            surnameRepre: surnameRepre,
            secondSurnameRepre: secondSurnameRepre,
            phoneRepre: phoneRepre,
            emailRepre: emailRepre,
        });
    }, [phoneClient, emailClient, nameRepre, surnameRepre, secondSurnameRepre, phoneRepre, emailRepre]);

    return (
        <>
            <Modal show={isOpenUpdate} onHide={handleCloseForm}>
                <Modal.Header closeButton className="backgroundHeadModal" closeVariant="white">
                    <Modal.Title>Modificar datos del cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="row">
                        <Form.Group className="col-md-6" >
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control type="tel" placeholder="7778895412" value={values.phoneClient}/>
                        </Form.Group>
                        <Form.Group className="col-md-6" >
                            <Form.Label>Correo eléctronico</Form.Label>
                            <Form.Control type="email" placeholder="Email" value={values.emailClient} />
                        </Form.Group>
                        <br />
                        <Form.Group className="md-12 topBottom" >
                            <h5>Información del representante del cliente</h5>
                        </Form.Group>
                        <Form.Group className="col-md-4" >
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="María" value={values.nameRepre}/>
                        </Form.Group>
                        <Form.Group className="col-md-4" >
                            <Form.Label>Primer apellido</Form.Label>
                            <Form.Control type="text" placeholder="Valdez" value={values.surnameRepre} />
                        </Form.Group>
                        <Form.Group className="col-md-4" >
                            <Form.Label>Segundo apellido</Form.Label>
                            <Form.Control type="text" placeholder="Díaz" value={values.secondSurnameRepre}/>
                        </Form.Group>
                        <Form.Group className="col-md-6" >
                            <Form.Label>Teléfono</Form.Label>
                            <Form.Control type="tel" placeholder="Ejemplo: Díaz" value={values.phoneRepre}/>
                        </Form.Group>
                        <Form.Group className="col-md-6" >
                            <Form.Label>Correo eléctronico</Form.Label>
                            <Form.Control type="email" placeholder="Email" value={values.emailRepre}/>
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