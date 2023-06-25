export type TurnstileProps = {
    /**
     * Your Cloudflare Turnstile widget site key.
     * 
     * @link https://developers.cloudflare.com/turnstile/get-started/#get-a-sitekey-and-secret-key
     */
    siteKey: string;
    /**
     * @default "onLoadTurnstileCallback"
     */
    onLoadCallbackName?: string;
    /**
     * onSuccess is called when the challenge is successfully solved.
     */
    onSuccess?: (token: string) => void;
    /**
     * onError is called when an error occurs during the challenge or connecting to Turnstile.
     */
    onError?: () => void;
    /**
     * onExpire is called when token issued by successful challenge expires.
     */
    onExpire?: () => void;
    /**
     * onTimeout is called when challenge expires
     */
    onTimeout?: () => void;
    /**
     * retry controls whether the widget should automatically retry to obtain a token if it did not succeed.
     * 
     * @default "auto"
     */
    retry?: "auto" | "never";
    /**
     * retryInterval controls the duration between retries in milliseconds when `retry` is set to `auto`.
     * 
     * @default 6000
     */
    retryInterval?: number
    /**
     * refreshExpired controls whether the widget should automatically refresh an expired token.
     * 
     * @default "auto"
     * @link https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#refreshing-a-widget
     */
    refreshExpired?: "auto" | "manual" | "never"
    /**
     * responseField controls whether the widget should automatically add a hidden input field with the token value.
     * 
     * @default true
     */
    responseField?: boolean
    /**
     * responseFieldName controls name of the input field when responseField is set to `true`
     * 
     * @default "cf-turnstile-response"
     */
    responseFieldName?: string
};