import cx from 'clsx';
import { BoxProps, ElementProps, EmpoleonRadius, EmpoleonShadow } from '../../core';
import { FocusTrap } from '../FocusTrap';
import { Paper } from '../Paper';
import { Transition, TransitionOverride } from '../Transition';
import { useModalBaseContext } from './ModalBase.context';
import classes from './ModalBase.module.css';
import { JSX, splitProps } from 'solid-js';

export interface ModalBaseContentProps extends BoxProps, ElementProps<'div'> {
  /** Props passed down to the `Transition` component */
  transitionProps?: TransitionOverride;

  /** Key of `theme.shadows` or any valid CSS value to set `box-shadow`, `none` by default */
  shadow?: EmpoleonShadow;

  /** Key of `theme.radius` or any valid CSS value to set border-radius, numbers are converted to rem, `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;
}

interface _ModalBaseContentProps extends ModalBaseContentProps {
  innerProps: JSX.HTMLAttributes<HTMLDivElement>;
}

export function ModalBaseContent(props: _ModalBaseContentProps) {
  const [local, others] = splitProps(props, [
    'transitionProps',
    'className',
    'innerProps',
    'onKeyDown',
    'style',
    'ref'
  ]);

  const ctx = useModalBaseContext();

  return (
    <Transition
      mounted={ctx.opened()}
      transition="pop"
      {...ctx.transitionProps}
      onExited={() => {
        ctx.onExitTransitionEnd?.();
        ctx.transitionProps?.onExited?.();
      }}
      onEntered={() => {
        ctx.onEnterTransitionEnd?.();
        ctx.transitionProps?.onEntered?.();
      }}
      {...local.transitionProps}
    >
      {(transitionStyles) => (
        <div
          {...local.innerProps}
          class={cx(
            { [classes.inner]: !ctx.unstyled },
            local.innerProps.class,
            (local.innerProps as any).className
          )}
        >
          <FocusTrap active={ctx.opened() && ctx.trapFocus()!} innerRef={local.ref}>
            {(focusTrapProps) => (
              <Paper
                {...focusTrapProps}
                {...others}
                // component="section"
                role="dialog"
                tabIndex={-1}
                aria-modal
                aria-describedby={ctx.bodyMounted ? ctx.getBodyId() : undefined}
                aria-labelledby={ctx.titleMounted ? ctx.getTitleId() : undefined}
                style={[local.style, transitionStyles]}
                className={cx({ [classes.content]: !ctx.unstyled }, local.className)}
                unstyled={ctx.unstyled}
              >
                {others.children}
              </Paper>
            )}
          </FocusTrap>
        </div>
      )}
    </Transition>
  );
}

ModalBaseContent.displayName = '@empoleon/core/ModalBaseContent';
