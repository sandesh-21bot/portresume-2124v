declare module "tailwindcss" {
  /**
   * Lightweight fallback types for the Tailwind config imports used by this project.
   * These keep the TypeScript server quiet when the real types can't be resolved.
   */
  const _default: any;
  export type Config = any;
  export default _default;
}
