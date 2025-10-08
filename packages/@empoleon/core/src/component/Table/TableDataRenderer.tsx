import type { TableData } from './Table';
import {
  TableCaption,
  TableTbody,
  TableTd,
  TableTfoot,
  TableTh,
  TableThead,
  TableTr,
} from './Table.components';

export interface TableDataRendererProps {
  data: TableData;
}

export function TableDataRenderer({ data }: TableDataRendererProps) {
  return (
    <>
      {data.caption && <TableCaption>{data.caption}</TableCaption>}

      {data.head && (
        <TableThead>
          <TableTr>
            {data.head.map((item) => (
              <TableTh>{item}</TableTh>
            ))}
          </TableTr>
        </TableThead>
      )}

      {data.body && (
        <TableTbody>
          {data.body.map((row) => (
            <TableTr>
              {row.map((item) => (
                <TableTd>{item}</TableTd>
              ))}
            </TableTr>
          ))}
        </TableTbody>
      )}

      {data.foot && (
        <TableTfoot>
          <TableTr>
            {data.foot.map((item) => (
              <TableTh>{item}</TableTh>
            ))}
          </TableTr>
        </TableTfoot>
      )}
    </>
  );
}

TableDataRenderer.displayName = '@empoleon/core/TableDataRenderer';
