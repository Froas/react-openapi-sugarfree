// components/ErrorBoundary.tsx
import  type { ErrorInfo, ReactNode } from 'react';
import  { Component } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        this.setState({ errorInfo });
    }

    private handleReload = () => {
        window.location.reload();
    };

    private handleReset = () => {
        this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    };

    public render() {
        if (this.state.hasError) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center max-w-lg mx-auto">
                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Something went wrong</h1>
                <p className="text-gray-600 mb-6">
                {this.state.error?.message || 'An unexpected error occurred while loading the application.'}
                </p>

                <div className="space-y-4 mb-8">
                <button
                    onClick={this.handleReload}
                    className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl mr-4"
                >
                    <RefreshCw className="w-5 h-5" />
                    <span>Reload Page</span>
                </button>

                <button
                    onClick={this.handleReset}
                    className="inline-flex items-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors shadow-lg hover:shadow-xl"
                >
                    <span>Try Again</span>
                </button>
                </div>

                {/* Error Details (only in development) */}
                {import.meta.env.DEV && this.state.error && (
                <details className="text-left bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <summary className="cursor-pointer font-medium text-red-800 mb-2">
                    Error Details (Development Only)
                    </summary>
                    <pre className="text-xs text-red-700 overflow-auto whitespace-pre-wrap">
                    {this.state.error.stack}
                    </pre>
                    {this.state.errorInfo && (
                    <pre className="text-xs text-red-700 overflow-auto whitespace-pre-wrap mt-4">
                        {this.state.errorInfo.componentStack}
                    </pre>
                    )}
                </details>
                )}

                <div className="text-sm text-gray-500">
                <p>If this problem persists, please contact support or check the console for more details.</p>
                </div>
            </div>
            </div>
        );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;