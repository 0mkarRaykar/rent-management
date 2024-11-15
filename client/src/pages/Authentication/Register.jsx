import React, { useEffect } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

// action
import { registerUser, apiError } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";

import { Link } from "react-router-dom";

// import images
import profileImg from "../../assets/images/profile-img.png";
import logo from "../../assets/images/logo.svg";
import lightlogo from "../../assets/images/logo-light.svg";

const Register = (props) => {
  document.title = "Register | Skote - Vite React Admin & Dashboard Template";

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "",
      fullName: "",
      password: "",
      mobileNumber: "",
      address: {
        country: "",
        state: "",
        city: "",
        pincode: "",
      },
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      fullName: Yup.string().required("Please Enter Your FullName"),
      password: Yup.string().required("Please Enter Your Password"),
      mobileNumber: Yup.string().required("Please Enter Your Mobile Number"),
      address: Yup.object({
        country: Yup.string().required("Please Enter Your Country"),
        state: Yup.string().required("Please Enter Your State"),
        city: Yup.string().required("Please Enter Your City"),
        pincode: Yup.string().required("Please Enter Your Pincode"),
      }),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
      console.log("button clicked", values);
    },
  });

  const selectAccountState = (state) => state.Account;
  const AccountProperties = createSelector(selectAccountState, (account) => ({
    user: account.user,
    registrationError: account.registrationError,
    // loading: account.loading,
  }));

  const {
    user,
    registrationError,
    // loading
  } = useSelector(AccountProperties);

  useEffect(() => {
    dispatch(apiError(""));
  }, []);

  return (
    <React.Fragment>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="bx bx-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary-subtle">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Free Register</h5>
                        <p>Get your free Skote account now.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="auth-logo">
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={lightlogo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                    <Link to="/" className="auth-logo-dark">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src={logo}
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {user && user ? (
                        <Alert color="success">
                          Register User Successfully
                        </Alert>
                      ) : null}

                      {registrationError && registrationError ? (
                        <Alert color="danger">{registrationError}</Alert>
                      ) : null}

                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Full Name</Label>
                        <Input
                          name="fullName"
                          type="text"
                          placeholder="Enter full name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.fullName || ""}
                          invalid={
                            validation.touched.fullName &&
                            validation.errors.fullName
                              ? true
                              : false
                          }
                        />
                        {validation.touched.fullName &&
                        validation.errors.fullName ? (
                          <FormFeedback type="invalid">
                            {validation.errors.fullName}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter Password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password &&
                            validation.errors.password
                              ? true
                              : false
                          }
                        />
                        {validation.touched.password &&
                        validation.errors.password ? (
                          <FormFeedback type="invalid">
                            {validation.errors.password}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Mobile Number</Label>
                        <Input
                          name="mobileNumber"
                          type="text"
                          placeholder="Enter mobile number"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.mobileNumber || ""}
                          invalid={
                            validation.touched.mobileNumber &&
                            validation.errors.mobileNumber
                              ? true
                              : false
                          }
                        />
                        {validation.touched.mobileNumber &&
                        validation.errors.mobileNumber ? (
                          <FormFeedback type="invalid">
                            {validation.errors.mobileNumber}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Country</Label>
                        <Input
                          name="address.country"
                          type="text"
                          placeholder="Enter country"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.address.country || ""}
                          invalid={
                            validation.touched.address?.country &&
                            validation.errors.address?.country
                              ? true
                              : false
                          }
                        />
                        {validation.touched.address?.country &&
                        validation.errors.address?.country ? (
                          <FormFeedback>
                            {validation.errors.address.country}
                          </FormFeedback>
                        ) : null}
                      </div>

                      {/* Address - State */}
                      <div className="mb-3">
                        <Label className="form-label">State</Label>
                        <Input
                          name="address.state"
                          type="text"
                          placeholder="Enter state"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.address.state || ""}
                          invalid={
                            validation.touched.address?.state &&
                            validation.errors.address?.state
                              ? true
                              : false
                          }
                        />
                        {validation.touched.address?.state &&
                        validation.errors.address?.state ? (
                          <FormFeedback>
                            {validation.errors.address.state}
                          </FormFeedback>
                        ) : null}
                      </div>

                      {/* Address - City */}
                      <div className="mb-3">
                        <Label className="form-label">City</Label>
                        <Input
                          name="address.city"
                          type="text"
                          placeholder="Enter city"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.address.city || ""}
                          invalid={
                            validation.touched.address?.city &&
                            validation.errors.address?.city
                              ? true
                              : false
                          }
                        />
                        {validation.touched.address?.city &&
                        validation.errors.address?.city ? (
                          <FormFeedback>
                            {validation.errors.address.city}
                          </FormFeedback>
                        ) : null}
                      </div>

                      {/* Address - Pincode */}
                      <div className="mb-3">
                        <Label className="form-label">Pincode</Label>
                        <Input
                          name="address.pincode"
                          type="text"
                          placeholder="Enter pincode"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.address.pincode || ""}
                          invalid={
                            validation.touched.address?.pincode &&
                            validation.errors.address?.pincode
                              ? true
                              : false
                          }
                        />
                        {validation.touched.address?.pincode &&
                        validation.errors.address?.pincode ? (
                          <FormFeedback>
                            {validation.errors.address.pincode}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mt-4">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Register
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          By registering you agree to the Skote{" "}
                          <Link to="#" className="text-primary">
                            Terms of Use
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link to="/login" className="font-weight-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Skote. Crafted with{" "}
                  <i className="mdi mdi-heart text-danger" /> by Themesbrand
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;
