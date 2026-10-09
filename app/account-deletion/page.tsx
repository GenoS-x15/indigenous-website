import type { Metadata } from "next";
import { LegalPage } from "@/components/Legal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Account and Data Deletion",
  description: "How to request deletion of your Indigenous app account and the data linked to it.",
  alternates: { canonical: "/account-deletion/" },
};

export default function Page() {
  return (
    <LegalPage title="Account and Data Deletion">
      <section>
        <p>
          Accounts in the Indigenous app are created and removed by {SITE.legalName}, because they are linked to the goat project
          and to the field staff who verify the data. You can ask us to delete your account and the personal data linked to it at
          any time.
        </p>
      </section>

      <section>
        <h2>How to request deletion</h2>
        <ul>
          <li>
            Send an email to <a href={`mailto:${SITE.email}?subject=Account%20deletion%20request`}>{SITE.email}</a> with the subject
            &quot;Account deletion request&quot;.
          </li>
          <li>Include the name, email address and phone number registered in the app, so we can verify that the request is yours.</li>
          <li>Alternatively, ask your Pashu Sakhi or LSS Officer to pass on your request to the administrator.</li>
        </ul>
        <p>We will confirm by email once the account has been removed.</p>
      </section>

      <section>
        <h2>What is deleted</h2>
        <ul>
          <li>Your login account and credentials.</li>
          <li>Your profile: name, email, phone number, profile photograph and location details.</li>
          <li>Push notification tokens linked to your device.</li>
        </ul>
      </section>

      <section>
        <h2>What may be kept</h2>
        <ul>
          <li>Goat milk, health and breeding records that form part of the project, kept without your personal identifiers where possible.</li>
          <li>Information we are required to keep under applicable law, and backups until they are overwritten in the normal cycle.</li>
        </ul>
      </section>

      <section>
        <h2>Timeline</h2>
        <p>We aim to complete deletion within 30 days of verifying your request.</p>
      </section>

      <section>
        <h2>Questions</h2>
        <p>
          Write to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. See also our <a href="/privacy/">Privacy Policy</a>.
        </p>
      </section>
    </LegalPage>
  );
}
