// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import EditModal from "./components/EditModal";
import AppLayout from "./views/AppLayout";
function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Home />,
  //   },
  //   {
  //     path: "/edit-profile/:id",
  //     element: <EditModal />,
  //   }
  // ])

  return (
    <BrowserRouter>
      {/* <RouterProvider router={router} /> */}
      <Routes>
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Home />} />
          <Route path="edit-profile/:id" element={<EditModal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
