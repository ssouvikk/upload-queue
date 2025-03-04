// src/pages/index.tsx
import { withAuth } from '@/utils/withAuth'

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}

export default withAuth(HomePage);