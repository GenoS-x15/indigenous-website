import type { Metadata } from "next";
import { LegalPage } from "@/components/Legal";
import { EmailLink } from "@/components/EmailLink";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Indigenous Goat Breed Development Pvt. Ltd. collects, uses and protects personal data in its website and mobile app.",
  alternates: { canonical: "/privacy/" },
};

export default function Page() {
  return (
    <LegalPage title="Privacy Policy">
      <section>
        <p>
          This policy explains how {SITE.legalName} (&quot;Indigenous&quot;, &quot;we&quot;, &quot;us&quot;) handles personal data
          in the Indigenous mobile app (the &quot;App&quot;) and on this website. The App is used by goat owners, Pashu Sakhi and
          LSS Officers to record and verify goat data. We handle personal data in line with applicable Indian law.
        </p>
      </section>

      <section>
        <h2>Information we collect</h2>
        <ul>
          <li>Account details: name, email address, phone number, role (goat owner, Pashu Sakhi or LSS Officer) and login credentials set by an administrator.</li>
          <li>Profile information: profile photograph and your village, district or location details.</li>
          <li>Goat and farm data you or field staff record: goat identity and identifiers, photographs of goats, weight, age, breed, milk quantity and quality, urine, dung, water intake, health, vaccination and feed records.</li>
          <li>Notification and technical data: a device token for push notifications, app version and crash or diagnostic logs.</li>
        </ul>
      </section>

      <section>
        <h2>App permissions</h2>
        <ul>
          <li>Camera and photo access: only to take or choose a profile photo or a goat photo that you upload.</li>
          <li>Location: only to record the place or village related to your account or entries, when you allow it.</li>
          <li>Notifications: to send entry reminders and review alerts.</li>
        </ul>
        <p>You can withdraw any permission in your device settings. Some features may stop working if you do.</p>
      </section>

      <section>
        <h2>How we use information</h2>
        <ul>
          <li>To create and manage accounts and to let field staff verify daily goat data.</li>
          <li>To run the Zalawadi Goat Milk Enhancement Project: quality control, health tracking, training and reporting.</li>
          <li>To send reminders and important notices about your account.</li>
          <li>To keep the App and website secure, prevent misuse and fix errors.</li>
        </ul>
        <p>We do not sell personal data and we do not use it for third-party advertising.</p>
      </section>

      <section>
        <h2>Who can see your data</h2>
        <p>
          Your data is visible to you and to authorised Indigenous personnel who need it for their role: your Pashu Sakhi, LSS
          Officers and administrators. We use trusted service providers to run the App, including Google Firebase
          (authentication, database, notifications and diagnostics) and our website hosting provider. These providers process data
          on our instructions. We may disclose information when required by law.
        </p>
      </section>

      <section>
        <h2>Security</h2>
        <p>
          Data is sent over encrypted connections, access is limited by role, and administrators control account creation and
          removal. No system is completely secure, so please keep your password private and tell us at once if you suspect misuse.
        </p>
      </section>

      <section>
        <h2>Retention and deletion</h2>
        <p>
          We keep personal data while your account is active and as needed for the project and legal obligations. You can ask us to
          delete your account and data at any time; see <a href="/account-deletion/">Account and data deletion</a>.
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>The App is intended for adults. We do not knowingly collect personal data from children under 18.</p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>We may update this policy. The latest version is always on this page with its update date.</p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          {SITE.legalName}, {SITE.address.join(", ")}.<br />
          Email: <EmailLink />
        </p>
      </section>
    </LegalPage>
  );
}
