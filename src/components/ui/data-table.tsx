
import { Table } from 'lucide-react';
import React, { Fragment, useState } from 'react';

import { Checkbox } from '@radix-ui/react-checkbox';

import { Skeleton } from './skeleton';
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from './table';

export interface Column<T> {
  key: keyof T
  header: string
  render?: (value: T[keyof T], item: T) => React.ReactNode
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  isLoading?: boolean
  skeletonRows?: number
  actions?: (item: T) => React.ReactNode
  onSelect?: (selectedItems: T[]) => void
  keyExtractor: (item: T) => string | number
}

export function DataTable<T>({
  columns, data, isLoading, keyExtractor, actions, onSelect, skeletonRows = 5
}: DataTableProps<T>) {
  const [selectedItems, setSelectedItems] = useState<T[]>([])

  const handleSelectAll = (checked: boolean) => {
    setSelectedItems(checked ? [...data] : [])
    onSelect?.(checked ? [...data] : [])
  }

  const handleSelectItem = (item: T, checked: boolean) => {
    const updatedSelection = checked
      ? [...selectedItems, item]
      : selectedItems.filter((i) => keyExtractor(i) !== keyExtractor(item))
    setSelectedItems(updatedSelection)
    onSelect?.(updatedSelection)
  }

  const isSelected = (item: T) => selectedItems.some((i) => keyExtractor(i) === keyExtractor(item))

  const renderSkeletonRow = () => (
    <TableRow>
      {onSelect && <TableCell><Skeleton className="h-4 w-4" /></TableCell>}
      {columns.map((column) => (
        <TableCell key={column.key.toString()}>
          <Skeleton className="h-4 w-full" />
        </TableCell>
      ))}
      {actions && <TableCell><Skeleton className="h-8 w-20" /></TableCell>}
    </TableRow>
  )

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {onSelect && (
            <TableHead className="w-[50px]">
              <Checkbox
                checked={data.length > 0 && selectedItems.length === data.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
          )}
          {columns.map((column) => (
            <TableHead key={column.key.toString()} className="font-semibold">
              {column.header}
            </TableHead>
          ))}
          {actions && <TableHead className="text-right">Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: skeletonRows }).map((_, index) => (
            <Fragment key={index}>{renderSkeletonRow()}</Fragment>
          ))
          : data.map((item) => (
            <TableRow key={keyExtractor(item)}>
              {onSelect && (
                <TableCell>
                  <Checkbox
                    checked={isSelected(item)}
                    onCheckedChange={(checked) => handleSelectItem(item, checked as boolean)}
                  />
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell key={column.key.toString()}>
                  {column.render
                    ? column.render(item[column.key], item)
                    : item[column.key] as React.ReactNode}
                </TableCell>
              ))}
              {actions && <TableCell className="text-right">{actions(item)}</TableCell>}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}