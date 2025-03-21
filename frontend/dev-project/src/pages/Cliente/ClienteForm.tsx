"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getPlanoSpec, Plano } from "@/enum/Plano.d";
import { Cliente } from "@/types/Cliente.d ";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import validator from "validator";
import { isCPF, isCNPJ } from "validation-br";
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
      .min(1, "Campo obrigatório")
      .refine((val) => validator.isMobilePhone(val), {
        message: "Telefone inválido",
      }),
    cpf: z
      .string()
      .min(1, "Campo obrigatório")
      .refine((val) => isCPF(val), {
        message: "CPF inválido",
      }),
    cnpj: z
      .string()
      .min(1, "Campo obrigatório")
      .refine((val) => isCNPJ(val), {
        message: "CNPJ inválido",
      }),
    razaoSocial: z.string().min(2, "Min.2 caracteres"),
    plano: z.nativeEnum(Plano),
  });

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      id: props.cliente?.id ?? undefined,
      nome: props.cliente?.nome ?? "",
      plano: props.cliente?.plano ?? Plano.PRE_PAGO,
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
                  <Input {...field} type="tel" />
                </FormControl>
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
                  <Input {...field} />
                </FormControl>
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
                  <Input {...field} />
                </FormControl>
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
                <FormLabel>Plano</FormLabel>
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
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value={Plano.POS_PAGO} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        BCB Pós-pago
                      </FormLabel>
                    </FormItem>
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
