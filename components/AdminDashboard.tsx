
import React, { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Phone, Mail, Calendar, Search, ShieldAlert, CheckCircle, ExternalLink } from 'lucide-react';

interface UserData {
    id: string;
    email: string;
    name?: string;
    role?: 'admin' | 'user';
    branches?: string[];
    phone?: string;
}

interface CallData {
    call_id: string;
    user_id?: string;
    timestamp: string;
    evaluation: {
        scoring: {
            final_score: number;
        };
    };
    metadata: {
        duration: number;
        region?: string;
    };
}

const AdminDashboard: React.FC = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [userCalls, setUserCalls] = useState<CallData[]>([]);
    const [loading, setLoading] = useState(true);
    const [callsLoading, setCallsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const usersCollection = collection(db, 'users');
            const userSnapshot = await getDocs(usersCollection);
            const userList: UserData[] = userSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as UserData));
            setUsers(userList);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    };

    const fetchUserCalls = async (userId: string) => {
        setCallsLoading(true);
        setUserCalls([]); // Reset calls
        try {
            const response = await fetch(`http://localhost:8000/calls?user_id=${userId}`);
            if (!response.ok) {
                console.warn(`Failed to fetch calls: ${response.status} ${response.statusText}`);
                // If 404, it might mean the endpoint isn't ready or user has no calls (depending on backend impl)
                return;
            }
            const data = await response.json();
            if (Array.isArray(data)) {
                setUserCalls(data);
            } else {
                console.error("Expected array of calls but got:", data);
                setUserCalls([]);
            }
        } catch (error) {
            console.error("Error fetching calls:", error);
            setUserCalls([]);
        } finally {
            setCallsLoading(false);
        }
    };

    const handleUserClick = (user: UserData) => {
        setSelectedUser(user);
        fetchUserCalls(user.id);
    };

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto h-[85vh] flex flex-col md:flex-row gap-6">

                {/* Sidebar: Users List */}
                <div className={`w-full md:w-1/3 bg-[#0A0A0A] border border-white/10 rounded-2xl flex flex-col overflow-hidden ${selectedUser ? 'hidden md:flex' : 'flex'}`}>
                    <div className="p-6 border-b border-white/10">
                        <h2 className="text-xl font-bold mb-2">Users</h2>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-4 text-sm focus:border-white/30 outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
                        {loading ? (
                            <div className="text-center text-gray-500 py-10">Loading users...</div>
                        ) : (
                            users.map(user => (
                                <div
                                    key={user.id}
                                    onClick={() => handleUserClick(user)}
                                    className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedUser?.id === user.id
                                        ? 'bg-white/10 border-white/30'
                                        : 'bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10'
                                        }`}
                                >
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold">
                                            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm text-white">{user.name || "Unknown User"}</p>
                                            <p className="text-xs text-gray-500 truncate max-w-[150px]">{user.email}</p>
                                        </div>
                                        {user.role === 'admin' && (
                                            <span className="ml-auto bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 rounded border border-indigo-500/30">
                                                ADMIN
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Main: Call History */}
                <div className={`w-full md:w-2/3 bg-[#0A0A0A] border border-white/10 rounded-2xl flex flex-col overflow-hidden ${!selectedUser ? 'hidden md:flex' : 'flex'}`}>
                    {selectedUser ? (
                        <>
                            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setSelectedUser(null)}
                                        className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                    </button>
                                    <div>
                                        <h2 className="text-xl font-bold flex items-center gap-2">
                                            {selectedUser.name}
                                            <span className="text-sm font-normal text-gray-400">({selectedUser.role || 'user'})</span>
                                        </h2>
                                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                                            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {selectedUser.email}</span>
                                            {selectedUser.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {selectedUser.phone}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                                {callsLoading ? (
                                    <div className="text-center text-gray-500 py-20">Loading calls...</div>
                                ) : userCalls.length === 0 ? (
                                    <div className="text-center py-20 border border-dashed border-white/10 rounded-xl">
                                        <p className="text-gray-500">No calls recorded for this user.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-4">
                                        {userCalls.map(call => (
                                            <div
                                                key={call.call_id}
                                                onClick={() => navigate(`/analysis?callId=${call.call_id}`)}
                                                className="group bg-white/5 border border-white/10 rounded-xl p-5 hover:border-white/30 hover:bg-white/10 transition-all cursor-pointer relative overflow-hidden"
                                            >
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className={`px-2 py-0.5 rounded textxs font-bold ${(call.evaluation?.scoring?.final_score || 0) >= 80 ? 'bg-green-500/20 text-green-400' :
                                                                (call.evaluation?.scoring?.final_score || 0) >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                                                                    'bg-red-500/20 text-red-400'
                                                                }`}>
                                                                {call.evaluation?.scoring?.final_score ?? 0}% Score
                                                            </span>
                                                            <span className="text-xs text-gray-500 font-mono">
                                                                ID: {call.call_id.slice(0, 8)}...
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-400 text-xs flex items-center gap-2">
                                                            <Calendar className="w-3 h-3" />
                                                            {new Date(call.timestamp).toLocaleString()}
                                                        </p>
                                                    </div>
                                                    <ExternalLink className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>

                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-300">
                                                        Duration: <span className="text-white">{(call.metadata.duration / 60).toFixed(1)}m</span>
                                                    </span>
                                                    {call.metadata.region && (
                                                        <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-xs text-gray-400">
                                                            {call.metadata.region}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                            <User className="w-16 h-16 mb-4 opacity-20" />
                            <p>Select a user to view their call history</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
