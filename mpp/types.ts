interface InputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
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
    category?: string;
    effectiveRange?: number;
    selected?: boolean;
}