import Image from "next/image";
import React, { FC, useCallback, useState } from "react";

import { useDropzone } from "react-dropzone";

interface ImageUploadProps {
	value: string;
	disabled: boolean;
	onChenge: (base64: string) => void;
	lable: string;
}

const ImageUpload: FC<ImageUploadProps> = ({
	disabled,
	lable,
	onChenge,
	value,
}) => {
	const [base64, setBase64] = useState(value);

	const handleChange = useCallback(
		(base64: string) => {
			onChenge(base64);
		},
		[onChenge]
	);

	const handleDrop = useCallback(
		(files: any) => {
			const file = files[0];
			const reader = new FileReader();

			reader.onload = (event: any) => {
				setBase64(event.target.result);
				handleChange(event.target.result);
			};

			reader.readAsDataURL(file);
		},
		[handleChange]
	);

	const { getRootProps, getInputProps } = useDropzone({
		maxFiles: 1,
		onDrop: handleDrop,
		disabled: disabled,
		accept: { "image/jpeg": [], "image/png": [] },
	});

	return (
		<div
			{...getRootProps({
				className:
					"w-full p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-700",
			})}
		>
			<input {...getInputProps({})} />
			{base64 ? (
				<div className="flex items-center justify-center">
					<Image
						alt="uploaded image"
						src={base64}
						height={100}
						width={100}
					/>
				</div>
			) : (
				<p className="text-white">{lable}</p>
			)}
		</div>
	);
};

export default ImageUpload;
