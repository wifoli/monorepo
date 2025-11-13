import { DataTable as PrimeDataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import type { DataTableProps as PrimeDataTableProps } from 'primereact/datatable'

export interface DataTableProps<T = any> extends PrimeDataTableProps<T[]> {
  columns: Array<{
    field: string
    header: string
    body?: (rowData: T) => React.ReactNode
  }>
}

export function DataTable<T = any>({ columns, className = '', ...props }: DataTableProps<T>) {
  return (
    <PrimeDataTable
      className={`shadow-md ${className}`}
      stripedRows
      paginator
      rows={10}
      {...props}
    >
      {columns.map((col) => (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          body={col.body}
        />
      ))}
    </PrimeDataTable>
  )
}
