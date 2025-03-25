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