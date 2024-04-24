import checkoutNodeJssdk from "@paypal/checkout-server-sdk";

const configureEnvironment = function () {
  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Paypal client ID or secret not found");
  }

  // Change to 'sandbox' for testing, 'production' for production

  /**
  const liveEnvironment = new checkoutNodeJssdk.core.LiveEnvironment(
    clientId,
    clientSecret,
  ); */
  const sandboxEnvironment = new checkoutNodeJssdk.core.SandboxEnvironment(
    clientId,
    clientSecret,
  );
  return sandboxEnvironment;
};

const client = function () {
  return new checkoutNodeJssdk.core.PayPalHttpClient(configureEnvironment());
};

export default client;
