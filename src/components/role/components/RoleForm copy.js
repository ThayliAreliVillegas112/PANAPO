import React, { useState } from "react";
import { Button, Row, Col, Container, Form, Card, InputGroup, FormControl } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import "../../../assets/css/main.css";
import "../../../assets/css/util.css";
import { Accordion } from "react-bootstrap";
import { FilterComponent } from "../../../shared/components/FilterComponent";

export const RoleForm = () => {
    const [filterText, setFilterText] = useState("");

    const searchComponent = React.useMemo(() => {
        const clear = () => {
            if (filterText) {
                setFilterText("");
            }
        }
        return <FilterComponent filterText={filterText} onFilter={e => setFilterText(e.target.value)} onClear={clear} />
    }, [filterText]);

    return (
        <Container fluid>
            <Row className="mt-5 contact100-form2">
            <h3 className="titleScreen">Gestión de roles</h3>
            <Col>
                <Accordion accordioncolor="">
                    <Accordion.Item eventKey="0" >
                        <Accordion.Header className="backgroundHeadCard">Registrar personal</Accordion.Header>
                        <Accordion.Body>
                            <Form className="row">
                                <Form.Group className="col-md-6" >
                                    <Form.Label>Nombre del rol</Form.Label>
                                    <Form.Control type="text" placeholder="Ejemplo: Maria" />
                                </Form.Group>
                            </Form>
                            <br />
                            <div className="d-grid gap-2">
                                <Button type="submit" style={{ background: "#042B61" }} size="lg">
                                    Registrar
                                </Button>
                                {/* <Button type="submit" className="button-style" size="lg">Registrar</Button> */}
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <br />
                <Card style={{ width: "100%" }}>
                    <Card.Header as="h6" className="backgroundHeadCard">
                        <Row>
                            <Col className="titleCards">Personal registrados</Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        <div className="row">
                            <Row>
                                <Col>
                                    <Form.Group className="mb-10">
                                        <Form.Control type="search" aria-label="Search" placeholder="Ingrese el nombre o apellido del cliente">

                                        </Form.Control>
                                        <Button type="submit" >
                                            <FeatherIcon icon={"search"} />
                                        </Button>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        </Container>
    )
}