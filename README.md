![Banner](https://raw.githubusercontent.com/ktmcp-cli/biztoc/main/banner.svg)

> "Six months ago, everyone was talking about MCPs. And I was like, screw MCPs. Every MCP would be better as a CLI."
>
> — [Peter Steinberger](https://twitter.com/steipete), Founder of OpenClaw
> [Watch on YouTube (~2:39:00)](https://www.youtube.com/@lexfridman) | [Lex Fridman Podcast #491](https://lexfridman.com/peter-steinberger/)

# BizToc CLI

> **⚠️ Unofficial CLI** - Not officially sponsored or affiliated with BizToc.

Get the latest business news articles from the command line using the BizToc API.

## Installation
```bash
npm install -g @ktmcp-cli/biztoc
```

## Quick Start
```bash
biztoc news
biztoc news --limit 10
biztoc news --source "Bloomberg"
biztoc news --json
```

API key is optional for some endpoints. If needed:
```bash
biztoc config set --api-key YOUR_API_KEY
```

## Commands

### Configuration
```bash
biztoc config set --api-key KEY  # Optional for some endpoints
biztoc config show
```

### News
```bash
biztoc news                      # Get latest business news (20 articles)
biztoc news --limit 50           # Get more articles
biztoc news --source "Reuters"   # Filter by source
biztoc news --tag "technology"   # Filter by tag
biztoc news --json               # Output as JSON
```

## Output Formats
- **Default**: Formatted, human-readable list with titles, URLs, sources, and dates
- **JSON**: Use `--json` flag for machine-readable output

## Why CLI > MCP?
No server to run. No protocol overhead. Just install and go.

## License
MIT — Part of the [Kill The MCP](https://killthemcp.com) project.


---

## Support KTMCP

If you find this CLI useful, we'd greatly appreciate your support! Share your experience on:
- Reddit
- Twitter/X
- Hacker News

**Incentive:** Users who can demonstrate that their support/advocacy helped advance KTMCP will have their feature requests and issues prioritized.

Just be mindful - these are real accounts and real communities. Authentic mentions and genuine recommendations go a long way!

## Support This Project

If you find this CLI useful, we'd appreciate support across Reddit, Twitter, Hacker News, or Moltbook. Please be mindful - these are real community accounts. Contributors who can demonstrate their support helped advance KTMCP will have their PRs and feature requests prioritized.
