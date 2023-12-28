import Header from '../components/header'
import {Link} from 'react-router-dom'
import {Form, Input} from 'antd';
import '../styles/LoginStyle.css'

const Login  = () => {
  const onfinish = (values) =>
  {
    console.log(values);
  }
    return (
      <>
      <Header/>
      <div className="form-container card">
      <Form layout = "vertical" onFinish={onfinish} className='login-form card p-5'>
        <h1>Login</h1>
          <Form.Item label="Email" name="email">
          <Input type="email" required/>
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required/>
        </Form.Item>
        <div>
        <Link to = '/register'><h3>Not a user ?</h3></Link>
        <button className='btn btn-primary' type='submit'>Register</button>
        </div>
      </Form>
    </div>
    </>
      
    )
  }
  
  export default Login