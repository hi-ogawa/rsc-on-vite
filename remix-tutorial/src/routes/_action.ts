"use server";

import { redirect, revalidatePath } from "@hiogawa/react-server/server";
import { fakeContacts } from "./_data";
import { tinyassert } from "@hiogawa/utils";

export async function actionDeleteContact(id: string) {
  revalidatePath("/");
  const contact = await fakeContacts.get(id);
  tinyassert(contact);
  fakeContacts.destroy(contact.id);
  throw redirect("/");
}
