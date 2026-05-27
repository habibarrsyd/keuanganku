import type { Metadata } from "next";
import { Sidebar } from "@/components/Sidebar";
import { BottomNav } from "@/components/BottomNav";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Personal Finance Tracker",
  description: "Catat dan kelola keuangan pribadi Anda dengan mudah",
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Personal Finance Tracker",
  },
  formatDetection: {
    telephone: false,
  },
  manifest: "/manifest.json",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/icon-192x192.png", sizes: "192x192" },
    { rel: "shortcut icon", url: "/icon-192x192.png", sizes: "192x192" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#4A6B5D" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Finance Tracker" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function () {
                  navigator.serviceWorker.register('/sw.js').catch(error => {
                    console.log('Service Worker registration failed:', error);
                  });
                });
              }
            `,
          }}
        />
      </head>
      <body>
        <Sidebar />
        <main className="lg:ml-56">
          {children}
        </main>
        <BottomNav />
      </body>
    </html>
  );
}
