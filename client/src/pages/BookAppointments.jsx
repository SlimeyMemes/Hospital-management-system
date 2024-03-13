import {
  Select,
  Typography,
  Row,
  Col,
  Table,
  Button,
  Modal,
  Form,
  TimePicker,
  DatePicker,
} from "antd";
import axios from "axios";
import { useState } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import Options from "../data/Specialization";

const { Title } = Typography;
const BookAppointments = () => {
  const { user } = useSelector((state) => state.user);
  const [doctors, setDoctors] = useState([]);
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState([]);
  const col = [
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
          <div>
            <p>
              {moment(text[0]).format("HH") +
                " - " +
                moment(text[1]).format("HH")}
            </p>
          </div>
        );
      },
    },
    {
      title: "Book Appointment",
      render: (record) => {
        return (
          <Button type="primary" onClick={() => bookAppointment(record)}>
            Book
          </Button>
        );
      },
    },
  ];
  const updateForm = async (values) => {
    try {
      console.log(values);
      const res = await axios.post("api/v1/user/getSpecDoctor", {
        specialization: values,
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const bookAppointment = (record) => {
    setBookModalOpen(true);
    setCurrentRecord(record);
  };
  const handleBookModalCancel = () => {
    setBookModalOpen(false);
  };

  const saveValues = (values) => {
    const appointment = [
      {
        userName: user.name,
        upcommingAppointments: {
          doctorName: currentRecord.firstName + " " + currentRecord.lastName,
          specialization: currentRecord.specialization,
          phone: currentRecord.phone,
          email: currentRecord.email,
          date: values.date,
          timeSlot: values.time,
        },
      },
    ];

    console.log(appointment);
  };

  const disabledTime = () => {
    return {
      disabledHours: () => {
        const disabled = [];
        for (let i = 0; i < 24; i++) {
          if (i < 5 || i > 11) {
            disabled.push(i);
          }
        }

        return disabled;
      },
    };
  };

  return (
    <>
      <Modal
        title="Book Appointment"
        open={bookModalOpen}
        onCancel={handleBookModalCancel}
        footer={[
          <Button key="cancel" onClick={handleBookModalCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Form layout="vertical" onFinish={saveValues}>
          <Form.Item label="Date" name="date">
            <DatePicker></DatePicker>
          </Form.Item>
          <Form.Item label="Time" name="time">
            <TimePicker
              format="HH"
              disabledTime={disabledTime}
              use12Hours
            ></TimePicker>
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Confirm
          </Button>
        </Form>
      </Modal>
      <Title>Select Dept</Title>
      <Row style={{ marginBottom: "2%" }}>
        <Col xs={24} md={24} lg={8}>
          <Select
            options={Options}
            onChange={updateForm}
            size="middle"
            style={{ width: "100%" }}
          ></Select>
        </Col>
      </Row>
      <Table columns={col} dataSource={doctors}></Table>
    </>
  );
};

export default BookAppointments;
