
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface RewardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  earnedPoints: number;
  streak: number;
}

export function RewardDialog({ open, onOpenChange, earnedPoints, streak }: RewardDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="flex justify-center"
            >
              <Award className="h-12 w-12 text-yellow-500" />
            </motion.div>
            Great job!
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-xl font-bold mb-2">
              +{earnedPoints} Points
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm text-muted-foreground mb-4">
              {streak > 1 ? `You're on a ${streak} question streak!` : "Keep going for a streak bonus!"}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-2 my-4"
          >
            {[...Array(Math.min(streak, 5))].map((_, idx) => (
              <Trophy key={idx} className="h-6 w-6 text-amber-500" fill="#f59e0b" />
            ))}
          </motion.div>
        </div>
        
        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="w-full">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
