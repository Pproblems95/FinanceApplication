import * as React from 'react'

interface InfoCardProps {
    icon: React.ReactNode,
    title: string,
    description: string,
    subtitle?: string,
    actions?: React.ReactNode,
    backgroundColor: string,
    titleColor: string,
    descriptionColor: string
}

function InfoCard({ icon, title, description, subtitle, actions, backgroundColor, titleColor, descriptionColor }: InfoCardProps) {
    return (
        <div className='flex flex-row items-center gap-5 rounded-lg px-6 py-4 h-full' style={{ background: backgroundColor }}>
            <div className='shrink-0'>
                {icon}
            </div>
            <div className='flex flex-col flex-1 min-w-0'>
                <span className='text-xl font-bold truncate' style={{ color: titleColor }}>{title}</span>
                <span className='text-md truncate' style={{ color: descriptionColor }}>{description}</span>
                {subtitle && (
                    <span className='text-md truncate' style={{ color: descriptionColor }}>{subtitle}</span>
                )}
            </div>
            {actions && (
                <div className='flex flex-row items-center gap-4 shrink-0'>
                    {actions}
                </div>
            )}
        </div>
    )
}

export default InfoCard
