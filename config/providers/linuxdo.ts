import type { OAuth2Config, OAuthUserConfig } from "next-auth/providers";

export interface LinuxdoProfile {
  id: number;
  username: string;
  name: string;
  avatar_template: string;
  active: boolean;
  trust_level: number;
  silenced: boolean;
  external_ids: string | null;
  api_key: string;
}

export default function Linuxdo(
  config: OAuthUserConfig<LinuxdoProfile>
): OAuth2Config<LinuxdoProfile> {
  const baseUrl = "https://connect.linux.do/oauth2";
  const apiBaseUrl = "https://connect.linux.do/api";

  return {
    id: "linuxdo",
    name: "Linux.do",
    type: "oauth",
    checks: ["state"],
    authorization: {
      url: `${baseUrl}/authorize`,
    },
    token: `${baseUrl}/token`,
    userinfo: {
      url: `${apiBaseUrl}/user`,
      async request({
        tokens,
        provider,
      }: {
        tokens: { access_token: string };
        provider: { userinfo?: { url: URL } };
      }) {
        const profile = await fetch(provider.userinfo?.url as URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
          },
        }).then(async (res) => await res.json());
        return profile;
      },
    },
    profile(profile: LinuxdoProfile) {
      return {
        id: profile.id.toString(),
        username: profile.username,
        name: profile.name,
        avatar_url: profile.avatar_template,
        active: profile.active,
        trust_level: profile.trust_level,
        silenced: profile.silenced
      };
    },
    style: { bg: "#eab308", text: "#fff" },
  };
}
