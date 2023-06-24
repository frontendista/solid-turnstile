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
};