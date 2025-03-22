"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Cliente } from "@/types/Cliente.d";
import ClienteEnvioForm from "./ClienteEnvioForm";
import { Mensagem } from "@/types/Mensagem.d";


type Props = {
  cliente?: Cliente;
  setOpen: (bool:boolean) => void;
  open: boolean;
};

const onSent = (mensagem:Mensagem) => {
  // ClienteService.save(cliente)
  // .then(() => {
  //   toast({title:"Sucesso", variant:"default", description:`Cliente ${cliente.nome} foi salvo`})
  //   props.setOpen(false);
  // }).catch(e => {
  //     alert({
  //       title:"Erro ao salvar o Cliente",
  //       body:`${e.response?.data?.code ?? e.status} - ${e.response?.data?.cause ?? e.message}`,
  //     })
}

const ClienteEnvioDialog: React.FC<Props> = (props) => {

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
    <DialogContent className="sm:max-w-4xl max-h-[468px] overflow-y-scroll">
      <DialogHeader>
        <DialogTitle>Enviar mensagem</DialogTitle>
        <DialogDescription>
          Preencha os dados e aperte em "Enviar"
        </DialogDescription>
      </DialogHeader>
        <ClienteEnvioForm cliente={props.cliente} onSave={onSent}/>
    </DialogContent>
  </Dialog>
  );
};

export default ClienteEnvioDialog;
