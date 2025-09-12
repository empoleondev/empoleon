import 'dayjs/locale/ru';

import dayjs from 'dayjs';
import { screen } from '@solidjs/testing-library';
import { DatesProvider, useDatesContext } from '@empoleon/dates';
import { render } from '@empoleon-tests/core';
import { JSX } from 'solid-js';

export function expectWeekdaysNames(names: string[]) {
  expect(screen.getAllByRole('columnheader').map((th) => th.textContent)).toStrictEqual(names);
}

interface Options {
  component: (props: any) => JSX.Element;
  props: Record<string, any>;
}

export function itSupportsWeekdaysProps(options: Options, name = 'supports weekdays props') {
  describe(name, () => {
    it('renders weekdays names with en locale by default', () => {
      render(() => <options.component {...options.props} />);
      expectWeekdaysNames(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']);
    });

    it('supports weekdays names localization with locale prop', () => {
      render(() => <options.component {...options.props} locale="ru" />);
      expectWeekdaysNames(['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']);
    });

    it('supports weekdays names localization with DatesProvider', () => {
      const TestConsumer = () => {
        const ctx = useDatesContext();
        return <options.component {...options.props} locale={ctx.locale} />;
      };

      render(() => (
        <DatesProvider settings={{ locale: 'ru' }}>
          <TestConsumer />
        </DatesProvider>
      ));

      expectWeekdaysNames(['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']);
    });

    it('supports changing weekday format', () => {
      render(() => <options.component {...options.props} weekdayFormat="dddd" />);
      expectWeekdaysNames([
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ]);
    });

    it('supports changing weekday format function', () => {
      render(
        () => <options.component
          {...options.props}
          weekdayFormat={(date: Date) => dayjs(date).format('dd')[0]}
        />
      );
      expectWeekdaysNames(['M', 'T', 'W', 'T', 'F', 'S', 'S']);
    });

    it('changes weekdays order based on firstDayOfWeek prop', () => {
      const { rerender } = render(() => <options.component {...options.props} firstDayOfWeek={0} />);
      expectWeekdaysNames(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);

      rerender(() => <options.component {...options.props} firstDayOfWeek={6} />);
      expectWeekdaysNames(['Sa', 'Su', 'Mo', 'Tu', 'We', 'Th', 'Fr']);
    });

    it('changes weekdays order based on firstDayOfWeek defined on DatesProvider', () => {
      const TestConsumer = () => {
        const ctx = useDatesContext();

        return <options.component {...options.props} firstDayOfWeek={ctx.firstDayOfWeek} />;
      };

      render(() => (
        <DatesProvider settings={{ firstDayOfWeek: 4 }}>
          <TestConsumer />
        </DatesProvider>
      ));

      expectWeekdaysNames(['Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We']);
    });
  });
}
