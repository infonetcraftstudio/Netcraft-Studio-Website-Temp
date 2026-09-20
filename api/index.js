import app, { hydrateFromSupabase } from '../server/server.js';

// Hydration must not block the serverless function from being invoked.
hydrateFromSupabase().catch((error) => {
	console.error('API startup hydration failed:', error);
});

export default app;
