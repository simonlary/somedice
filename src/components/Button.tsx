import { clsx } from "clsx";

const variants = {
	primary: "bg-teal-700 enabled:hover:bg-teal-600 enabled:active:bg-teal-800",
	danger: "bg-red-500 enabled:hover:bg-red-700 enabled:active:bg-red-800",
};

export default function Button({ className, variant, ...rest }: Props) {
	return (
		<button className={clsx("rounded-md px-4 py-2 font-semibold text-white disabled:opacity-50", variants[variant], className)} {...rest} />
	);
}

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant: keyof typeof variants;
}
