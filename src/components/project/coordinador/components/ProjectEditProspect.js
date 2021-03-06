import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Card, Collapse } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../../shared/plugins/alert";
import axios from "../../../../shared/plugins/axios";
import * as yup from "yup";
import { useFormik } from "formik";

export const ProjectEditProspect = ({
  isOpenUpdateP,
  handleClose,
  getProspectProject,
  id,
  cotizacion,
  description,
  months,
  name,
  numberBeca,
  client,
  project,
  statusProject,
  priceClient,
  status
}) => {

  const [values, setValues] = useState({
    id: id,
    cotizacion: cotizacion,
    description: description,
    months: months,
    name: name,
    numberBeca: numberBeca,
    client: client,
    project: project,
    statusProject: statusProject,
    priceClient: priceClient,
    status: status
  });
  const [isOpenData, setIsOpenData] = useState(false);
  const [isOpenClient, setIsOpenClient] = useState(false);
  const [clients, setClients] = useState([]);
  const [projectsProspect, setProjectsProspect] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenCotizacion, setIsOpenCotizacion] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }


  const formikModify = useFormik({
    initialValues: {
      cotizacion: "",
      description: "",
      months: "",
      name: "",
      numberBeca: "",
      client: "",
      project: "",
      priceClient: "",
    },
    validationSchema: yup.object().shape({
      cotizacion: yup.number().required("Campo obligatorio"),
      description: yup.string().required("Campo obligatorio"),
      months: yup.number().required("Campo obligatorio"),
      name: yup.string().required("Campo obligatorio"),
      numberBeca: yup.number().required("Campo obligatorio"),
      client: yup.string(),
      project: yup.string().nullable(),
      priceClient: yup.number().required("Campo obligatorio"),
    }),
    onSubmit: (valuesFormik) => {
      if (valuesFormik.project !== "" && valuesFormik.project !== 0) {

        const prospect = {
          ...valuesFormik,
          id: id,
          client: {
            id: parseInt(valuesFormik.client),
          },
          project: {
              id: parseInt(valuesFormik.project),
          }  
        };
        console.log(prospect);
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
              url: "/project/",
              method: "PUT",
              data: JSON.stringify(prospect),
            })
              .then((response) => {
                console.log(response);
                if (!response.error) {
                  handleCloseForm();
                  getProspectProject();
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
      } else if (valuesFormik.project === "" && valuesFormik.project === 0) {
        if(valuesFormik.project === null){
          project = "No aplica"
        }
        const prospect = {
          ...valuesFormik,
          id: id,
          client: {
            id: parseInt(valuesFormik.client),
          },
          // project: {
          //     id: parseInt(valuesFormik.project),
          // }  
        };
        console.log(prospect);
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
              url: "/project/",
              method: "PUT",
              data: JSON.stringify(prospect),
            })
              .then((response) => {
                console.log(response);
                if (!response.error) {
                  handleCloseForm();
                  getProspectProject();
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
      }

    },
  });

  const getClients = () => {
    axios({ url: "/client/", method: "GET" })
        .then((response) => {
            console.log(response);
            setClients(response.data);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
        });
  };

  
  const getProjects = () => {
    axios({ url: "/project/", method: "GET" })
      .then((response) => {
        let data = response.data;
        let prospectTemp = data.filter(item => item.statusProject.description === "Cancelado" || item.statusProject.description === "Cerrado")
        setProjectsProspect(prospectTemp);
        setIsLoading(false);

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseForm = () => {
    formikModify.resetForm();
    setValues({});
    handleClose(false);
  };

  useEffect(() => {
    setValues({
      id: id,
      cotizacion: cotizacion,
      description: description,
      months: months,
      name: name,
      numberBeca: numberBeca,
      client: client,
      project: project,
      statusProject: statusProject,
      priceClient: priceClient,
      status: status
    });
    formikModify.values.cotizacion = cotizacion;
    formikModify.values.description = description;
    formikModify.values.months = months;
    formikModify.values.name = name;
    formikModify.values.numberBeca = numberBeca;
    formikModify.values.client = client;
    formikModify.values.project = project;
    formikModify.values.statusProject = statusProject;
    formikModify.values.priceClient = priceClient;
    getProjects();
    
  
    getClients();
  }, [isOpenUpdateP]);

  return (
    <>
      <Modal show={isOpenUpdateP} onHide={handleCloseForm} size="lg">
        <Modal.Header closeButton className="backgroundHeadModal" closeVariant="white">
          <Modal.Title>Modificar datos del proyecto prospecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* DATOS DEL PROYECTO */}
          <Form onSubmit={formikModify.handleSubmit}>
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
                    <div className="row">
                      <Form.Group className="col-md-6" >
                        <Form.Label>Proyecto anterior</Form.Label>
                        <Form.Select name="project" value={formikModify.values.project} onChange={formikModify.handleChange}>
                          <option>Seleccione una opci??n</option>
                          {
                            projectsProspect.map((proyectos) => (
                              <option key={proyectos.id} value={proyectos.id} >{proyectos.acronym}</option>
                            ))
                          }
                        </Form.Select>
                        {formikModify.errors.project ? (
                          <span className="text-danger">{formikModify.errors.project}</span>
                        ) : null}
                      </Form.Group>
                      <Form.Group className="col-md-6" >
                        <Form.Label>Ciclo del proyecto</Form.Label>
                        <Form.Control name="" onChange={handleChange} type="text" placeholder="0" readOnly />
                      </Form.Group>
                      <Form.Group className="col-md-6" >
                        <Form.Label>Identificador</Form.Label>
                        <Form.Control name="name" value={formikModify.values.name} onChange={formikModify.handleChange} type="text" />
                        {formikModify.errors.name ? (
                          <span className='text-danger'>{formikModify.errors.name}</span>
                        ) : null}
                      </Form.Group>
                      <Form.Group className="col-md-6 mb-6" >
                        <Form.Label>Estado del proyecto</Form.Label>
                        <Form.Control name="statusProject" value={formikModify.values.statusProject?.description} onChange={formikModify.handleChange} type="text" disabled />
                        {formikModify.errors.statusProject ? (
                          <span className='text-danger'>{formikModify.errors.statusProject}</span>
                        ) : null}
                      </Form.Group>
                      <Form.Group className="col-md-12" >
                        <Form.Label>Descripci??n del proyecto</Form.Label>
                        <Form.Control name="description" value={formikModify.values.description} onChange={formikModify.handleChange} as="textarea" />
                        {formikModify.errors.description ? (
                          <span className='text-danger'>{formikModify.errors.description}</span>
                        ) : null}
                      </Form.Group>
                    </div>
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
                  <Col as="h6" className="text-bold">Cliente</Col>
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
                    <div className="row">
                      <Form.Group className="col-md-6"  >
                      <Form.Select name="client"  value={formikModify.values.client} onChange={formikModify.handleChange}>
                          <option>Seleccione una opci??n</option>
                          {
                            clients.map((cliente) => (
                              <option key={cliente.id}  value={cliente.id}>{cliente.name+ " "+ cliente.surname+" "+cliente.secondSurname}</option>
                            ))
                          }
                        </Form.Select>
                        {/* <Form.Control name="client" value={formikModify.values.client?.name} onChange={formikModify.handleChange} type="text" /> */}
                        {formikModify.errors.client ? (
                          <span className='text-danger'>{formikModify.errors.client}</span>
                        ) : null}
                      </Form.Group>
                    </div>
                  </Card.Body>
                </div>
              </Collapse>
            </Card>
            {/* COTIZACION */}
            <Card className="mb-3" bg="white">
              <Card.Header onClick={() => setIsOpenCotizacion(!isOpenCotizacion)}
                aria-controls="example-collapse-text"
                aria-expanded={isOpenCotizacion}
                type="button">
                <Row>
                  <Col as="h6" className="text-bold">Cotizaci??n</Col>
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
              <Collapse in={isOpenCotizacion}>
                <div id="example-collapse-text">
                  <Card.Body>
                    <div className="row">
                      <Form.Group className="col-md-6" >
                        <Form.Label>Presupuesto</Form.Label>
                        <Form.Control name="cotizacion" value={formikModify.values.cotizacion} onChange={formikModify.handleChange} type="text" />
                        {formikModify.errors.cotizacion ? (
                          <span className='text-danger'>{formikModify.errors.cotizacion}</span>
                        ) : null}
                      </Form.Group>
                      <Form.Group className="col-md-6" >
                        <Form.Label>Precio al cliente</Form.Label>
                        <Form.Control name="priceClient" value={formikModify.values.priceClient} onChange={formikModify.handleChange} type="text" />
                        {formikModify.errors.priceClient ? (
                          <span className='text-danger'>{formikModify.errors.priceClient}</span>
                        ) : null}
                      </Form.Group>
                      <Form.Group className="col-md-6" >
                        <Form.Label>Tiempo estimado (meses)</Form.Label>
                        <Form.Control name="months" value={formikModify.values.months} onChange={formikModify.handleChange} type="text" />
                        {formikModify.errors.months ? (
                          <span className='text-danger'>{formikModify.errors.months}</span>
                        ) : null}
                      </Form.Group>
                      <Form.Group className="col-md-6" >
                        <Form.Label>Cantidad de becarios</Form.Label>
                        <Form.Control name="numberBeca" value={formikModify.values.numberBeca} onChange={formikModify.handleChange} type="text" />
                        {formikModify.errors.numberBeca ? (
                          <span className='text-danger'>{formikModify.errors.numberBeca}</span>
                        ) : null}
                      </Form.Group>
                    </div>
                  </Card.Body>
                </div>
              </Collapse>
            </Card>
            <Form.Group className="mb-4 mt-3">
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
                    disabled={!(formikModify.isValid && formikModify.dirty)}
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