/**
 * About page — fetches from "about" JSON DB collection.
 *
 * Example record in "about" collection:
 *   name: "about"
 *   data: {
 *     title: "About Acme",
 *     subtitle: "We're building the future of developer tooling.",
 *     mission: "Our mission is to make backend development effortless.",
 *     values: [
 *       { icon: "🚀", title: "Speed", description: "Ship in days, not months." },
 *       { icon: "🔒", title: "Security", description: "Auth and data protection by default." },
 *     ],
 *     team: [
 *       { name: "Jane Doe", role: "CEO", avatar: "https://..." }
 *     ]
 *   }
 */

import { AboutPage as AEAboutPage } from "@apiengine/react-sdk";

const APP_NAME = import.meta.env.VITE_APP_NAME || "My App";

export default function AboutPage() {
  return (
    <AEAboutPage
      data={{
        title: `About ${APP_NAME}`,
        subtitle: "We're on a mission to help developers ship faster.",
        mission: "Great software shouldn't require an army of engineers. We built the backend so you can focus on what makes your product unique.",
        values: [
          { icon: "⚡", title: "Speed", description: "Move fast without breaking things." },
          { icon: "🌍", title: "Access", description: "Tools that work for everyone, everywhere." },
        ],
      }}
    />
  );
}
