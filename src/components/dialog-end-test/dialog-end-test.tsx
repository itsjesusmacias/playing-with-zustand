import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "../ui/alert-dialog";

const DialogEndTest = () => {
  const isEndTestModalOpen = use((state) => state.modals.isEndTestModalOpen);
  const startTimer = useTakeExamStore((state) => state.timer.startTimer);
  const closeEndTestModal = useTakeExamStore(
    (state) => state.modals.closeEndTestModal
  );

  const handleActionModal = () => {
    startTimer();
    closeEndTestModal();
  };

  return (
    <AlertDialog open={isEndTestModalOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>End Test</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to end the test?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleActionModal}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleActionModal}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DialogEndTest };
