import { ENV } from "../env.mjs";
import mainLogger from "../logger.mjs";

const logger = mainLogger.child({ service: "cors" });

// Issue #953: Support splitting on comma and | to work around a Portainer
// bug where override environment variables can't include a comma.
// See https://github.com/portainer/portainer/issues/11091
const whitelist = ENV.WHITELISTED_DOMAINS ? ENV.WHITELISTED_DOMAINS.split(/,|\|/) : [];

logger.debug(`Whitelisted domains: ${whitelist.join(",")}`, { domains: whitelist });

// Function to check if the origin matches any of the whitelisted domains.
export function isOriginAllowed(origin: string): boolean {
  return whitelist.some((domain) => {
    let result: boolean;

    if (domain.includes("*")) {
      const regex = new RegExp("^" + domain.replace(/\*/g, "[^.]+") + "$");
      result = regex.test(origin);
    } else {
      result = origin === domain;
    }
    logger.debug(`Tested ${domain} against ${origin}: ${result}`);
    return result;
  });
}
