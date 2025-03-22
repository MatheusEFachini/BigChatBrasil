"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormDescription,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getPlanoSpec, Plano } from "@/enum/Plano.d";
import {
  isValidCNPJ,
  isValidCPF,
  isValidPhoneNumber,
  maskCNPJ,
  maskCPF,
  maskTelefone,
} from "@/lib/utils";
import { Cliente } from "@/types/Cliente.d ";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { z } from "zod";

type Props = {
  cliente?: Cliente;
  onSave: (value: Cliente) => void;
};

const ClienteForm: React.FC<Props> = (props) => {
  const validationSchema = z.object({
    id: z.any(),
    nome: z.string().min(2, "Min.2 caracteres"),
    email: z.string().min(1, "Campo obrigatório").email("Email inválido"),
    telefone: z
      .string()
      .min(19, "Número de telefone inválido")
      .max(19, "Número de telefone inválido")
      .refine((val) => isValidPhoneNumber(val), {
        message: "Número de telefone inválido",
      }),
    cpf: z
      .string()
      .min(14, "CPF inválido")
      .max(14, "CPF inválido")
      .refine((val) => isValidCPF(val), {
        message: "CPF inválido",
      }),
    cnpj: z
      .string()
      .min(18, "CNPJ inválido")
      .max(18, "CNPJ inválido")
      .refine((val) => isValidCNPJ(val), {
        message: "CNPJ inválido",
      }),
    razaoSocial: z.string().min(2, "Min.2 caracteres"),
    plano: z.nativeEnum(Plano),
    limiteMaximo: z.number(),
    saldoAtual: z.number(),
  });

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      id: props.cliente?.id ?? undefined,
      nome: props.cliente?.nome ?? "",
      email: props.cliente?.email ?? "",
      telefone: props.cliente?.telefone ?? "",
      cpf: props.cliente?.cpf ?? "",
      cnpj: props.cliente?.cnpj ?? "",
      razaoSocial: props.cliente?.razaoSocial ?? "",
      plano: props.cliente?.plano ?? Plano.PRE_PAGO,
      limiteMaximo: props.cliente?.limiteMaximo ?? 0.0,
      saldoAtual: props.cliente?.saldoAtual ?? 0.0,
    },
  });

  async function onSubmit(values: z.infer<typeof validationSchema>) {
    props.onSave(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <div className="grid items-center text-left gap-2">
              <FormItem>
                <FormLabel>Nome do Cliente</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Nome do pessoa responsável pela empresa.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <div className="grid items-center text-left gap-2">
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormDescription>Email para contato.</FormDescription>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="telefone"
          render={({ field }) => (
            <div className="grid items-center text-left gap-2">
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <InputMask {...field} mask={maskTelefone}>
                    {(inputProps: any) => <Input {...inputProps} type="tel" />}
                  </InputMask>
                </FormControl>
                <FormDescription>Telefone para contato.</FormDescription>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <div className="grid items-center text-left gap-2">
              <FormItem>
                <FormLabel>CPF</FormLabel>
                <FormControl>
                  <InputMask {...field} mask={maskCPF}>
                    {(inputProps: any) => <Input {...inputProps} />}
                  </InputMask>
                </FormControl>
                <FormDescription>CPF da pessoa responsável.</FormDescription>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="razaoSocial"
          render={({ field }) => (
            <div className="grid items-center text-left gap-2">
              <FormItem>
                <FormLabel>Razão Social</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>Razão social da empresa.</FormDescription>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="cnpj"
          render={({ field }) => (
            <div className="grid items-center text-left gap-2">
              <FormItem>
                <FormLabel>CNPJ</FormLabel>
                <FormControl>
                  <InputMask {...field} mask={maskCNPJ}>
                    {(inputProps: any) => <Input {...inputProps} />}
                  </InputMask>
                </FormControl>
                <FormDescription>CNPJ da empresa do cliente.</FormDescription>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />

        <FormField
          control={form.control}
          name="plano"
          render={({ field }) => (
            <div className="grid items-center text-left gap-2">
              <FormItem>
                <FormLabel>Plano BCB</FormLabel>
                <FormControl>
                  <RadioGroup
                    id="plano"
                    defaultValue={getPlanoSpec(field.value).value}
                    onValueChange={field.onChange}
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value={Plano.PRE_PAGO} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        BCB Pré-pago
                      </FormLabel>
                    </FormItem>
                    <FormDescription>Plano pré-pago precisa adicionar saldo á conta, e tem envios ilimitados enquanto tiver saldo, no custo de R$ 0,25 por mensagem.</FormDescription>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value={Plano.POS_PAGO} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        BCB Pós-pago
                      </FormLabel>
                    </FormItem>
                    <FormDescription>Plano pós-pago possui um limite de saldo, que precisa ser indicado e é cobrado R$ 0,25 até atingir o limite.</FormDescription>

                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  );
};

export default ClienteForm;
