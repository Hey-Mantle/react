import { PlanCard } from '../components';
import { Plans } from './test_data/plans';

export default {
  title: 'Example/PlanCard',
  component: PlanCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  args: {
    onSubscribe: () => {},
  }
};

export const Selected = {
  args: {
    plan: Plans[0],
    selected: true,
  }
};

export const NotSelected = {
  args: {
    plan: Plans[0],
    selected: false,
  },
};
