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
        console.log(`Restrieved referral codes: ${referralCodes}`)
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
        //console.log("User id of request", addedReferralCode)
        console.log(`Created referral code ${addedReferralCode.referral_code}`)
        return addedReferralCode;
    } catch (err) {
        console.log('Failed to create referral code')
        console.error(err)
    }
}

export async function deleteRef(access_token, referral_code) {
    const credentials = Credentials.jwt(access_token)
    const authSession = await authApp.logIn(credentials)

    try {
        const deletedReferralCode = await authSession.functions.deleteRef(referral_code)
        console.log(`Deleted referral code ${deletedReferralCode.referral_code}`)
        return deletedReferralCode;
    } catch (err) {
        console.log('Failed to delete referral code')
        console.error(err)
    }
}

export async function updateUserData(access_token, updatedUserData) {
    const credentials = Credentials.jwt(access_token)
    const authSession = await authApp.logIn(credentials)

    try {
        const newUserData = await authSession.functions.updateUserData(updatedUserData)
        console.log(`Updated userData item ${updatedUserData.key} to value ${updatedUserData.value}`)
    } catch (err) {
        console.log('Failed to update userData')
        console.error(err)
    }
}