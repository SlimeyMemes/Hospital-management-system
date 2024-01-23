import { useEffect, useState } from 'react';
import axios from 'axios';
import { LaptopOutlined, NotificationOutlined, UserOutlined,SnippetsOutlined,LogoutOutlined } from '@ant-design/icons';
import React from 'react';
import {Layout, Menu } from 'antd';
import '../styles/PatientStyle.css';
import Dashboard from '../components/Dashboard';
const a = ["Profile","Appoinments","Announcements","Medical Records","Log Out"] ;
const { Header, Content, Sider } = Layout;
const items = [UserOutlined, LaptopOutlined, NotificationOutlined,SnippetsOutlined,LogoutOutlined].map((icon, index) => {
    const key = a[index];
  return {
    icon: React.createElement(icon),
    label: `${key}`,
    key: `${key.toLowerCase()}`
  };
});

const pages = {
  profile: Dashboard,
  appoinments: Dashboard,
  announcements: Dashboard,
  "medical records": Dashboard,
  "log out": Dashboard
}
const item = 'profile';

const Patient = () => {
  const [currentPage, setCurrentPage] = useState(item);
  function render(props)
{
  // eslint-disable-next-line react/prop-types
  const Current = pages[props.type];
  return <Current/>;
}
function handleClick(e) {
  setCurrentPage(e.key);
}
  const getUserData = async() => {
    try {
      await axios.post('/api/v1/user/getUser', {},{
        headers:{
        Authorization : "Bearer " + localStorage.getItem("token"),
        }
      })
    }catch(err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getUserData();
  })
          return (
            <>
            <Layout className='main'>
              <Header id= "head">
                <h2 className='nav-text'>Hospital Management System</h2>
              </Header>
              <Layout>
                <Sider width={'13%'} className='slider'>
                  <Menu id='menu'
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={items}
                    onClick={handleClick}
                    />
                </Sider>
                <Layout id='layout'>
                  <Content className='content'>
                    {render({type: currentPage})}
                  </Content>
                </Layout>
              </Layout>
            </Layout>
      </>
    )
  }
  
  export default Patient;