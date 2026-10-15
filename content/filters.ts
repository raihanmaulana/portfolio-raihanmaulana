// Kept apart from site.ts, which reads the filesystem and is server-only;
// the project grid imports these in the browser.
export const filterIds = [
  "laravel",
  "php",
  "java-vue",
  "react-next",
  "python",
] as const;

export type FilterId = (typeof filterIds)[number];

export const filterLabels: Record<FilterId, string> = {
  laravel: "Laravel",
  php: "PHP",
  "java-vue": "Java & Vue.js",
  "react-next": "React & Next.js",
  python: "Python",
};
