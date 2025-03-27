import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define the store interface
interface UserState {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  navMain: { label: string; path: string }[];
  setNavMain: (navLinks: { label: string; path: string }[]) => void;
  fetchNavLinks: () => Promise<void>;
  userRoles: { role: string; icon: string }[];
  currentRole: { role: string; icon: string };
  setCurrentRole: (role: { role: string; icon: string }) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

// Zustand Store with API fetching
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      name: "",
      setName: (name) => set({ name }),
      email: "",
      setEmail: (email) => set({ email }),
      password: "",
      setPassword: (password) => set({ password }),

      userRoles: [
        { role: "User", icon: "User" },
        { role: "Super Admin", icon: "UserCog" },
        { role: "Venue Owner", icon: "Home" },
      ],

      currentRole: { role: "User", icon: "User" }, // Explicitly set initial role
      setCurrentRole: (role) => set({ currentRole: role }),

      navMain: [],
      setNavMain: (navLinks) => set({ navMain: navLinks }),

      loading: false,
      setLoading: (loading) => set({ loading }),
      fetchNavLinks: async () => {
        set({ loading: true });
        try {
          const response = await fetch("/api/user/navs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ role: get().currentRole.role }),
          });
          const data = await response.json();
          set({ navMain: data });
        } catch (error) {
          console.error("Error fetching navbar links:", error);
        } finally {
          set({ loading: false });
        }
      },
    }),
    { name: "user-store", skipHydration: true } // Persist store to localStorage
  )
);
