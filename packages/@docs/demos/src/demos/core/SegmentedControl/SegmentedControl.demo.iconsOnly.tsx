import { IconCode, IconExternalLink, IconEye } from '@tabler/icons-solidjs';
import { SegmentedControl, VisuallyHidden } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { SegmentedControl, VisuallyHidden } from '@empoleon/core';
import { IconEye, IconCode, IconExternalLink } from '@tabler/icons-solidjs';

function Demo() {
  const iconProps = {
    style: { display: 'block' },
    size: 20,
    stroke: 1.5,
  };

  return (
    <SegmentedControl
      data={[
        {
          value: 'preview',
          label: (
            <>
              <IconEye {...iconProps} />
              <VisuallyHidden>Preview</VisuallyHidden>
            </>
          ),
        },
        {
          value: 'code',
          label: (
            <>
              <IconCode {...iconProps} />
              <VisuallyHidden>Code</VisuallyHidden>
            </>
          ),
        },
        {
          value: 'export',
          label: (
            <>
              <IconExternalLink {...iconProps} />
              <VisuallyHidden>Export</VisuallyHidden>
            </>
          ),
        },
      ]}
    />
  );
}
`;

function Demo() {
  const iconProps = {
    style: { display: 'block' },
    size: 20,
    stroke: '1.5',
  };

  return (
    <SegmentedControl
      data={[
        {
          value: 'preview',
          label: (
            <>
              <IconEye {...iconProps} />
              <VisuallyHidden>Preview</VisuallyHidden>
            </>
          ),
        },
        {
          value: 'code',
          label: (
            <>
              <IconCode {...iconProps} />
              <VisuallyHidden>Code</VisuallyHidden>
            </>
          ),
        },
        {
          value: 'export',
          label: (
            <>
              <IconExternalLink {...iconProps} />
              <VisuallyHidden>Export</VisuallyHidden>
            </>
          ),
        },
      ]}
    />
  );
}

export const iconsOnly: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
