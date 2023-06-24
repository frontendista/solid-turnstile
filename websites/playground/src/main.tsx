import { render } from "solid-js/web";
import { Turnstile } from "../../../packages/solid-turnstile/src/index";
import { Show, createSignal } from "solid-js";

const App = () => {
  const [visible, setVisibility] = createSignal(true);

  return (
    <main>
      <Show when={visible()}>
        <div>
          <h1>Visible, passes.</h1>
          <Turnstile
            siteKey="1x00000000000000000000AA"
            onSuccess={console.log}
            onError={() => console.warn("Error: Nějak se to pokazilo")}
            onExpire={() => console.warn("Expirovalo to :(")}
          />
        </div>
        <div>
          <h1>Visible, blocks.</h1>
          <Turnstile
            siteKey="2x00000000000000000000AB"
            onSuccess={console.log}
            onError={() => console.warn("Error: Nějak se to pokazilo")}
            onExpire={() => console.warn("Expirovalo to :(")}
          />
        </div>
        <div>
          <h1>Invisible, passes.</h1>
          <Turnstile
            siteKey="1x00000000000000000000BB"
            onSuccess={console.log}
            onError={() => console.warn("Error: Nějak se to pokazilo")}
            onExpire={() => console.warn("Expirovalo to :(")}
          />
        </div>
        <div>
          <h1>Invisible, blocks.</h1>
          <Turnstile
            siteKey="2x00000000000000000000BB"
            onSuccess={console.log}
            onError={() => console.warn("Error: Nějak se to pokazilo")}
            onExpire={() => console.warn("Expirovalo to :(")}
          />
        </div>
      </Show>

      <button onClick={() => setVisibility((value) => !value)}>Toggle</button>
    </main>
  );
};

render(() => <App />, document.getElementById("app")!);
