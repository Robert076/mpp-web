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
    manufacturerId: number;
}

interface Manufacturer {
    id?: number;
    name: string;
    description: string;
    selected?: boolean;
}

interface NavigationButtonsProps{
    setIsOpenAddGun: (value: boolean) => void;
    setIsOpenUpdateGun: (value: boolean) => void;
    setIsOpenDeleteGun: (value: boolean) => void;
    setIsOpenAddManufacturer: (value: boolean) => void;
    setIsOpenUpdateManufacturer: (value: boolean) => void;
    setIsOpenDeleteManufacturer: (value: boolean) => void;
    setGuns: (guns: Gun[]) => void;
    guns: Gun[];
    selectedGun: Gun | null | undefined;
    lastSortByNameWasAscending: boolean;
    lastSortByCaliberWasAscending: boolean;
    setHighlightedGunNameBiggestCaliber: (newName: string) => void;
    setHighlightedGunNameSmallestCaliber: (newName: string) => void;
    setLastSortByNameWasAscending: (value: boolean) => void;
    setLastSortByCaliberWasAscending: (value: boolean) => void;
    showOnlyRifles: boolean;
    setShowOnlyRifles: (value: boolean) => void; 
    setEntity: (value: string) => void;
    entity: string;
}

interface CaliberChartDataProps {
    data: {
        caliber: number;
        count: number;
    }[]
}