import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hritik Mkishra — A Universe of Possibilities" },
      {
        name: "description",
        content:
          "Explore Hritik’s world of programming, web development, and curiosity. Computer Science student at JECRC University, Jaipur.",
      },
      { property: "og:title", content: "Hritik Mkishra — A Universe of Possibilities" },
      {
        property: "og:description",
        content:
          "A curious mind. An infinite universe. Discover projects, skills, and the learning journey of Hritik.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Hritik Mkishra",
          email: "hritik4160@gmail.com",
          telephone: "9752273718",
          sameAs: [
            "https://github.com/hritik4160-oss",
            "https://www.linkedin.com/in/hritik-mishra-b60a38348",
          ],
          affiliation: { "@type": "CollegeOrUniversity", name: "JECRC University" },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Jaipur",
            addressRegion: "Rajasthan",
            addressCountry: "IN",
          },
        }),
      },
    ],
  }),
  component: Portfolio,
});
