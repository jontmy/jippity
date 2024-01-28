import { type User } from "lucia";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { type ComponentPropsWithoutRef, type ElementType, useMemo } from "react";

type UserAvatarProps<T extends ElementType> = ComponentPropsWithoutRef<T> & {
    user: User;
};

export function UserAvatar<T extends ElementType>(props: UserAvatarProps<T>) {
    const { user, ...rest } = props;
    const monogram = useMemo(() => {
        return user.username
            .split(" ")
            .map((w) => w[0])
            .join("")
            .toUpperCase();
    }, [user]);

    return (
        <Avatar {...rest}>
            <AvatarFallback>{monogram}</AvatarFallback>
        </Avatar>
    );
}
