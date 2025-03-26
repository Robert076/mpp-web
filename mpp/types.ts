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
    name: string;
    caliber: number;
    weight: number;
    actionType: string;
    category?: string | undefined;
    effectiveRange?: number | undefined;
    selected?: boolean;
    highlighted?: boolean;
}

interface NavigationButtonsProps{
    setIsOpenAdd: (value: boolean) => void;
    setIsOpenUpdate: (value: boolean) => void;
    setIsOpenDelete: (value: boolean) => void;
    setGuns: (guns: Gun[]) => void;
    guns: Gun[];
    selectedGun: Gun | null;
    lastSortByNameWasAscending: boolean;
    lastSortByCaliberWasAscending: boolean;
    setHighlightedGunName: (newName: string) => void;
    setLastSortByNameWasAscending: (value: boolean) => void;
    setLastSortByCaliberWasAscending: (value: boolean) => void;
}