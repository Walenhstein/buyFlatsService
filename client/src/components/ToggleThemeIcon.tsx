import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconContrast } from "@tabler/icons-react";
import { useAppStore } from "../store/useAppStore";

export default function ToggleThemeIcon() {
    const setTheme = useAppStore((state) => state.toggleTheme);
    const { setColorScheme } = useMantineColorScheme();

    const handleToggle = () => {
        setTheme();
        const currentTheme = useAppStore.getState().theme;
        setColorScheme(currentTheme);
    }
    
    return (
        <ActionIcon autoContrast p={3} bd={'2px solid var(--mantine-color-default-border'} onClick={() => handleToggle()} bg={'var(--mantine-color-text)'} >
            <IconContrast color={useAppStore.getState().theme === 'dark' ? 'rgb(36,36,36)' : '#FFF'} />
        </ActionIcon>
    )
}