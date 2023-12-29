import { useEffect } from 'react';
import axios from 'axios';
import { LaptopOutlined, NotificationOutlined, UserOutlined,SnippetsOutlined,LogoutOutlined } from '@ant-design/icons';
import React from 'react'
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import '../styles/PatientStyle.css'
import UserPic from '../components/UserPic';
import Dashbaord from '../components/Dashboard';
const a = ["Profile","Appoinments","Announcements","Medical Records","Log Out"] ;
const { Header, Content, Sider } = Layout;
const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined,SnippetsOutlined,LogoutOutlined].map((icon, index) => {
    const key = a[index];
  return {
    icon: React.createElement(icon),
    label: `${key}`,
  };
});
const Patient = () => {
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
    const {
        token: { colorBgContainer, borderRadiusLG },
      } = theme.useToken();
          return (
            <>
            <Layout className='main'>
              <Header
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <h2 className='nav-text'>Hospital Management System</h2>
                <Menu
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['2']}
                  style={{
                    flex: 1,
                    minWidth: 0,
                  }}/>
                <UserPic size/>
              </Header>
              <Layout>
                <Sider
                  width={300}
                  style={{
                    background: colorBgContainer,
                  }}
                >
                  <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    style={{
                      height: '100%',
                      borderRight: 0,
                    }}
                    items={items2}
                  />
                </Sider>
                <Layout
                  style={{
                    padding: '0 24px 24px',
                  }}
                >
                  <Breadcrumb
                    style={{
                      margin: '16px 0',
                    }}
                  >
                    <Breadcrumb.Item>Appoinments</Breadcrumb.Item>
                  </Breadcrumb>
                  <Content
                    style={{
                      padding: 24,
                      margin: 0,
                      minHeight: 280,
                      background: colorBgContainer,
                      borderRadius: borderRadiusLG,
                    }}
                  >
                    <Dashbaord/>
                  </Content>
                </Layout>
              </Layout>
            </Layout>
      </>
    )
  }
  
  export default Patient;