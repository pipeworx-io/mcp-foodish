interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
  meter?: { credits: number };
  cost?: Record<string, unknown>;
  provider?: string;
}

/**
 * Foodish MCP.
 */


const BASE = 'https://foodish-api.com/api';
const UA = 'pipeworx-mcp-foodish/1.0 (+https://pipeworx.io)';
const CATS = ['biryani', 'burger', 'butter-chicken', 'dessert', 'dosa', 'idly', 'pasta', 'pizza', 'rice', 'samosa'];

const tools: McpToolExport['tools'] = [
  { name: 'random', description: 'Random food image URL.', inputSchema: { type: 'object', properties: {} } },
  {
    name: 'random_by_category',
    description: 'Random image for category.',
    inputSchema: {
      type: 'object',
      properties: { category: { type: 'string', enum: CATS } },
      required: ['category'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  const get = async (path: string) => {
    const res = await fetch(`${BASE}${path}`, { headers: { Accept: 'application/json', 'User-Agent': UA } });
    if (!res.ok) throw new Error(`Foodish: ${res.status}`);
    return res.json();
  };
  switch (name) {
    case 'random':
      return get('/');
    case 'random_by_category': {
      const cat = reqStr(args, 'category', '"pizza"');
      if (!CATS.includes(cat)) throw new Error(`Foodish: unknown category "${cat}". Valid: ${CATS.join(', ')}.`);
      return get(`/images/${cat}`);
    }
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

function reqStr(args: Record<string, unknown>, key: string, example: string): string {
  const v = args[key];
  if (typeof v !== 'string' || !v.trim()) throw new Error(`Required argument "${key}" is missing. Pass a string like ${example}.`);
  return v;
}

export default { tools, callTool, meter: { credits: 1 } } satisfies McpToolExport;
