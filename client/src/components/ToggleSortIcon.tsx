import { ActionIcon } from "@mantine/core";
import { IconListDetails } from "@tabler/icons-react";
import { useAppStore } from "../store/useAppStore";

export default function ToggleThemeIcon() {
    const setSort = useAppStore((state) => state.toggleSort);
    const theme = useAppStore((state) => state.theme)

    const handleToggle = () => {
        setSort();
    }
    
    return (
        <ActionIcon autoContrast p={3} bd={'2px solid var(--mantine-color-default-border'} onClick={() => handleToggle()} bg={'var(--mantine-color-text)'} >
            <IconListDetails color={theme === 'dark' ? 'rgb(36,36,36)' : '#fff'} />
        </ActionIcon>
    )
}