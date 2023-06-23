import {
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  Show,
  type VoidComponent,
} from "solid-js";
import type { TurnstileOptions } from "turnstile-types";

declare global {
  interface Window {
    onTurnstileLoaded: () => void;
  }
}

type TurnstileProps = TurnstileOptions;

const TURNSTILE_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js";

/**
 * Explicetely renders Turnstile widget.
 *
 * @returns
 */
export const Turnstile: VoidComponent<TurnstileProps> = (props) => {
  let element: HTMLDivElement;
  let [isTurnstileLoaded, setLoaded] = createSignal(false);

  onMount(() => {
    if ("turnstile" in window) {
      setLoaded(true);
    } else {
      const script = document.createElement("script");

      script.src = `${TURNSTILE_URL}?render=explicit&onload=onTurnstileLoaded`;
      script.async = true;
      script.defer = true;

      document.head.appendChild(script);

      window.onTurnstileLoaded = () => {
        setLoaded(true);
      };
    }
  });

  createEffect(() => {
    if (isTurnstileLoaded()) {
      window.turnstile.render(element, props);
    }
  });

  return (
    <Show when={isTurnstileLoaded}>
      <div ref={element!} />
    </Show>
  );
};
