import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("allows home navigation without supplying optional search fields", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const location = router.buildLocation({ to: "/" });

    expect(location.pathname).toBe("/");
    expect(router.matchRoutes(location.pathname, location.search).at(-1)?.search).toMatchObject({ view: "overview", document: "", q: "" });
  });

  it("keeps a selected demo view when unrelated search fields are omitted", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const location = router.buildLocation({ to: "/", search: { view: "transactions" } });

    expect(router.matchRoutes(location.pathname, location.search).at(-1)?.search).toMatchObject({ view: "transactions", document: "", q: "" });
  });

  it("keeps a document selection without requiring a transaction query", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const location = router.buildLocation({ to: "/analysis", search: { document: "selected-document" } });

    expect(location.pathname).toBe("/analysis");
    expect(router.matchRoutes(location.pathname, location.search).at(-1)?.search).toMatchObject({ document: "selected-document", q: "" });
  });

  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
