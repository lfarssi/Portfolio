/**
 * Site settings kept in source for now (no environment variables).
 * EmailJS: fill the three IDs from the EmailJS dashboard to enable the contact form.
 * The service ID, template ID and public key are not secrets.
 */
export const siteConfig = {
  /** Public base URL, no trailing slash. */
  url: "https://mohamed-el-farssi.vercel.app",
  emailJs: {
    serviceId: "",
    templateId: "",
    publicKey: "",
  },
} as const;

export const siteUrl: string = siteConfig.url;

export const emailJsConfig =
  siteConfig.emailJs.serviceId && siteConfig.emailJs.templateId && siteConfig.emailJs.publicKey
    ? siteConfig.emailJs
    : null;
