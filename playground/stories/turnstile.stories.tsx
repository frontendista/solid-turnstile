import type { Meta, StoryObj } from "storybook-solidjs";
import { Turnstile } from "@frontendista/solid-turnstile/src";

type Story = StoryObj<typeof Turnstile>;

export const Default: Story = {};

export default {
  title: "Playground/Turnstile",
  component: Turnstile,
  tags: ["autodocs"],
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
    responseFieldName: {
      if: {
        arg: "responseField",
      },
    },
    size: {
      options: ["normal", "compact"],
      control: { type: "radio" },
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
    appearance: {
      options: ["always", "execute", "interaction-only"],
      control: { type: "radio" },
    },
  },
  args: {
    siteKey: "1x00000000000000000000AA",
    theme: "auto",
    responseField: true,
    responseFieldName: "cf-turnstile-response",
    size: "normal",
    language: "auto",
    iframeTabindex: 0,
    retryInterval: 6000,
    appearance: "always",
  },
} as Meta<typeof Turnstile>;
