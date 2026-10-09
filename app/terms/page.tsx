import type { Metadata } from "next";
import { LegalPage } from "@/components/Legal";
import { EmailLink } from "@/components/EmailLink";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using the Indigenous website and mobile app.",
  alternates: { canonical: "/terms/" },
};

export default function Page() {
  return (
    <LegalPage title="Terms of Use">
      <section>
        <p>
          By using this website or the {SITE.app.name} mobile app you agree to these terms. If you do not agree, please do not use them.
          The service is provided by {SITE.legalName}.
        </p>
      </section>

      <section>
        <h2>Accounts</h2>
        <ul>
          <li>Accounts are created by authorised Indigenous personnel. You are responsible for keeping your login details private.</li>
          <li>Use your account only for your own role: goat owner, Pashu Sakhi or LSS Officer.</li>
          <li>We may suspend or remove accounts that are misused or no longer needed.</li>
        </ul>
      </section>

      <section>
        <h2>Accurate information</h2>
        <p>
          Please enter goat and milk data honestly and accurately. Field staff may review, correct and confirm entries, and
          confirmed entries are used for quality control and reports.
        </p>
      </section>

      <section>
        <h2>Acceptable use</h2>
        <ul>
          <li>Do not attempt to access other users&apos; data or any part of the system you are not authorised to use.</li>
          <li>Do not upload unlawful, harmful or misleading content.</li>
          <li>Do not interfere with the security or operation of the website or app.</li>
        </ul>
      </section>

      <section>
        <h2>Animal care information</h2>
        <p>
          Guidance on this website is general information and does not replace advice from a qualified veterinarian. Medicine
          doses, vaccination schedules and withdrawal periods must be confirmed with a veterinarian.
        </p>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          The Indigenous name, logo, content and software are owned by or licensed to {SITE.legalName} and the website developer.
          You may not copy or reuse them without permission.
        </p>
      </section>

      <section>
        <h2>Liability</h2>
        <p>
          We work to keep the service available and accurate, but it is provided as is. To the extent permitted by law we are not
          liable for indirect losses arising from its use.
        </p>
      </section>

      <section>
        <h2>Changes and contact</h2>
        <p>
          We may update these terms; the latest version is on this page. Questions: <EmailLink />.
          See also our <a href="/privacy/">Privacy Policy</a>.
        </p>
      </section>
    </LegalPage>
  );
}
