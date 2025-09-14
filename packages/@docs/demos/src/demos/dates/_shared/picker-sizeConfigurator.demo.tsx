import dayjs from 'dayjs';
import { EmpoleonDemo } from '@empoleonx/demo';
import { Component } from 'solid-js';

const getCodeTemplate = (component: string) =>
  `import dayjs from 'dayjs';
import { ${component} } from '@empoleon/dates';

function Demo() {
  return <${component} defaultValue={dayjs().format('YYYY-MM-DD')}{{props}} />;
}
`;

function getDemo(Component: Component<any>) {
  return (props: any) => <Component defaultValue={dayjs().format('YYYY-MM-DD')} {...props} />;
}

export function getPickerSizeConfiguratorDemo(Component: Component<any>): EmpoleonDemo {
  return {
    type: 'configurator',
    centered: true,
    code: getCodeTemplate((Component as any).displayName!.replace('@empoleon/dates/', '')),
    controls: [{ prop: 'size', type: 'size', initialValue: 'sm', libraryValue: 'sm' }],
    component: getDemo(Component),
  };
}
