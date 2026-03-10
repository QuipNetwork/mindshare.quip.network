import { Layout } from '@/components/Layout';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { Route, Switch } from 'wouter';

export default function App() {
  return (
    <Switch>
      <Layout>
        <Route path="*" component={LeaderboardPage} />
      </Layout>
    </Switch>
  );
}
