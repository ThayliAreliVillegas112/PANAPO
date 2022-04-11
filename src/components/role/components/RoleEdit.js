import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../shared/plugins/alert";
import axios from "../../../shared/plugins/axios";

export const RoleEdit = ({
  isOpenUpdate,
  handleClose,
  setRoles,
  id,
  acronym,
  description,
  status
}) => {

  const [values, setValues] = useState({ 
    description: description, 
    acronym: acronym, 
    status: status
   });

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
      acronym: acronym,
      description: description
    });
  }, [acronym, description]);

  return (
    <>
      <Modal show={isOpenUpdate} onHide={handleCloseForm}>
        <Modal.Header closeButton className="backgroundHeadModal" closeVariant="white">
          <Modal.Title>Modificar rol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="col-md-12" >
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="María" value={values.description} />
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