import { useState, useEffect, useMemo } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Brain, 
  Cpu, 
  Activity, 
  Database, 
  Zap, 
  Shield, 
  MessageSquare, 
  Terminal,
  Grid3X3,
  Network
} from "lucide-react";

// Agent types for the 100-agent swarm
const AGENT_ROLES = [
  "Strategist", "Designer", "Engineer", "Validator", "Auditor", 
  "Market Analyst", "Copywriter", "SEO Engine", "UX Architect", "Cloud Ops"
];

const NeuralLab = () => {
  const [activeLogs, setActiveLogs] = useState<{ id: number; agent: string; role: string; message: string; timestamp: string }[]>([]);
  const [swarmMaturity, setSwarmMaturity] = useState(98.2); // Current High-Ticket Asset maturity state
  const [activeNodesCount, setActiveNodesCount] = useState(137); // Real count from Audit
  
  // Generating 100 agents for the grid
  const agents = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i,
      role: AGENT_ROLES[Math.floor(Math.random() * AGENT_ROLES.length)],
      status: Math.random() > 0.8 ? "active" : Math.random() > 0.5 ? "idle" : "thinking",
      load: Math.floor(Math.random() * 100),
      label: `AG-${(i + 1).toString().padStart(3, '0')}`
    }));
  }, []);

  // Simulate real-time agent "thinking" and communication
  useEffect(() => {
    const interval = setInterval(() => {
      const luckyAgent = agents[Math.floor(Math.random() * agents.length)];
      const actions = [
        "Analyzing 'initiative-intake-engine' for orphan detection...",
        "Refining 'pipeline-architecture' DAG wave-6 execution plan...",
        "Optimizing 'autonomous-api-generator' context compression...",
        "Cross-referencing 'market-signal-analyzer' with Bunker metadata...",
        "Recruiting 'repair-policy-engine' for drift detection...",
        "Validating 'observability-engine' sync status with Fred HQ...",
        "Consulting 'economic-optimization-engine' for asset efficiency...",
        "Synchronizing 'pipeline-execution-orchestrator' across 6 parallel workers..."
      ];
      
      const newLog = {
        id: Date.now(),
        agent: luckyAgent.label,
        role: luckyAgent.role,
        message: actions[Math.floor(Math.random() * actions.length)],
        timestamp: new Date().toLocaleTimeString()
      };

      setActiveLogs(prev => [newLog, ...prev].slice(0, 10));
      
      // Slowly increase maturity as agents "work"
      setSwarmMaturity(prev => Math.min(prev + 0.05, 100));
    }, 1500);

    return () => clearInterval(interval);
  }, [agents]);

  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setPulse(p => (p + 1) % 100), 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Project Context HUD */}
        <div className="flex items-center justify-between bg-primary/5 border border-primary/20 rounded-2xl p-4 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className={`w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(16,185,129,0.8)] ${pulse % 2 === 0 ? "scale-125 opacity-100" : "scale-100 opacity-50"} transition-all duration-1000`} />
            <div>
              <p className="text-[10px] font-black uppercase text-primary tracking-widest leading-none">Global Swarm Active</p>
              <h2 className="text-sm font-black uppercase mt-1">Project: Elite Planejados V2 • Phase 2: Deployment</h2>
            </div>
          </div>
          <div className="text-right">
             <p className="text-[10px] font-mono text-white/40">Throughput: 142.4 t/s</p>
             <p className="text-[10px] font-mono text-white/40">Synced: Bunker HQ (fred.py)</p>
          </div>
        </div>
        {/* Header Overlay */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-black tracking-tighter uppercase italic">
              NEXUS <span className="text-primary">LAB</span>
            </h1>
            <p className="text-sm text-muted-foreground font-mono uppercase tracking-widest mt-1">
              Active AGI Orquestration Swarm ({activeNodesCount} Active Nodes)
            </p>
          </div>
          <div className="flex items-center gap-6 glass px-6 py-3 rounded-2xl border border-primary/20">
             <div className="text-right">
                <p className="text-[10px] font-black text-primary uppercase">Asset Maturity</p>
                <p className="text-2xl font-display font-black tracking-tighter italic">{swarmMaturity.toFixed(1)}%</p>
             </div>
             <div className="w-32">
                <Progress value={swarmMaturity} className="h-2 bg-white/5" />
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Visualization: The Grid */}
          <Card className="xl:col-span-2 border-border/50 bg-[#050505]/80 backdrop-blur-3xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>
            <CardHeader className="border-b border-white/5 pb-4">
               <div className="flex items-center justify-between">
                  <CardTitle className="text-xs uppercase tracking-[0.2em] font-black flex items-center gap-2">
                    <Grid3X3 className="w-4 h-4 text-primary" />
                    Neural Swarm Visualization
                  </CardTitle>
                  <div className="flex items-center gap-4 text-[10px] font-bold">
                     <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary animate-pulse" /> Active</span>
                     <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Thinking</span>
                     <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-white/10" /> Idle</span>
                  </div>
               </div>
            </CardHeader>
            <CardContent className="p-8">
               <div className="grid grid-cols-10 gap-2 md:gap-3">
                  {agents.map((agent) => (
                    <AgentNode key={agent.id} agent={agent} />
                  ))}
               </div>
            </CardContent>
          </Card>

          {/* Side Panel: The Thought Stream */}
          <div className="space-y-6">
            <Card className="border-border/50 bg-[#050505]/80 backdrop-blur-3xl border-l border-primary/20">
              <CardHeader className="pb-2 border-b border-white/5">
                <CardTitle className="text-xs uppercase tracking-[0.2em] font-black flex items-center gap-2 font-mono">
                  <Terminal className="w-4 h-4 text-primary" />
                  Live Brain Stream
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[400px] font-mono text-[11px] overflow-hidden relative">
                   <div className="absolute inset-0 p-4 space-y-3">
                      <AnimatePresence initial={false}>
                        {activeLogs.map((log) => (
                          <motion.div
                            key={log.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="border-l-2 border-primary/20 pl-3 py-1 bg-white/5 rounded-r-md"
                          >
                             <div className="flex items-center justify-between mb-1">
                                <span className="text-primary font-bold">[{log.agent}]</span>
                                <span className="text-white/20">{log.timestamp}</span>
                             </div>
                             <p className="text-white/70 italic leading-relaxed">{log.message}</p>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                   </div>
                   <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-[#050505] to-transparent"></div>
                </div>
              </CardContent>
            </Card>

            {/* Orchestration Stats */}
            <Card className="border-border/50 bg-primary/5">
               <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center border border-primary/30">
                           <Network className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-primary uppercase leading-tight">Sync Reliability</p>
                           <p className="text-xl font-display font-black italic">99.98%</p>
                        </div>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-bold uppercase">
                        <span className="text-white/40">Collective Intelligence</span>
                        <span className="text-primary tracking-widest animate-pulse">OPTIMIZING</span>
                     </div>
                     <Progress value={85} className="h-1 bg-white/5" />
                  </div>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

const AgentNode = ({ agent }: { agent: { id: number; role: string; status: string; load: number; label: string } }) => {
  return (
    <div className="relative group cursor-help">
       <motion.div 
         whileHover={{ scale: 1.1, zIndex: 10 }}
         className={`aspect-square rounded-[20%] transition-colors duration-500 flex items-center justify-center border ${
           agent.status === "active" 
             ? "bg-primary/20 border-primary shadow-[0_0_10px_rgba(16,185,129,0.3)] animate-pulse" 
             : agent.status === "thinking"
             ? "bg-blue-500/10 border-blue-500/50"
             : "bg-white/5 border-white/5"
         }`}
       >
          <Brain className={`w-[40%] ${
            agent.status === "active" ? "text-primary" : "text-white/10"
          }`} />
       </motion.div>
       
       {/* Tooltip on Hover */}
       <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
          <div className="glass border border-white/10 px-3 py-2 rounded-xl text-[9px] whitespace-nowrap shadow-2xl">
             <p className="font-black text-primary italic uppercase">{agent.label}</p>
             <p className="text-white/50 font-bold tracking-widest">{agent.role}</p>
             <p className="text-white/20 mt-1 uppercase">Load: {agent.load}%</p>
          </div>
       </div>
    </div>
  );
};

export default NeuralLab;
