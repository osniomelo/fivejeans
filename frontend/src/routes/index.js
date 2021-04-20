import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';

export default function Routes() {
    return (
        <Switch>
            <Route component={Home} path='/' exact />
            <Route component={Login} path='/login' />
        </Switch>
    );
}
