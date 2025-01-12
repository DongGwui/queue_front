"use client"
import {RefreshCw, UserCheck, Users} from "lucide-react";
import React, {useEffect, useState} from "react";
import {getAllQueue, processQueue} from "@/app/_api/queueApi";
export default function QueueManagement() {
    const [queue, setQueue] = useState([""]);

    useEffect(() => {
        refreshQueue();
    }, []);

    const processUser = async () => {
        await processQueue();
        await refreshQueue();
    };

    const refreshQueue = async () => {
        const users = await getAllQueue();
        setQueue(await users);
    }

    return (
        <main className="container mx-auto px-4 py-8 max-w-3xl">
            <header className="flex items-center gap-2 mb-8">
                <Users className="w-6 h-6" />
                <h1 className="text-2xl font-bold">대기열 관리</h1>
            </header>

            <div className="mb-4 flex gap-2">
                <button
                    onClick={processUser}
                    disabled={queue.length === 0}
                    className="flex items-center gap-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    <UserCheck className="w-4 h-4"/>
                    <span>다음 순번 처리</span>
                </button>
                <button
                    onClick={refreshQueue}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                    <RefreshCw className="w-4 h-4"/>
                    <span>새로고침</span>
                </button>
            </div>

            {queue.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">대기열이 비어있습니다</p>
                </div>
            ) : (
                <ul className="space-y-4">
                {queue.map((user,index) => (
                        <li
                            key={index}
                            className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="space-y-1">
                                <p className="font-medium">{user}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-6 text-sm text-gray-500">
                Total users in queue: {queue.length}
            </div>
        </main>
    );
}