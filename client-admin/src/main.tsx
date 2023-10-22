import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Post from "./Post.jsx";
import NewPost from "./NewPost.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "posts/new",
    element: <NewPost />,
  },
  {
    path: "posts/:id",
    element: <Post />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
