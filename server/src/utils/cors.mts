import { ENV } from "../env.mjs";
import mainLogger from "../logger.mjs";

const logger = mainLogger.child({ service: "cors" });

// Function to check if the origin matches any of the whitelisted domains
const whitelist = ENV.WHITELISTED_DOMAINS ? ENV.WHITELISTED_DOMAINS.split(",") : [];

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
