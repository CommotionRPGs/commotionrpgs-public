import { authApp, authCredentials } from "@/api/configs/mongo.client"
import { Credentials } from "realm-web"

export async function register(newUser) {
    console.log("Registering...")
    const authSession = await authApp.logIn(authCredentials)

    try {
        const access_token = await authSession.functions.register(newUser)
        return access_token
    } catch(err) {
        console.log('Register failed')
        console.error(err)
    }
};

export async function login(user) {
    console.log("Logging in...")
    const authSession = await authApp.logIn(authCredentials)

    try {
        const access_token = await authSession.functions.login(user)
        return access_token
        //console.log('access token: ', access_token)
    } catch(err) {
        console.log('Login failed')
        console.error(err)
    }
}

export async function getRefs(access_token) {
    const credentials = Credentials.jwt(access_token)
    const authSession = await authApp.logIn(credentials)

    try {
        const referralCodes = await authSession.functions.getRefs()
        return referralCodes;
    } catch(err) {
        console.log('Failed to retrieve referral codes')
        console.error(err)
    }
}

export async function addRef(access_token, args) {
    const credentials = Credentials.jwt(access_token)
    const authSession = await authApp.logIn(credentials)

    try {
        const addedReferralCode = await authSession.functions.addRef(args);
        console.log("User id of request", addedReferralCode)
        return addedReferralCode;
    } catch (err) {
        console.log('Failed to create referral code')
        console.error(err)
    }
}