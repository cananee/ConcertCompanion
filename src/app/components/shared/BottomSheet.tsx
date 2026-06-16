import { ReactNode } from "react";
import { X } from "lucide-react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  showHandle?: boolean;
  showClose?: boolean;
  maxHeight?: string;
}

export function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  showHandle = true,
  showClose = true,
  maxHeight = "90vh",
}: BottomSheetProps) {
  if (!isOpen) return null;

  return (
    <div
      className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50"
      onClick={onClose}
    >
      <div
        className="absolute bottom-0 left-0 right-0 bg-[#141420] rounded-t-3xl animate-slide-up overflow-hidden flex flex-col"
        style={{ maxHeight }}
        onClick={e => e.stopPropagation()}
      >
        {showHandle && (
          <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mt-4 mb-1 flex-shrink-0" />
        )}
        {(title || showClose) && (
          <div className="flex items-center justify-between px-6 py-3 flex-shrink-0">
            {title && <h2 className="text-white text-xl font-semibold">{title}</h2>}
            {showClose && (
              <button
                onClick={onClose}
                className="ml-auto w-8 h-8 bg-white/10 rounded-full flex items-center justify-center"
              >
                <X className="w-4 h-4 text-white/70" />
              </button>
            )}
          </div>
        )}
        <div className="overflow-y-auto flex-1 pb-10">
          {children}
        </div>
      </div>
    </div>
  );
}
