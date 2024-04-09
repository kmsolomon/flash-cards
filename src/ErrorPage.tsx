import { isRouteErrorResponse, useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div id="error-page">
          <h1>Page not found</h1>
          <p>We could not find the page you requested.</p>
          <p>
            <a href="/">Return to the home page</a>
          </p>
        </div>
      );
    } else {
      return (
        <div id="error-page">
          <h1>Error: {error.status}</h1>
          <p>{error.statusText}</p>
          {error.data?.message && <p>{error.data.message}</p>}
          <p>
            <a href="/">Return to the home page</a>
          </p>
        </div>
      );
    }
  } else {
    return (
      <div id="error-page">
        <h1>Unexpected Error</h1>
        <p>An unexpected error occured.</p>
        {error instanceof Error ? <p>Error message: {error.message}</p> : null}
        <p>
          <a href="/">Return to the home page</a>
        </p>
      </div>
    );
  }
}

export default ErrorPage;
