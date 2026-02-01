import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Calendar, Star, ArrowRight, ShieldAlert, CheckCircle } from 'lucide-react';

interface CoachingItem {
    call_id: string;
    date: string;
    problem_title: string;
    score: number | string;
    region: string;
    duration: number;
    tags: string[];
}

const CoachingPage: React.FC = () => {
    const [items, setItems] = useState<CoachingItem[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://127.0.0.1:8000/coaching-needs')
            .then(res => res.json())
            .then(data => {
                setItems(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load coaching data", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-black text-white pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-4">
                        Coaching
                    </h1>
                    <div className="h-px w-24 bg-white/20 mb-6"></div>
                    <p className="text-gray-400 max-w-2xl text-lg font-light">
                        Review calls where the AI detected specific problems. Targeted coaching improves agent performance and adherence.
                    </p>
                </header>

                {loading ? (
                    <div className="text-center text-gray-500 animate-pulse mt-20">Loading coaching data...</div>
                ) : items.length === 0 ? (
                    <div className="text-center p-12 border border-white/10 rounded-2xl bg-white/5">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">No Coaching Needed</h3>
                        <p className="text-gray-400">Great news! No recent calls have triggered critical risks or fell below the coaching threshold.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map((item) => (
                            <div
                                key={item.call_id}
                                onClick={() => navigate(`/analysis?callId=${item.call_id}`)}
                                className="relative group bg-[#0F0F0F] border border-white/5 rounded-3xl p-8 hover:bg-[#141414] hover:border-white/10 transition-all duration-300 cursor-pointer shadow-2xl"
                            >
                                {/* Category Badge */}
                                <div className={`absolute top-6 right-6 text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest backdrop-blur-md border 
                                    ${item.tags[0]?.includes('Risk') ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                        item.tags[0]?.includes('Performance') ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                            'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}`}>
                                    {item.tags[0] || 'Technical'}
                                </div>

                                {/* Large Circular Icon (Logo style) */}
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-8 shadow-inner transition-transform group-hover:scale-110 duration-500
                                    ${item.tags[0]?.includes('Risk') ? 'bg-gradient-to-br from-red-500 to-orange-600' :
                                        item.tags[0]?.includes('Performance') ? 'bg-gradient-to-br from-yellow-500 to-amber-600' :
                                            'bg-gradient-to-br from-indigo-500 to-purple-600'}
                                `}>
                                    {item.tags[0]?.includes('Risk') ? (
                                        <ShieldAlert className="w-8 h-8 text-white" />
                                    ) : item.tags[0]?.includes('Performance') ? (
                                        <Star className="w-8 h-8 text-white" />
                                    ) : (
                                        <AlertCircle className="w-8 h-8 text-white" />
                                    )}
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl font-bold text-white mb-6 leading-tight group-hover:text-indigo-400 transition-colors">
                                    {item.problem_title}
                                </h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center text-gray-400 text-sm font-medium">
                                        <Calendar className="w-5 h-5 mr-3 text-indigo-500/50" />
                                        {new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                    <div className="flex items-center text-gray-400 text-sm font-medium">
                                        <Star className="w-5 h-5 mr-3 text-yellow-500/50" />
                                        <span className="text-white/80">Score: </span>
                                        <span className={`ml-2 font-mono text-lg ${Number(item.score) >= 80 ? 'text-green-400' :
                                            Number(item.score) >= 50 ? 'text-yellow-400' : 'text-red-400'
                                            }`}>
                                            {item.score}/100
                                        </span>
                                    </div>
                                </div>

                                <p className="text-gray-500 text-sm font-light leading-relaxed mb-8">
                                    Review the specific coaching points for this {item.tags[0]?.toLowerCase() || 'failure'} to improve service quality.
                                </p>

                                {/* Footer/Action */}
                                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                                    <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">
                                        Review Details
                                    </span>
                                    <ArrowRight className="w-5 h-5 text-indigo-500 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoachingPage;