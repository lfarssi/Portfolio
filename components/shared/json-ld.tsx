/** Renders a JSON-LD block. `<` is escaped so content can never close the tag. */
export function JsonLd({ data, nonce }: { data: object; nonce?: string }) {
  return (
    <script
      type="application/ld+json"
      nonce={nonce}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
