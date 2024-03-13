import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [upcommingAppointments, setupcommingAppointments] = useState([]);
  const [completedAppointments, setcompletedAppointments] = useState([]);
  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAppointments");
      if (res.data.success) {
        setupcommingAppointments(res.data.data.upcommingAppointments);
        setcompletedAppointments(res.data.data.completedAppointments);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);
  const col = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
    },
  ];

  const upcol = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Specialization",
      dataIndex: "specialization",
    },
    {
      title: "Cancel",
      dataIndex: "cancel",
    },
  ];

  return (
    <>
      <Table dataSource={completedAppointments} columns={col}></Table>
      <h5>Upcomming</h5>
      <Table dataSource={upcommingAppointments} columns={upcol}></Table>
    </>
  );
};

export default UserProfile;
