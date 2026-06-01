const beyondCodeCards = [
  {
    kind: "photography",
    number: "01",
    title: "Photography",
    description: "I notice light, composition, and small visual details.",
    image: "/asset/SunsetPhoto.jpeg",
    imageAlt: "Golden hour photograph by Prajakta Bansod",
    tabImages: [
      {
        src: "/asset/Sunset.jpg",
        alt: "Sunset photograph",
        caption: "golden hour",
      },
      {
        src: "/asset/BahamasFlower.jpg",
        alt: "Flower photograph",
        caption: "small details",
      },
      {
        src: "/asset/Flower1.jpg",
        alt: "Close-up flower photograph",
        caption: "soft detail study",
      },
      {
        src: "/asset/Coffee2.jpg",
        alt: " Coffee photograph",
        caption: "Coffee is my fuel",
      },
    ],
    details: ["light", "framing", "balance"],
  },
  {
    kind: "cooking",
    number: "02",
    title: "Cooking",
    description: "I enjoy process, patience, and creative experimentation.",
    image: "/asset/CookingResult.jpg",
    imageAlt: "Home-cooked dish plated by Prajakta Bansod",
    tabImages: [
      {
        src: "/asset/Cooking.jpg",
        alt: "Cooking ingredients and process photograph",
        caption: "in progress",
      },
    ],
    details: ["prep slowly", "taste often", "adjust freely"],
  },
  {
    kind: "singing",
    number: "03",
    title: "Singing",
    description:
      "I bring rhythm, emotion, and expression into the way I create.",
    image: "/asset/Singing.jpg",
    imageAlt: "Portrait of Prajakta Bansod",
    playlist: {
      title: "Quiet Performance Mode",
      supportLine:
        "A personal soundtrack for focus, feeling, and a little drama.",
      href: "https://open.spotify.com/playlist/6qcxVVHQGvlG2ODow8NfCa?si=QDPkzYMSThu834LtPwPJqQ",
      ctaLabel: "Open Playlist ↗",
    },
    details: ["rhythm", "emotion", "story"],
  },
];

export default beyondCodeCards;
