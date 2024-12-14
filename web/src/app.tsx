import { Box, Flex, IconButton, TabNav, ThemeContext } from "@radix-ui/themes";
import { useContext } from "react";
import { SunIcon, MoonStarIcon } from "lucide-react";
import { Link, Outlet } from "react-router";
import { linkTo } from "./router";

/* App is a layout component. It renders a navbar and an <Outlet/> for children. */

export const App = () => {
	const theme = useContext(ThemeContext);
	return (
		<>
			<TabNav.Root size="2" style={{ position: "sticky", top: 0, zIndex: 10, background: "var(--color-background)" }}>
				<Flex justify="between" width="100%">
					<Flex>
						<TabNav.Link asChild>
							<Link to={linkTo("/organizations")}>Organizations</Link>
						</TabNav.Link>
						{/* not implemented */}
						<TabNav.Link href="#">Settings</TabNav.Link>
						<TabNav.Link href="#">About</TabNav.Link>
					</Flex>
					<Box mr="3">
						{theme?.appearance === "light" && (
							<IconButton onClick={() => theme?.onAppearanceChange("dark")} variant="outline">
								<MoonStarIcon />
							</IconButton>
						)}
						{theme?.appearance === "dark" && (
							<IconButton onClick={() => theme?.onAppearanceChange("light")} variant="outline">
								<SunIcon />
							</IconButton>
						)}
					</Box>
				</Flex>
			</TabNav.Root>
			<Outlet />
		</>
	);
};
