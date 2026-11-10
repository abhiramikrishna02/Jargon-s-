import test from "node:test";
import assert from "node:assert/strict";
import { isMetaPixelAllowed } from "../src/lib/meta-pixel-environment.mjs";

const productionHostname = "www.example.com";

test("allows only an exact, explicitly configured production hostname", () => {
  assert.equal(isMetaPixelAllowed(productionHostname, productionHostname), true);
  assert.equal(isMetaPixelAllowed("example.com", productionHostname), false);
  assert.equal(isMetaPixelAllowed("other.example.com", productionHostname), false);
});

test("disables tracking when the production hostname configuration is missing", () => {
  assert.equal(isMetaPixelAllowed(productionHostname), false);
  assert.equal(isMetaPixelAllowed(productionHostname, "  "), false);
});

test("blocks localhost and loopback hosts even if configured", () => {
  for (const hostname of ["localhost", "127.0.0.1", "127.0.0.2", "[::1]"]) {
    assert.equal(isMetaPixelAllowed(hostname, hostname), false, hostname);
  }
});

test("blocks Vercel deployment hostnames even if configured", () => {
  for (const hostname of ["founderverse-git-main-team.vercel.app", "preview.vercel.app"]) {
    assert.equal(isMetaPixelAllowed(hostname, hostname), false, hostname);
  }
});

test("supports an explicit comma-separated production hostname allowlist", () => {
  assert.equal(isMetaPixelAllowed("shop.example.com", "www.example.com, shop.example.com"), true);
});
