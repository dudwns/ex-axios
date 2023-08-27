import Box from "./Box";

interface ParagraphProps {
  line: number;
}

const Paragraph = ({ line = 3, ...props }: ParagraphProps) => {
  return (
    <div {...props}>
      {Array.from(Array(line), (_, index) =>
        index !== line - 1 ? (
          <Box width="100%" height={16} key={index} />
        ) : (
          <Box width="64%" height={16} key={index} />
        )
      )}
    </div>
  );
};

export default Paragraph;
