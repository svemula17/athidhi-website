// Starts the site's Toast menu sync every hour (schedule in wrangler.toml). GitHub skips many of
// its own scheduled runs, so this Cloudflare timer asks GitHub to run the deploy workflow instead.
//
// MENU_SYNC_TOKEN: a fine-grained GitHub token for this repository only, with Actions: Read and
// write. The deploy workflow sets it as a Worker secret (README: "Before going live").
const worker = {
  async scheduled(controller, env) {
    const url = `https://api.github.com/repos/${env.REPOSITORY}/actions/workflows/pages.yml/dispatches`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${env.MENU_SYNC_TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "athidhi-menu-sync",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      // menu_only: redeploy only if the menu on Toast changed.
      body: JSON.stringify({ ref: "main", inputs: { menu_only: "true" } }),
    });
    if (!response.ok) {
      throw new Error(`GitHub didn't start the menu sync (${response.status}): ${await response.text()}`);
    }
  },
};

export default worker;
