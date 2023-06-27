import {
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  onCleanup,
  onMount,
  Show,
  splitProps,
  type VoidComponent,
} from "solid-js";

import type { SupportedLanguages } from "turnstile-types";
import type { TurnstileProps, TurnstileScriptOptions } from "./types";

const TURNSTILE_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js";

const [turnStileState, setState] = createSignal<
  "loading" | "loaded" | "error" | "none"
>("none");

function injectScript(callback: string, scriptOptions: TurnstileScriptOptions) {
  const id = scriptOptions.id ?? "cf-turnstile";
  const turnstile = document.getElementById(id);

  if (window.turnstile) {
    setState("loaded");
    return;
  }

  if (turnstile) return;

  setState("loading");

  const script = document.createElement("script");
  script.src = `${TURNSTILE_URL}?onload=${callback}&render=explicit`;
  script.async = true;
  script.defer = true;
  script.id = id;

  // @ts-expect-error
  window[callback] = () => {
    setState("loaded");

    // @ts-expect-error
    delete window[callback];
  };

  script.onerror = () => setState("error");

  (scriptOptions.mount || document.head).appendChild(script);
}

/**
 * Explicitly renders Turnstile widget.
 *
 * @returns
 */
export const Turnstile: VoidComponent<TurnstileProps> = (props) => {
  let [retryId, setRetryId] = createSignal<number | undefined>();
  let [ref, setRef] = createSignal<HTMLDivElement>();

  const [local, { scriptOptions }, attributes] = splitProps(
    props,
    [
      "siteKey",
      "onLoadCallbackName",
      "onSuccess",
      "onError",
      "onExpire",
      "retry",
      "retryInterval",
      "refreshExpired",
      "responseField",
      "responseFieldName",
      "onTimeout",
      "theme",
      "action",
      "cData",
      "size",
      "language",
      "iframeTabindex",
      "appearance",
      "execute",
    ],
    ["scriptOptions"]
  );

  const cf = mergeProps(
    {
      onLoadCallbackName: "onLoadTurnstileCallback",
      retryInterval: 6000,
      theme: "auto",
      retry: "auto",
      refreshExpired: "auto",
      responseField: true,
      responseFieldName: "cf-turnstile-response",
      size: "normal",
      language: "auto",
      iframeTabindex: 0,
      appearance: "always",
      execute: "render",
    } as const,
    local
  );

  onMount(() => injectScript(cf.onLoadCallbackName, scriptOptions || {}));

  const widgetId = createMemo(() => {
    const element = ref();

    if (
      typeof window === "undefined" ||
      turnStileState() !== "loaded" ||
      !element
    )
      return;

    const id = window.turnstile.render(element, {
      sitekey: cf.siteKey,
      callback: cf.onSuccess,
      retry: "never",
      "error-callback": onErrorCallback,
      "expired-callback": cf.onExpire,
      "timeout-callback": cf.onTimeout,
      "retry-interval": cf.retryInterval,
      "refresh-expired": cf.refreshExpired,
      "response-field": cf.responseField,
      "response-field-name": cf.responseFieldName,
      theme: cf.theme,
      cData: cf.cData,
      action: cf.action,
      size: cf.size,
      language: cf.language as SupportedLanguages,
      tabindex: cf.iframeTabindex,
      appearance: cf.appearance,
      execution: cf.execute,
    });

    if (!id && cf.onError) {
      cf.onError();
    }

    return id;
  });

  const onErrorCallback = () => {
    // NOTE: This is a fix until automatic retry is fixed.
    // https://community.cloudflare.com/t/window-turnstile-remove-with-retry-set-to-auto-doesnt-cleartimeout/525530
    if (cf.retry === "auto") {
      setRetryId(
        setTimeout(() => {
          window.turnstile.reset(widgetId());
        }, cf.retryInterval)
      );
    }

    cf.onError?.();
  };

  onCleanup(() => {
    clearTimeout(retryId());

    if (widgetId()) {
      window.turnstile.remove(widgetId());
    }
  });

  createEffect(() => {
    if (!props.actions) return;

    const id = widgetId();

    props.actions({
      getResponse() {
        return window.turnstile.getResponse(id);
      },
      remove() {
        window.turnstile.remove(id);

        return id;
      },
      reset() {
        window.turnstile.reset(id);

        return id;
      },
      execute() {
        window.turnstile.execute(id);

        return id;
      },
    });
  });

  return (
    <Show when={turnStileState() === "loaded"}>
      <div ref={setRef} {...attributes} />
    </Show>
  );
};
