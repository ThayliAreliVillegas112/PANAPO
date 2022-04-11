import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../shared/plugins/alert";
import axios from "../../../shared/plugins/axios";

export const RoleEdit = ({
  isOpenUpdate,
  handleClose,
  setRoles,
  getRoles,
  id,
  acronym,
  description,
  status
}) => {

  const [values, setValues] = useState({ 
    id: id,
    acronym: acronym, 
    description: description, 
    status: status
   });

  const handleChange = (event) =>{
    const { name, value } = event.target;
    setValues({ ...values, [name]: value});
  }  

  const handleSubmit = (event) =>{
    event.preventDefault();
    
    const rol ={
      ...values
    }
    console.log(rol);
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
        url: "/rol/",
        method: "PUT",
        data: JSON.stringify(rol),
      })
        .then((response) => {
          console.log(response);
          if (!response.error) {
            handleCloseForm();
            getRoles();
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
      acronym: acronym,
      description: description
    });
  }, [id, status, acronym, description]);

  return (
    <>
      <Modal show={isOpenUpdate} onHide={handleCloseForm}>
        <Modal.Header closeButton className="backgroundHeadModal" closeVariant="white">
          <Modal.Title>Modificar rol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="col-md-12" >
              <Form.Label>Description</Form.Label>
              <Form.Control name="description" type="text" placeholder="" value={values.description} onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-4">
              <Row className="topBottom">
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