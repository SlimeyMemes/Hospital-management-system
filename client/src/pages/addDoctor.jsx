import { Form, message } from "antd";
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
        className="login-form card p-5"
      ></Form>
    </div>
  );
};

export default AddDoctor;
