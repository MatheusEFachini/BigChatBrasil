"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Cliente } from "@/types/Cliente.d";
import * as ClienteService from "../../services/ClienteService";
import { useAlert } from "@/components/ui/alert-dialog-provider";
import ClienteForm from "./ClienteForm";


type Props = {
  cliente?: Cliente;
  setOpen: (bool:boolean) => void;
  open: boolean;
};

const ClienteFormDialog: React.FC<Props> = (props) => {

  const alert = useAlert();
  const {toast} = useToast();

  const saveCliente = (cliente:Cliente) => {
    ClienteService.save(cliente)
    .then(() => {
      toast({title:"Sucesso", variant:"default", description:`Cliente ${cliente.nome} foi salvo`})
      props.setOpen(false);
    }).catch(e => {
        alert({
          title:"Erro ao salvar o Cliente",
          body:`${e.response?.data?.code ?? e.status} - ${e.response?.data?.cause ?? e.message}`,
        })
  })
  }

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
    <DialogContent className="sm:max-w-4xl max-h-[468px] overflow-y-scroll">
      <DialogHeader>
        <DialogTitle>Cadastro de Cliente</DialogTitle>
        <DialogDescription>
          Preencha os dados e aperte em "Salvar"
        </DialogDescription>
      </DialogHeader>
        <ClienteForm cliente={props.cliente} onSave={saveCliente}/>
    </DialogContent>
  </Dialog>
  );
};

export default ClienteFormDialog;
