import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: { fontSize: "12px" },
          }}
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
