import React from 'react';
import { renderToPipeableStream } from 'react-dom/server.node';
import { Writable } from 'node:stream';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

// React 19 hoists <title>/<meta>/<link> rendered anywhere in the tree (via
// react-helmet-async's <Helmet>) to the front of the output automatically, so
// the returned HTML already contains them as a prefix before the app's root
// element — no separate helmet-context extraction needed here.
export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = '';
    const collector = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk;
        callback();
      },
    });

    const { pipe } = renderToPipeableStream(
      <React.StrictMode>
        <HelmetProvider>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </React.StrictMode>,
      {
        onAllReady() {
          pipe(collector);
          collector.on('finish', () => resolve(html));
        },
        onError(error) {
          reject(error);
        },
      }
    );
  });
}
