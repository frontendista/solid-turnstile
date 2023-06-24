import { Turnstile } from "@frontendista/solid-turnstile/src";
import type { Meta, StoryObj } from "storybook-solidjs";

type Story = StoryObj<typeof Turnstile>;

export const Default: Story = {
  name: "Visible & Success",
  args: {
    siteKey: "1x00000000000000000000AA",
    onLoadCallbackName: "onLoadTurnstileCallback",
  },
};

export const Blocks: Story = {
  name: "Visible & Failure",
  args: {
    siteKey: "2x00000000000000000000AB",
  },
};

export default {
  title: "Turnstile",
  component: Turnstile,
  tags: ["autodocs"],
  argTypes: {
    siteKey: {
      description: "Your Cloudflare Turnstile widget site key.",
    },
    onLoadCallbackName: {
      type: "string",
      description:
        "Name of the callback function to be called when the Turnstile script is loaded.",
    },
    onSuccess: {
      type: "function",
      description:
        "onSuccess is called when the challenge is successfully solved.",
    },
    onError: {
      type: "function",
      description:
        "onError is called when an error occurs during the challenge or connecting to Turnstile.",
    },
    onExpire: {
      type: "function",
      description:
        "onExpire is called when token issued by successful challenge expires.",
    },
  },
} as Meta<typeof Turnstile>;
