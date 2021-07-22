import { CodeComponent } from "react-markdown/src/ast-to-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import {
  HeadingComponent,
  NormalComponent,
} from "react-markdown/src/ast-to-react";

export const CodeBlock: CodeComponent = ({ inline, className, children }) => {
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

export const H2: HeadingComponent = ({ level, node, className, ...props }) => {
  return (
    <h2
      id={props.children[0].toString()}
      className="text-2xl font-bold px-2 m-4 border-b-4 border-l-[16px] border-red-300 "
    >
      {props.children}
    </h2>
  );
};

export const H3: HeadingComponent = ({ level, node, className, ...props }) => {
  return <h3 className="text-xl font-bold px-2 m-4">{props.children}</h3>;
};

export const P: NormalComponent = ({ ...props }) => {
  return <p className="ml-5 max-w-2xl">{props.children}</p>;
};
