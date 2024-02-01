import { ImageResponse } from "next/og";

export const alt = "Jippity logo";
export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default function Image() {
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
                <span tw="font-sans">Jippity.</span>
            </div>
        ),
        {
            ...size,
        },
    );
}
