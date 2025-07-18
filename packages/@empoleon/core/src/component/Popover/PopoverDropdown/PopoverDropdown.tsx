import { createEffect, createMemo, JSX, splitProps } from 'solid-js';
import { useFocusReturn, useMergedRef } from '@empoleon/hooks';
import {
  Box,
  BoxProps,
  closeOnEscape,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  rem,
  useProps,
} from '../../../core';
import { FloatingArrow } from '../../Floating';
import { FocusTrap } from '../../FocusTrap';
import { OptionalPortal } from '../../Portal';
import { Transition } from '../../Transition';
import type { PopoverStylesNames } from '../Popover';
import { usePopoverContext } from '../Popover.context';
import classes from '../Popover.module.css';

export interface PopoverDropdownProps
  extends BoxProps,
    CompoundStylesApiProps<PopoverDropdownFactory>,
    ElementProps<'div'> {}

export type PopoverDropdownFactory = Factory<{
  props: PopoverDropdownProps;
  ref: HTMLDivElement;
  stylesNames: PopoverStylesNames;
  compound: true;
}>;

const defaultProps: Partial<PopoverDropdownProps> = {};

export const PopoverDropdown = factory<PopoverDropdownFactory>(_props => {
  const props = useProps('PopoverDropdown', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'className',
    'style',
    'vars',
    'children',
    'onKeyDown',
    'variant',
    'classNames',
    'styles',
    'ref'
  ]);

  const ctx = usePopoverContext();
  const isOpened = () => ctx.opened();

  const returnFocus = useFocusReturn({
    opened: isOpened,
    shouldReturnFocus: () => ctx.returnFocus!,
  });

  const accessibleProps = ctx.withRoles
    ? {
        'aria-labelledby': ctx.getTargetId(),
        id: ctx.getDropdownId(),
        role: 'dialog',
        tabIndex: -1,
      }
    : {};

  const mergedRef = useMergedRef(local.ref, ctx.floating);

  if (ctx.disabled) {
    return null;
  }

  const coords = createMemo(() => ({
    top: `${ctx.y() ?? 0}px`,
    left: `${ctx.x() ?? 0}px`,
  }));

  return (
    <OptionalPortal {...ctx.portalProps} withinPortal={ctx.withinPortal}>
      <Transition
        mounted={isOpened()}
        {...ctx.transitionProps}
        transition={ctx.transitionProps?.transition || 'fade'}
        duration={ctx.transitionProps?.duration || 150}
        keepMounted={ctx.keepMounted}
        exitDuration={
          typeof ctx.transitionProps?.exitDuration === 'number'
            ? ctx.transitionProps.exitDuration
            : ctx.transitionProps?.duration
        }
      >
        {(transitionStyles) => (
          <FocusTrap active={isOpened()} innerRef={mergedRef}>
            {(focusTrapProps) => (
              <Box
                {...focusTrapProps}
                {...accessibleProps}
                {...others}
                variant={local.variant}
                onKeyDown={closeOnEscape(
                  () => {
                    ctx.onClose?.();
                    ctx.onDismiss?.();
                  },
                  {
                    active: ctx.closeOnEscape,
                    onTrigger: returnFocus,
                    // @ts-ignore
                    onKeyDown: local.onKeyDown,
                  }
                )}
                data-position={ctx.placement}
                data-fixed={ctx.floatingStrategy === 'fixed' || undefined}
                {...ctx.getStyles('dropdown', {
                  className: local.className,
                  props,
                  classNames: local.classNames,
                  styles: local.styles,
                  style: [
                    {
                      ...transitionStyles,
                      zIndex: ctx.zIndex as JSX.CSSProperties['z-index'],
                      ...coords(),
                      width: ctx.width === 'target' ? undefined : rem(ctx.width),
                      ...(ctx.referenceHidden ? { display: 'none' } : null),
                    },
                    ctx.resolvedStyles.dropdown,
                    local.styles?.dropdown,
                    local.style,
                  ],
                })}
              >
                {local.children}

                <FloatingArrow
                  ref={() => ctx.arrowRef}
                  arrowX={ctx.arrowX}
                  arrowY={ctx.arrowY}
                  visible={ctx.withArrow}
                  position={ctx.placement}
                  arrowSize={ctx.arrowSize}
                  arrowRadius={ctx.arrowRadius}
                  arrowOffset={ctx.arrowOffset}
                  arrowPosition={ctx.arrowPosition}
                  {...ctx.getStyles('arrow', {
                    props,
                    classNames: local.classNames,
                    styles: local.styles,
                  })}
                />
              </Box>
            )}
          </FocusTrap>
         )}
      </Transition>
    </OptionalPortal>
  );
});

PopoverDropdown.classes = classes;
PopoverDropdown.displayName = '@empoleon/core/PopoverDropdown';
