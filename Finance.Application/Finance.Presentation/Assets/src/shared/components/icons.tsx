import { IconBaseProps } from "react-icons";
import { FaChartSimple, FaMoneyBills, FaFlag, FaCalendarDays, FaGear, FaUser } from "react-icons/fa6";
import { BiLogOut } from "react-icons/bi";

export const BarChartIcon = (props: IconBaseProps) => (
    <FaChartSimple {...props} />
)

export const MoneyIcon = (props: IconBaseProps) => (
    <FaMoneyBills  {...props} />
)

export const FlagIcon = (props: IconBaseProps) => (
    <FaFlag  {...props} />
)

export const CalendarIcon = (props: IconBaseProps) => (
    <FaCalendarDays  {...props} />
)

export const SettingsIcon = (props: IconBaseProps) => (
    <FaGear  {...props} />
)

export const UserIcon = (props: IconBaseProps) => (
    <FaUser  {...props} />
)

export const LogOutIcon = (props: IconBaseProps) => (
    <BiLogOut  {...props} />
)