import { useEffect, useState } from "react";
import axios from "axios";
import { Layout, Menu } from "antd";
import "../styles/PatientStyle.css";
import Dashboard from "../components/Dashboard";
import { UserSideBar, AdminSideBar } from "../data/SideBar";
import Homepage from "./HomePage";
import Profile from "../components/Profile";
import Doctors from "../pages/Doctors";
import Users from "../pages/Users";
import { useSelector } from "react-redux";
import UserPic from "../components/UserPic";
import addDoctor from "../pages/addDoctor";

const { Header, Content, Sider } = Layout;
const pages = {
  profile: Profile,
  appoinments: Homepage,
  announcements: Dashboard,
  "medical records": Dashboard,
  doctors: Doctors,
  users: Users,
  "add doctor": addDoctor,
};

const item = "profile";

const Patient = () => {
  const { user } = useSelector((state) => state.user);
  const sidebar = user?.isAdmin ? AdminSideBar : UserSideBar;
  const [currentPage, setCurrentPage] = useState(item);
  function render(props) {
    // eslint-disable-next-line react/prop-types
    const Current = pages[props.type];
    return <Current />;
  }
  function handleClick(e) {
    if (e.key != "log out") {
      {
        setCurrentPage(e.key);
      }
    } else {
      localStorage.clear();
      window.location.reload();
    }
  }
  const getUserData = async () => {
    try {
      await axios.post(
        "/api/v1/user/getUser",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserData();
  });
  return (
    <>
      <Layout className="main">
        <Header id="head">
          <h2 className="nav-text">Hospital Management System</h2>
          <div id="user-icon">
            <UserPic />
            <h2>{user && user.name}</h2>
          </div>
        </Header>
        <Layout>
          <Sider width={"13%"} className="slider">
            <Menu
              id="menu"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={sidebar}
              onClick={handleClick}
            />
          </Sider>
          <Layout id="layout">
            <Content className="content">
              {render({ type: currentPage })}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </>
  );
};

export default Patient;
