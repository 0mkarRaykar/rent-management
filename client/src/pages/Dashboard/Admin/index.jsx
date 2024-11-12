import PropTypes from "prop-types";
import React from "react";
import { Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb";

//i18n
import { withTranslation } from "react-i18next";
import Table from "./Table";

const AdminDashboard = (props) => {
  //meta title
  document.title = "Dashboard | Skote - Vite React Admin & Dashboard Template";

  return (
    <React.Fragment>
      {/* <div className="page-content"> */}
      {/* Render Breadcrumb */}
      {/* <Container fluid>
          <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Index")}
          />
        </Container> */}
      {/* </div> */}
      <Table />
    </React.Fragment>
  );
};

AdminDashboard.propTypes = {
  t: PropTypes.any,
};

export default withTranslation()(AdminDashboard);
