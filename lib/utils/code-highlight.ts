import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup'; // HTML
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-go';
import 'prismjs/components/prism-rust';

export function highlightCode(code: string, language: string): string {
  try {
    // Map language aliases
    const languageMap: Record<string, string> = {
      'html': 'markup',
      'js': 'javascript',
      'ts': 'typescript',
      'py': 'python',
      'cpp': 'cpp',
      'cs': 'csharp',
    };

    const prismLanguage = languageMap[language] || language;
    
    if (Prism.languages[prismLanguage]) {
      return Prism.highlight(code, Prism.languages[prismLanguage], prismLanguage);
    }
    
    // Fallback to plain text if language not supported
    return code;
  } catch (error) {
    console.error('Error highlighting code:', error);
    return code;
  }
}