"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { isValidPhoneNumber, maskTelefone } from "@/lib/utils";
import { Cliente } from "@/types/Cliente.d ";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { z } from "zod";

type Props = {
  cliente?: Cliente;
  onSave: (value: Cliente) => void;
};

const ClienteEnvioForm: React.FC<Props> = (props) => {
  const validationSchema = z.object({
    id: z.number(),
    idCliente: z.number(),
    mensagem: z
      .string()
      .min(10, "Mensagem teve ter no mínimo 10 caracteres")
      .max(250, "Mensagem não pode ter mais que 250 caracteres"),
    telefoneUsuario: z
      .string()
      .min(19, "Número de telefone inválido")
      .max(19, "Número de telefone inválido")
      .refine((val) => isValidPhoneNumber(val), {
        message: "Número de telefone inválido",
      }),
    isWhatsapp: z.boolean(),
  });

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {},
  });

  async function onSubmit(values: z.infer<typeof validationSchema>) {
    props.onSave(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="telefoneUsuario"
          render={({ field }) => (
            <div className="grid items-center text-left gap-2">
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <InputMask {...field} mask={maskTelefone}>
                    {(inputProps: any) => <Input {...inputProps} type="tel" />}
                  </InputMask>
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="isWhatsapp"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>WhatsApp</FormLabel>
                <FormDescription>
                  Envia ao número de WhatsApp do cliente, mantenha desmarcado
                  para enviar como SMS.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mensagem"
          render={({ field }) => (
            <div className="grid items-center text-left gap-2">
              <FormItem>
                <FormLabel>Mensagem</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Escreva mensagem que deseja enviar"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Cada mensagem remove R$ 0,25 do saldo do seu plano,
                  certifique-se que possui saldo o suficiente, ou não atingiu o
                  limite do seu plano.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />

        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
};

export default ClienteEnvioForm;
