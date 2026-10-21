import { useEffect, useState } from 'react'
import Dropdown from './Dropdown'
import type { DropdownOption } from './Dropdown'
import {
    BarChartIcon, MoneyIcon, FlagIcon, CalendarIcon, SettingsIcon, UserIcon, LogOutIcon, HamburgerIcon,
    CreditCardIcon, PlusIcon, BriefcaseIcon, WifiIcon, BoxIcon, HomeIcon, WalkingPersonIcon, PersonIcon,
    ChevronLeftIcon, ChevronRightIcon, EditIcon, DeleteIcon
} from './icons'

const MODAL_COLOR = '#110A1C';
const MODAL_BORDER_COLOR = '#2A2A44';
const LEFT_PANEL_COLOR = '#221E33';
const LEFT_FIELD_COLOR = '#382F49';
const LEFT_MENU_COLOR = '#2E273D';
const RIGHT_FIELD_COLOR = '#1C1E36';
const RIGHT_MENU_COLOR = '#161829';
const HIGHLIGHT_COLOR = '#413656';
const LABEL_COLOR = '#E5E7EB';
const HELPER_COLOR = '#8C9FAF';
const HINT_COLOR = '#616E79';
const PLACEHOLDER_COLOR = '#928D9A';
const REQUIRED_COLOR = '#DB2F2F';
const SELECTED_PILL_COLOR = '#D9D9D9';
const UNSELECTED_TEXT_COLOR = '#707070';
const BLACK_COLOR = '#000000';

const PILL_SHADOW = '0px 4px 4.4px 0px rgba(0,0,0,0.25)';

const CONSTANT_SOURCE = 'constant';
const VARIABLE_SOURCE = 'variable';

const AS_SOON_AS_CONDITION = 'condition';
const SET_DAY_OF_WEEK = 'setDay';

const ICON_SIZE = 16;

// Todos los iconos que ya estan cargados en icons.tsx.
const ICON_OPTIONS: DropdownOption[] = [
    { value: 'barChart', label: 'Bar Chart', icon: <BarChartIcon size={ICON_SIZE} /> },
    { value: 'money', label: 'Money', icon: <MoneyIcon size={ICON_SIZE} /> },
    { value: 'flag', label: 'Flag', icon: <FlagIcon size={ICON_SIZE} /> },
    { value: 'calendar', label: 'Calendar', icon: <CalendarIcon size={ICON_SIZE} /> },
    { value: 'settings', label: 'Settings', icon: <SettingsIcon size={ICON_SIZE} /> },
    { value: 'user', label: 'User', icon: <UserIcon size={ICON_SIZE} /> },
    { value: 'logOut', label: 'Log Out', icon: <LogOutIcon size={ICON_SIZE} /> },
    { value: 'hamburger', label: 'Menu', icon: <HamburgerIcon size={ICON_SIZE} /> },
    { value: 'creditCard', label: 'Credit Card', icon: <CreditCardIcon size={ICON_SIZE} /> },
    { value: 'plus', label: 'Plus', icon: <PlusIcon size={ICON_SIZE} /> },
    { value: 'briefcase', label: 'Briefcase', icon: <BriefcaseIcon size={ICON_SIZE} /> },
    { value: 'wifi', label: 'Wifi', icon: <WifiIcon size={ICON_SIZE} /> },
    { value: 'box', label: 'Box', icon: <BoxIcon size={ICON_SIZE} /> },
    { value: 'home', label: 'Home', icon: <HomeIcon size={ICON_SIZE} /> },
    { value: 'walkingPerson', label: 'Walking Person', icon: <WalkingPersonIcon size={ICON_SIZE} /> },
    { value: 'person', label: 'Person', icon: <PersonIcon size={ICON_SIZE} /> },
    { value: 'chevronLeft', label: 'Chevron Left', icon: <ChevronLeftIcon size={ICON_SIZE} /> },
    { value: 'chevronRight', label: 'Chevron Right', icon: <ChevronRightIcon size={ICON_SIZE} /> },
    { value: 'edit', label: 'Edit', icon: <EditIcon size={ICON_SIZE} /> },
    { value: 'delete', label: 'Delete', icon: <DeleteIcon size={ICON_SIZE} /> }
];

const FREQUENCY_OPTIONS: DropdownOption[] = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' }
];

const DAY_OF_WEEK_OPTIONS: DropdownOption[] = [
    { value: 'monday', label: 'Monday' },
    { value: 'tuesday', label: 'Tuesday' },
    { value: 'wednesday', label: 'Wednesday' },
    { value: 'thursday', label: 'Thursday' },
    { value: 'friday', label: 'Friday' },
    { value: 'saturday', label: 'Saturday' },
    { value: 'sunday', label: 'Sunday' }
];

interface TransactionRegistrationModalProps {
    isOpen: boolean,
    onClose: () => void,
    isIncome: boolean
};

interface RequiredLabelProps {
    text: string
};

function RequiredLabel({ text }: RequiredLabelProps) {
    return (
        <p className='font-bold text-sm' style={{ color: LABEL_COLOR }}>
            <span style={{ color: REQUIRED_COLOR }}>* </span>{text}
        </p>
    );
}

function TransactionRegistrationModal({ isOpen, onClose, isIncome }: TransactionRegistrationModalProps) {
    const [title, setTitle] = useState('');
    const [icon, setIcon] = useState('');
    const [description, setDescription] = useState('');
    const [dayOfWeek, setDayOfWeek] = useState('');
    const [sourceType, setSourceType] = useState(CONSTANT_SOURCE);
    const [quantity, setQuantity] = useState('');
    const [frequency, setFrequency] = useState('');
    const [dateSpecification, setDateSpecification] = useState(AS_SOON_AS_CONDITION);

    useEffect(() => {
        if (!isOpen)
            return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape')
                onClose();
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen)
        return null;

    const categoryLabel = isIncome ? 'Income' : 'Outcome';

    const renderSourceTypeOption = (type: string, label: string) => {
        const isSelected = sourceType === type;

        return (
            <button
                type='button'
                onClick={() => setSourceType(type)}
                className='flex-1 rounded-sm py-1.5 text-sm font-bold hover:cursor-pointer'
                style={{
                    backgroundColor: isSelected ? SELECTED_PILL_COLOR : 'transparent',
                    color: isSelected ? BLACK_COLOR : UNSELECTED_TEXT_COLOR,
                    boxShadow: isSelected ? PILL_SHADOW : 'none',
                    transition: 'background-color 0.3s ease'
                }}
            >
                {label}
            </button>
        );
    };

    const renderDateSpecification = (specification: string, label: string, hint?: string) => (
        <label className='flex flex-row items-start gap-2 hover:cursor-pointer'>
            <input
                type='radio'
                name='dateSpecification'
                checked={dateSpecification === specification}
                onChange={() => setDateSpecification(specification)}
                className='mt-1 hover:cursor-pointer'
                style={{ accentColor: SELECTED_PILL_COLOR }}
            />
            <span className='flex flex-col'>
                <span className='text-xs' style={{ color: HELPER_COLOR }}>{label}</span>
                {hint && <span className='text-[10px]' style={{ color: HINT_COLOR }}>{hint}</span>}
            </span>
        </label>
    );

    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center p-4'
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={onClose}
        >
            <div
                className='flex flex-row gap-6 w-full max-w-3xl rounded-xl border p-5'
                style={{ backgroundColor: MODAL_COLOR, borderColor: MODAL_BORDER_COLOR, boxShadow: '0px 4px 9.2px 8px rgba(0,0,0,0.25)' }}
                onClick={(event) => event.stopPropagation()}
            >
                <div className='flex flex-col gap-3 w-[45%] shrink-0 rounded-md p-4' style={{ backgroundColor: LEFT_PANEL_COLOR }}>
                    <div>
                        <p className='font-bold text-lg' style={{ color: LABEL_COLOR }}>Description of Source</p>
                        <p className='text-xs' style={{ color: HELPER_COLOR }}>Title and Description of the constant income/outcome source</p>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <RequiredLabel text='Title' />
                        <input
                            type='text'
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder='Job at TurboTec'
                            className='w-full rounded-sm px-3 py-2 text-sm outline-none'
                            style={{ backgroundColor: LEFT_FIELD_COLOR, color: LABEL_COLOR }}
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <RequiredLabel text='Icon' />
                        <Dropdown
                            options={ICON_OPTIONS}
                            value={icon}
                            onChange={setIcon}
                            placeholder='Select an icon'
                            backgroundColor={LEFT_FIELD_COLOR}
                            textColor={LABEL_COLOR}
                            placeholderColor={PLACEHOLDER_COLOR}
                            menuBackgroundColor={LEFT_MENU_COLOR}
                            highlightColor={HIGHLIGHT_COLOR}
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <RequiredLabel text='Description' />
                        <textarea
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                            placeholder='Insert a descriptive name for the source'
                            rows={5}
                            className='w-full resize-none rounded-sm px-3 py-2 text-sm outline-none'
                            style={{ backgroundColor: LEFT_FIELD_COLOR, color: LABEL_COLOR }}
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <RequiredLabel text='Day of the Week' />
                        <Dropdown
                            options={DAY_OF_WEEK_OPTIONS}
                            value={dayOfWeek}
                            onChange={setDayOfWeek}
                            placeholder='Select a day'
                            backgroundColor={LEFT_FIELD_COLOR}
                            textColor={LABEL_COLOR}
                            placeholderColor={PLACEHOLDER_COLOR}
                            menuBackgroundColor={LEFT_MENU_COLOR}
                            highlightColor={HIGHLIGHT_COLOR}
                        />
                    </div>
                </div>

                <div className='flex flex-col flex-1 min-w-0 gap-3'>
                    <div>
                        <p className='font-bold text-2xl' style={{ color: LABEL_COLOR }}>New Constant Registration</p>
                        <p className='text-xs' style={{ color: HELPER_COLOR }}>
                            In here you can register constant sources of either income or outcome sources to automatically update your total budget.
                        </p>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <RequiredLabel text='Type of Constant Source' />
                        <div className='flex flex-row gap-1 rounded-sm p-1' style={{ backgroundColor: RIGHT_FIELD_COLOR }}>
                            {renderSourceTypeOption(CONSTANT_SOURCE, `Constant ${categoryLabel}`)}
                            {renderSourceTypeOption(VARIABLE_SOURCE, `Variable ${categoryLabel}`)}
                        </div>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <RequiredLabel text='Quantity' />
                        <input
                            type='number'
                            value={quantity}
                            onChange={(event) => setQuantity(event.target.value)}
                            placeholder='0.00'
                            className='w-full rounded-sm px-3 py-2 text-sm outline-none'
                            style={{ backgroundColor: RIGHT_FIELD_COLOR, color: LABEL_COLOR }}
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <RequiredLabel text='Frequency' />
                        <p className='text-xs' style={{ color: HELPER_COLOR }}>Frequency on which the payment is executed</p>
                        <Dropdown
                            options={FREQUENCY_OPTIONS}
                            value={frequency}
                            onChange={setFrequency}
                            placeholder='Select a frequency'
                            backgroundColor={RIGHT_FIELD_COLOR}
                            textColor={SELECTED_PILL_COLOR}
                            placeholderColor={PLACEHOLDER_COLOR}
                            menuBackgroundColor={RIGHT_MENU_COLOR}
                            highlightColor={HIGHLIGHT_COLOR}
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='font-bold text-sm' style={{ color: LABEL_COLOR }}>Date specifications</p>
                        {renderDateSpecification(
                            AS_SOON_AS_CONDITION,
                            'Payment happens as soon as the condition is met',
                            'Example: If condition is monthly, payment occurs the First day of the month'
                        )}
                        {renderDateSpecification(SET_DAY_OF_WEEK, 'Payment has a set day of the week')}
                    </div>

                    <div className='flex flex-row items-center justify-end gap-4 mt-auto pt-2'>
                        <button
                            type='button'
                            onClick={onClose}
                            className='text-xs underline hover:cursor-pointer'
                            style={{ color: SELECTED_PILL_COLOR }}
                        >
                            Cancel
                        </button>
                        {/* Placeholder: todavia no guarda nada. */}
                        <button
                            type='button'
                            onClick={() => {}}
                            className='rounded-sm px-8 py-1.5 text-sm font-bold hover:cursor-pointer'
                            style={{ backgroundColor: SELECTED_PILL_COLOR, color: BLACK_COLOR, boxShadow: PILL_SHADOW }}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionRegistrationModal
