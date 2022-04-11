import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../../shared/plugins/alert";
import axios from "../../../../shared/plugins/axios";

export const ProjectDetailsProspect = ({ 
    isOpenDetails, 
  handleClose, 
  setProjectsProspect, 
  name,
  status
}) => {

    const [values, setValues] = useState({name: name, status: status});

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

    const handleCloseForm = () =>{
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
      <Modal show={isOpenDetails} onHide={handleCloseForm}>
        <Modal.Header closeButton className="backgroundHeadModal" closeVariant="white">
          <Modal.Title>Detalles del proyecto prospecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-4">
              <Form.Label className="form-label">Nombre</Form.Label>
              <Form.Control
                name="name"
                placeholder="Nombre del proyecto"
                value={values.name}
                readOnly
              />
              {/* {formik.errors.description ? (
                <span className="error-text">{formik.errors.description}</span>
              ) : null} */}
            </Form.Group>
            <Form.Group className="mb-4">
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