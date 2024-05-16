import { clsx } from "clsx";

const variants = {
	primary: "bg-teal-700 hover:bg-teal-600 active:bg-teal-800",
	danger: "bg-red-500 hover:bg-red-700 active:bg-red-800",
};

export default function Button({ className, variant, ...rest }: Props) {
	return <button className={clsx("rounded-md px-4 py-2 font-semibold text-white", variants[variant], className)} {...rest} />;
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant: keyof typeof variants;
}
