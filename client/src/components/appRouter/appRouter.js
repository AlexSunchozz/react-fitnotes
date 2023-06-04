import React from "react";
import { authRoutes, publicPoutes } from "../routes/routes";
import { LOGIN_ROUTE } from "../utils/consts";
import { Context } from "../../index";
import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AppRouter = () => {
    const {user} = useContext(Context);


    return(
        <Switch>
            {user.isAuth && authRoutes.map(({path, Component}) => 
                <Route exact key={path} path={path} component={Component}/>
            )}
            {publicPoutes.map(({path, Component}) => 
                <Route exact key={path} path={path} component={Component}/>
            )}
            <Redirect to={LOGIN_ROUTE}/>
        </Switch>
    )
}

export default AppRouter;