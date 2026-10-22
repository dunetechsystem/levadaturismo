import { site } from "@/config/site";
import type { AgencyPublicProfile } from "./dunastour/types";
import { instagramHandle } from "./format";

/** Contato da agência pros componentes do layout — o do DunasTour, ou o do config se a API estiver fora. */
export interface AgencyInfo {
  name: string;
  phone: string;
  instagram: string;
  email: string;
  city: string;
  cnpj: string | null;
  legalName: string | null;
  /** Link do registro no Cadastur (Ministério do Turismo), preenchido pela agência no DunasTour. */
  cadasturUrl: string | null;
}

export function agencyInfo(agency: AgencyPublicProfile | null): AgencyInfo {
  return {
    name: site.name,
    phone: agency?.phone || site.fallbackWhatsapp,
    instagram: instagramHandle(agency?.instagramHandle) ?? site.fallbackInstagram,
    email: site.email,
    city: agency?.addressCity || "Barreirinhas",
    cnpj: agency?.documentCnpj ?? null,
    legalName: agency?.legalName ?? null,
    cadasturUrl: agency?.cadasturUrl || null,
  };
}

export const formatCnpj = (cnpj: string) =>
  cnpj.replace(/\D/g, "").replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
