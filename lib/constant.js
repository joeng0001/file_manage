import { TiDocumentAdd } from "react-icons/ti";
import { PiFileZipLight } from "react-icons/pi";
import { SiCsharp, SiJavascript, SiPhp } from "react-icons/si";
import {
  DiJava,
  DiPython,
  DiHtml5,
  DiCss3,
  DiRuby,
  DiSwift,
  DiRust,
} from "react-icons/di";
import {
  BsFiletypeTxt,
  BsCardImage,
  BsFiletypePdf,
  BsFiletypeDoc,
} from "react-icons/bs";

export const fileAllowExtension = [
  ".cs",
  ".java",
  ".py",
  ".html",
  ".css",
  ".js",
  ".php",
  ".rb",
  ".swift",
  ".rs",
  ".txt",
  ".doc",
  ".docx",
  ".png",
  ".pdf",
  ".jpg",
  ".zip",
];

export const extension2typeDictionary = {
  ".cs": "csharp",
  ".java": "java",
  ".py": "python",
  ".html": "html",
  ".css": "css",
  ".js": "javascript",
  ".php": "php",
  ".rb": "ruby",
  ".swift": "swift",
  ".rs": "rust",
  ".txt": "text",
  ".doc": "doc",
  ".docx": "docx",
  ".png": "png",
  ".pdf": "pdf",
  ".jpg": "jpg",
  ".zip": "zip",
};

export const type2extensionDictionary = {
  csharp: ".cs",
  java: ".java",
  python: ".py",
  html: ".html",
  css: ".css",
  javascript: ".js",
  php: ".php",
  ruby: ".rb",
  swift: ".swift",
  rust: ".rs",
  text: ".txt",
  doc: ".doc",
  docx: ".docx",
  png: ".png",
  pdf: ".pdf",
  jpg: ".jpg",
  zip: ".zip",
};

export const extension2viewType = {
  ".cs": "code",
  ".java": "code",
  ".py": "code",
  ".html": "code",
  ".css": "code",
  ".js": "code",
  ".php": "code",
  ".rb": "code",
  ".swift": "code",
  ".rs": "code",
  ".txt": "code",
  ".doc": "doc",
  ".docx": "doc",
  ".png": "image",
  ".pdf": "pdf",
  ".jpg": "image",
  ".zip": "zip",
};

export const fileTypeOption = [
  {
    displayName: "C#",
    extension: ".cs",
  },
  {
    displayName: "Java",
    extension: ".java",
  },
  {
    displayName: "Python",
    extension: ".py",
  },
  {
    displayName: "HTML",
    extension: ".html",
  },
  {
    displayName: "CSS",
    extension: ".css",
  },
  {
    displayName: "Javascript",
    extension: ".js",
  },
  {
    displayName: "PHP",
    extension: ".php",
  },
  {
    displayName: "Ruby",
    extension: ".rb",
  },
  {
    displayName: "Swift",
    extension: ".swift",
  },
  {
    displayName: "Rust",
    extension: ".rs",
  },
  {
    displayName: "TXT",
    extension: ".txt",
  },
  {
    displayName: "Doc",
    extension: ".doc",
  },
  {
    displayName: "Docx",
    extension: ".docx",
  },
];

export const homeList = [
  {
    href: "/folderViewer/csharp/?page=1",
    icon: <SiCsharp size={40} />,
    title: "C#",
  },
  {
    href: "/folderViewer/java/?page=1",
    icon: <DiJava size={40} />,
    title: "JAVA",
  },
  {
    href: "/folderViewer/python/?page=1",
    icon: <DiPython size={40} />,
    title: "Python",
  },
  {
    href: "/folderViewer/html/?page=1",
    icon: <DiHtml5 size={40} />,
    title: "HTML",
  },
  {
    href: "/folderViewer/css/?page=1",
    icon: <DiCss3 size={40} />,
    title: "CSS",
  },
  {
    href: "/folderViewer/javascript/?page=1",
    icon: <SiJavascript size={40} />,
    title: "JavaScript",
  },
  {
    href: "/folderViewer/php/?page=1",
    icon: <SiPhp size={40} />,
    title: "PHP",
  },
  {
    href: "/folderViewer/ruby/?page=1",
    icon: <DiRuby size={40} />,
    title: "Ruby",
  },
  {
    href: "/folderViewer/swift/?page=1",
    icon: <DiSwift size={40} />,
    title: "Swift",
  },
  {
    href: "/folderViewer/rust/?page=1",
    icon: <DiRust size={40} />,
    title: "Rust",
  },
  {
    href: "/folderViewer/txt/?page=1",
    icon: <BsFiletypeTxt size={40} />,
    title: "TXT",
  },
  {
    href: "/folderViewer/image/?page=1",
    icon: <BsCardImage size={40} />,
    title: "Image",
  },
  {
    href: "/folderViewer/pdf/?page=1",
    icon: <BsFiletypePdf size={40} />,
    title: "PDF",
  },
  {
    href: "/folderViewer/doc/?page=1",
    icon: <BsFiletypeDoc size={40} />,
    title: "Doc/Docx",
  },
  {
    href: "/folderViewer/others/?page=1",
    icon: <TiDocumentAdd size={40} />,
    title: "Others",
  },
  {
    href: "/folderViewer/zip/?page=1",
    icon: <PiFileZipLight size={40} />,
    title: "Zip",
  },
];
