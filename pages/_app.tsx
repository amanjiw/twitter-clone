import type { AppProps } from "next/app";

import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

import Layout from "@/components/Layout";
import Modals from "@/components/modals/Modals";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<Modals />
			<Toaster />
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	);
}
