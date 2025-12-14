import { Inter, Noto_Serif_Georgian } from "next/font/google";

export const fontEn = Inter({
  subsets: ["latin"],
  variable: "--font-en",
  display: "swap",
});

export const fontKa = Noto_Serif_Georgian({
  subsets: ["georgian"],
  variable: "--font-ka",
  display: "swap",
});
