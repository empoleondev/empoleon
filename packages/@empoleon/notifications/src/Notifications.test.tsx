import { tests } from '@empoleon-tests/core';
import { Notifications, NotificationsProps, NotificationsStylesNames } from './Notifications';

const defaultProps: NotificationsProps = {
  withinPortal: false,
};

describe('@empoleon/core/Notifications', () => {
  tests.itSupportsSystemProps<NotificationsProps, NotificationsStylesNames>({
    component: Notifications,
    props: defaultProps,
    mod: true,
    styleProps: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/notifications/Notifications',
    stylesApiSelectors: ['root'],
  });
});
