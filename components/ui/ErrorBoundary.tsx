import { BugReportDrawer } from '@components/BugReport';
import { Component, ErrorInfo, ReactNode } from 'react';


interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
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
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50">
          <BugReportDrawer
            isOpen={true}
            onClose={() => window.location.reload()}
            onReOpen={()=> {}}
            error={this.state.error}
            fromBoundary={true}
          />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;