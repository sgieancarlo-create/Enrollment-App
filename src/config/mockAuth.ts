import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  email: string;
  uid: string;
}

interface StoredUsers {
  [email: string]: string;
}

const STORAGE_KEYS = {
  USERS: '@mockAuth:users',
  CURRENT_USER: '@mockAuth:currentUser',
};

let users: Map<string, string> = new Map();
let pendingOperations: Set<string> = new Set();

const loadUsers = async (): Promise<void> => {
  try {
    const storedUsers = await AsyncStorage.getItem(STORAGE_KEYS.USERS);
    console.log('[mockAuth] Loading users from storage:', storedUsers);
    if (storedUsers) {
      const parsedUsers: StoredUsers = JSON.parse(storedUsers);
      users = new Map(Object.entries(parsedUsers));
      console.log('[mockAuth] Loaded users:', Array.from(users.keys()));
    } else {
      users = new Map();
      console.log('[mockAuth] No users in storage, starting fresh');
    }
  } catch (error) {
    console.error('[mockAuth] Failed to load users:', error);
    users = new Map();
  }
};

const loadCurrentUser = async (): Promise<User | null> => {
  try {
    const storedCurrentUser = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (storedCurrentUser) {
      const user = JSON.parse(storedCurrentUser);
      console.log('[mockAuth] Loaded current user:', user?.email);
      return user;
    } else {
      console.log('[mockAuth] No current user in storage');
      return null;
    }
  } catch (error) {
    console.error('[mockAuth] Failed to load current user:', error);
    return null;
  }
};

const initialize = async (): Promise<void> => {
  console.log('[mockAuth] Initializing...');
  await loadUsers();
};

const saveUsers = async (): Promise<void> => {
  try {
    const usersObject: StoredUsers = Object.fromEntries(users);
    console.log('[mockAuth] Saving users:', usersObject);
    await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(usersObject));
  } catch (error) {
    console.error('[mockAuth] Failed to save users:', error);
  }
};

const saveCurrentUser = async (user: User | null): Promise<void> => {
  try {
    if (user) {
      console.log('[mockAuth] Saving current user:', user.email);
      await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      console.log('[mockAuth] Clearing current user');
      await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  } catch (error) {
    console.error('[mockAuth] Failed to save current user:', error);
  }
};

export const mockAuth = {
  initialize,
  
  currentUser: async (): Promise<User | null> => {
    return await loadCurrentUser();
  },
  
  isAuthenticated: async (): Promise<boolean> => {
    const user = await loadCurrentUser();
    return user !== null;
  },
  
  signInWithEmailAndPassword: async (email: string, password: string): Promise<User> => {
    const operationKey = `signin:${email}`;
    
    if (pendingOperations.has(operationKey)) {
      console.log('[mockAuth] Sign in already in progress, skipping duplicate');
      throw new Error('Operation already in progress');
    }
    
    pendingOperations.add(operationKey);
    
    try {
      console.log('[mockAuth] Sign in attempt:', email);
      await loadUsers();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const storedPassword = users.get(email);
      console.log('[mockAuth] Stored password exists:', !!storedPassword);
      
      if (!storedPassword || storedPassword !== password) {
        console.log('[mockAuth] Sign in failed: invalid credentials');
        throw new Error('Invalid email or password');
      }
      
      const user = { email, uid: Math.random().toString(36).substring(2) };
      await saveCurrentUser(user);
      console.log('[mockAuth] Sign in successful');
      
      return user;
    } finally {
      pendingOperations.delete(operationKey);
    }
  },
  
  createUserWithEmailAndPassword: async (email: string, password: string): Promise<User> => {
    const operationKey = `register:${email}`;
    
    if (pendingOperations.has(operationKey)) {
      console.log('[mockAuth] Registration already in progress, skipping duplicate');
      throw new Error('Operation already in progress');
    }
    
    pendingOperations.add(operationKey);
    
    try {
      console.log('[mockAuth] Registration attempt:', email);
      await loadUsers();
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('[mockAuth] Current users in map:', Array.from(users.keys()));
      console.log('[mockAuth] Checking if email exists:', users.has(email));
      
      if (users.has(email)) {
        console.log('[mockAuth] Registration failed: email already exists');
        throw new Error('Email already in use');
      }
      
      if (password.length < 6) {
        console.log('[mockAuth] Registration failed: password too short');
        throw new Error('Password should be at least 6 characters');
      }
      
      console.log('[mockAuth] Adding new user to map');
      users.set(email, password);
      await saveUsers();
      
      const user = { email, uid: Math.random().toString(36).substring(2) };
      await saveCurrentUser(user);
      console.log('[mockAuth] Registration successful');
      
      return user;
    } finally {
      pendingOperations.delete(operationKey);
    }
  },
  
  signOut: async (): Promise<void> => {
    console.log('[mockAuth] Signing out');
    await new Promise(resolve => setTimeout(resolve, 300));
    await saveCurrentUser(null);
  },
  
  clearAll: async (): Promise<void> => {
    console.log('[mockAuth] Clearing all data');
    users.clear();
    pendingOperations.clear();
    await AsyncStorage.multiRemove([STORAGE_KEYS.USERS, STORAGE_KEYS.CURRENT_USER]);
    console.log('[mockAuth] All data cleared');
  },
};
