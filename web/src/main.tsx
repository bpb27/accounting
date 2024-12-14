import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { RouterProvider } from "react-router";
import { router } from "./router.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient, api } from "./api";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Theme accentColor="blue" appearance="light">
			<QueryClientProvider client={queryClient}>
				<api.ReactQueryProvider>
					<RouterProvider router={router} />
				</api.ReactQueryProvider>
			</QueryClientProvider>
		</Theme>
	</StrictMode>
);
