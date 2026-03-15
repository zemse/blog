export const config = {
  username: "zemse",
  postsPerPage: 10,
  cacheTtl: 300,
  platforms: {
    devto: {
      label: "Dev.to",
      color: "#0A0A0A",
    },
    medium: {
      label: "Medium",
      color: "#00AB6C",
    },
    substack: {
      label: "Substack",
      color: "#FF6719",
    },
    ethmagicians: {
      label: "Eth Magicians",
      color: "#1c1c38",
    },
    ethresearch: {
      label: "ethresear.ch",
      color: "#223344",
    },
  },
} as const;
