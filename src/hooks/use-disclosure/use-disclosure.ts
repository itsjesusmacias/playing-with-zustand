import { useCallback, useState } from "react";

export interface UseDisclosureProps {
  isOpen?: boolean;
  defaultIsOpen?: boolean;
  onClose?(): void;
  onOpen?(): void;
}

export interface UseDisclosureReturn {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  isControlled: boolean;
}

/**
 * `useDisclosure` is a custom hook used to help handle common open, close, or toggle scenarios.
 */
const useDisclosure = (props: UseDisclosureProps = {}): UseDisclosureReturn => {
  const {
    onClose: handleClose,
    onOpen: handleOpen,
    isOpen: isOpenProp,
    defaultIsOpen,
  } = props;

  const [isOpenState, setIsOpen] = useState(defaultIsOpen || false);

  const isOpen = isOpenProp !== undefined ? isOpenProp : isOpenState;

  const isControlled = isOpenProp !== undefined;

  const onClose = useCallback(() => {
    if (!isControlled) setIsOpen(false);

    handleClose?.();
  }, [isControlled, handleClose]);

  const onOpen = useCallback(() => {
    if (!isControlled) setIsOpen(true);

    handleOpen?.();
  }, [isControlled, handleOpen]);

  const onToggle = useCallback(() => {
    if (isOpen) onClose();
    else onOpen();
  }, [isOpen, onOpen, onClose]);

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
    isControlled,
  };
};

export default useDisclosure;
