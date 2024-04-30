import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import CardSet from "./components/CardSet/CardSet";
import CardSetOverview from "./components/CardSet/CardSetOverview/CardSetOverview";
import EditCardSet from "./components/CardSet/EditCardSet/EditCardSet";
import CreateCardSet from "./components/CreateCardSet/CreateCardSet";
import CreateFlashCard from "./components/CreateFlashCard/CreateFlashCard";
import DisplayGrid from "./components/DisplayGrid/DisplayGrid";
import EditFlashCard from "./components/EditFlashCard/EditFlashCard";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import ErrorPage from "./ErrorPage";
import {
  allCardsetsLoader,
  singleCardsetLoader,
  singleFlashCardLoader,
} from "./routes/root";

const container = document.getElementById("root");
const root = createRoot(container as HTMLDivElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <>
        <Header />
        <main>
          <ErrorPage />
        </main>
        <Footer />
      </>
    ),
    children: [
      {
        errorElement: <ErrorPage />,
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
            path: "/set/:id/cards/create",
            element: <CreateFlashCard />,
          },
          {
            path: "/set/:id/cards/:cardId/edit",
            element: <EditFlashCard />,
            loader: singleFlashCardLoader,
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
          {
            path: "/error",
            element: <ErrorPage />,
          },
        ],
      },
    ],
  },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
