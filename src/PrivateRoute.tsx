import * as React from 'react';
import { Route } from 'react-router-dom';
import { useAuth } from "./context/AuthContext";
import App from "./components/App";

interface PrivateRouteProps {
    path: string;
    children: React.ReactNode;
}

const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({
    children,
    path,
}) => {

    const { user, isInitialized } = useAuth();

    if (!isInitialized) {
        return <>Loading...</>;
    }

    const element = user != null ? children : <App/>;

    return <Route path={path}>{element}</Route>;
};

export default PrivateRoute;