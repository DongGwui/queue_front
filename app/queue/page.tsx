"use client"
import {useEffect, useRef, useState} from 'react';
import {checkQueuePosition} from "@/app/_api/queueApi";
import {parseCookies} from "nookies";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import {Stomp} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

export default function QueuePage() {
    const cookies = parseCookies();
    const router = useRouter();
    const [position, setPosition] = useState<number | null>(null);
    const [user, setUser] = useState<string | null>(null);
    // 이전 position 값을 추적하기 위한 useRef
    const prevPositionRef = useRef<number | null>(0);
    const socket = new SockJS('http://localhost:8080/ws/notify');
    const client = Stomp.over(socket);

    const userId = cookies["userID"];

    useEffect(() => {
        const checkPosition = async () => {
            const dd = checkQueuePosition(userId);
            setPosition(await dd);
        }
        checkPosition();
    }, []);

    useEffect(() => {
        client.connect({}, () => {
            console.log('Connected to WebSocket');

            // 메시지 수신
            client.subscribe(`/user/queue/userPosition`, (message) => {
                const data = JSON.parse(message.body);
                console.log(data);
                setPosition(data.position);
                setUser(data.userId);
            });

            // 메시지 전송
            client.send('/app/joinQueue', {}, JSON.stringify({userId}));

        },(error) => {
            console.error('WebSocket error : ', error);
        });

        return () => {
            client.disconnect();
        };

    }, []);



    useEffect(() => {
        // 이전 position 값을 추적
        prevPositionRef.current = position;
    }, [position]);

    useEffect(() => {
        // 현재 position 값과 이전 값 비교
        if (prevPositionRef.current > 0 && position < 0) {
            router.push("/ticket");
        }
    }, [position, router]);


    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8 animate-fadeIn">
            {/* Queue Position */}
            {position !== null ? (<div className="text-center">
                <p className="text-sm text-gray-500 mb-2">현재 대기 순서</p>
                <span className="text-7xl md:text-8xl font-bold text-gray-700 animate-pulse">
          {position}
        </span>
            </div>) : (
                <p>대기열 상태를 확인 중...</p>
            )}

            {/* Custom Loading Spinner */}
            <div className="relative">
                <Loader2 className="w-12 h-12 text-gray-400 animate-spin"/>
            </div>

            {/* Status Message */}
            <div className="text-center space-y-2">
                <h1 className="text-xl md:text-2xl font-medium text-gray-700">
                    {user}
                </h1>
                <h1 className="text-xl md:text-2xl font-medium text-gray-700">
                    대기 중입니다
                </h1>
            </div>
        </main>
    )
        ;
}