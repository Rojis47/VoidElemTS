import { useEffect, FC } from "react";

interface BubbleTextProps {
  text: string;
}

const BubbleText: FC<BubbleTextProps> = ({ text }) => {
  return (
    <div className=" place-content-center">
      <TextEffect text={text} />
    </div>
  );
};

interface TextEffectProps {
  text: string;
}

const TextEffect: FC<TextEffectProps> = ({ text }) => {
  useEffect(() => {
    const spans = document.querySelectorAll(".hover-text span");

    spans.forEach((span) => {
      span.addEventListener("mouseenter", function () {
        this.style.fontWeight = "900";
        this.style.color = "rgb(238, 242, 255)";

        const leftNeighbor = this.previousElementSibling as HTMLElement | null;
        const rightNeighbor = this.nextElementSibling as HTMLElement | null;

        if (leftNeighbor) {
          leftNeighbor.style.fontWeight = "500";
          leftNeighbor.style.color = "rgb(199, 210, 254)";
        }
        if (rightNeighbor) {
          rightNeighbor.style.fontWeight = "500";
          rightNeighbor.style.color = "rgb(199, 210, 254)";
        }
      });

      span.addEventListener("mouseleave", function () {
        this.style.fontWeight = "100";
        this.style.color = "rgb(165, 180, 252)";

        const leftNeighbor = this.previousElementSibling as HTMLElement | null;
        const rightNeighbor = this.nextElementSibling as HTMLElement | null;

        if (leftNeighbor) {
          leftNeighbor.style.fontWeight = "100";
          leftNeighbor.style.color = "rgb(165, 180, 252)";
        }

        if (rightNeighbor) {
          rightNeighbor.style.fontWeight = "100";
          rightNeighbor.style.color = "rgb(165, 180, 252)";
        }
      });
    });
  }, []);

  return (
    <h2 className="text-5xl font-thin text-center text-indigo-300 hover-text">
      <Text>{text}</Text>
    </h2>
  );
};

interface TextProps {
  children: string;
}

const Text: FC<TextProps> = ({ children }) => {
  return (
    <>
      {children.split("").map((child, idx) => (
        <span
          style={{
            transition: "0.35s font-weight, 0.35s color",
          }}
          key={idx}
        >
          {child}
        </span>
      ))}
    </>
  );
};

export default BubbleText;
