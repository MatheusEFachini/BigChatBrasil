import { Plano } from "@/enum/Plano.d";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

export type Cliente = {
  id?: number;
  nome?: string;
  plano?: Plano;
  email?: string;
  telefone?: string;
  cpf?: string;
  cnpj?: string;
  razaoSocial?: string;
  limiteMaximo?: number;
  saldoAtual?: number;
};

export const columnsCliente: ColumnDef<Cliente>[] = [
  {
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "plano",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Plano
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "telefone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Telefone
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "razaoSocial",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome Empresa
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
];

export const clienteMockList: Cliente[] = [
  {
    id: 1,
    nome: "Carlos Silva",
    plano: Plano.POS_PAGO,
    email: "carlos.silva@email.com",
    telefone: "+55 (11) 98765-4321",
    cpf: "123.456.789-00",
    cnpj: "12.345.678/0001-99",
    razaoSocial: "Carlos & Cia LTDA",
    limiteMaximo: 25.5,
    saldoAtual: 20.0,
  },
  {
    id: 2,
    nome: "Ana Oliveira",
    plano: Plano.PRE_PAGO,
    email: "ana.oliveira@email.com",
    telefone: "+55 (21) 98765-4321",
    cpf: "987.654.321-00",
    cnpj: "34.567.890/0001-12",
    razaoSocial: "Oliveira Consultoria",
    limiteMaximo: 28.0,
    saldoAtual: 25.0,
  },
  {
    id: 3,
    nome: "Pedro Santos",
    plano: Plano.POS_PAGO,
    email: "pedro.santos@email.com",
    telefone: "+55 (31) 98765-4321",
    cpf: "135.246.357-01",
    cnpj: "45.678.901/0001-34",
    razaoSocial: "Santos Comércio",
    limiteMaximo: 30.0,
    saldoAtual: 28.0,
  },
  {
    id: 4,
    nome: "Mariana Costa",
    plano: Plano.PRE_PAGO,
    email: "mariana.costa@email.com",
    telefone: "+55 (41) 98765-4321",
    cpf: "246.357.468-02",
    cnpj: "56.789.012/0001-45",
    razaoSocial: "Costa Comércio",
    limiteMaximo: 22.5,
    saldoAtual: 18.0,
  },
  {
    id: 5,
    nome: "João Pereira",
    plano: Plano.POS_PAGO,
    email: "joao.pereira@email.com",
    telefone: "+55 (61) 98765-4321",
    cpf: "654.987.321-03",
    cnpj: "67.890.123/0001-56",
    razaoSocial: "Pereira Corp",
    limiteMaximo: 29.0,
    saldoAtual: 22.0,
  },
  {
    id: 6,
    nome: "Luciana Lima",
    plano: Plano.PRE_PAGO,
    email: "luciana.lima@email.com",
    telefone: "+55 (51) 98765-4321",
    cpf: "741.852.963-04",
    cnpj: "78.901.234/0001-67",
    razaoSocial: "Lima Consulting",
    limiteMaximo: 26.0,
    saldoAtual: 22.5,
  },
  {
    id: 7,
    nome: "Felipe Rocha",
    plano: Plano.POS_PAGO,
    email: "felipe.rocha@email.com",
    telefone: "+55 (71) 98765-4321",
    cpf: "852.963.741-05",
    cnpj: "89.012.345/0001-78",
    razaoSocial: "Rocha Negócios",
    limiteMaximo: 30.0,
    saldoAtual: 29.0,
  },
  {
    id: 8,
    nome: "Juliana Souza",
    plano: Plano.PRE_PAGO,
    email: "juliana.souza@email.com",
    telefone: "+55 (81) 98765-4321",
    cpf: "963.852.741-06",
    cnpj: "90.123.456/0001-89",
    razaoSocial: "Souza Digital",
    limiteMaximo: 27.0,
    saldoAtual: 24.5,
  },
  {
    id: 9,
    nome: "Renato Almeida",
    plano: Plano.POS_PAGO,
    email: "renato.almeida@email.com",
    telefone: "+55 (91) 98765-4321",
    cpf: "123.456.987-07",
    cnpj: "12.345.678/0001-90",
    razaoSocial: "Almeida Comércio",
    limiteMaximo: 27.5,
    saldoAtual: 23.0,
  },
  {
    id: 10,
    nome: "Patrícia Martins",
    plano: Plano.PRE_PAGO,
    email: "patricia.martins@email.com",
    telefone: "+55 (81) 98765-4321",
    cpf: "741.963.258-08",
    cnpj: "34.567.890/0001-12",
    razaoSocial: "Martins Consultoria",
    limiteMaximo: 29.0,
    saldoAtual: 20.0,
  },
];
