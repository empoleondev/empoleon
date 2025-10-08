import { createContextContainer, patchConsoleError, render } from '@empoleon-tests/core';
import { Menu } from '../Menu';
import { MenuSubTarget } from './MenuSubTarget';

// const defaultProps: MenuSubTargetProps = {
//   children: <div>test</div>,
// };

const TestContainer = createContextContainer(MenuSubTarget, Menu, { opened: true });

describe('@empoleon/core/MenuSubTarget', () => {
  it('throws error when rendered outside of context', () => {
    const ContextErrorComponent = () => {
      throw new Error('Combobox component was not found in tree');
    };

    patchConsoleError();

    expect(() => {
      render(() => <ContextErrorComponent />);
    }).toThrow('Combobox component was not found in tree');

    patchConsoleError.release();
  });

  it('throws error if children cannot be processed', () => {
    const error = new Error(
      'Menu.Sub.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
    );
    patchConsoleError();
    expect(() => render(() => <TestContainer>Hello</TestContainer>)).toThrow(error);
    expect(() => render(() => <TestContainer>{2}</TestContainer>)).toThrow(error);
    expect(() =>
      render(() => (
        <TestContainer>
          <>fragment</>
        </TestContainer>
      ))
    ).toThrow(error);
    expect(() =>
      render(() => (
        <TestContainer>
          <div>node 1</div>
          <div>node 2</div>
        </TestContainer>
      ))
    ).toThrow(error);
    patchConsoleError.release();
  });

  it('has correct displayName', () => {
    expect(MenuSubTarget.displayName).toEqual('@empoleon/core/MenuSubTarget');
  });
});
