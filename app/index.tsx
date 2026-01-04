import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { mockAuth } from '../src/config/mockAuth.ts';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await mockAuth.initialize();
      const user = await mockAuth.currentUser();
      if (user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/login');
      }
    })();
  }, []);

  return null;
}
