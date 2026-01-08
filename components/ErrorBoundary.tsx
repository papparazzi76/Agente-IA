
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// FIX: Explicitly extend Component from 'react' and use a constructor to ensure that 'this.props' and 'this.state' are correctly identified as members of the class instance by the TypeScript compiler.
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to the console.
    console.error("Uncaught error:", error, errorInfo);
  }

  public render(): ReactNode {
    // FIX: Accessing state inherited from Component.
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-corporate-dark text-pure-white p-6">
          <div className="max-w-md w-full bg-gray-900/50 rounded-xl shadow-2xl p-8 border border-red-500/50 backdrop-blur-md">
            <h1 className="text-2xl font-bold text-red-500 mb-4 font-poppins">Algo salió mal</h1>
            <p className="text-gray-300 mb-6 font-inter">
              Ha ocurrido un error inesperado en la aplicación. Por favor, intenta recargar la página.
            </p>
            {/* FIX: Safely accessing error message from the state. */}
            {this.state.error && (
                <div className="bg-black/30 p-4 rounded-lg text-xs text-red-300 font-mono mb-6 overflow-auto max-h-40">
                    {this.state.error.message}
                </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-tech-blue hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg transform hover:-translate-y-1"
            >
              Recargar Página
            </button>
          </div>
        </div>
      );
    }

    // FIX: Accessing children through this.props, which is now correctly recognized by TypeScript on the class instance inherited from Component.
    return this.props.children;
  }
}

export default ErrorBoundary;
