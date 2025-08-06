import { useTheme } from "next-themes";
import { useSwitch } from "@heroui/switch";
import { useIsSSR } from "@react-aria/ssr";

export const useThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();

  const toggle = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return useSwitch({
    isSelected: theme === "light" || isSSR,
    "aria-label": `Switch to ${theme === "light" || isSSR ? "dark" : "light"} mode`,
    onChange: toggle,
  });
};
