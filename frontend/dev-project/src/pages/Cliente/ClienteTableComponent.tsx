"use client"
 
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table"
 
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CircleDollarSign, EllipsisVertical, HandCoins, UserMinus, UserPen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { getPlanoSpec } from "@/enum/Plano.d"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
 
interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  onEdit: (value:TData) => void;
  onDelete: (value:TData) => void;
}
 
export function ClienteTableComponent<TData, TValue>({
  columns,
  data,
  onEdit,
  onDelete

}: Props<TData, TValue>) {

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel:getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state:{
      sorting,
      columnFilters
    }
  })

  return (
    <>
    <div className="flex items-center py-4">
      <Label>Filtro:</Label>
        <Input
          placeholder="Filtrar por nome..."
          value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
          onChange={(event:any) =>
            table.getColumn("nome")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
   
    <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => 
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                    return(
                        <TableHead key={header.id}>
                            {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header,header.getContext())}
                        </TableHead>
                    )
                })}
                <TableHead className="w-[150px]">Ações</TableHead>
              </TableRow>
            )}
            
          </TableHeader>
          <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {
                      cell.id.includes("plano") ? 
                      getPlanoSpec(row.original?.plano).descricao
                      : flexRender(cell.column.columnDef.cell, cell.getContext())
                    }
                  </TableCell>
                ))}
                <TableCell>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>{row.original?.nome}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Button
                      className="px-2 mx-2"
                      onClick={() => onEdit(row.original)}
                    >
                      <CircleDollarSign />Consultar saldo
                    </Button>
                      </DropdownMenuItem>
                    <DropdownMenuItem>
                    <Button
                      className="px-2 mx-2"
                      onClick={() => onEdit(row.original)}
                    >
                      <HandCoins />Adicionar saldo
                    </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                    <Button
                    className="px-2 mx-2"
                    onClick={() => onEdit(row.original)}
                  >
                    <UserPen />Editar cliente
                  </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Button
                      className="px-2 mx-2"
                      variant={"destructive"}
                      onClick={() => onDelete(row.original)}
                    > 
                      <UserMinus />Excluir cliente
                    </Button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Nenhum resultado encontrado.
              </TableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
        </>
  )}