import { Credentials, App } from "realm-web";

const APP_ID = "mongostoreapp-dnerj";
const BASE_URL = "realm.mongodb.com" ?? "eu-central-1.aws.realm.mongodb.com";
export const REALM_GRAPHQL_ENDPOINT = `https://${BASE_URL}/api/client/v2.0/app/${APP_ID}/graphql`;

const app = new App({
    id: APP_ID,
    baseUrl: `https://${BASE_URL}`,
});

export const generateAuthHeader = async () => {
    if (!app.currentUser) {
        // If no user is logged in, log in an anonymous user
        await app.logIn(Credentials.anonymous());
    } else {
        // An already logged in user's access token might be stale. To guarantee that the token is
        // valid, we refresh the user's custom data which also refreshes their access token.
        await app.currentUser.refreshCustomData();
    }
    // Get a valid access token for the current user
    const { accessToken } = app.currentUser;

    // Set the Authorization header, preserving any other headers
    return {
        Authorization: `Bearer ${accessToken}`,
    };
};

// DOCS: example of a direct call for custom Realm functions
export const realmFunctionTemplate = async () => {
    const credentials = Credentials.anonymous();
    try {
        const user = await app.logIn(credentials);
        // all functions hosted on realm for an app are exposed in the `user.functions` property
        // replace `nameOfRealmFunction` with the name of the function you want to call
        const result = await user.functions.nameOfRealmFunction();
    } catch (error) {
        console.error(error);
    }
};

export const addProduct = async () => {
    try {
        const result = await app.currentUser.functions.addProduct();
        console.log(result);
        return result;
    } catch (error) {
        console.error(error);
    }
};

export const loginEmailPassword = async (email, password) => {
    // Create an anonymous credential
    const credentials = Credentials.emailPassword(email, password);
    try {
        // Authenticate the user
        const user = await app.logIn(credentials);
        // `App.currentUser` updates to match the logged in user
        console.assert(user.id === app.currentUser.id);
        console.log(user);
        await app.currentUser.refreshCustomData();
        console.log(app.currentUser.customData);
        return user;
    } catch (err) {
        console.error("Failed to log in", err);
    }
};

export const registerUser = async (email, password) => {
    // Create an anonymous credential
    // const credentials = Credentials.emailPassword(email, password);
    try {
        // Register the user
        const user = await app.emailPasswordAuth.registerUser({ email, password });
        console.log(user);
        return await loginEmailPassword(email, password);
    } catch (err) {
        return await loginEmailPassword(email, password);
        // console.error("Failed to register", err);
    }
};

export const getUser = async () => {
    return app.currentUser;
};
