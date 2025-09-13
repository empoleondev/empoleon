import { Box, Button, Code, Group, LoadingOverlay, Text } from '@empoleon/core';
import { useFetch } from '@empoleon/hooks';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Box, Button, Code, Group, LoadingOverlay, Text } from '@empoleon/core';
import { useFetch } from '@empoleon/hooks';

interface Item {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function Demo() {
  const { data, loading, error, refetch, abort } = useFetch<Item[]>(
    'https://jsonplaceholder.typicode.com/todos/'
  );

  return (
    <div>
      {error && <Text c="red">{error.message}</Text>}

      <Group>
        <Button onClick={refetch} color="blue">
          Refetch
        </Button>
        <Button onClick={abort} color="red">
          Abort
        </Button>
      </Group>
      <Box pos="relative" mt="md">
        <Code block>{data ? JSON.stringify(data.slice(0, 3), null, 2) : 'Fetching'}</Code>
        <LoadingOverlay visible={loading} />
      </Box>
    </div>
  );
}
`;

interface Item {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function Demo() {
  const fetch = useFetch<Item[]>(
    'https://jsonplaceholder.typicode.com/todos/'
  );

  return (
    <div>
      {/* @ts-ignore */}
      {fetch.error && <Text c="red">{fetch.error().message}</Text>}

      <Group>
        <Button onClick={fetch.refetch} color="blue">
          Refetch
        </Button>
        <Button onClick={fetch.abort} color="red">
          Abort
        </Button>
      </Group>
      <Box pos="relative" mt="md">
        {/* @ts-ignore */}
        <Code block>{fetch.data ? JSON.stringify(fetch.data.slice(0, 3), null, 2) : 'Fetching'}</Code>
        {/* @ts-ignore */}
        <LoadingOverlay visible={fetch.loading} />
      </Box>
    </div>
  );
}

export const useFetchUsage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
