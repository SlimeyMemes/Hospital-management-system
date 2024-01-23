// Desc: Private route for the application
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function ProtectRoute({children}) {
    if(localStorage.getItem('token'))
    {
        return children
    }else{
        return <Navigate to='/login'/>
    }

}

ProtectRoute.propTypes = {
    children: PropTypes.node.isRequired
};

export default ProtectRoute