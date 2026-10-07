import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import ContactRobot from "../components/ContactRobot";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: { absolute: "Book a Moderniza Demo — See Your Own Code Modernized" },
  description:
    "Tell us about your system. In the demo we scan a repository and walk you through the blueprint, the contract, the plan and the cost estimate.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb={[{ label: "Contact" }, { label: "Book a demo" }]}
        eyebrow="/ Book a demo"
        title={<>See Moderniza on <span className="text-gradient">your own code</span>.</>}
        lede="Tell us about your system. In the demo we scan a repository and walk you through the blueprint, the contract, the plan and the cost estimate."
        meta={<><span>We talk</span><span>·</span><span>We scan</span><span>·</span><span>You decide</span></>}
        rightSlot={<ContactRobot variant="form" className="w-[380px] md:w-[420px] h-[520px]" />}
      />
      <ContactForm />
    </>
  );
}
