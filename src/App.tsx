import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "./pages/Home"

const router = createBrowserRouter([
  {
    path: "/", 
    Component: Home,
  }
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
