import { LaptopOutlined, NotificationOutlined, UserOutlined,SnippetsOutlined,LogoutOutlined } from '@ant-design/icons';
export const SidebarData = [
    {
        name: "Profile",
        path: "/profile",
        icon: UserOutlined,
    },
    {
        name: "Appointments",
        path: "/appointments",
        icon: LaptopOutlined,
    },
    {
        name: "Announcements",
        path: "/announcements",
        icon: NotificationOutlined,
    },
    {
        name: "Medical Records",
        path: "/medicalrecords",
        icon: SnippetsOutlined,
    },
    {
        name: "Log Out",
        path: "/logout",
        icon: LogoutOutlined,
    },
]