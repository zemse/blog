export const config = {
  username: "zemse",
  postsPerPage: 10,
  cacheTtl: 300,
  platforms: {
    devto: {
      label: "Dev.to",
      color: "#0A0A0A",
      colorLight: "#0A0A0A",
      colorDark: "#F5F5F5",
    },
    medium: {
      label: "Medium",
      color: "#00AB6C",
      colorLight: "#00AB6C",
      colorDark: "#00D47E",
    },
  },
} as const;
