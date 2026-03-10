import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  MousePointer2, 
  Target,
  BarChart3,
  ArrowUpRight,
  Filter,
  Download
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { Button } from "@/components/ui/button";

const data = [
  { name: 'Seg', leads: 4, conv: 2.1 },
  { name: 'Ter', leads: 7, conv: 3.5 },
  { name: 'Qua', leads: 5, conv: 2.8 },
  { name: 'Qui', leads: 12, conv: 5.2 },
  { name: 'Sex', leads: 9, conv: 4.1 },
  { name: 'Sab', leads: 15, conv: 6.8 },
  { name: 'Dom', leads: 18, conv: 8.2 },
];

const LeadDashboard = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Lead Performance <span className="text-primary italic">PowerBI</span></h1>
            <p className="text-muted-foreground text-sm uppercase tracking-widest font-mono mt-1">
              Asset: Elite Planejados V2 • Active Swarm: 137 Nodes • Synced: Bunker HQ
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2 h-8 text-xs">
              <Filter className="w-3 h-3" /> Filtrar
            </Button>
            <Button variant="outline" size="sm" className="gap-2 h-8 text-xs">
              <Download className="w-3 h-3" /> Exportar
            </Button>
          </div>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard title="Throughput" value="142.4 t/s" change="Optimizing" icon={Zap} />
          <StatCard title="Conv. Rate" value="4.82%" change="+2.1%" icon={Target} />
          <StatCard title="CTR (Google Ads)" value="3.1%" change="+0.4%" icon={MousePointer2} />
          <StatCard title="Sync Health" value="99.98%" change="Stable" icon={ShieldCheck} trend="up" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Main Chart */}
          <Card className="xl:col-span-2 border-border/50 bg-black/40 backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                Fluxo de Captação (7 Dias)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data}>
                    <defs>
                      <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                    <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#000', border: '1px solid #ffffff20', borderRadius: '12px' }}
                      itemStyle={{ color: '#10b981' }}
                    />
                    <Area type="monotone" dataKey="leads" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Leads Feed */}
          <Card className="border-border/50 bg-black/40 backdrop-blur-xl border-l-2 border-primary/30">
            <CardHeader>
              <CardTitle className="text-sm font-black uppercase tracking-widest">Leads em Tempo Real</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
               <div className="space-y-0 text-xs">
                  <LeadItem name="Ricardo Oliveira" project="Cozinha Luxo" status="Qualificado" time="12m ago" />
                  <LeadItem name="Amanda Costa" project="Penthouse" status="Análise" time="45m ago" />
                  <LeadItem name="Construtora XYZ" project="Loteamento" status="Prioridade" time="2h ago" />
                  <LeadItem name="Juliana Mendonça" project="Office" status="Qualificado" time="5h ago" />
                  <LeadItem name="Fábio Ramos" project="Gourmet" status="Análise" time="1d ago" />
               </div>
               <div className="p-4">
                  <Button variant="ghost" className="w-full text-[10px] uppercase font-black text-white/40 hover:text-primary">
                    Ver Todos os Registros
                  </Button>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

const StatCard = ({ title, value, change, icon: Icon, trend = "up" }: any) => (
  <Card className="border-border/50 bg-black/20">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <span className={`text-[10px] font-bold ${trend === "up" ? "text-primary" : "text-red-400"}`}>
          {change}
        </span>
      </div>
      <p className="text-[10px] font-black uppercase text-white/40 tracking-widest">{title}</p>
      <p className="text-2xl font-display font-black tracking-tighter mt-1">{value}</p>
    </CardContent>
  </Card>
);

const LeadItem = ({ name, project, status, time }: any) => (
  <div className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 transition-colors group">
    <div>
      <p className="font-bold text-white/80 group-hover:text-primary transition-colors">{name}</p>
      <p className="text-[10px] text-white/30 uppercase tracking-tighter">{project}</p>
    </div>
    <div className="text-right">
       <span className="text-[9px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold uppercase">{status}</span>
       <p className="text-[9px] text-white/20 mt-1 font-mono">{time}</p>
    </div>
  </div>
);

export default LeadDashboard;
