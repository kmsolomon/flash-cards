import {
  isRouteErrorResponse,
  useLocation,
  useRouteError,
} from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  const location = useLocation();
  const message: string = location?.state?.message;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div id="error-page" className="main-content">
          <h1>Page not found</h1>
          <p>We could not find the page you requested.</p>
          <p>
            <a href="/">Return to the home page</a>
          </p>
        </div>
      );
    } else {
      return (
        <div id="error-page" className="main-content">
          <h1>Error: {error.status}</h1>
          <p>{error.statusText}</p>
          {error.data?.message && <p>{error.data.message}</p>}
          <p>
            <a href="/">Return to the home page</a>
          </p>
        </div>
      );
    }
  } else if (typeof message !== "undefined") {
    return (
      <div id="error-page" className="main-content">
        <h1>Error</h1>
        <p>{message}</p>
        <p>
          <a href="/">Return to the home page</a>
        </p>
      </div>
    );
  } else {
    return (
      <div id="error-page" className="main-content">
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
