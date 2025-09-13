import { RangeSlider, Text } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `import { RangeSlider, Text } from '@empoleon/core';

function Demo() {
  return (
    <>
      <Text size="sm">No label</Text>
      <RangeSlider defaultValue={[20, 60]} label={null} />

      <Text size="sm" mt="xl">Formatted label</Text>
      <RangeSlider defaultValue={[20, 60]} label={(value) => \`\${value} °C\`} />

      <Text size="sm" mt="xl">Label always visible</Text>
      <RangeSlider defaultValue={[20, 60]} labelAlwaysOn />

      <Text size="sm" mt="xl">Custom label transition</Text>
      <RangeSlider
        defaultValue={40}
        labelTransitionProps={{
          transition: 'skew-down',
          duration: 150,
          timingFunction: 'linear',
        }}
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Text size="sm">No label</Text>
      <RangeSlider defaultValue={[20, 60]} label={null} />

      <Text size="sm" mt="xl">
        Formatted label
      </Text>
      <RangeSlider defaultValue={[20, 60]} label={(value) => `${value} °C`} />

      <Text size="sm" mt="xl">
        Label always visible
      </Text>
      <RangeSlider defaultValue={[20, 60]} labelAlwaysOn />

      <Text size="sm" mt="xl">
        Custom label transition
      </Text>
      <RangeSlider
        defaultValue={[20, 60]}
        labelTransitionProps={{
          transition: 'skew-down',
          duration: 150,
          timingFunction: 'linear',
        }}
      />
    </>
  );
}

export const label: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 400,
};
