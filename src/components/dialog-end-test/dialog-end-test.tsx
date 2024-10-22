import useDisclosure from "@/hooks/use-disclosure/use-disclosure";
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
import { useTakeExamStore } from "@/provider/take-exam/take-exam-store";
import { Button } from "../ui/button";

const DialogEndTest = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const startTimer = useTakeExamStore((state) => state.timer.startTimer);
  const pauseTimer = useTakeExamStore((state) => state.timer.pauseTimer);
  const resetTimer = useTakeExamStore((state) => state.timer.resetTimer);

  const handleOnOpen = () => {
    pauseTimer();
    onOpen();
  };

  const handleOnClose = () => {
    startTimer();
    onClose();
  };

  const onReset = () => {
    resetTimer();
    onClose();
  };

  return (
    <>
      <footer className="mt-8 text-center">
        <Button
          onClick={handleOnOpen}
          variant="destructive"
          className="bg-orange-600 hover:bg-orange-700 text-gray-900"
        >
          End Test
        </Button>
      </footer>

      <AlertDialog open={isOpen}>
        <AlertDialogContent className="bg-gray-800 border-orange-400 text-orange-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-orange-400">
              End Test
            </AlertDialogTitle>
            <AlertDialogDescription className="text-orange-200">
              Are you sure you want to end the test?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={handleOnClose}
              className="bg-gray-700 text-orange-200 hover:bg-gray-600"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onReset}
              className="bg-orange-600 text-gray-900 hover:bg-orange-700"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export { DialogEndTest };
