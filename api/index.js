import app, { hydrateFromSupabase } from '../server/server.js';

await hydrateFromSupabase();

export default app;
