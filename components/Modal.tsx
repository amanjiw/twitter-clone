import React, { useCallback } from "react";

interface ModalProps {
	isOpen?: boolean;
	title?: string;
	body?: React.ReactElement;
	footer?: React.ReactElement;
	actionLabel: string;
	disabled?: boolean;
	onClose: () => void;
	onSubmit: () => void;
}

const Modal: React.FC<ModalProps> = ({
	actionLabel,
	onClose,
	onSubmit,
	body,
	disabled,
	footer,
	isOpen,
	title,
}) => {
	const handleClose = useCallback(() => {
		if (disabled) return;
		onClose();
	}, [disabled, onClose]);

	const handleSubmit = useCallback(() => {
		if (disabled) return;
		onSubmit();
	}, []);

	if (!isOpen) return null;
	return <div>Modal</div>;
};

export default Modal;
