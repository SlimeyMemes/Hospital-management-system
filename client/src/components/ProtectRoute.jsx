// Desc: Private route for the application
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { useDispatch, useSelector, useCallback } from "react-redux";
import { showLoading, hideLoading } from "../redux/feature/alertSlice";
import { setUser } from "../redux/feature/userSlice";
import { useEffect } from "react";

function ProtectRoute({ children }) {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const getUser = useCallback(async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/getUser",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        <Navigate to="/login" />;
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

ProtectRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectRoute;
