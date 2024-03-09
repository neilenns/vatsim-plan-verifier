import mainLogger from "../logger.mjs";

const logger = mainLogger.child({ service: "cors" });

let whitelist: string[] = [];

export function setWhitelist(whitelistedDomains?: string): void {
  // Issue #953: Support splitting on comma and | to work around a Portainer
  // bug where override environment variables can't include a comma.
  // See https://github.com/portainer/portainer/issues/11091
  // Issue #1027: Sometimes I accidentally include a trailing / on the URLs when specifying
  // the whitelisted domains, which makes that test fail every time since the incoming URLs
  // never have a trailing slash. Add the map to strip the trailing slash if it was provided.
  if (whitelistedDomains == null) {
    whitelist = [];
  } else {
    whitelist = whitelistedDomains.split(/,|\|/).map((domain) => domain.replace(/\/$/, ""));
  }
  logger.debug(`Whitelisted domains: ${whitelist.join(",")}`, { domains: whitelist });
}

// Function to check if the origin matches any of the whitelisted domains.
export function isOriginAllowed(origin: string): boolean {
  return whitelist.some((domain) => {
    let result: boolean;

    if (domain.includes("*")) {
      // This is fine, comes from environment variables.
      // eslint-disable-next-line security/detect-non-literal-regexp
      const regex = new RegExp("^" + domain.replace(/\*/g, "[^.]+") + "$");
      result = regex.test(origin);
    } else {
      result = origin === domain;
    }
    logger.debug(`Tested ${domain} against ${origin}: ${result}`);
    return result;
  });
}
