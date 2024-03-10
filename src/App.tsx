import AppContainer from "./components/AppContainer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppContainer />,
    },
    {
      path: "/container",
      element: <div id="container" />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
