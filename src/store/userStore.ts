import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";
import { jwtVerify } from "jose";

// Define the store interface
interface UserState {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  role: string;
  setRole: (role: string) => void;
  navMain: { label: string; path: string }[];
  setNavMain: (navLinks: { label: string; path: string }[]) => void;
  fetchNavLinks: () => Promise<void>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  getCurrentUser: () => Promise<void>;
  isLoggedIn: boolean;
  logout: () => void;
  hydrate: () => void; // New method to manually hydrate the store
}

// Zustand Store with API fetching
export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      name: "",
      setName: (name) => set({ name }),
      email: "",
      setEmail: (email) => set({ email }),
      role: "",
      setRole: (role) => set({ role }),
      navMain: [],
      setNavMain: (navLinks) => set({ navMain: navLinks }),
      loading: false,
      setLoading: (loading) => set({ loading }),
      isLoggedIn: false,

      hydrate: () => {
        // This function will be called in a useEffect to hydrate the store
      },

      getCurrentUser: async () => {
        const token = Cookies.get("token");
        if (!token) {
          set({ isLoggedIn: false });
          return;
        }

        try {
          const secret = new TextEncoder().encode(
            process.env.NEXT_PUBLIC_JWT_SECRET || 'fallback_secret'
          );
          const { payload } = await jwtVerify(token, secret);

          set({
            name: payload.name as string || "",
            email: payload.email as string || "",
            role: payload.role as string || "",
            isLoggedIn: true,
          });
          
          // Fetch nav links after setting user data
          await get().fetchNavLinks();
          return payload;
        } catch (error) {
          console.error("Error decoding token:", error);
          set({ isLoggedIn: false });
        }
      },

      logout: () => {
        Cookies.remove("token");
        set({
          name: "",
          email: "",
          role: "",
          navMain: [],
          isLoggedIn: false,
        });
      },

      fetchNavLinks: async () => {
        const { role } = get();
        if (!role) return;

        set({ loading: true });
        try {
          const response = await fetch("/api/user/navs", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ role }),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          set({ navMain: data });
        } catch (error) {
          console.error("Error fetching navbar links:", error);
          set({ navMain: [] });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "user-store",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true // We'll handle hydration manually
    }
  )
);

// Add a helper function to hydrate the store
export const hydrateUserStore = () => {
  useUserStore.persist.rehydrate();
};