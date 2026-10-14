import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from './icons'

// Siempre 6 semanas x 7 dias, empezando en domingo.
const TOTAL_CELLS = 42;

interface CalendarProps {
    month: Date,
    onPreviousMonth: () => void,
    onNextMonth: () => void,
    renderDayContent?: (date: Date, isCurrentMonth: boolean) => React.ReactNode,
    getDayNumberColor?: (date: Date, isCurrentMonth: boolean) => string | undefined,
    backgroundColor: string,
    headerColor: string,
    dayColor: string,
    outsideDayColor: string,
    dayNumberColor: string
}

const buildCalendarDays = (month: Date) => {
    const firstOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const start = new Date(firstOfMonth);
    start.setDate(firstOfMonth.getDate() - firstOfMonth.getDay());

    return Array.from({ length: TOTAL_CELLS }, (_, index) => {
        const date = new Date(start);
        date.setDate(start.getDate() + index);
        return date;
    });
};

function Calendar({
    month,
    onPreviousMonth,
    onNextMonth,
    renderDayContent,
    getDayNumberColor,
    backgroundColor,
    headerColor,
    dayColor,
    outsideDayColor,
    dayNumberColor
}: CalendarProps) {
    const days = buildCalendarDays(month);
    const monthName = month.toLocaleDateString('en-US', { month: 'long' });

    const arrowButton = (icon: React.ReactNode, onClick: () => void) => (
        <button
            type='button'
            onClick={onClick}
            className='w-11 h-11 shrink-0 rounded-full flex items-center justify-center hover:cursor-pointer hover:opacity-80'
            style={{ background: headerColor }}
        >
            {icon}
        </button>
    );

    return (
        <div className='flex flex-col gap-3 p-4 rounded-lg' style={{ background: backgroundColor }}>
            <div className='flex flex-row items-center gap-4'>
                {arrowButton(<ChevronLeftIcon size={18} />, onPreviousMonth)}
                <div className='flex-1 rounded-lg py-2 text-center text-2xl font-bold' style={{ background: headerColor }}>
                    {monthName} {month.getFullYear()}
                </div>
                {arrowButton(<ChevronRightIcon size={18} />, onNextMonth)}
            </div>

            <div className='grid grid-cols-7 gap-2'>
                {days.map((date) => {
                    const isCurrentMonth = date.getMonth() === month.getMonth();

                    return (
                        <div
                            key={date.toDateString()}
                            className='relative aspect-[4/3] rounded-lg border border-white/5'
                            style={{ background: isCurrentMonth ? dayColor : outsideDayColor, opacity: isCurrentMonth ? 1 : 0.5 }}
                        >
                            <div className='absolute inset-0 flex items-center justify-center'>
                                {renderDayContent?.(date, isCurrentMonth)}
                            </div>
                            <span className='absolute bottom-1 right-2 text-sm font-bold' style={{ color: getDayNumberColor?.(date, isCurrentMonth) ?? dayNumberColor }}>
                                {date.getDate().toString().padStart(2, '0')}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default Calendar
