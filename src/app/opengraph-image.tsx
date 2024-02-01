import { ImageResponse } from "next/og";

export const alt = "Jippity logo";
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default async function Image() {
    const res = await fetch(new URL("./fonts/Satoshi-Variable.ttf"));
    const font = await res.arrayBuffer();

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 128,
                    background: "#18181b",
                    color: "white",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                Jippity.
            </div>
        ),
        {
            ...size,
            fonts: [
                {
                    name: "Satoshi Variable",
                    data: font,
                    style: "normal",
                    weight: 900,
                },
            ],
        },
    );
}
