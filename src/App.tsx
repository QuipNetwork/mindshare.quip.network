import { Layout } from '@/components/Layout';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { Toaster } from 'react-hot-toast';
import { Route, Router, Switch } from 'wouter';

export default function App({ ssrPath }: { ssrPath?: string }) {
  return (
    <Router ssrPath={ssrPath}>
      <Switch>
        <Layout>
          <Route path="*" component={LeaderboardPage} />
        </Layout>
      </Switch>
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'toast-base',
          error: { className: 'toast-base toast-error' },
        }}
      />
    </Router>
  );
}
