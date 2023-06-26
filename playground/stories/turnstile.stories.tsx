import { createSignal } from "solid-js";
import { Turnstile } from "@frontendista/solid-turnstile/src";

import { FixedSizeDecorator } from "../src/decorators/decorator";

import type { Meta, StoryObj } from "storybook-solidjs";
import type { TurnstileActions } from "@frontendista/solid-turnstile/src/types";

type Story = StoryObj<typeof Turnstile>;

export const Playground: Story = {};

export default {
  title: "Playground/Turnstile",
  component: Turnstile,
  tags: ["autodocs"],
  render: (args) => {
    const [actions, setActions] = createSignal<TurnstileActions>();

    return (
      <div>
        <Turnstile {...args} actions={setActions} />
        <div>
          <button
            onClick={() =>
              console.log(
                `Called remove on widget with id: "${actions()?.remove()}"`
              )
            }
          >
            remove
          </button>
          <button
            onClick={() =>
              console.log(
                `Called reset on widget with id: "${actions()?.reset()}"`
              )
            }
          >
            reset
          </button>
          <button
            onClick={() => {
              alert(actions()?.getResponse());
            }}
          >
            getResponse
          </button>
          <button
            onClick={() =>
              console.log(
                `Called execute on widget with id: "${actions()?.execute()}"`
              )
            }
            disabled={
              args.execute !== "execute" && args.appearance !== "execute"
            }
          >
            execute
          </button>
        </div>
      </div>
    );
  },
  decorators: [FixedSizeDecorator],
  argTypes: {
    siteKey: {
      options: {
        Passes: "1x00000000000000000000AA",
        Fails: "2x00000000000000000000AB",
        Challenge: "3x00000000000000000000FF",
      },
      control: { type: "select" },
    },
    theme: {
      options: ["auto", "light", "dark"],
      control: { type: "radio" },
    },
    size: {
      options: ["normal", "compact"],
      control: { type: "radio" },
    },
    appearance: {
      options: ["always", "execute", "interaction-only"],
      control: { type: "radio" },
    },
    execute: {
      options: ["render", "execute"],
      control: { type: "radio" },
    },
    responseFieldName: {
      if: {
        arg: "responseField",
      },
    },
    language: {
      options: [
        "auto",
        "de",
        "en",
        "es",
        "fa",
        "fr",
        "id",
        "it",
        "ja",
        "ko",
        "nl",
        "pl",
        "ru",
        "tr",
      ],
      control: { type: "select" },
    },
  },
  args: {
    siteKey: "1x00000000000000000000AA",
    language: "auto",
    theme: "auto",
    appearance: "always",
    execute: "render",
    size: "normal",
    iframeTabindex: 0,
    retryInterval: 6000,
    responseField: true,
    responseFieldName: "cf-turnstile-response",
  },
} as Meta<typeof Turnstile>;
