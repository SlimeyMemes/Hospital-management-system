/* eslint-disable react-hooks/exhaustive-deps */
import { Table, Button, message, Modal, Form, Input, Checkbox } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
const { TextArea } = Input;
const DoctorProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [modalOpen, setModalOpen] = useState(false);
  const [upcomming, setupcomming] = useState([]);
  const [completed, setcompleted] = useState([]);
  const [remarkState, setRemarkState] = useState(true);
  const [currentRecord, setCurrentRecord] = useState([]);

  const doctorTableCol = [
    {
      title: "Name",
      dataIndex: "userName",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => {
        return moment(text).format("YYYY-MM-DD");
      },
    },
    {
      title: "Time",
      dataIndex: "timeSlot",
      render: (text) => {
        return moment(text).format("h A");
      },
    },
    {
      title: "Complete ? ",
      render: (record) => (
        <Button type="primary" onClick={() => handleCompleted(record)}>
          Complete
        </Button>
      ),
    },
  ];

  const getDoctorAppointments = async () => {
    try {
      console.log(user.name);
      const res = await axios.post("api/v1/doctor/getAppointment", {
        name: user.name,
      });
      if (res.data.success) {
        setupcomming(res.data.data);
      } else {
        message.error(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const getCompletedAppointments = async () => {
    try {
      const res = await axios.post("api/v1/doctor/getCompletedAppointments", {
        name: user.name,
      });
      if (res.data.success) {
        setcompleted(res.data.data);
      } else {
        message.error(res.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDoctorAppointments();
    getCompletedAppointments();
  }, []);
  const appointmentTableCol = [
    {
      title: "Name",
      dataIndex: "userName",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => {
        return moment(text).format("YYYY-MM-DD");
      },
    },
    {
      title: "Time",
      dataIndex: "timeSlot",
      render: (text) => {
        return moment(text).format("h A");
      },
    },
    {
      title: "Reason for Visit",
      dataIndex: "reason",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
    },
  ];

  const handleCompleted = (record) => {
    setCurrentRecord(record);
    setModalOpen(true);
  };
  const handleModalCancel = () => {
    setModalOpen(false);
  };

  const completeAppointment = async (values) => {
    console.log(currentRecord);
    const completedobj = {
      doctorName: currentRecord.name,
      userName: currentRecord.userName,
      date: currentRecord.date,
      timeSlot: currentRecord.timeSlot,
      reason: values.reason,
      remarks: values.remarks,
    };
    try {
      const res = await axios.post(
        "api/v1/doctor/completeAppointment",
        completedobj
      );
      if (res.data.success) {
        message.success(res.message);
        getDoctorAppointments();
        getCompletedAppointments();
      } else {
        message.error("There was a problem");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Modal
        title="Complete Appointment"
        open={modalOpen}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>
            Cancel
          </Button>,
        ]}
      >
        <h6>
          Remarks?{" "}
          <Checkbox onChange={() => setRemarkState(!remarkState)}></Checkbox>
        </h6>
        <Form layout="vertical" onFinish={completeAppointment}>
          <Form.Item label="Reason for visit" name="reason">
            <Input></Input>
          </Form.Item>
          <Form.Item name="remarks">
            <TextArea disabled={remarkState}></TextArea>
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => setModalOpen(false)}
          >
            Mark Complete
          </Button>
        </Form>
      </Modal>
      <h2>Doctor Profile</h2>
      <h3>Upcomming Appointments</h3>
      <Table columns={doctorTableCol} dataSource={upcomming} />
      <h2>Completed Appointments</h2>
      <Table columns={appointmentTableCol} dataSource={completed} />
    </div>
  );
};

export default DoctorProfile;
