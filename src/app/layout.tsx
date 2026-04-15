import type { Metadata } from "next";
import "@/styles/globals.css";
import RoomLayout from "@/components/layout/RoomLayout";

export const metadata: Metadata = {
  title: "AMR Portfolio",
  description: "A Renaissance Interior Experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RoomLayout>
          {children}
        </RoomLayout>
      </body>
    </html>
  );
}