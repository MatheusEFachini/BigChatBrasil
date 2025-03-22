import { useAlert, useConfirm } from "@/components/ui/alert-dialog-provider";
import { useToast } from "@/hooks/use-toast";
import { Cliente, clienteMockList, columnsCliente } from "@/types/Cliente.d ";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import * as ClienteService from "../../services/ClienteService";
import ClienteEnvioDialog from "../ClienteEnvio/ClienteEnvioDialog";
import ClienteFormDialog from "./ClienteFormDialog";
import ClienteSaldoDialog from "./ClienteSaldoDialog";
import { ClienteTableComponent } from "./ClienteTableComponent";

const ClienteListPage = () => {
  const [openForm, setOpenForm] = useState(false);
  const [openSaldo, setOpenSaldo] = useState(false);
  const [openEnvio, setOpenEnvio] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] =
    useState<Cliente>({})
const [Clientes, setClientes] = useState<Cliente[]>([])

  const confirm = useConfirm();
  const alert = useAlert();
  const {toast} = useToast();

  useEffect(() => {
    getClientes();
  },[]);

  const getClientes = () => {
    setClientes(clienteMockList);
    // ClienteService.fetchAll()
    // .then(res => {
      // setClientes(res?.data);
  //   }).catch(e => {
  //     if(e.status == 404){
  //       setClientes([])
  //     }else{
  //       alert({
  //         title:"Erro ao buscar os Clientes",
  //         body:`${e.response?.data?.code ?? e.status} - ${e.response?.data?.cause ?? e.message}`,
  //       })
  //     }
  // })
  }

  const onRemove = async (cliente: Cliente) => {
    await confirm({
      title:`Deseja excluir o Cliente ${cliente.nome}?`,
      body:"Essa ação não pode ser desfeita",
      actionButton:"Sim",
      cancelButton:"Não"
    }).then(res => {
      if(res){
        ClienteService.remove(cliente)
        .then(() => {
          toast({title:"Sucesso", variant:"default", description:`Cliente ${cliente.nome} foi excluído`})
          getClientes();
        }).catch(e => {
          alert({
            title:"Erro ao remover o cliente",
            body:`${e.response?.data?.code ?? e.status} - ${e.response?.data?.cause ?? e.message}`,
          })
        })
      }
    })
  }

  function callFormDialog(cliente?: Cliente) {
    setClienteSelecionado(cliente ?? {});
    setOpenForm(true);
  }

  function callSaldoDialog(cliente?: Cliente) {
    setClienteSelecionado(cliente ?? {});
    setOpenSaldo(true);
  }

  function callEnvioDialog(cliente?: Cliente) {
    setClienteSelecionado(cliente ?? {});
    setOpenEnvio(true);
  }

  function updateListAfterSave(dialogOpen: boolean) {
    getClientes();
    setOpenSaldo(dialogOpen);
    setOpenEnvio(dialogOpen);
    setOpenForm(dialogOpen);
  }

  return (
    <div className="p-6 w-full mx-auto">
      <div className="border rounded-lg p-2">
        <h1 className="text-3xl font-bold">Clientes</h1>

        <ClienteEnvioDialog 
        cliente={clienteSelecionado}
        open={openEnvio}
        setOpen={updateListAfterSave}
        />

        <ClienteFormDialog
          cliente={clienteSelecionado}
          open={openForm}
          setOpen={updateListAfterSave}
        />

        <ClienteSaldoDialog 
        cliente={clienteSelecionado}
        open={openSaldo}
        setOpen={updateListAfterSave}
        />

        <div className="flex items-center justify-between">
          <Button onClick={() => callFormDialog()}>
            <PlusCircle className="w-4 h-4 mr-2" />
            <span>Novo Cliente</span>
          </Button>
        </div>

        <ClienteTableComponent 
        columns={columnsCliente} 
        data={Clientes} 
        onEdit={callFormDialog} 
        checkSaldo={callSaldoDialog} 
        onEnvio={callEnvioDialog}
        onDelete={onRemove} />
      </div>
    </div>
  );
};

export default ClienteListPage;
