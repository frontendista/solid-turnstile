import type { JSX } from "solid-js";

export interface TurnstileProps extends TurnstileCallbacks, Omit<JSX.HTMLAttributes<HTMLDivElement>, "onError"> {
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
    /**
     * @default "auto"
     */
    theme?: "light" | "dark" | "auto"
    /**
     * @link https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
     */
    action?: string
    /**
     * @link https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#configurations
     */
    cData?: string
    /**
     * actions is a setter function of a signal that receives an actions object that can manipulate with the widget.
     */
    actions?: (api: TurnstileActions) => void
    /**
     * size controls the size of the visible widget
     * 
     * @default "normal"
     */
    size?: "normal" | "compact"
    /**
     * @default "auto"
     */
    language?: string | "auto"
    /**
     * @default 0
     */
    iframeTabindex?: number
    /**
     * @default "always"
     */
    appearance?: "always" | "execute" | "interaction-only"
    /**
     * @default "render"
     */
    execute?: "render" | "execute"
};

export type TurnstileActions = {
    /**
     * reset calls `window.turnstile.reset` on the widget.
     */
    reset(): void;
    /**
     * remove calls `window.turnstile.remove` on the widget.
     */
    remove(): void;
    /**
     * getResponse calls `window.turnstile.getResponse` on the widget.
     */
    getResponse(): ReturnType<typeof window.turnstile.getResponse>;
    /**
     * execute calls `window.turnstile.execute` on the widget.
     */
    execute(): void;
}

export interface TurnstileCallbacks {
    /**
     * onSuccess is called when the challenge is successfully solved.
     * 
     * @param token The token to be validated on the server.
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
}