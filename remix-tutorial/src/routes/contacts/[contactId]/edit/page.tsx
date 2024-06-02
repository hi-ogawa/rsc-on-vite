import {
  createError,
  redirect,
  useActionContext,
  type PageProps,
} from "@hiogawa/react-server/server";
import { fakeContacts, getContact } from "../../../_data";
import { BackButton } from "./_client";

export default async function EditContact(props: PageProps) {
  const contact = await getContact(props.params["contactId"]);
  if (!contact) {
    throw createError({ status: 404 });
  }

  return (
    <form
      action={async (formData: FormData) => {
        "use server";
        useActionContext().revalidate = true;
        await fakeContacts.set(contact.id, Object.fromEntries(formData));
        throw redirect(`/contacts/${contact.id}`);
      }}
      key={contact.id}
      id="contact-form"
    >
      <p>
        <span>Name</span>
        <input
          defaultValue={contact.first}
          aria-label="First name"
          name="first"
          type="text"
          placeholder="First"
        />
        <input
          aria-label="Last name"
          defaultValue={contact.last}
          name="last"
          placeholder="Last"
          type="text"
        />
      </p>
      <label>
        <span>Twitter</span>
        <input
          defaultValue={contact.twitter}
          name="twitter"
          placeholder="@jack"
          type="text"
        />
      </label>
      <label>
        <span>Avatar URL</span>
        <input
          aria-label="Avatar URL"
          defaultValue={contact.avatar}
          name="avatar"
          placeholder="https://example.com/avatar.jpg"
          type="text"
        />
      </label>
      <label>
        <span>Notes</span>
        <textarea defaultValue={contact.notes} name="notes" rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
        <BackButton type="button">Cancel</BackButton>
      </p>
    </form>
  );
}
