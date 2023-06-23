import { render } from "solid-js/web";
import { Turnstile } from "../../../packages/solid-turnstile/src/index";

render(
  () => <Turnstile sitekey="1x00000000000000000000AA" />,
  document.getElementById("app")!
);
