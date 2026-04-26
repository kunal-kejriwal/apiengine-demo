/**
 * Pricing page — fetches from "plans" JSON DB collection by default.
 *
 * To add plans: go to APIEngine dashboard → JSON DB → Create collection "plans"
 * then add one record per plan.
 *
 * Example plan record:
 *   name: "Pro"
 *   data: {
 *     price: "$49", period: "/mo",
 *     description: "For growing products",
 *     features: ["10K API calls/day", "Webhooks", "Custom schemas"],
 *     featured: true, badge: "Most popular",
 *     ctaText: "Start free trial", ctaHref: "/signup"
 *   }
 */

import { PricingPage as AEPricingPage } from "@apiengine/react-sdk";

const APP_NAME = import.meta.env.VITE_APP_NAME || "My App";

export default function PricingPage() {
  return (
    <AEPricingPage
      title={`${APP_NAME} pricing`}
      subtitle="Simple, transparent pricing. No hidden fees."
      plans={[
        {
          name: "Free",
          price: "$0", period: "/mo",
          description: "Get started at no cost",
          features: ["100 API calls/day", "500 records", "Community support"],
          ctaText: "Start free", ctaHref: "/signup",
        },
        {
          name: "Pro",
          price: "$49", period: "/mo",
          description: "For serious builders",
          features: ["10K calls/day", "Webhooks", "Custom schemas", "Priority support"],
          featured: true, badge: "Most popular",
          ctaText: "Start Pro", ctaHref: "/signup",
        },
      ]}
    />
  );
}
