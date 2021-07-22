import { CodeComponent } from "react-markdown/src/ast-to-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
  HeadingComponent,
  NormalComponent,
} from "react-markdown/src/ast-to-react";

const CodeBlock: CodeComponent = ({ inline, className, children }) => {
  if (inline) {
    return <code className={className}>{children}</code>;
  }
  const match = /language-(\w+)/.exec(className || "");
  const lang = match && match[1] ? match[1] : "";
  return (
    <div className="m-4">
      <SyntaxHighlighter
        style={dark}
        language={lang}
        children={String(children).replace(/\n$/, "")}
      />
    </div>
  );
};

const H2: HeadingComponent = ({ level, node, className, ...props }) => {
  return (
    <h2
      id={props.children[0].toString()}
      className="text-2xl font-bold px-2 m-4 border-b-4 border-l-8 border-red-300 "
    >
      {props.children}
    </h2>
  );
};

const P: NormalComponent = ({ ...props }) => {
  return <p className="ml-5 max-w-xl">{props.children}</p>;
};

export { CodeBlock, H2, P };
