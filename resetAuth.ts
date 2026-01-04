// resetAuth.ts
import { mockAuth } from './src/config/mockAuth';

(async () => {
  console.log('Clearing all users and sessions...');
  await mockAuth.clearAll();      // Clear AsyncStorage and memory
  await mockAuth.initialize();    // Re-initialize
  console.log('mockAuth reset complete!');
})();
