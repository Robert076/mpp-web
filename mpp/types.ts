interface InputProps {
    label: string;
    value: string | undefined;
    onChange: (value: string) => void;
    placeholder?: string;
    mandatory?: boolean;
}

interface NavButtonDashboardProps{
    text: string;
    onClick?: () => void;
}

interface Gun{
    id?: number;
    name: string;
    caliber: number;
    weight: number;
    actionType: string;
    category?: string | undefined;
    effectiveRange?: number | undefined;
    selected?: boolean;
    highlightedBlue?: boolean;
    highlightedRed?: boolean;
}

interface NavigationButtonsProps{
    setIsOpenAdd: (value: boolean) => void;
    setIsOpenUpdate: (value: boolean) => void;
    setIsOpenDelete: (value: boolean) => void;
    setGuns: (guns: Gun[]) => void;
    guns: Gun[];
    selectedGun: Gun | null | undefined;
    lastSortByNameWasAscending: boolean;
    lastSortByCaliberWasAscending: boolean;
    setHighlightedGunNameBiggestCaliber: (newName: string) => void;
    setHighlightedGunNameSmallestCaliber: (newName: string) => void;
    setLastSortByNameWasAscending: (value: boolean) => void;
    setLastSortByCaliberWasAscending: (value: boolean) => void;
    setShowGuns: (value: boolean) => void;
    showGuns: boolean;
    showOnlyRifles: boolean;
    setShowOnlyRifles: (value: boolean) => void; 
}

interface CaliberChartDataProps {
    data: {
        caliber: number;
        count: number;
    }[]
}