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
    nome: "MATHEUS FACHINI",
    email: "matrexfachini@gmail.com",
    telefone: "+55 (44) 98867-2757",
    cpf: "106.383.709-06",
    cnpj: "12.345.789/0001-99",
    razaoSocial: "teste LTDA",
    plano: Plano.POS_PAGO,
    limiteMaximo: 0,
    saldoAtual: 0,
  },
  {
    id: 2,
    nome: "ANA SILVA",
    email: "ana.silva@email.com",
    telefone: "+55 (11) 99988-7744",
    cpf: "222.333.444-55",
    cnpj: "12.345.789/0001-00",
    razaoSocial: "empresa X LTDA",
    plano: Plano.PRE_PAGO,
    limiteMaximo: 30.0,
    saldoAtual: 15.0,
  },
  {
    id: 3,
    nome: "CARLOS PEREIRA",
    email: "carlos.pereira@email.com",
    telefone: "+55 (21) 99777-1234",
    cpf: "555.666.777-88",
    cnpj: "12.345.789/0001-11",
    razaoSocial: "companhia Y LTDA",
    plano: Plano.POS_PAGO,
    limiteMaximo: 0,
    saldoAtual: 0,
  },
  {
    id: 4,
    nome: "JULIA MENEZES",
    email: "julia.menezes@email.com",
    telefone: "+55 (51) 98855-6677",
    cpf: "888.999.000-11",
    cnpj: "12.345.789/0001-22",
    razaoSocial: "soluções Z LTDA",
    plano: Plano.PRE_PAGO,
    limiteMaximo: 30.0,
    saldoAtual: 10.0,
  },
  {
    id: 5,
    nome: "LUIS OLIVEIRA",
    email: "luis.oliveira@email.com",
    telefone: "+55 (61) 99988-4433",
    cpf: "444.555.666-77",
    cnpj: "12.345.789/0001-33",
    razaoSocial: "tecno A LTDA",
    plano: Plano.POS_PAGO,
    limiteMaximo: 0,
    saldoAtual: 0,
  },
  {
    id: 6,
    nome: "MARIANA SOUZA",
    email: "mariana.souza@email.com",
    telefone: "+55 (85) 98765-4321",
    cpf: "777.888.999-00",
    cnpj: "12.345.789/0001-44",
    razaoSocial: "serviços B LTDA",
    plano: Plano.PRE_PAGO,
    limiteMaximo: 30.0,
    saldoAtual: 20.0,
  },
  {
    id: 7,
    nome: "PEDRO ALMEIDA",
    email: "pedro.almeida@email.com",
    telefone: "+55 (31) 99887-6655",
    cpf: "111.222.333-44",
    cnpj: "12.345.789/0001-55",
    razaoSocial: "infra C LTDA",
    plano: Plano.POS_PAGO,
    limiteMaximo: 0,
    saldoAtual: 0,
  },
  {
    id: 8,
    nome: "RENATA MARTINS",
    email: "renata.martins@email.com",
    telefone: "+55 (41) 97777-5566",
    cpf: "333.444.555-66",
    cnpj: "12.345.789/0001-66",
    razaoSocial: "indústria D LTDA",
    plano: Plano.PRE_PAGO,
    limiteMaximo: 30.0,
    saldoAtual: 25.0,
  },
  {
    id: 9,
    nome: "RICARDO COSTA",
    email: "ricardo.costa@email.com",
    telefone: "+55 (71) 95555-7788",
    cpf: "666.777.888-99",
    cnpj: "12.345.789/0001-77",
    razaoSocial: "comércio E LTDA",
    plano: Plano.POS_PAGO,
    limiteMaximo: 0,
    saldoAtual: 0,
  },
  {
    id: 10,
    nome: "VIVIANE FERREIRA",
    email: "viviane.ferreira@email.com",
    telefone: "+55 (19) 93333-1122",
    cpf: "999.000.111-22",
    cnpj: "12.345.789/0001-88",
    razaoSocial: "consultoria F LTDA",
    plano: Plano.PRE_PAGO,
    limiteMaximo: 30.0,
    saldoAtual: 12.0,
  },
];
