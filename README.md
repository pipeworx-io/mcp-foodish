# @pipeworx/foodish

[Foodish](https://foodish-api.com/) MCP — random food images. Keyless.

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

- `random()` — random food image URL
- `random_by_category(category)` — random image for a category (`biryani` | `burger` | `butter-chicken` | `dessert` | `dosa` | `idly` | `pasta` | `pizza` | `rice` | `samosa`)

## Data source

`https://foodish-api.com/api`

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "foodish": {
      "url": "https://gateway.pipeworx.io/foodish/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Foodish data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
