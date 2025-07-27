import { create } from 'zustand';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  fetchUser: async () => {
    try {
      const res = await fetch('http://localhost:8000/me', {
        credentials: 'include',
      });

      if (res.ok) {
        const data = await res.json();
        set({ user: data });
      } else {
        set({ user: null });
      }
    } catch (error) {
      console.error("Auth fetch failed:", error);
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await fetch('http://localhost:8000/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      set({ user: null });
    }
  },
}));
