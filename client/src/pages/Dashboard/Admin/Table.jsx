import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledTooltip,
  Input,
  FormFeedback,
  Label,
  Form,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import DeleteModal from "../../../components/Common/DeleteModal";
import TableContainer from "../../../components/Common/TableContainer";
import Spinners from "../../../components/Common/Spinner";
import moment from "moment";
import { ToastContainer } from "react-toastify";
import FlatPickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { PatternFormat } from "react-number-format";

import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

// Import updated user actions
import {
  fetchUsersRequest as onGetUsers,
  addUserRequest as onAddNewUser,
  updateUserRequest as onUpdateUser,
  deleteUserRequest as onDeleteUser,
} from "../../../store/user/fetchUser/actions";

const EcommerceCustomers = () => {
  document.title = "Users | Skote";
  const dispatch = useDispatch();

  // Updated selector for users
  const usersState = createSelector(
    (state) => state.users,
    (usersState) => ({
      users: usersState.users || [],
      loading: usersState.loading || false,
      error: usersState.error || null,
    })
  );

  const { users, loading, error } = useSelector(usersState);
  const [isLoading, setLoading] = useState(loading);
  const [modal, setModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Updated validation schema for API data
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      fullName: (selectedUser && selectedUser.fullName) || "",
      mobileNumber: (selectedUser && selectedUser.mobileNumber) || "",
      email: (selectedUser && selectedUser.email) || "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Please Enter Full Name"),
      mobileNumber: Yup.string().required("Please Enter mobile Number"),
      email: Yup.string()
        .email("Please Enter Valid Email")
        .required("Please Enter Email"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        dispatch(onUpdateUser(updatedUser));
      } else {
        dispatch(onAddNewUser(values));
      }
      validation.resetForm();
      toggle();
    },
  });

  // Updated columns for API data
  const columns = useMemo(
    () => [
      {
        header: "Full Name",
        accessorKey: "fullName",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Email",
        accessorKey: "email",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "mobileNumber",
        accessorKey: "mobileNumber",
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Joined Date",
        accessorKey: "createdAt",
        cell: (cell) => moment(cell.getValue()).format("LL"),
        enableColumnFilter: false,
        enableSorting: true,
      },
      {
        header: "Action",
        enableColumnFilter: false,
        enableSorting: false,
        cell: (cellProps) => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle tag="a" className="card-drop">
                <i className="mdi mdi-dots-horizontal font-size-18"></i>
              </DropdownToggle>

              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem
                  onClick={() => {
                    const customerData = cellProps.row.original;
                    handleCustomerClick(customerData);
                  }}
                >
                  <i
                    className="mdi mdi-pencil font-size-16 text-success me-1"
                    id="edittooltip"
                  ></i>
                  Edit
                  <UncontrolledTooltip placement="top" target="edittooltip">
                    Edit
                  </UncontrolledTooltip>
                </DropdownItem>

                <DropdownItem
                  onClick={() => {
                    const customerData = cellProps.row.original;
                    onClickDelete(customerData);
                  }}
                >
                  <i
                    className="mdi mdi-trash-can font-size-16 text-danger me-1"
                    id="deletetooltip"
                  ></i>
                  Delete
                  <UncontrolledTooltip placement="top" target="deletetooltip">
                    Delete
                  </UncontrolledTooltip>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
    ],
    []
  );

  useEffect(() => {
    if (users && !users.length) {
      dispatch(onGetUsers());
    }
  }, [dispatch, users]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setIsEdit(false);
    toggle();
  };

  const toggle = () => {
    if (modal) {
      setModal(false);
      setSelectedUser(null);
    } else {
      setModal(true);
    }
  };

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsEdit(false);
    toggle();
  };

  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (user) => {
    setSelectedUser(user);
    setDeleteModal(true);
  };

  const handleDeleteUser = () => {
    if (selectedUser && selectedUser._id) {
      dispatch(onDeleteUser(selectedUser._id));
      setDeleteModal(false);
    }
  };

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteUser}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Users" breadcrumbItem="User Management" />
          <Row>
            {isLoading ? (
              <Spinners setLoading={setLoading} />
            ) : (
              <Col xs="12">
                <Card>
                  <CardBody>
                    <TableContainer
                      columns={columns}
                      data={users}
                      isGlobalFilter={true}
                      isAddButton={true}
                      isPagination={true}
                      isCustomPageSize={true}
                      handleUserClick={handleAddUser}
                      buttonClass="btn btn-success btn-rounded waves-effect waves-light mb-2 me-2 addCustomers-modal"
                      buttonName="Add New User"
                      paginationWrapper="dataTables_paginate paging_simple_numbers pagination-rounded"
                      tableClass="align-middle table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
                      theadClass="table-light"
                      pagination="pagination"
                      SearchPlaceholder="search..."
                    />
                  </CardBody>
                </Card>
              </Col>
            )}
          </Row>

          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
              {!!isEdit ? "Edit User" : "Add User"}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  validation.handleSubmit();
                  return false;
                }}
              >
                <Row>
                  <Col className="col-12">
                    <div className="mb-3">
                      <Label className="form-label">Full Name</Label>
                      <Input
                        name="fullName"
                        type="text"
                        placeholder="Insert full name"
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
                      <Label className="form-label">Email</Label>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Insert Email Id"
                        value={validation.values.email || ""}
                        onChange={validation.handleChange}
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
                      <Label className="form-label">mobileNumber</Label>
                      <PatternFormat
                        className="form-control"
                        name="mobileNumber"
                        placeholder="Insert Mobile No"
                        value={validation.values.mobileNumber || ""}
                        onChange={validation.handleChange}
                        format="###-###-####"
                      />
                      {validation.touched.mobileNumber &&
                      validation.errors.mobileNumber ? (
                        <FormFeedback type="invalid" className="d-block">
                          {validation.errors.phone}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <div className="text-end">
                  <button type="submit" className="btn btn-customer">
                    Save
                  </button>
                </div>
              </Form>
            </ModalBody>
          </Modal>
        </Container>
      </div>
      <ToastContainer />
    </React.Fragment>
  );
};

EcommerceCustomers.propTypes = {
  users: PropTypes.array,
  onGetUsers: PropTypes.func,
  onAddNewUser: PropTypes.func,
  onDeleteUser: PropTypes.func,
  onUpdateUser: PropTypes.func,
};

export default EcommerceCustomers;
