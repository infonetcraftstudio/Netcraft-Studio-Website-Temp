import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import sendInquiry from './api/send-inquiry.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function localInquiryApi() {
  return {
    name: 'local-inquiry-api',
    configureServer(server) {
      server.middlewares.use('/api/send-inquiry', async (request, response) => {
        let body = '';
        for await (const chunk of request) body += chunk;

        const adaptedRequest = {
          method: request.method,
          body: body ? JSON.parse(body) : {}
        };
        const adaptedResponse = {
          status(code) {
            response.statusCode = code;
            return this;
          },
          json(payload) {
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify(payload));
          }
        };

        try {
          await sendInquiry(adaptedRequest, adaptedResponse);
        } catch (error) {
          console.error('Local inquiry API failed:', error);
          response.statusCode = 500;
          response.end(JSON.stringify({ error: 'Unable to send enquiry email.' }));
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, __dirname, ''));

  return {
    plugins: [react(), localInquiryApi()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      port: 5173,
      open: false
    }
  };
});
