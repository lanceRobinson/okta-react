const oktaDomain = 'dev-11846574.okta.com'
const clientId = '0oa3dqzljhjoLcHUF5d7'

const oktaAuthConfig = {
    // Note: If your app is configured to use the Implicit flow
    // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
    // you will need to add `pkce: false`
    issuer: `https://${oktaDomain}/oauth2/default`,
    clientId: clientId,
    redirectUri: window.location.origin + '/login/callback',
};

const oktaSignInConfig = {
    baseUrl: `https://${oktaDomain}`,
    clientId: clientId,
    redirectUri: window.location.origin + '/login/callback',
    features: {
        // Used to enable registration feature on the widget.
        // https://github.com/okta/okta-signin-widget#feature-flags
        registration: true // REQUIRED
    },
    authParams: {
        // If your app is configured to use the Implicit flow
        // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
        // you will need to uncomment the below line
        // pkce: false
    }
    // Additional documentation on config options can be found at https://github.com/okta/okta-signin-widget#basic-config-options
};


export { oktaAuthConfig, oktaSignInConfig };