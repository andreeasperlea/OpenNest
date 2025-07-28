import { create } from 'zustand';

interface User {
  id: number;
  username: string;
  email: string;
}

interface Repository{
  id:number;
  owner_id:number;
  name:string;
  description:string;
  is_private:boolean;
  created_at:string;
}

interface AuthState {
  user: User | null;
  repositories: Repository[]
  loading: boolean;
  fetchUser: () => Promise<void>;
  fetchRepositories: () => Promise<void>
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  repositories:[],
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

  fetchRepositories : async () => {
    try{
      const res= await fetch ('http://localhost:8000/repositories',{
        credentials: 'include',
      });

      if(res.ok){
        const data = await res.json();
        set({repositories: data});
      }else{
        set({repositories:[]});
      }
    }catch (error) {
      console.error("Repository fetch failed", error);
      set({repositories: []});
    }
    // }finally {
    //   set({loading:false});
    // }
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
      set({ user: null, repositories:[] });
    }
  },
}));
