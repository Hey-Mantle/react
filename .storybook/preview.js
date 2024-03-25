import "../styles/global.css";

/** @type { import('@storybook/react').Preview } */
const preview = {
  decorators: [
    (Story, context) => (
      <Story />
    ),
  ],
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  }
};

export default preview;
