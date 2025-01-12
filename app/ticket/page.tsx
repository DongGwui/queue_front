import { Check } from "lucide-react";
import React, {useEffect, useState} from "react";
import {parseCookies} from "nookies";
export default function QueueSuccessPage() {
    const cookies = parseCookies();
    const [user, setUser] = useState("");
    useEffect(() => {
        // Trigger animation on mount
        const checkmark = document.querySelector(".checkmark-circle");
        checkmark?.classList.add("animate-scale");
        setUser(cookies["userId"])
    }, []);
    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center bg-white px-4">
            <div className="text-center">
                <div className="relative mb-8">
                    <div
                        className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mx-auto checkmark-circle">
                        <Check
                            className="w-14 h-14 text-green-500 animate-[bounce_1s_ease-in-out]"
                            strokeWidth={2.5}
                        />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    대기열 통과 완료!
                </h1>

                <p className="text-lg text-gray-600">
                    성공적으로 대기열을 통과했습니다
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    {user}
                </h2>
            </div>

            <style jsx>{`
                @keyframes scale {
                    0% {
                        transform: scale(0);
                        opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-scale {
          animation: scale 0.5s ease-out forwards;
        }
      `}</style>
        </main>
    );
}