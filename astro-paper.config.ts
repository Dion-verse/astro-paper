import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://dion-verse.github.io/fieldnotes/",
    title: "Fieldnotes",
    description: "Practical notes, thoughtful guides, and useful ideas for curious people.",
    author: "Dawda Mbowe",
    profile: "https://github.com/Dion-verse",
    ogImage: "social-card.png",
    lang: "en",
    timezone: "UTC",
    dir: "ltr",
  },
  posts: {
    perPage: 6,
    perIndex: 4,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/Dion-verse/fieldnotes/edit/main/",
    },
    search: "pagefind",
    toc: true,
  },
  socials: [
    { name: "github", url: "https://github.com/Dion-verse" },
    { name: "mail", url: "mailto:dawda@example.com" },
  ],
  shareLinks: [
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "linkedin", url: "https://www.linkedin.com/sharing/share-offsite/?url=" },
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "mail", url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
