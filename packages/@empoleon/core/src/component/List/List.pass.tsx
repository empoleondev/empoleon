import { render, tests } from '@empoleon-tests/core';
import { List, ListProps, ListStylesNames } from './List';
import { ListItem } from './ListItem/ListItem';

describe('@empoleon/core/List', () => {
  tests.itSupportsSystemProps<ListProps, ListStylesNames>({
    component: List,
    props: () => ({
      children: [
        <List.Item icon="$">
          1
        </List.Item>,
        <List.Item icon="$">
          2
        </List.Item>,
        <List.Item icon="$">
          3
        </List.Item>,
      ],
    }),
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    id: true,
    refType: HTMLUListElement,
    displayName: '@empoleon/core/List',
    stylesApiSelectors: ['root', 'item', 'itemIcon', 'itemLabel', 'itemWrapper'],
  });

  it('changes root element based on type prop', () => {
    const { container, rerender } = render(() => <List children={<>
      <List.Item icon="$">1</List.Item>
      <List.Item icon="$">2</List.Item>
      <List.Item icon="$">3</List.Item>
    </>} type="ordered" />);
    expect(container.querySelector('ul')).toBe(null);
    expect(container.querySelector('ol')).not.toBe(null);

    rerender(() => <List children={<>
      <List.Item icon="$">1</List.Item>
      <List.Item icon="$">2</List.Item>
      <List.Item icon="$">3</List.Item>
    </>} type="unordered" />);
    expect(container.querySelector('ul')).not.toBe(null);
    expect(container.querySelector('ol')).toBe(null);
  });

  it('exposes ListItem as List.Item', () => {
    expect(List.Item).toBe(ListItem);
  });
});
