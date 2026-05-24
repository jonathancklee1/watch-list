import { useContext, useState } from "react";
import { supabase } from "../../utils/helpers/supabase";
import { Button } from "../Button/Button";
import { StyledUserButton } from "./UserButton.styles";
import { AuthContext } from "../../utils/contexts/AuthContext";
import { Image, Popover, Portal, Text } from "@chakra-ui/react";
import { enqueueToast } from "../../utils/helpers/enqueueToast";

function UserButton() {
    async function signIn() {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
            });
            if (error) throw error;
        } catch (error) {
            enqueueToast("Failed to sign in", "error");
            console.error(error);
        }
    }

    function signOut() {
        try {
            supabase.auth.signOut();
            enqueueToast("Signed out successfully!", "success");
        } catch (error) {
            enqueueToast("Failed to sign out", "error");
            console.error(error);
        }
    }
    const { user } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    if (user)
        return (
            <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
                <Popover.Trigger asChild>
                    <StyledUserButton>
                        {user.user_metadata.avatar_url ? (
                            <Image
                                src={user.user_metadata.avatar_url}
                                alt="user avatar"
                            />
                        ) : (
                            <Image
                                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                alt="user avatar"
                            />
                        )}
                    </StyledUserButton>
                </Popover.Trigger>
                <Portal>
                    <Popover.Positioner>
                        <Popover.Content
                            w={"fit-content"}
                            css={{
                                "--popover-bg":
                                    "var(--background--secondary-color)",
                            }}
                        >
                            <Popover.Arrow />
                            <Popover.Body
                                display={"flex"}
                                flexDir={"column"}
                                gap={"1em"}
                            >
                                <Text fontWeight={"bold"} fontSize={"1rem"}>
                                    Welcome, {user.user_metadata.full_name}!
                                </Text>
                                <Button
                                    label="Sign Out"
                                    $primary
                                    onClick={signOut}
                                ></Button>
                            </Popover.Body>
                        </Popover.Content>
                    </Popover.Positioner>
                </Portal>
            </Popover.Root>
        );

    return (
        <Button label="Sign In With Google" $primary onClick={signIn}></Button>
    );
}

export default UserButton;
