import ReactMarkdown, { defaultUrlTransform } from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

const README_REVALIDATE_SECONDS = 86400;
const MAX_README_BYTES = 200_000;

// Image hosts allowed by the CSP (img-src). Anything else is dropped.
const ALLOWED_IMAGE_HOSTS = new Set([
  "raw.githubusercontent.com",
  "github.com",
  "user-images.githubusercontent.com",
  "private-user-images.githubusercontent.com",
  "camo.githubusercontent.com",
]);

/** Returns the first README that exists, with the URL it was found at. */
async function fetchReadme(urls: string[]): Promise<{ url: string; markdown: string } | null> {
  for (const url of urls) {
    try {
      const response = await fetch(url, {
        next: { revalidate: README_REVALIDATE_SECONDS },
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) continue;
      const markdown = (await response.text()).slice(0, MAX_README_BYTES);
      if (markdown.trim()) return { url, markdown };
    } catch {
      // Network error or timeout: try the next candidate.
    }
  }
  return null;
}

/** Resolves relative README links: images to raw GitHub, links to the repo page. */
function makeUrlTransform(rawBase: string, repoUrl: string | undefined) {
  return (url: string, key: string): string | null | undefined => {
    const safe = defaultUrlTransform(url);
    if (!safe) return safe;
    if (safe.startsWith("#") || safe.startsWith("mailto:")) return safe;

    const isRelative = !/^[a-z][a-z0-9+.-]*:/i.test(safe) && !safe.startsWith("//");
    if (key === "src") {
      const absolute = isRelative ? new URL(safe.replace(/^\.?\//, ""), rawBase).toString() : safe;
      try {
        return ALLOWED_IMAGE_HOSTS.has(new URL(absolute).hostname) ? absolute : null;
      } catch {
        return null;
      }
    }
    if (isRelative && repoUrl) {
      return `${repoUrl}/blob/HEAD/${safe.replace(/^\.?\//, "")}`;
    }
    return safe;
  };
}

/** Renders the repository README, or nothing when the repo has none. */
export async function ProjectReadme({ readmeUrls, repoUrl, title }: { readmeUrls: string[]; repoUrl?: string; title: string }) {
  const readme = await fetchReadme(readmeUrls);
  if (!readme) return null;
  const rawBase = readme.url.slice(0, readme.url.lastIndexOf("/") + 1);

  return (
    <section aria-labelledby="readme-title" className="rounded-xl border bg-surface p-6 md:p-8">
      <h2 id="readme-title" className="font-mono text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        {title}
      </h2>
      <div className="prose-readme mt-4 min-w-0 overflow-hidden">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize]}
          urlTransform={makeUrlTransform(rawBase, repoUrl)}
          components={{
            // README headings sit below the page h1 and section h2.
            h1: ({ children }) => <h3 className="text-2xl">{children}</h3>,
            h2: ({ children }) => <h3>{children}</h3>,
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noopener noreferrer nofollow">
                {children}
              </a>
            ),
            img: ({ src, alt }) =>
              typeof src === "string" && src ? (
                // Remote README images have unknown sizes; next/image would need every host configured.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt={alt ?? ""} loading="lazy" decoding="async" referrerPolicy="no-referrer" />
              ) : null,
          }}
        >
          {readme.markdown}
        </ReactMarkdown>
      </div>
    </section>
  );
}
