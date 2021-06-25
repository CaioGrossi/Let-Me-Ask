import { Route, BrowserRouter, Switch } from "react-router-dom";
import AdminRoom from "../pages/AdminRoom";
import CreateRoom from "../pages/CreateRoom";
import Home from "../pages/Home";
import Room from "../pages/Room";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={CreateRoom} />
        <Route path="/rooms/:id" component={Room} />
        <Route path="/admin/rooms/:id" component={AdminRoom} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
