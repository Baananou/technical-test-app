import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Toast from "./components/Toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL("https://exemple.app"),
	title: {
		default: "Products",
		template: `%s | Products`,
	},
	description: "Products Grid for my technical interview.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Toast />
				<main className="bg-primary-gradient min-h-screen">{children}</main>
			</body>
		</html>
	);
}
