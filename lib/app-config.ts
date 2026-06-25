export const appConfig = {
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'Digital Business Cards',
  organizationName:
    process.env.NEXT_PUBLIC_ORGANIZATION_NAME || 'Digital Business Cards',
  adminTitle: process.env.NEXT_PUBLIC_ADMIN_TITLE || 'Admin',
  description:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
    'Create, manage, and share digital business cards.',
  defaultWebsite:
    process.env.NEXT_PUBLIC_DEFAULT_WEBSITE || 'yourcompany.com',
  logoPath: process.env.NEXT_PUBLIC_LOGO_PATH || '',
  logoAlt: process.env.NEXT_PUBLIC_LOGO_ALT || 'Digital Business Cards',
  logoWidth: Number(process.env.NEXT_PUBLIC_LOGO_WIDTH || 160),
  logoHeight: Number(process.env.NEXT_PUBLIC_LOGO_HEIGHT || 48),
};

export function hasBrandLogo() {
  return Boolean(appConfig.logoPath.trim());
}
