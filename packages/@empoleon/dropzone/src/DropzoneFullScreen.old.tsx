import { tests } from '@empoleon-tests/core';
import {
  DropzoneFullScreen,
  DropzoneFullScreenProps,
  DropzoneFullScreenStylesNames,
} from './DropzoneFullScreen';

const defaultProps: DropzoneFullScreenProps = {
  onDrop: () => {},
  withinPortal: false,
};

describe('@empoleon/dropzone/DropzoneFullScreen', () => {
  tests.itSupportsSystemProps<DropzoneFullScreenProps, DropzoneFullScreenStylesNames>({
    component: DropzoneFullScreen,
    props: defaultProps,
    children: true,
    extend: true,
    withProps: true,
    classes: true,
    id: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/dropzone/DropzoneFullScreen',
    stylesApiSelectors: ['fullScreen'],
    selector: '.empoleon-DropzoneFullScreen-fullScreen',
  });
});
