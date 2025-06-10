import { useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming Shadcn/UI's cn utility for class merging

interface DeleteModalProps {
    onConfirm: () => void;
    children: React.ReactNode; // For custom trigger
}

function DeleteModal({ onConfirm, children }: DeleteModalProps) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-background border border-muted rounded-lg shadow-xl">
                <DialogHeader className="pb-2">
                    <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
                        <Trash2 className="h-5 w-5 text-destructive" />
                        Delete Note
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                        Are you sure you want to delete this note? This action is permanent and cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4 flex gap-2">
                    <Button
                        variant="outline"
                        className="flex-1 border-muted hover:bg-muted/50 transition-colors"
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        className="flex-1 bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                        onClick={() => {
                            onConfirm();
                            setOpen(false);
                        }}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteModal;