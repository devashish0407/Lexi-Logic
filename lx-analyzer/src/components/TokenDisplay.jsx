import React, { useState } from "react";

const TOKEN_STYLES = {
  keyword: "text-purple-900 bg-purple-200",
  identifier: "text-green-900 bg-green-200",
  operator: "text-yellow-900 bg-yellow-200",
  number: "text-red-900 bg-red-200",
  string_literal: "text-blue-900 bg-blue-200",
  symbol: "text-gray-900 bg-gray-200",
  invalid: "text-black bg-red-200", // changed from unknown
};

const TOKEN_TOOLTIPS = {
  keyword: "Reserved word in C (e.g., int, return)",
  identifier: "User-defined name (variable, function, etc.)",
  operator: "Symbol performing operations (e.g., +, -)",
  number: "Numeric literal (e.g., 42)",
  string_literal: "String literal (e.g., \"Hello\")",
  symbol: "Syntax symbol (e.g., ;, {, })",
  invalid: "Unrecognized or invalid token", // changed
};

export default function TokenDisplay({ tokens }) {
  const [filter, setFilter] = useState("all");

  const tokensByLine = tokens.reduce((acc, token) => {
    acc[token.line] = acc[token.line] || [];
    acc[token.line].push(token);
    return acc;
  }, {});

  const tokenTypes = Object.keys(TOKEN_STYLES);

  const filteredTokensByLine = Object.fromEntries(
    Object.entries(tokensByLine).map(([line, lineTokens]) => [
      line,
      filter === "all"
        ? lineTokens
        : lineTokens.filter((token) => token.type === filter),
    ])
  );

  return (
    <div className="h-full bg-blue-200 flex flex-col">
      <div className="top-0 px-4 py-3 bg-white dark:bg-gray-800 z-10 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Tokens</h2>
        <select
          className="border-2 w-2xs rounded-xl px-3 py-1 text-sm"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option className="bg-gray-800" value="all">All</option>
          {tokenTypes.map((type) => (
            <option className="bg-gray-800" key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {tokens.length === 0 ? (
          <div className="h-full flex justify-center items-center text-black dark:text-black">
            No tokens to display
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(filteredTokensByLine).map(([line, lineTokens]) => {
              const normalTokens = lineTokens.filter((t) => t.type !== "invalid");
              const invalidTokens = lineTokens.filter((t) => t.type === "invalid");

              return (
                <div key={line} className="token-line relative animate-fadeIn">
                  <div className="pl-12 flex flex-wrap gap-2">
                    {filter !== "all"
                      ? lineTokens.map((token, index) =>
                          renderToken(token, index)
                        )
                      : <>
                          {normalTokens.map((token, index) =>
                            renderToken(token, index)
                          )}
                          {invalidTokens.length > 0 && normalTokens.length > 0 && (
                            <div className="w-full h-2" />
                          )}
                          {invalidTokens.map((token, index) =>
                            renderToken(token, index)
                          )}
                        </>
                    }
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function renderToken(token, index) {
  const colorClass = TOKEN_STYLES[token.type] || "text-black";
  const tooltip = TOKEN_TOOLTIPS[token.type] || "Token";

  return (
    <span
      key={`${token.line}-${token.column || index}-${index}`}
      className={`inline-flex items-center px-2 py-1 rounded text-sm font-mono transition-all hover:shadow-md hover:scale-105 cursor-pointer ${colorClass}`}
      title={tooltip}
    >
      <span className={`text-xs mr-1.5 ${
        token.type === "keyword" ? "font-bold" :
        token.type === "identifier" ? "font-semibold" :
        token.type === "operator" ? "font-medium" :
        token.type === "number" ? "font-normal" :
        token.type === "string_literal" ? "font-semibold italic" :
        token.type === "symbol" ? "font-light" :
        "font-bold italic"
      }`}>
        {token.type}
      </span>
      {token.value.length > 30
        ? `${token.value.substring(0, 30)}...`
        : token.value}
    </span>
  );
}
