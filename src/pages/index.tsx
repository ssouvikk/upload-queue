// src/pages/index.tsx
import { withAuth } from '@/utils/auth'

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}

export default withAuth(HomePage);