import type { Meta, StoryObj } from "storybook-solidjs";
import { Turnstile } from "@frontendista/solid-turnstile/src";

type Story = StoryObj<typeof Turnstile>;

export const Default: Story = {};

export default {
  title: "Turnstile",
  component: Turnstile,
  tags: ["autodocs"],
  argTypes: {
    siteKey: {
      options: {
        Passes: "1x00000000000000000000AA",
        Fails: "2x00000000000000000000AB",
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
  },
  args: {
    siteKey: "1x00000000000000000000AA",
    theme: "auto",
    responseField: true,
    responseFieldName: "cf-turnstile-response",
  },
} as Meta<typeof Turnstile>;
