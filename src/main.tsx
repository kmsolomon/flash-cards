import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import DisplayGrid from "./components/DisplayGrid/DisplayGrid";
import { allCardsetsLoader } from "./routes/root";

const container = document.getElementById("root");
const root = createRoot(container as HTMLDivElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DisplayGrid />,
        loader: allCardsetsLoader,
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
