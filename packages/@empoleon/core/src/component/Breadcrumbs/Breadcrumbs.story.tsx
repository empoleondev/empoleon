import { JSX } from 'solid-js';
import { Anchor } from '../Anchor';
import { Breadcrumbs } from './Breadcrumbs';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'Breadcrumbs',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Usage() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Breadcrumbs>
        <Anchor>Link 1</Anchor>
        <Anchor>Link 2</Anchor>
        <Anchor>Link 3</Anchor>
      </Breadcrumbs>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Breadcrumbs unstyled>
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
      </Breadcrumbs>
    </div>
  );
}
