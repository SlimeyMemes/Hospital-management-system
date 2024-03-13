import { Table } from "antd";
import { Link } from "react-router-dom";
const UserProfile = () => {
  const data = [
    {
      key: "1",
      name: "Alice",
      dept: "General",
      date: "14-12-2023",
      remarks: "Nil",
    },
    {
      key: "2",
      name: "Bob",
      dept: "Dentistry",
      date: "15-12-2023",
      remarks: <Link to="/">Click Here</Link>,
    },
    {
      key: "3",
      name: "Charlie",
      dept: "Cardiology",
      date: "16-12-2023",
      remarks: <Link to="/">Click Here</Link>,
    },
    {
      key: "4",
      name: "David",
      dept: "Orthopedics",
      date: "17-12-2023",
      remarks: "Nil",
    },
  ];
  const col = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Dept",
      dataIndex: "dept",
      key: "dept",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
  ];
  const up = [
    {
      key: "1",
      name: "Alice",
      dept: "General",
      date: "14-12-2023",
      cancel: <button className="btn btn-danger">Cancel</button>,
    },
    {
      key: "2",
      name: "Bob",
      dept: "Dentistry",
      date: "15-12-2023",
      cancel: <button className="btn btn-danger">Cancel</button>,
    },
  ];
  const upcol = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Dept",
      dataIndex: "dept",
      key: "dept",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Cancel",
      dataIndex: "cancel",
      key: "cancel",
    },
  ];
  return (
    <>
      <Table dataSource={data} columns={col}></Table>
      <h5>Upcomming</h5>
      <Table dataSource={up} columns={upcol}></Table>
    </>
  );
};

export default UserProfile;
