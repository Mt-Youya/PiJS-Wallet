import { toast } from "sonner"

export function useToast(message, success) {
    return toast[success ? "success" : "error"](message)
}
