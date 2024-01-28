import { Bot, User } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { type ElementType } from "react";

type MessageProps = {
    id: string;
    role: string;
    content: string;
    as?: ElementType;
};

export function Message(props: MessageProps) {
    const Component = props.as ?? "div";
    return (
        <Component className="flex flex-col gap-2" key={props.id}>
            <div className="flex items-center gap-2 text-sm font-semibold">
                {props.role === "user" ? <User size={20} /> : <Bot size={20} />}
                {props.role === "user" ? "You" : "GPT"}
            </div>
            <Markdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[[rehypeKatex, { output: "mathml" }]]}
                className="space-y-4 *:space-y-4"
            >
                {props.content
                    .replaceAll("\\(", "$$")
                    .replaceAll("\\)", "$$")
                    .replaceAll("\\[", "\n$$")
                    .replaceAll("\\]", "$$\n")
                    .replaceAll("\\begin{align}", "\\begin{aligned}")
                    .replaceAll("\\end{align}", "\\end{aligned}")}
            </Markdown>
        </Component>
    );
}
