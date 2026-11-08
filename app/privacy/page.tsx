import type { Metadata } from "next";
import Link from "next/link";
import { salon } from "@/config/salon.config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy placeholder for ${salon.name}.`,
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <section className="section legal" aria-labelledby="privacy-title">
      <div className="container legal__body">
        <h1 id="privacy-title">Privacy Policy</h1>
        <p>
          This is a placeholder page for the demo. A real salon replaces it with a policy that explains what personal
          information it collects through its booking and contact forms, how it uses that information and how clients
          can ask for it to be corrected or removed.
        </p>
        <p>
          The demo booking form on this site does not send, store or share anything you type into it.
        </p>
        <Link className="link-action" href="/">
          Back to the home page
        </Link>
      </div>
    </section>
  );
}
