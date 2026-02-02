"use server";

import { ProvidersService } from "@/services/provider.service";
import { updateTag } from "next/cache";

const providerService = new ProvidersService();
export async function providerDetailsAction(id: string) {
  const result = await providerService.getProviderDetails(id);
  return result;
}
export async function createProviderAction(data: any) {
  const res = await providerService.createProvider(data);
  if (res.success) updateTag("providers");
  return res;
}

export async function updateProviderAction(name: string, data: any) {
  const res = await providerService.updateProviderDetails(name, data);
  if (res.success) {
    updateTag("providers");
    updateTag(`provider-${name}`);
  }
  return res;
}

export async function deleteProviderAction(id: string) {
  const res = await providerService.deleteProviderDetails(id);
  if (res.success) {
    updateTag("providers");
  }
  return res;
}
