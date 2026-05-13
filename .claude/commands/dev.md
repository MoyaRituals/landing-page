---
description: Start or stop the local development server
---

If the user typed `/dev stop` or asked to stop the server, run this and you're done:

```bash
lsof -ti:3000 | xargs kill -9 2>/dev/null && echo "Dev server stopped." || echo "No server running on port 3000."
```

Otherwise, start the dev server:

1. Kill anything already on port 3000:

```bash
lsof -ti:3000 | xargs kill -9 2>/dev/null; true
```

2. Start `npm run dev` as a **background task** (run_in_background: true).

3. Wait for the server, then open it in the external browser:

```bash
until curl -s http://localhost:3000 > /dev/null 2>&1; do sleep 0.5; done && open http://localhost:3000
```

Tell the user the server is running at **http://localhost:3000** and that they can stop it with `/dev stop`.
