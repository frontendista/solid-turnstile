import {
  createEffect,
  createSignal,
  mergeProps,
  on,
  onCleanup,
  onMount,
  Show,
  splitProps,
  type VoidComponent,
} from "solid-js";

import type { TurnstileProps } from "./index.d";

const TURNSTILE_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js";

const [turnStileState, setState] = createSignal<
  "loading" | "loaded" | "error" | "none"
>("none");

function injectScript(callback: string) {
  const turnstile = document.getElementById("cf-turnstile");

  if (turnstile) return;

  setState("loading");

  const script = document.createElement("script");
  script.src = `${TURNSTILE_URL}?onload=${callback}&render=explicit`;
  script.async = true;
  script.defer = true;
  script.id = "cf-turnstile";

  // @ts-expect-error
  window[callback] = () => setState("loaded");

  script.onerror = () => setState("error");

  document.body.appendChild(script);
}

/**
 * Explicitly renders Turnstile widget.
 *
 * @returns
 */
export const Turnstile: VoidComponent<TurnstileProps> = (props) => {
  let element: HTMLDivElement;
  let [widgetId, setWidgetId] = createSignal<string | null>(null);

  const [local, attributes] = splitProps(props, [
    "siteKey",
    "onLoadCallbackName",
    "onSuccess",
    "onError",
    "onExpire",
  ]);

  const cf = mergeProps(local, {
    onLoadCallbackName: "onLoadTurnstileCallback",
  });

  onMount(() => injectScript(cf.onLoadCallbackName));

  createEffect(
    on(turnStileState, () => {
      if (!window.turnstile) return;

      const id = window.turnstile.render(element, {
        sitekey: cf.siteKey,
        callback: cf.onSuccess,
        "error-callback": cf.onError,
        "expired-callback": cf.onExpire,
      });

      if (!id) {
        cf.onError?.();
      }

      setWidgetId(id);

      onCleanup(() => {
        window.turnstile.remove(id);
      });
    })
  );

  return (
    <Show when={turnStileState()}>
      <div ref={element!} />
    </Show>
  );
};
