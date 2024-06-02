import { Link, LinkForm } from "@hiogawa/react-server/client";
import { fakeContacts, getContacts } from "./_data";
import {
  redirect,
  useActionContext,
  type LayoutProps,
} from "@hiogawa/react-server/server";
import { GlobalPendingOverlay } from "./_client";

export default async function Layout(props: LayoutProps) {
  const q = new URLSearchParams(props.url.search).get("q");
  const contacts = await getContacts(q);

  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <title>React Server Starter</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <div id="sidebar">
          <h1 style={{ display: "flex" }}>
            <Link href="/">Remix Contacts</Link>
            <span style={{ flex: "1 0 0" }}></span>
            <a
              href="https://github.com/hi-ogawa/react-server-demo-remix-tutorial"
              target="_blank"
            >
              Code
            </a>
          </h1>
          <div>
            <LinkForm action="/" id="search-form" role="search" revalidate>
              <input
                aria-label="Search contacts"
                id="q"
                name="q"
                placeholder="Search"
                type="search"
              />
              <div aria-hidden hidden={true} id="search-spinner" />
            </LinkForm>
            <form action={createNewContact}>
              <button type="submit">New</button>
            </form>
          </div>
          <nav>
            {contacts.length > 0 ? (
              <ul>
                {contacts.map((contact) => (
                  <li key={contact.id}>
                    <Link
                      href={`/contacts/${contact.id}`}
                      activeProps={{ className: "active" }}
                    >
                      {contact.first || contact.last ? (
                        <>
                          {contact.first} {contact.last}
                        </>
                      ) : (
                        <i>No Name</i>
                      )}{" "}
                      {contact.favorite ? <span>★</span> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                <i>No contacts</i>
              </p>
            )}
          </nav>
        </div>
        <div id="detail" style={{ position: "relative" }}>
          {props.children}
          {/* pending state needs to move off to client component */}
          <GlobalPendingOverlay />
        </div>
      </body>
    </html>
  );
}

async function createNewContact() {
  "use server";
  useActionContext().revalidate = true;
  const contact = await fakeContacts.create({});
  throw redirect(`/contacts/${contact.id}/edit`);
}
