// This file is intentionally modified to resolve a routing conflict.
// By exporting an empty object, we mark this file as an ES module but provide no page component.
// This should prevent Next.js from treating it as a page and causing a parallel route error.
// The active page is located in the /(app) route group.
export {};
