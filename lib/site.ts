// The site's canonical origin, in one place.
//
// This must match what the host actually serves. decrakerubo.com redirects
// (308) to www.decrakerubo.com, so www is the origin that returns 200 and
// the one every canonical, sitemap entry, and JSON-LD url has to name. When
// these disagreed, each page served at www declared the apex as its
// canonical, the apex redirected straight back to www, and Google discarded
// the declaration and reported the apex URLs as "Page with redirect".
//
// If the primary domain ever changes at the host, change it here, not in
// eleven separate string literals.
export const SITE_URL = "https://www.decrakerubo.com";
