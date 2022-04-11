import React from "react";
import FeatherIcon from "feather-icons-react";
import { Col, FormControl, InputGroup, Row } from "react-bootstrap";
import "../../../src/assets/css/main.css";
import "../../../src/assets/css/util.css";
import "../../../src/assets/css/Styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const FilterComponent = ({ filterText, onFilter, onSearch }) => (
  <>
    <Col md={{ span: 4}}>
      <InputGroup className="mb-3">
        <FormControl
          id="search"
          type="text"
          placeholder="Buscar"
          aria-label="Buscar..."
          value={filterText}
          onChange={onFilter}
          style={{height: "40px"}}
        />
        <InputGroup.Text type="button" onClick={onSearch} className="backgroundHeadModal">
          <FeatherIcon icon="search" />
        </InputGroup.Text>
      </InputGroup>
    </Col>
  </>
);
