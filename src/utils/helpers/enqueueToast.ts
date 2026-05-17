import { toaster } from "../../components/ui/toaster";

export function enqueueToast(message: string, type: "success" | "error") {
    console.log("toast hit");

    toaster.create({
        title: type === "success" ? "Success" : "Error",
        description: message,
        type: type,
        duration: 3000,
    });
}
