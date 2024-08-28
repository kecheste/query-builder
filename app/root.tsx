import {
  json,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import "./tailwind.css";
import { ReactFlowProvider } from "@xyflow/react";
import { ThemeProvider } from "remix-themes";
import { LoaderFunctionArgs } from "@remix-run/node";
import { themeSessionResolver } from "./sessions.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  const API_URL = process.env.API_URL || "";
  return json({
    ENV: {API_URL}, 
    theme: getTheme(),
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
  }
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ReactFlowProvider>
        {children}
        <ScrollRestoration />
        <Scripts />
        </ReactFlowProvider>
      </body>
    </html>
  );
}

export default function App() {
  const data = useLoaderData<typeof loader>();

  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
        <Outlet />
    </ThemeProvider>
);
}
