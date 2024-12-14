import { TextField, Text } from "@radix-ui/themes";

interface InputProps extends TextField.RootProps {
	id: string;
	label: string;
}

export const Input = ({ id, label, ...rest }: InputProps) => (
	<>
		<Text as="label" size="2" weight="bold" color="gray" htmlFor={id}>
			{label}
		</Text>
		<TextField.Root id={id} type="date" size="2" variant="surface" style={{ height: "unset" }} {...rest} />
	</>
);
