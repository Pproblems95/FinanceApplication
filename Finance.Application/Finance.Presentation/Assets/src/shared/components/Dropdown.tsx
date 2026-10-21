import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { CaretDownIcon } from './icons'

export interface DropdownOption {
    value: string,
    label: string,
    icon?: ReactNode
};

interface DropdownProps {
    options: DropdownOption[],
    value: string,
    onChange: (value: string) => void,
    placeholder?: string,
    backgroundColor: string,
    textColor: string,
    placeholderColor: string,
    menuBackgroundColor: string,
    highlightColor: string,
    maxMenuHeight?: string
};

function Dropdown({ options, value, onChange, placeholder = '', backgroundColor, textColor, placeholderColor, menuBackgroundColor, highlightColor, maxMenuHeight = '12rem' }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((option) => option.value === value);

    // Se cierra al hacer click fuera o al presionar Escape.
    useEffect(() => {
        if (!isOpen)
            return;

        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node))
                setIsOpen(false);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape')
                setIsOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    const selectOption = (option: DropdownOption) => {
        onChange(option.value);
        setIsOpen(false);
    };

    return (
        <div className='relative w-full' ref={containerRef}>
            <button
                type='button'
                onClick={() => setIsOpen((current) => !current)}
                className='w-full flex flex-row items-center justify-between gap-2 rounded-sm px-3 py-2 text-sm hover:cursor-pointer'
                style={{ backgroundColor, color: selectedOption ? textColor : placeholderColor }}
            >
                <span className='flex flex-row items-center gap-2 min-w-0'>
                    {selectedOption?.icon}
                    <span className='truncate'>{selectedOption ? selectedOption.label : placeholder}</span>
                </span>
                <CaretDownIcon size={14} color={textColor} className='shrink-0' />
            </button>

            {isOpen && (
                <ul
                    className='absolute left-0 right-0 top-full mt-1 z-20 overflow-y-auto rounded-sm py-1 shadow-lg'
                    style={{ backgroundColor: menuBackgroundColor, maxHeight: maxMenuHeight }}
                >
                    {options.map((option) => (
                        <li key={option.value}>
                            <button
                                type='button'
                                onClick={() => selectOption(option)}
                                className='w-full flex flex-row items-center gap-2 px-3 py-2 text-left text-sm hover:cursor-pointer'
                                style={{ color: textColor, backgroundColor: option.value === value ? highlightColor : 'transparent' }}
                                onMouseEnter={(event) => { event.currentTarget.style.backgroundColor = highlightColor; }}
                                onMouseLeave={(event) => { event.currentTarget.style.backgroundColor = option.value === value ? highlightColor : 'transparent'; }}
                            >
                                {option.icon}
                                <span className='truncate'>{option.label}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Dropdown
