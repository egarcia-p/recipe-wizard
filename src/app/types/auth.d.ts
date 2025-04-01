declare module "@auth0/nextjs-auth0" {
  interface Session {
    user: {
      scope?: string;
      email?: string;
      email_verified?: boolean;
      name?: string;
      nickname?: string;
      picture?: string;
      sub?: string;
      updated_at?: string;
      org_id?: string;
    };
  }
}
