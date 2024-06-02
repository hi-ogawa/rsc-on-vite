"use server";

import { redirect, useActionContext } from "@hiogawa/react-server/server";
import { fakeContacts } from "./_data";
import { tinyassert } from "@hiogawa/utils";

export async function actionDeleteContact(id: string) {
  useActionContext().revalidate = true;
  const contact = await fakeContacts.get(id);
  tinyassert(contact);
  fakeContacts.destroy(contact.id);

  // TODO
  // action response stream renders `src/routes/contacts/[contactId]/page.tsx`
  // but contact doesn't exists anymore and server component throws,
  // which makes this redirect error to not caught by client
  // when users don't have custom error page
  throw redirect("/");
}
