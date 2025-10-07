import { BackgroundImage, BackgroundImageProps, Box, Center, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

function Wrapper(props: BackgroundImageProps) {
  return (
    <Box maw={300} mx="auto">
      <BackgroundImage {...props}>
        <Center p="md">
          <Text c="white">
            BackgroundImage component can be used to add any content on image. It is useful for hero
            headers and other similar sections
          </Text>
        </Center>
      </BackgroundImage>
    </Box>
  );
}

const code = `
import { BackgroundImage, Center, Text, Box } from '@empoleon/core';


function Demo() {
  return (
    <Box maw={300} mx="auto">
      <BackgroundImage
        {{props}}
      >
        <Center p="md">
          <Text c="white">
            BackgroundImage component can be used to add any content on image. It is useful for hero
            headers and other similar sections
          </Text>
        </Center>
      </BackgroundImage>
    </Box>
  );
}
`;

export const usage: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    { prop: 'radius', type: 'size', initialValue: 'sm', libraryValue: null },
    {
      prop: 'src',
      type: 'select',
      initialValue:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png',
      libraryValue: '__none__',
      data: [
        {
          value:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-6.png',
          label: 'Lighthouse',
        },
        {
          value:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-7.png',
          label: 'Sail boat',
        },
        {
          value:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-10.png',
          label: 'Statue of liberty',
        },
        {
          value:
            'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png',
          label: 'Tropical',
        },
      ],
    },
  ],
};
