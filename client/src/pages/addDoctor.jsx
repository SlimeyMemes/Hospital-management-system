import { Form, message, Input } from "antd";
import { showLoading, hideLoading } from "../redux/feature/alertSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
const AddDoctor = () => {
  const dispatch = useDispatch();
  const onfinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = axios.post("/api/v1/admin/addDoctor", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Added Doctor");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Form
        layout="vertical"
        onFinish={onfinish}
        className="add-doctor card p-5"
      >
        <h3>Add Doctor</h3>
        <Form.Item label="Email" name="email">
          <Input type="email" require />
        </Form.Item>
        <Form.Item label="Username" name="name">
          <Input type="text" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Form.Item label="First Name" name="firstName">
          <Input type="text" required />
        </Form.Item>
        <Form.Item label="Last Name" name="lastName">
          <Input type="text" required />
        </Form.Item>
        <Form.Item label="Phone no:" name="phone">
          <Input type="text" required />
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddDoctor;
