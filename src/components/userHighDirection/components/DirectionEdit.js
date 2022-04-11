import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../shared/plugins/alert";
import axios from "../../../shared/plugins/axios";

export const DirectionEdit = ({ 
  isOpenUpdate, 
  handleClose, 
  setDirective, 
  name,
  surname,
  lastname,
  status
}) => {

const [values, setValues] = useState({name: name, surname: surname, lastname: lastname});

const handleCloseForm = () =>{
    handleClose();
    setValues({});
  };

  useEffect(() => {
    setValues({
      name: name,
      surname: surname,
      lastname: lastname
    });
  }, [name, surname, lastname]);

return (
    <>
    <Modal show={isOpenUpdate} onHide={handleCloseForm}>
      <Modal.Header closeButton className="backgroundHeadModal" closeVariant="white">
        <Modal.Title>Modificar usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="row">
          <Form.Group className="col-md-6">
            <Form.Label className="form-label">Nombre</Form.Label>
            <Form.Control
              name="name"
              value={values.name}
            />
          </Form.Group>
          <Form.Group className="col-md-6">
            <Form.Label className="form-label">Primer apellido</Form.Label>
            <Form.Control
              name="name"
              value={values.surname}
            />
          </Form.Group>
          <Form.Group className="col-md-6 topBottom2">
            <Form.Label className="form-label">Segundo apellido</Form.Label>
            <Form.Control
              name="name"
              value={values.lastname}
            />
          </Form.Group>
          <Form.Group className="col-md-6 topBottom2">
            <Form.Label className="form-label">Correo</Form.Label>
            <Form.Control
              name="name"
              // value={values.name}
            />
          </Form.Group>
          <Form.Group className="mb-4 topBottom">
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
        </Form>
      </Modal.Body>
    </Modal>
    </>
  );
};