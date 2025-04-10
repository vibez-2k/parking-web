"use client";
import { useEffect } from 'react';
import { hydrateUserStore, useUserStore } from '@/store/userStore'; // Adjust the import path as needed

interface UserStoreInitializerProps {
  children: React.ReactNode;
}

export const UserStoreInitializer = ({ children }: UserStoreInitializerProps) => {
  const getCurrentUser = useUserStore(state => state.getCurrentUser);

  useEffect(() => {
    // Hydrate the store from localStorage
    hydrateUserStore();
    
    // After hydration, check if there's a valid token and fetch user data
    getCurrentUser();
  }, [getCurrentUser]);

  // Return the children to render them
  return <>{children}</>;
};