import { toaster } from "../../components/ui/toaster";

export function enqueueToast(
    message: string,
    type: "success" | "error" | "info",
) {
    toaster.create({
        title:
            type === "success"
                ? "Success"
                : type === "error"
                  ? "Error"
                  : "Info",
        description: message,
        type: type,
        duration: 3000,
    });
}
