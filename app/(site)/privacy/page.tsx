export default function PrivacyPage() {
  return (
    <article>
      <h1 className="text-2xl font-semibold">Privacy</h1>
      <p className="mt-4 text-muted-foreground">
        Code you run in SOFIA EDITOR is sent to a public code execution API so the playground can
        return program output. Shared snippet titles and source are stored locally in your browser
        and are not uploaded to a SOFIA EDITOR account.
      </p>
    </article>
  );
}
