import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import CardSet from "./components/CardSet/CardSet";
import CardSetOverview from "./components/CardSet/CardSetOverview/CardSetOverview";
import EditCardSet from "./components/CardSet/EditCardSet/EditCardSet";
import CreateCardSet from "./components/CreateCardSet/CreateCardSet";
import DisplayGrid from "./components/DisplayGrid/DisplayGrid";
import { allCardsetsLoader, singleCardsetLoader } from "./routes/root";

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
      {
        path: "/set/:id/edit",
        element: <EditCardSet />,
        loader: singleCardsetLoader,
      },
      {
        path: "/set/:id/cards",
        element: <CardSet />,
        loader: singleCardsetLoader,
      },
      {
        path: "/set/:id",
        element: <CardSetOverview />,
        loader: singleCardsetLoader,
      },
      {
        path: "/set/create",
        element: <CreateCardSet />,
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
