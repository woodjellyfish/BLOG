import { CodeComponent } from "react-markdown/src/ast-to-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
  HeadingComponent,
  NormalComponent,
} from "react-markdown/src/ast-to-react";
import styles from "./components.module.css";

const CodeBlock: CodeComponent = ({ inline, className, children }) => {
  if (inline) {
    return <code className={className}>{children}</code>;
  }
  const match = /language-(\w+)/.exec(className || "");
  const lang = match && match[1] ? match[1] : "";
  return (
    <SyntaxHighlighter
      style={dark}
      language={lang}
      children={String(children).replace(/\n$/, "")}
    />
  );
};

const H2: HeadingComponent = ({ level, node, ...props }) => {
  return <h2 className={styles.h2}>{props.children}</h2>;
};

const P: NormalComponent = ({ ...props }) => {
  return <p className={styles.p}>{props.children}</p>;
};

export { CodeBlock, H2, P };
