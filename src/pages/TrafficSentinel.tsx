import React, { useState, useEffect } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Map as MapIcon, 
  AlertTriangle, 
  TrendingUp, 
  Car, 
  ShieldCheck,
  Signal,
  Clock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TrafficSentinel = () => {
  const [activeIncidents, setActiveIncidents] = useState(12);
  const [trafficFlow, setTrafficFlow] = useState(84);
  const [systemHealth, setSystemHealth] = useState(99);
  
  // Real-time animation simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setTrafficFlow(prev => {
        const delta = Math.floor(Math.random() * 5) - 2;
        return Math.min(100, Math.max(70, prev + delta));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AppLayout>
      <div className="flex h-full flex-col space-y-8 p-8 overflow-y-auto bg-black/50 backdrop-blur-xl border border-white/5 rounded-3xl m-4 shadow-2xl">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-black tracking-tighter text-white uppercase italic"
            >
              Traffic <span className="text-cyan-400">Sentinel</span>
            </motion.h1>
            <p className="text-muted-foreground mt-2 font-medium">Bunker Autonomous Monitoring v2.0</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="px-4 py-1.5 border-cyan-500/50 text-cyan-400 bg-cyan-950/20 animate-pulse">
              <Activity className="w-3 h-3 mr-2" /> LIVE ENGINE
            </Badge>
            <div className="flex items-center space-x-2 text-xs font-mono text-white/40">
              <Clock className="w-3 h-3" />
              <span>UPTIME: 142H 12M 04S</span>
            </div>
          </div>
        </div>

        {/* Global Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Traffic Flow" 
            value={`${trafficFlow}%`} 
            icon={<TrendingUp className="text-emerald-400" />} 
            trend="+4.2%" 
            barValue={trafficFlow}
            barColor="bg-emerald-500"
          />
          <StatCard 
            title="Active Vehicles" 
            value="12.4k" 
            icon={<Car className="text-cyan-400" />} 
            subtitle="Current detection avg"
          />
          <StatCard 
            title="Active Incidents" 
            value={activeIncidents.toString()} 
            icon={<AlertTriangle className="text-orange-400" />} 
            trend="-2 from last hour" 
            isWarning={activeIncidents > 10}
          />
          <StatCard 
            title="System Health" 
            value={`${systemHealth}%`} 
            icon={<ShieldCheck className="text-blue-400" />} 
            subtitle="Sentinel Node-4 Active"
          />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full min-h-[500px]">
          {/* Map Portal */}
          <div className="lg:col-span-8 group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-inner">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 p-8 flex flex-col justify-end">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">Metropolitan Grid Alpha</h3>
                  <p className="text-sm text-white/50">Tracking 24 sectors in real-time</p>
                </div>
                <button className="px-6 py-2 bg-white text-black font-bold rounded-full text-sm hover:bg-cyan-400 transition-all transform hover:scale-105 active:scale-95">
                  EXPAND PORTAL
                </button>
              </div>
            </div>
            {/* Using the generated hero image as the map visual */}
            <img 
              src="/traffic_sentinel_hero_1773022815733.png" 
              alt="Neural Traffic Map" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[10s] ease-linear"
            />
            {/* Dynamic UI Overlays on Map */}
            <div className="absolute top-6 right-6 z-20 space-y-2">
              <MapOverlayItem icon={<Signal className="w-3 h-3" />} label="LIDAR Active" />
              <MapOverlayItem icon={<MapIcon className="w-3 h-3" />} label="Sat-Node Sync" />
            </div>
          </div>

          {/* Incident Feed */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <Card className="bg-zinc-950/50 border-white/5 h-full overflow-hidden flex flex-col">
              <CardHeader className="border-b border-white/5 bg-white/5 px-6 py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold flex items-center">
                    <Activity className="w-4 h-4 mr-2 text-cyan-400" /> Live Feed
                  </CardTitle>
                  <span className="text-[10px] font-mono opacity-40">REFRESHING...</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0 overflow-y-auto">
                <IncidentItem 
                  severity="high" 
                  title="Multi-vehicle Accident" 
                  location="Sector 4B - Bridge 04" 
                  time="2 mins ago" 
                />
                <IncidentItem 
                  severity="medium" 
                  title="Congestion Detected" 
                  location="Downtown Ave 12" 
                  time="12 mins ago" 
                />
                <IncidentItem 
                  severity="low" 
                  title="Weather Advisory" 
                  location="North Perimeter" 
                  time="45 mins ago" 
                />
                <IncidentItem 
                  severity="low" 
                  title="Construction Start" 
                  location="District 9" 
                  time="1h ago" 
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

const StatCard = ({ title, value, icon, subtitle, trend, barValue, barColor, isWarning }: any) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative overflow-hidden"
  >
    <Card className={`bg-black/40 border-white/5 backdrop-blur-md hover:border-white/20 transition-all ${isWarning ? 'ring-1 ring-orange-500/20' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-widest text-white/40">{title}</span>
          <div className="p-2 bg-white/5 rounded-xl border border-white/10">
            {icon}
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-black text-white">{value}</span>
          {trend && <span className={`text-[10px] font-bold ${trend.startsWith('+') ? 'text-emerald-400' : 'text-orange-400'}`}>{trend}</span>}
        </div>
        {subtitle && <p className="text-xs text-white/30 mt-1 font-medium">{subtitle}</p>}
        {barValue !== undefined && (
          <div className="mt-4">
            <Progress value={barValue} className={`h-1.5 border-none bg-white/5`} />
          </div>
        )}
      </CardContent>
    </Card>
  </motion.div>
);

const MapOverlayItem = ({ icon, label }: any) => (
  <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-bold text-white/80 uppercase tracking-tighter shadow-lg">
    {icon}
    <span>{label}</span>
  </div>
);

const IncidentItem = ({ severity, title, location, time }: any) => {
  const colors: any = {
    high: "bg-red-500",
    medium: "bg-orange-500",
    low: "bg-blue-500"
  };
  
  return (
    <div className="p-6 border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer">
      <div className="flex items-start space-x-4">
        <div className={`mt-1.5 h-2 w-2 rounded-full ${colors[severity]} animate-pulse`} />
        <div className="flex-1">
          <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors uppercase italic tracking-tight">{title}</h4>
          <p className="text-xs text-white/40 mt-0.5">{location}</p>
          <div className="flex items-center justify-between mt-3">
             <span className="text-[10px] font-mono text-white/20">{time}</span>
             <Badge variant="ghost" className="text-[10px] h-5 opacity-0 group-hover:opacity-100 transition-opacity">DETAILS</Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficSentinel;
