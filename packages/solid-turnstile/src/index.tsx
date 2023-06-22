import {
  createSignal,
  onCleanup,
  onMount,
  Show,
  type VoidComponent,
} from "solid-js";
import type { TurnstileOptions } from "turnstile-types";

type TurnstileProps = TurnstileOptions;

/**
 * Explicetely renders Turnstile widget.
 *
 * @returns
 */
export const Turnstile: VoidComponent<TurnstileProps> = (props) => {
  let [isTurnstileLoaded, setLoaded] = createSignal(false);

  onMount(() => {
    if ("turnstile" in window) {
      setLoaded(true);
    } else {
      const script = document.createElement("script");

      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js&render=explicit";
      script.async = true;
      script.defer = true;

      document.head.appendChild(script);
    }
  });

  return (
    <Show when={isTurnstileLoaded}>
      <div />
    </Show>
  );
};
