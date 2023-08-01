import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignUp from "../pages/signUp/SignUp";
import SignIn from "../pages/signIn/SignIn";
import Home from "@/pages/home/Home";
import SubmitForm from "@/pages/submitForm/SubmitForm";
import PrivateRoute from "./PrivateRoute";
import EditForm from "@/pages/editForm/EditForm";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/submit-form",
        element: (
          <PrivateRoute>
            <SubmitForm />
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-form",
        element: (
          <PrivateRoute>
            <EditForm />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default routes;
