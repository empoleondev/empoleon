import { splitProps } from 'solid-js';
import { factory, Factory, useProps } from '../../../core';
import { Popover, PopoverDropdownProps } from '../../Popover';
import { useComboboxContext } from '../Combobox.context';
import classes from '../Combobox.module.css';

export type ComboboxDropdownStylesNames = 'dropdown';

export interface ComboboxDropdownProps extends PopoverDropdownProps {
  /** Determines whether the dropdown should be hidden, for example, when there are no options to display */
  hidden?: boolean;
}

export type ComboboxDropdownFactory = Factory<{
  props: ComboboxDropdownProps;
  ref: HTMLDivElement;
  stylesNames: ComboboxDropdownStylesNames;
  compound: true;
}>;

export const ComboboxDropdown = factory<ComboboxDropdownFactory>((_props) => {
  const props = useProps('ComboboxDropdown', null, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'styles',
    'className',
    'style',
    'hidden',
    'ref',
  ]);

  const ctx = useComboboxContext();

  return (
    <Popover.Dropdown
      {...others}
      ref={local.ref}
      role="presentation"
      data-hidden={local.hidden || undefined}
      {...ctx.getStyles('dropdown', {
        className: local.className,
        style: local.style,
        classNames: local.classNames,
        styles: local.styles,
      })}
    />
  );
});

ComboboxDropdown.classes = classes;
ComboboxDropdown.displayName = '@empoleon/core/ComboboxDropdown';
