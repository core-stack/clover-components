import { cva, VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

// Define variantes de tamanho com cva
const svgVariants = cva("inline-block", {
  variants: {
    size: {
      small: "w-6 h-6", // 24px
      normal: "w-10 h-10", // 40px
      large: "w-16 h-16", // 64px
    },
  },
  defaultVariants: {
    size: "normal",
  },
});

// Função para converter a string SVG em HTML válido
const parseSvg = (svgString: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgString, "image/svg+xml");
  return doc.documentElement.outerHTML;
};

type SVGProps = {
  svgString: string;
} & VariantProps<typeof svgVariants> & { className?: string };

export const SVG = ({ svgString, size, className }: SVGProps) => {
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    setSvgContent(parseSvg(svgString));
  }, [svgString]);

  return (
    <div
      className={clsx(svgVariants({ size }), className)}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};
