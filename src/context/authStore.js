import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { app, credentials } from '@/api/configs/mongo.client.js'
import * as authApi from "@/api/authApi"
import { Credentials } from 'realm-web';
import { decodeJwt } from '@/utils/utils';

const dbAuthStore = (set) => ({
    dbUser: false,
    login: async (access_token) => {
        console.log("Logging into db with the access token: ", access_token)
        const credentials = Credentials.jwt(access_token)
        const dbUser = await app.logIn(credentials)
        set(() => ({
            dbUser: dbUser
        }))
    }
})

export const useDBAuthStore = create(dbAuthStore)

const authStore = (set) => ({
    user: '',
    login: async (credentials) => {
        //const access_token = 
        await authApi.login(credentials)
        .then((result) => {
            console.log("result: ", result)
            const payload = decodeJwt(result.access_token)
            set(() => ({
                user: {
                    name: payload.username,
                    email: result.email,
                    theme: result.userData? result.userData.theme : 'default',
                    account_type: payload.account_type,
                    access_token: result.access_token
                }
            }))
        }, (err) => {
            console.log("Login failed")
            console.error(err)
        })
        .finally()
        //const dbUser = await app.logIn(credentials)
    },
    logout: () => {
        set(() => ({
            user: null
        }))
    },
    register: async (newUser) => {
        await authApi.register(newUser)
        .then((result) => {
            const payload = decodeJwt(result.access_token)
            set(() => ({
                user: {
                    name: payload.username,
                    email: result.email,
                    theme: result.userData? result.userData.theme : 'default',
                    account_type: payload.account_type,
                    access_token: result.access_token
                }
            }))
        }, (err) => {
            console.log("Registration failed")
            console.error(err)
        })
    },
    changeTheme: (jwt, newTheme) => {
        authApi.updateUserData(jwt, { key: "theme", value: newTheme})
        set((state) => ({
            user: {
                ...state.user,
                theme: newTheme
            }
        }))
    }
})

export const useAuthStore = create(
    persist(authStore, {
        name: 'user'
    })
);