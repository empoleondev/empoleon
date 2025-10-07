import { render, screen, tests } from '@empoleon-tests/core';
import { Breadcrumbs, BreadcrumbsProps, BreadcrumbsStylesNames } from './Breadcrumbs';

const defaultProps: BreadcrumbsProps = {
  children: [<div>1</div>, <div>2</div>, <div>3</div>],
};

describe('@empoleon/core/Breadcrumbs', () => {
  tests.itSupportsSystemProps<BreadcrumbsProps, BreadcrumbsStylesNames>({
    component: Breadcrumbs,
    props: defaultProps,
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    id: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/Breadcrumbs',
    stylesApiSelectors: ['root', 'breadcrumb', 'separator'],
  });

  it('renders correct amount of children and separators', () => {
    const { container } = render(() => <Breadcrumbs {...defaultProps} />);
    expect(container.querySelectorAll('.empoleon-Breadcrumbs-breadcrumb')).toHaveLength(3);
    expect(container.querySelectorAll('.empoleon-Breadcrumbs-separator')).toHaveLength(2);
  });

  it('accepts separator from props', () => {
    render(() => <Breadcrumbs separator="test-separator" {...defaultProps} />);
    expect(screen.getAllByText('test-separator')).toHaveLength(2);
  });

  it('allows to set child className', () => {
    render(() => (
      <Breadcrumbs>
        <button type="button" class="test-class">
          test-label
        </button>
      </Breadcrumbs>
    ));

    expect(screen.getByRole('button')).toHaveClass('test-class');
  });
});
