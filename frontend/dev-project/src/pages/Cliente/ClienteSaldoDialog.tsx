import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Plano } from "@/enum/Plano.d";
import { useToast } from "@/hooks/use-toast";
import { formatToReal, maskCurrencyCentena } from "@/lib/utils";
import { Cliente } from "@/types/Cliente.d ";
import { CircleX, HandCoins, RefreshCcw } from "lucide-react";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";

type Props = {
  cliente: Cliente;
  setOpen: (bool: boolean) => void;
  open: boolean;
} & React.ComponentProps<typeof Slider>;

const ClienteSaldoDialog: React.FC<Props> = ({
  cliente,
  setOpen,
  open,
  ...sliderProps
}) => {
  const [clienteEdit, setClienteEdit] = useState<Cliente>(cliente);
  const [saldo, setSaldo] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    setClienteEdit(cliente);

  }, [cliente]);

  const handleSubmitSaldo = () => {
    const valorNumerico = parseFloat(
      saldo.replace("R$", "").replace(",", ".").trim()
    );
    if (!isNaN(valorNumerico)) {
      if (
        valorNumerico + clienteEdit.saldoAtual > clienteEdit.limiteMaximo &&
        clienteEdit.plano === Plano.POS_PAGO
      ) {
        toast({
          title: "Aviso",
          variant: "default",
          description:
            "Saldo adicional, é maior que o limite permitido, altere o plano ou aumente o limite",
        });
      }
      //   adicionarSaldo(valorNumerico);
    } else {
      toast({
        title: "Aviso",
        variant: "default",
        description: "Valor inválido",
      });
    }
    
    setSaldo("");
  };

  const handleLimiteChange = (val: number) => {
    setClienteEdit((prev) => ({
      ...prev,
      limiteMaximo: val,
    }));
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-center">
          <DrawerTitle>{`${clienteEdit?.nome} - ${clienteEdit?.razaoSocial}`}</DrawerTitle>
          <DrawerDescription>
            Limite de saldo só pode ser alterado para clientes BCB Pós-pago.
          </DrawerDescription>
        </DrawerHeader>
        <Card>
          <CardHeader className="mx-auto">
            <CardTitle className="text-center">
              {clienteEdit.plano === Plano.POS_PAGO ? (
                <h1>
                  {`Saldo Atual: ${formatToReal(
                    clienteEdit?.saldoAtual ?? 0.0
                  )} / Limite pós pago: ${formatToReal(
                    clienteEdit.limiteMaximo ?? 0.0
                  )}`}
                </h1>
              ) : (
                <h1>
                  {`Saldo Atual: ${formatToReal(
                    clienteEdit?.saldoAtual ?? 0.0
                  )}`}
                </h1>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {clienteEdit.plano === Plano.POS_PAGO && (
              <Slider
                className="w-96 mx-auto"
                value={[clienteEdit.limiteMaximo ?? 0.0]}
                min={0}
                max={50.0}
                step={0.25}
                onValueChange={(val) => handleLimiteChange(val[0])}
                {...sliderProps}
              />
            )}
          </CardContent>
        </Card>
        <DrawerFooter>
          <div className="flex mx-auto items-center gap-2">
            <Label>Adicionar Saldo</Label>
            <InputMask
              mask={maskCurrencyCentena}
              value={saldo}
              onChange={(e) => setSaldo(e.target.value)}
              className="input"
            >
              {(inputProps: any) => <Input {...inputProps} />}
            </InputMask>
            <Button type="submit" onClick={handleSubmitSaldo}>
              <HandCoins /> Adicionar saldo
            </Button>
          </div>

          {clienteEdit.plano === Plano.POS_PAGO && (
            <Button
              disabled={clienteEdit?.saldoAtual > clienteEdit.limiteMaximo}
            >
              <RefreshCcw /> Atualizar Limite
            </Button>
          )}
          <Button variant="destructive">
            <CircleX /> Cancelar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ClienteSaldoDialog;
