import "@/app/globals.css";
import { TransactionProvider } from "@/context/TransactionContext"; // Importando o TransactionProvider

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Fonte global */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Envolvendo o conteúdo no TransactionProvider */}
        <TransactionProvider>
          <main>{children}</main>
        </TransactionProvider>
      </body>
    </html>
  );
}
