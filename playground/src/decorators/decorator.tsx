import { Component } from "solid-js";

export const FixedSizeDecorator: Component = (Story: any) => {
  return (
    <div style={{ height: "100px" }}>
      <Story />
    </div>
  );
};
