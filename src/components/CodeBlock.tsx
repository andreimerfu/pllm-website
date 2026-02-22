import React, { useEffect, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import '../styles/prism.css';
import { Icon } from '@iconify/react';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'bash', className = '' }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col ${className}`}>
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-100 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700/50">
        <span className="text-slate-400 dark:text-slate-500 text-xs font-mono uppercase tracking-wider">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors text-xs"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Icon icon="solar:check-circle-bold-duotone" width={14} height={14} />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Icon icon="solar:copy-bold-duotone" width={14} height={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto flex-1">
        <pre className="text-sm">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
