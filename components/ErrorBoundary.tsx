import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-corporate-dark text-pure-white p-6">
          <div className="max-w-md w-full bg-gray-900/50 rounded-xl shadow-2xl p-8 border border-red-500/50 backdrop-blur-md">
            <h1 className="text-2xl font-bold text-red-500 mb-4 font-poppins">Algo salió mal</h1>
            <p className="text-gray-300 mb-6 font-inter">
              Ha ocurrido un error inesperado en la aplicación. Por favor, intenta recargar la página.
            </p>
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

    return this.props.children;
  }
}

export default ErrorBoundary;