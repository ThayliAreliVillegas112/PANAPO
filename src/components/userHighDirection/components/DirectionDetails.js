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

export const DirectionDetails = ({
  isOpenDetails,
  handleClose,
  setDirective,
  name,
  surname,
  lastname,
  status,
}) => {
  const [values, setValues] = useState({ name: name, surname: surname, lastname: lastname });

  const handleCloseForm = () => {
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
      <Modal show={isOpenDetails} onHide={handleCloseForm}>
        <Modal.Header
          closeButton
          className="backgroundHeadModal"
          closeVariant="white"
        >
          <Modal.Title>Detalles del usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="row">
            <Form.Group className="col-md-6">
              <Form.Label className="form-label">Nombre</Form.Label>
              <Form.Control
                name="name"
                placeholder="María"
                value={values.name}
                readOnly
              />
            </Form.Group>
            <Form.Group className="col-md-6">
              <Form.Label className="form-label">Primer apellido</Form.Label>
              <Form.Control
                name="name"
                placeholder="Solis"
                value={values.surname}
                readOnly
              />
            </Form.Group>
            <Form.Group className="col-md-6 topBottom2">
              <Form.Label className="form-label">Segundo apellido</Form.Label>
              <Form.Control
                name="name"
                placeholder="Bustamante"
                value={values.lastname}
                readOnly
              />
            </Form.Group>
            <Form.Group className="col-md-6 topBottom2">
              <Form.Label className="form-label">Correo</Form.Label>
              <Form.Control
                name="name"
                placeholder="ejemplo@gmail.com"
               
                readOnly
              />
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
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
