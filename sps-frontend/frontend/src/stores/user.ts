/* eslint-disable  @typescript-eslint/no-explicit-any */
import User from "@/types/User";
import { defineStore } from "pinia";

export interface UserState {
    user: User | null;
}

export const useUserStore = defineStore("user", {
    state: (): UserState => ({
        user: null,
    }),
    getters: {
        getUser(): User | null {
            return this.user;
        },
    },
    actions: {
        setUser(payload: User): void {
            this.user = payload;
        },
    },
});
