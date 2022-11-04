import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Text, TextSize } from '../src';
import { makeStory } from './utils';

export default {
  title: 'Common/Text',
  component: Text,
} as ComponentMeta<typeof Text>;

const sizes = ['2xl', 'xl', 'lg', 'md', 'sm', 'xs'];

const Template: ComponentStory<typeof Text> = args => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {sizes.map(size => {
        return (
          <div key={size}>
            <h3>{size}</h3>
            <Text size={size as TextSize} {...args} />
          </div>
        );
      })}
    </div>
  );
};

export const Basic = makeStory(Template, {
  args: {
    value: 'value',
    children: 'Text',
  },
});
