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
        <Toaster position="bottom-center" />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
