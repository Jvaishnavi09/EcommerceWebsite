import React from "react";
import { Link } from "react-router-dom";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="d-flex flex-column justify-content-center align-items-center mt-4  vh-100">
          <h2 className="text-danger">Something went wrong!</h2>
          <p>Please refresh or go back to the homepage.</p>
          <img
            src="/error.gif"
            alt="err"
            style={{ objectFit: "contain", height: "250px", width: "250px" }}
          />
          <Link to="/" className="btn btn-dark  btn-lg">
            Go Home
          </Link>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
