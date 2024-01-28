import { type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";

type ShowProps<T extends ElementType> = ComponentPropsWithoutRef<T> & {
    as?: ElementType;
    when: unknown;
    children: ReactNode;
    fallback?: ReactNode;
};

export function Show<T extends ElementType>(props: ShowProps<T>) {
    if (!props.when) {
        return props.fallback ?? null;
    }
    if (props.as) {
        const { as, _when, _fallback, ...rest } = props;
        const Component = as;
        return <Component {...rest}>{props.children}</Component>;
    }
    return props.children;
}
