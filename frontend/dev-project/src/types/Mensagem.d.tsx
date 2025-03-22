import { Cliente } from "./Cliente.d ";

export type Mensagem = {
    id?: number;
    cliente?: Cliente;
    mensagem?: string;
    isWhatsapp?: boolean;
  };