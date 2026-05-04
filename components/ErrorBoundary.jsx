import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center w-full h-[50vh] p-4 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Oops, something went wrong!</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            An unexpected error occurred in this tool.
          </p>
          <details className="whitespace-pre-wrap text-left bg-gray-100 dark:bg-gray-800 p-4 rounded-lg w-full max-w-2xl overflow-auto text-sm">
            {this.state.error && this.state.error.toString()}
          </details>
          <button
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => this.setState({ hasError: false })}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
