import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Row, Col, Input, TimePicker } from "antd";
import moment from "moment";

const timingstyle = {
  display: "flex",
};

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [timingModalOpen, setTimingModalOpen] = useState(false);
  const [passwordOnOpen, setPasswordModalOpen] = useState(false);

  const [form] = Form.useForm();
  const getDoctorData = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getDoctors");
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDoctorData();
  }, []);

  const removeItem = () => {};
  const changePassword = () => {};
  const handlePasswordOk = () => {
    setPasswordModalOpen(false);
  };
  const handlePasswordCancel = () => {
    setPasswordModalOpen(false);
  };
  const timingOnClick = () => {
    setTimingModalOpen(true);
  };
  const handleTimingCancel = () => {
    setTimingModalOpen(false);
  };
  const edit = (record) => {
    form.setFieldsValue(record);
    setEditModalOpen(true);
  };

  const handleEditOk = () => {
    setEditModalOpen(false);
  };
  const handleCancel = () => {
    setEditModalOpen(false);
  };
  const handleTimingOk = () => {
    setTimingModalOpen(false);
  };

  const items = [
    {
      title: "Name",
      render: (record) => {
        return record.firstName + " " + record.lastName;
      },
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
    },
    {
      title: "Experience",
      dataIndex: "experience",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Timings",
      dataIndex: "timings",
      render: (text) => {
        return (
          <div style={timingstyle}>
            <p>
              {moment(text[0]).format("HH") +
                " - " +
                moment(text[1]).format("HH")}
            </p>
            <Button size="medium" onClick={timingOnClick}>
              Edit Timings
            </Button>
          </div>
        );
      },
    },
    {
      title: "Edit",
      render: (record) => {
        return <Button onClick={() => edit(record)}>Edit</Button>;
      },
    },
    {
      title: "Authentication",
      render: () => {
        return (
          <Button type="primary" onClick={changePassword}>
            Edit Password
          </Button>
        );
      },
    },
    {
      title: "Remove ?",
      render: () => {
        return (
          <Button danger onClick={removeItem}>
            Remove
          </Button>
        );
      },
    },
  ];

  return (
    <>
      <Modal
        title="Edit Modal"
        open={editModalOpen}
        onOk={handleEditOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Form
          variant="filled"
          layout="vertical"
          className="edit-doctor"
          onFinish={handleEditOk}
          form={form}
        >
          <Row gutter="100">
            <Col xs={24} md={24} lg={12}>
              <Form.Item label="Email" name="email">
                <Input type="email" required />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={12}>
              <Form.Item label="Username" name="name">
                <Input type="text" required />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter="100">
            <Col xs={24} md={24} lg={12}>
              <Form.Item label="First Name" name="firstName">
                <Input type="text" required />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={12}>
              <Form.Item label="Last Name" name="lastName">
                <Input type="text" required />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter="100">
            <Col xs={24} md={24} lg={12}>
              <Form.Item label="Phone no:" name="phone">
                <Input type="text" required />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={12}>
              <Form.Item label="Website (Optional)" name="website">
                <Input type="text" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter="100">
            <Col xs={24} md={24} lg={12}>
              <Form.Item label="Specialization" name="specialization">
                <Input type="text" required />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={12}>
              <Form.Item label="Experience" name="experience">
                <Input type="number" required />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        title="Edit Timings"
        open={timingModalOpen}
        onOk={handleTimingOk}
        onCancel={handleTimingCancel}
      >
        <Form>
          <Form.Item>
            <TimePicker.RangePicker format="HH"></TimePicker.RangePicker>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Password"
        open={passwordOnOpen}
        onOk={handlePasswordOk}
        onCancel={handlePasswordCancel}
      >
        <Form>
          <Form.Item label="Change Password" name="password">
            <Input type="password"></Input>
          </Form.Item>
        </Form>
      </Modal>
      <Table dataSource={doctors} columns={items}></Table>
    </>
  );
};

export default Doctors;
