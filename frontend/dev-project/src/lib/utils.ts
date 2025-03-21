import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const maskCNPJ = "99.999.999/9999-99";
export const maskCPF = "999.999.999-99";
export const maskTelefone = "+55 (99) 99999-9999";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isValidPhoneNumber(phone: string) {
  const cleanedPhone = phone.replace(/\D/g, '');
  return cleanedPhone.length === 13;
};

export function isValidCPF(cpf: string){
  cpf = cpf.replace(/\D/g, ''); 

  if (cpf.length !== 11) return false;

  if (/^(\d)\1{10}$/.test(cpf)) return false;

  return true;
};

export function isValidCNPJ(cnpj: string) {
  cnpj = cnpj.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

  // Verifica se o CNPJ tem 14 dígitos
  if (cnpj.length !== 14) return false;

  // Valida CNPJs com números repetidos (exemplo: 111.111.111/1111-11)
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  return true;
};

