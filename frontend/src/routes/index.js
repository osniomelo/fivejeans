import { Switch, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';

export default function Routes() {
    return (
        <Switch>
            <Route component={Home} path='/' exact />
            <Route component={Login} path='/login' />
			<Route component={Register} path='/register' />
        </Switch>
    );
}
