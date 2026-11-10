const LOCAL_HOSTNAMES = new Set(["localhost", "::1"]);

function normalizeHostname(hostname) {
  return String(hostname ?? "").trim().toLowerCase().replace(/^\[|\]$/g, "").replace(/\.$/, "");
}

export function isMetaPixelAllowed(hostname, productionHostnameAllowlist = "") {
  const currentHostname = normalizeHostname(hostname);
  if (!currentHostname || LOCAL_HOSTNAMES.has(currentHostname)) return false;
  if (/^127(?:\.\d{1,3}){3}$/.test(currentHostname)) return false;
  if (currentHostname.endsWith(".localhost") || currentHostname.endsWith(".vercel.app")) return false;

  const allowedHostnames = String(productionHostnameAllowlist)
    .split(",")
    .map(normalizeHostname)
    .filter(Boolean);

  return allowedHostnames.includes(currentHostname);
}
