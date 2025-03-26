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