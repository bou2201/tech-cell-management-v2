import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AuthState, AuthStore } from './type';
import { AuthLoginResponse } from '../models';
import { logoutApi } from '../apis';
import { getOneLocalStorage, removeOneLocalStorage } from '@/utilities/local';

const initialState: AuthState = {
  user: undefined,
  isLoading: false,
  isSignedIn: false,
};

export const useAuthStore = create<AuthStore>()(
  immer((set) => ({
    ...initialState,
    fetching: () => {
      set((state) => {
        state.isLoading = true;
      });
    },
    fetched: () => {
      set((state) => {
        state.isLoading = false;
      });
    },
    setUser: (user: AuthLoginResponse) => {
      set((state) => {
        state.isLoading = false;
        state.isSignedIn = true;
        state.user = user;
      });
    },
    logout: () => {
      set(initialState);
      logoutApi().then(() => {
        removeOneLocalStorage('user');
      });
    },
  })),
);

export const rehydrateAuthState = () => {
  const user = getOneLocalStorage<AuthLoginResponse>('user', 'object');
  if (user) {
    useAuthStore.setState({
      isLoading: false,
      isSignedIn: true,
      user: user as AuthLoginResponse,
    });
  }
};
