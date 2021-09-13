import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../utils/contexts';

const ProtectedRoute = ({
  component: Component, location, isLogin, ...rest
}) => {
  console.log(rest);
  const { authorized } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        (authorized ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        ))}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.any,
  location: PropTypes.object,
  isLogin: PropTypes.bool,
};

export default ProtectedRoute;
