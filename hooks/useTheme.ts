import {useEffect, useState} from "react";
import {useTranslation} from "next-i18next";
import {applyTheme, ThemesProps} from "@/lib/theme";
import {ComputerDesktopIcon, MoonIcon} from "@heroicons/react/24/solid";
import {SunIcon} from "@heroicons/react/20/solid";


const useTheme = () => {
    const [theme, setTheme] = useState<string | null>(null);
    const { t } = useTranslation('common');

    useEffect(() => {
        setTheme(localStorage.getItem('theme'));
    }, []);

    const themes: ThemesProps[] = [
        {
            id: 'system',
            name: t('system'),
            icon: ComputerDesktopIcon,
        },
        {
            id: 'dark',
            name: t('dark'),
            icon: MoonIcon,
        },
        {
            id: 'light',
            name: t('light'),
            icon: SunIcon,
        },
    ];

    const selectedTheme = themes.find((t) => t.id === theme) || themes[0];

    const toggleTheme = () => {
        selectedTheme.id === 'light' ? applyTheme('dark') : applyTheme('light');

        if (selectedTheme.id === 'light') {
            applyTheme('dark');
            setTheme('dark');
        } else if (selectedTheme.id === 'dark') {
            applyTheme('light');
            setTheme('light');
        } else if (selectedTheme.id === 'system') {
            applyTheme('dark');
            setTheme('dark');
        }
    };

    return { theme, setTheme, selectedTheme, toggleTheme, themes, applyTheme };
}

export default useTheme;
