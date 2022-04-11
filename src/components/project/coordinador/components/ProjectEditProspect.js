import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Card, Collapse } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../../shared/plugins/alert";
import axios from "../../../../shared/plugins/axios";

export const ProjectEditProspect = ({
  isOpenUpdate,
  handleClose,
  setProjectsProspect,
  name,
  status
}) => {

  const [isOpenData, setIsOpenData] = useState(false);
  const [isOpenClient, setIsOpenClient] = useState(false);
  const [values, setValues] = useState({ name: name, status: status });

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
      name: name
    });
  }, [name]);

  return (
    <>
      <Modal show={isOpenUpdate} onHide={handleCloseForm} size="lg">
        <Modal.Header closeButton className="backgroundHeadModal" closeVariant="white">
          <Modal.Title>Modificar proyecto prospecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                        <small></small>
                      </Form.Group>
                      <Form.Group className="col-md-6 mb-4" >
                        <Form.Label>Ciclo del proyecto</Form.Label>
                        <Form.Control type="number" readOnly placeholder="2" />
                      </Form.Group>
                      <Form.Group className="col-md-6 mb-4" >
                        <Form.Label>Nombre del proyecto</Form.Label>
                        <Form.Control type="text" value={values.name}/>
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
                    <Form className="row">
                      <Form.Group className="col-md-6" >
                        <Form.Label>Proyecto anterior</Form.Label>
                        <Form.Control type="text" />
                      </Form.Group>
                      <Form.Group className="col-md-6" >
                        <Form.Label>Ciclo</Form.Label>
                        <Form.Control type="text" />
                      </Form.Group>
                    </Form>
                  </Card.Body>
                </div>
              </Collapse>
            </Card>

            <Form.Group className="mb-4">
              <Row>
                <Col className="text-end">
                  <Button variant="secondary" type="button" onClick={handleCloseForm}>
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
        </Modal.Body>
      </Modal>
    </>
  );
};