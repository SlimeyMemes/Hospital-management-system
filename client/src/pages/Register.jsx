import {Form, Input} from 'antd';
import '../styles/RegisterStyle.css';
import {Link} from 'react-router-dom'
import Header from '../components/header'
const Register = () => {

  const onfinish = (values) =>
  {
    console.log(values);
  }
  return (
    <>
    <Header/>
    <div className="form-container card">
      <Form layout = "vertical" onFinish={onfinish} className='register-form card p-5'>
        <h1>Register</h1>
        <Form.Item label="Username" name="username">
          <Input type="text" required/>
          </Form.Item>
          <Form.Item label="Email" name="email">
          <Input type="email" required/>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required/>
        </Form.Item>
        <div>
        <Link to = '/login'><h3>Already a user?</h3></Link>
        <button className='btn btn-primary' type='submit'>Register</button>
        </div>
      </Form>
    </div>
    </>
  )
}

export default Register