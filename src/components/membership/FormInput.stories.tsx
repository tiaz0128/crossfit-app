import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import FormInput from './FormInput';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Membership/FormInput',
  component: FormInput,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} as ComponentMeta<typeof FormInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FormInput> = (args) => <FormInput {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  labelText: '라벨명',
  inputType: 'text',
};

export const Secondary = Template.bind({});
Secondary.args = {
  labelText: '숫자',
  inputType: 'number',
};
