"use client"
import Image from "next/image";
import {useState} from "react";
import {Check} from "lucide-react";
import {addQueue} from "@/app/_api/queueApi";
import {useRouter} from "next/navigation";
import {setCookie} from "nookies";

export default function Home() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [displayText, setDisplayText] = useState("");
  const handleConfirm = () => {
    setDisplayText(inputValue);
  };

  const handleEnterPage = async () => {
    if (displayText == ""){
      alert("write name and click check button");
    }else {
      setCookie(null, 'userID', displayText, {
        maxAge: 2 * 60 * 60, path: '/'
      });
      await addQueue(displayText);
      await router.push("/queue");
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
        <div className="flex flex-col mb-4">
          <div className="flex items-center mb-2">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter name here"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                aria-label="Text input"
            />
            <button
                onClick={handleConfirm}
                className="inline-flex items-center px-4 py-2 m-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                aria-label="Confirm text entry"
            >
              <Check className="w-5 h-5"/>
            </button>
          </div>
          <div
              className="py-2 px-4 bg-gray-50 rounded-lg border border-gray-200"
              role="region"
              aria-label="Displayed text"
          >
            {displayText ? (
                <p className="text-gray-800">{displayText}</p>
            ) : (
                <p className="text-gray-400 italic">Entered text will appear here</p>
            )}
          </div>
        </div>

          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <button
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                rel="noopener noreferrer"
                onClick={handleEnterPage}
            >
              <Image
                  className="dark:invert"
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
              />
              Ticket now
            </button>
            <a
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
            >
              Read our docs
            </a>
          </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
        >
          <Image
              aria-hidden
              src="/file.svg"
              alt="File icon"
              width={16}
              height={16}
          />
          Learn
        </a>
        <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
        >
          <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
          />
          Examples
        </a>
        <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
