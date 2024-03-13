import AfterInstallPage from "./components/AfterInstallPage";
import IndexPage from "./components/IndexPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <IndexPage />,
    },
    {
      path: "/container",
      element: <div id="container" />,
    },
    {
      path: "/afterInstall",
      element: <AfterInstallPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
