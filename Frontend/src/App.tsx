import { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";

const App = () => (
  <Fragment>
    <Toaster />
    <HomePage />
  </Fragment>
);

export default App;
