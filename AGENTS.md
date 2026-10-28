<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Portfolio architecture
- Keep TanStack Start and its generated route tree; this workspace does not support replacing the framework with Next.js.
- The portfolio is an explicitly requested single scrolling experience at `/`; sections use in-page navigation rather than separate content pages.
- Lazy-load the R3F scene behind ClientOnly, keeping portfolio content server-rendered and browser-only rendering isolated.
- Keep portfolio data in a typed browser-safe module and visual tokens in the global stylesheet so content and rendering can evolve independently.
- Contact opens a prefilled email draft; do not report messages as sent without a connected delivery service.
