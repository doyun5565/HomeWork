import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import Mypage from "./Mypage/Mypage";
import ModifyInfo from "./ModifyInfo/ModifyInfo";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return <Router>
    <Switch>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/mypage">
        <Mypage />
      </Route>
      <Route path="/modifyInfo">
        <ModifyInfo />
      </Route>
    </Switch>
  </Router>
}

export default App;
