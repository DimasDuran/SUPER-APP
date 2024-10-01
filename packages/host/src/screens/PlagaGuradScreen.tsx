import {Federated} from '@callstack/repack/client';
import React from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
import Placeholder from '../components/Placeholder';

const MiniAppPlagaGuard = React.lazy(() => Federated.importModule('booking', './App'));

const PlagaGuradScreen = () => {
  return (
    <ErrorBoundary name="BookingScreen">
      <React.Suspense
        fallback={<Placeholder label="PlagaGuard App" icon="bug-outline" />}>
        <MiniAppPlagaGuard />
      </React.Suspense>
    </ErrorBoundary>
  );
};

export default PlagaGuradScreen;
