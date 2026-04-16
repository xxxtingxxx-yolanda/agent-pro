import React from "react";
import { motion } from "motion/react";
import { 
  AlertCircle, 
  ArrowRight, 
  CheckCircle2, 
  Code2, 
  Cpu, 
  Database, 
  FileText, 
  Layers, 
  LineChart, 
  MessageSquare, 
  RefreshCw, 
  Search, 
  ShieldCheck, 
  Zap 
} from "lucide-react";

const Section = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`py-32 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto ${className}`}>
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  </section>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <motion.div 
    whileHover={{ 
      y: -10,
      scale: 1.01,
      borderColor: "rgba(255, 255, 255, 0.24)",
      boxShadow: "0 24px 64px rgba(0, 0, 0, 0.45)",
      backgroundColor: "rgba(255, 255, 255, 0.04)",
    }}
    transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.9 }}
    className={`card-sheen bg-apple-gray/40 backdrop-blur-2xl border border-white/5 p-12 rounded-[28px] transition-all duration-500 relative group overflow-hidden ${className}`}
  >
    <div className="relative z-10">
      {children}
    </div>
  </motion.div>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center px-3 py-1 text-[10px] font-bold bg-white text-black mb-4 uppercase tracking-tighter">
    {children}
  </span>
);

const navLinkClass = "interactive-link text-apple-text-dim transition-colors duration-300";
const ctaBaseClass = "interactive-cta w-full md:w-auto text-sm font-semibold rounded-full transition-all text-center";
const repoUrl = "https://github.com/xxxtingxxx-yolanda/agent-full-pro";

export default function App() {
  const [secondPageArriving, setSecondPageArriving] = React.useState(false);
  const riseTimerRef = React.useRef<number | null>(null);
  const detailsSectionId = "details";
  const detailsFocusId = "details-focus";

  React.useEffect(() => {
    if (window.location.hash) {
      const cleanUrl = `${window.location.pathname}${window.location.search}`;
      window.history.replaceState(null, "", cleanUrl);
    }
  }, []);

  React.useEffect(() => {
    return () => {
      if (riseTimerRef.current !== null) {
        window.clearTimeout(riseTimerRef.current);
      }
    };
  }, []);

  const handleDetailJump = React.useCallback(() => {
    const section = document.getElementById(detailsSectionId);
    if (!section) {
      return;
    }

    const targetNode = document.getElementById(detailsFocusId) ?? section;
    const rect = targetNode.getBoundingClientRect();
    const blockTop = window.scrollY + rect.top;
    const targetTop = Math.max(0, blockTop + rect.height / 2 - window.innerHeight / 2);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      window.scrollTo(0, targetTop);
      return;
    }

    const startTop = window.scrollY;
    const distance = targetTop - startTop;
    const duration = 920;
    const startTime = performance.now();
    let hasTriggeredRise = false;

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startTop + distance * eased);

      if (!hasTriggeredRise && progress > 0.5) {
        hasTriggeredRise = true;
        setSecondPageArriving(true);
        if (riseTimerRef.current !== null) {
          window.clearTimeout(riseTimerRef.current);
        }
        riseTimerRef.current = window.setTimeout(() => {
          setSecondPageArriving(false);
        }, 820);
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
        return;
      }
    };

    window.requestAnimationFrame(step);
  }, [detailsFocusId, detailsSectionId]);

  return (
    <div className="min-h-screen selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Cpu className="text-white w-6 h-6" />
            <span className="font-semibold tracking-tight text-xl">AGENT FULL PRO</span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-xs font-medium tracking-wide">
            <motion.a href="#problem" whileHover={{ y: -2 }} className={navLinkClass}>核心问题</motion.a>
            <motion.a href="#architecture" whileHover={{ y: -2 }} className={navLinkClass}>系统架构</motion.a>
            <motion.a href="#protocol" whileHover={{ y: -2 }} className={navLinkClass}>交付协议</motion.a>
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="interactive-cta px-5 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-all text-[11px] border border-transparent"
            >
              获取 AGENTS
            </a>
          </div>
        </div>
      </nav>

      {/* 1. Hero Section */}
      <Section className="pt-52 pb-44 md:pt-56 md:pb-48 text-center relative">
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-7xl md:text-9xl font-bold tracking-tight leading-[1.05] mb-12">
              AI 能写代码<br />
              <span className="text-apple-text-dim">但无法交付产品</span>
            </h1>
            
            <div className="max-w-[800px] mx-auto">
              <p className="text-xl md:text-2xl text-apple-text-dim mb-16 font-medium leading-relaxed tracking-tight">
                从需求 → PRD → 开发 → 测试 → 迭代<br />
                LLM 在长任务中依然会失去控制
              </p>
              
              <div className="flex flex-wrap justify-center gap-12 mb-20">
                {[
                  { icon: <AlertCircle className="w-5 h-5" />, text: "目标丢失" },
                  { icon: <Layers className="w-5 h-5" />, text: "上下文坍塌" },
                  { icon: <ShieldCheck className="w-5 h-5" />, text: "零验证交付" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 250, damping: 20 }}
                    className="chip-hover flex items-center gap-3 text-apple-text-dim font-medium text-sm border border-white/10 px-4 py-2 rounded-full"
                  >
                    {item.icon}
                    {item.text}
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${ctaBaseClass} px-16 py-5 bg-white text-black hover:bg-gray-200 border border-transparent`}
                >
                  获取 AGENTS 规则
                </a>
                <button
                  type="button"
                  onClick={handleDetailJump}
                  className={`${ctaBaseClass} px-16 py-5 bg-transparent border border-white/20 text-white hover:bg-white/5`}
                >
                  查看详情
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* 2. Pain Points */}
      <Section id={detailsSectionId} className="relative z-10">
        {/* Tech Decor */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-10 left-10 font-mono text-[10px] text-blue-500/40 uppercase tracking-widest">Data_Stream_v2.0</div>
          <div className="absolute bottom-10 right-10 font-mono text-[10px] text-purple-500/40 uppercase tracking-widest">Neural_Sync_Active</div>
        </div>

        <div id={detailsFocusId} className={secondPageArriving ? "section-rise-active" : ""}>
          <h2 className="text-5xl md:text-7xl font-bold mb-32 text-center tracking-tight">
            为什么 AI 仍无法完成完整交付？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "碎片化执行", desc: "AI 可以编写代码片段，但缺乏将它们连接成生产级系统的结构化意识。", icon: <Zap className="text-white" /> },
              { title: "上下文漂移", desc: "长任务导致上下文污染，使模型逐渐偏离最初的产品目标。", icon: <RefreshCw className="text-white" /> },
              { title: "验证真空", desc: "缺乏闭环验证体系，AI 生成的内容是“尽力而为”而非“确保正确”。", icon: <ShieldCheck className="text-white" /> },
            ].map((point, i) => (
              <Card key={i} className="flex flex-col gap-8">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white/10">
                  {point.icon}
                </div>
                <h3 className="text-3xl font-bold tracking-tight">{point.title}</h3>
                <p className="text-apple-text-dim text-lg leading-relaxed font-medium">
                  {point.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* 3. Problem Modeling */}
      <Section id="problem">
        <h2 className="text-5xl md:text-7xl font-bold mb-24 tracking-tight">
          长任务是系统，而不是 PROMPT
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <p className="text-4xl font-bold leading-tight text-white tracking-tight">
              一个完整的产品交付是：<br />
              <span className="text-apple-text-dim">多阶段 + 多约束 + 可回溯</span>
            </p>
            <div className="mt-12 space-y-4">
              <div className="h-[1px] bg-white/10 w-full" />
              <p className="text-apple-text-dim font-semibold text-xs tracking-widest">SYSTEM_MODEL_V1.0.4</p>
            </div>
          </div>
          <div className="bg-apple-gray/40 backdrop-blur-2xl p-12 rounded-[32px] border border-white/5 shadow-2xl">
            <p className="text-white mb-8 font-semibold text-sm tracking-widest uppercase">// 当前 AI 范式</p>
            <ul className="space-y-6 text-apple-text-dim font-medium text-lg">
              <li className="flex items-center gap-4">
                <div className="w-2 h-2 bg-white rounded-full" /> 单次生成
              </li>
              <li className="flex items-center gap-4">
                <div className="w-2 h-2 bg-white rounded-full" /> 上下文堆叠
              </li>
              <li className="flex items-center gap-4">
                <div className="w-2 h-2 bg-white rounded-full" /> 无状态管理
              </li>
              <li className="flex items-center gap-4">
                <div className="w-2 h-2 bg-white rounded-full" /> 无验证机制
              </li>
            </ul>
            <div className="mt-12 pt-10 border-t border-white/5">
              <p className="text-white font-bold text-xl">结论：AI 可以执行步骤，但无法保证过程</p>
            </div>
          </div>
        </div>
      </Section>

      {/* 4. Insight */}
      <Section className="relative">
        <h2 className="text-5xl md:text-7xl font-bold mb-24 text-center tracking-tight">
          不是能力问题，而是控制结构问题
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[ 
            { title: "1. 缺乏阶段划分", desc: ["模糊的开始与结束标准", "任务边界不清晰导致执行漂移"], icon: <Layers className="text-white" /> },
            { title: "2. 缺乏状态管理", desc: ["过程数据在对话流中丢失", "发生错误后无法精准回溯"], icon: <Database className="text-white" /> },
            { title: "3. 缺乏上下文治理", desc: ["信息过载导致注意力分散", "核心指令被冗余代码淹没"], icon: <Zap className="text-white" /> },
            { title: "4. 缺乏质量门禁", desc: ["缺乏自动化的测试与验证", "交付质量完全依赖模型的偶然性"], icon: <ShieldCheck className="text-white" /> },
          ].map((item, i) => (
            <Card key={i} className="flex flex-col gap-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white/10">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-bold tracking-tight">{item.title}</h3>
              </div>
              <ul className="space-y-4 text-apple-text-dim font-medium text-lg">
                {item.desc.map((d, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="mt-2.5 w-1.5 h-1.5 bg-white/30 rounded-full shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* 5. System Design */}
      <Section id="architecture">
        <h2 className="text-5xl md:text-7xl font-bold mb-24 text-center tracking-tight">
          面向交付的 AGENT 架构
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "1. 状态驱动", desc: ["PROJECT_STATE.MD", "单一真相源"], icon: <Database className="text-white" /> },
            { title: "2. 阶段化执行", desc: ["8阶段工作流", "不可跳过的质量门禁"], icon: <RefreshCw className="text-white" /> },
            { title: "3. 上下文控制", desc: ["限制在 10~15%", "自动压缩机制"], icon: <Layers className="text-white" /> },
            { title: "4. 质量门禁", desc: ["TEST / MCP / UI 评审", "快速失败机制"], icon: <ShieldCheck className="text-white" /> },
          ].map((item, i) => (
            <Card key={i} className="flex flex-col gap-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:bg-white/10">
                  {item.icon}
                </div>
                <h3 className="text-3xl font-bold tracking-tight">{item.title}</h3>
              </div>
              <ul className="space-y-4 text-apple-text-dim font-medium text-lg">
                {item.desc.map((d, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span className="mt-2.5 w-1.5 h-1.5 bg-white/30 rounded-full shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* 6. 8-Phase Delivery Protocol */}
      <Section id="protocol" className="relative">
        <div className="text-center mb-32">
          <div className="inline-block px-4 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-[10px] font-bold mb-6 uppercase tracking-widest">Protocol_Active</div>
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">8 阶段交付协议</h2>
          <p className="text-apple-text-dim font-semibold text-lg tracking-wide uppercase">输入 / 输出 / 验证约束</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "PHASE 0", name: "问题定义", desc: "定义需求与成功标准", icon: <MessageSquare className="w-6 h-6" /> },
            { title: "PHASE 1", name: "需求规格", desc: "多 AGENT 生成 PRD", icon: <FileText className="w-6 h-6" /> },
            { title: "PHASE 2", name: "技术设计", desc: "架构与模块拆解", icon: <Layers className="w-6 h-6" /> },
            { title: "PHASE 3", name: "代码实现", desc: "自动化代码生成", icon: <Code2 className="w-6 h-6" /> },
            { title: "PHASE 4", name: "系统验证", desc: "测试与 MCP 验证", icon: <ShieldCheck className="w-6 h-6" /> },
            { title: "PHASE 5", name: "调试修复", desc: "根因分析与补丁", icon: <AlertCircle className="w-6 h-6" /> },
            { title: "PHASE 6", name: "外部循环", desc: "竞品分析与优化", icon: <Search className="w-6 h-6" /> },
            { title: "PHASE 7", name: "持续迭代", desc: "产品持续改进", icon: <RefreshCw className="w-6 h-6" /> },
          ].map((phase, i) => (
            <Card key={i} className="group cursor-default !p-10">
              <div className="flex justify-between items-start mb-8">
                <span className="text-white/40 font-bold text-xs">{phase.title}</span>
                <div className="text-white/20 group-hover:text-white transition-colors duration-500">
                  {phase.icon}
                </div>
              </div>
              <h4 className="text-2xl font-bold mb-4 tracking-tight">{phase.name}</h4>
              <p className="text-apple-text-dim text-sm font-medium leading-relaxed">{phase.desc}</p>
            </Card>
          ))}
        </div>
        
        <div className="mt-32 text-center">
          <div className="interactive-panel inline-block px-12 py-5 bg-apple-gray/60 border border-white/5 rounded-full text-white font-semibold text-sm tracking-wide backdrop-blur-md">
            流程是状态机，而不是线性序列
          </div>
        </div>
      </Section>

      {/* 7. Execution Flow */}
      <Section>
        <h2 className="text-5xl md:text-7xl font-bold mb-32 text-center tracking-tight">从一句话，到一个产品</h2>
        <div className="max-w-5xl mx-auto relative">
          <div className="absolute inset-0 bg-apple-gray/20 rounded-[48px] border border-white/5 -m-12 pointer-events-none" />
          
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />
            
            <div className="space-y-24 py-12">
              <div className="relative z-10 flex flex-col items-center">
                <div className="bg-white text-black px-12 py-6 rounded-full font-bold text-lg shadow-2xl">用户输入指令</div>
                <ArrowRight className="rotate-90 mt-8 text-white/20 w-8 h-8" />
              </div>

              {[ 
                "多 AGENT 生成 PRD",
                "自动化代码实现",
                "MCP 验证循环",
                "竞品分析",
                "自主优化"
              ].map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  className="relative z-10 flex flex-col items-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.02, borderColor: "rgba(255, 255, 255, 0.34)", boxShadow: "0 18px 38px rgba(0, 0, 0, 0.34)" }}
                    transition={{ type: "spring", stiffness: 240, damping: 20 }}
                    className="interactive-panel bg-apple-gray/60 backdrop-blur-3xl border border-white/10 px-12 py-6 rounded-3xl text-white font-semibold text-xl flex items-center gap-6 transition-all duration-500"
                  >
                    <CheckCircle2 className="w-6 h-6 text-white" />
                    {step}
                  </motion.div>
                  {i < 4 && <ArrowRight className="rotate-90 mt-8 text-white/20 w-8 h-8" />}
                </motion.div>
              ))}
            </div>
          </div>
          <p className="text-center mt-32 text-apple-text-dim font-semibold text-sm tracking-[0.3em] uppercase">
            用户定义目标，系统控制过程
          </p>
        </div>
      </Section>

      {/* 8. Verification */}
      <Section className="bg-apple-gray/30 border border-white/5 rounded-[48px] mx-6">
        <h2 className="text-5xl font-bold mb-24 text-center tracking-tight">系统验证结果</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
          {[ 
            { val: "8/8", label: "阶段完成" },
            { val: "16/16", label: "测试通过" },
            { val: "100%", label: "MCP 验证" },
            { val: "99/100", label: "系统评分" },
          ].map((stat, i) => (
            <motion.div key={i} whileHover={{ y: -6, scale: 1.03 }} transition={{ type: "spring", stiffness: 230, damping: 18 }}>
              <p className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tighter">{stat.val}</p>
              <p className="text-apple-text-dim font-semibold text-sm tracking-widest uppercase">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-24 flex justify-center">
          <div className="interactive-panel flex items-center gap-5 bg-white/5 px-12 py-6 rounded-full border border-white/10 backdrop-blur-md">
            <LineChart className="text-white w-7 h-7" />
            <span className="text-lg font-semibold tracking-tight">过程控制 {'>'} 偶然成功</span>
          </div>
        </div>
      </Section>

      {/* 9. Philosophical Closing */}
      <Section className="text-center py-64 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <h2 className="text-6xl md:text-8xl font-bold tracking-tight mb-16 leading-tight">
            AI 的问题不是能力不足<br />
            而是约束下的不稳定性
          </h2>
          <div className="h-[1px] w-48 bg-white/20 mx-auto mb-16" />
          <p className="text-2xl text-apple-text-dim font-medium tracking-tight mb-20">
            不是更强的模型，而是交付结构
          </p>
          <a 
            href={repoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="interactive-cta inline-block px-24 py-6 bg-white text-black text-lg font-semibold rounded-full hover:bg-gray-200 transition-all shadow-2xl border border-transparent"
          >
            查看 GitHub 仓库
          </a>
        </motion.div>
      </Section>

      {/* Author Section */}
      <Section className="bg-black border-t border-[#222] py-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-bold tracking-widest uppercase">
          <div className="space-y-4">
            <p className="text-gray-600 uppercase tracking-[0.5em]">AUTHOR_INFO</p>
            <div className="flex items-center gap-4">
              <span className="text-gray-500">XHS:</span>
              <a href="https://xhslink.com/m/6B94W4wQIWf" target="_blank" rel="noopener noreferrer" className="interactive-link text-white">xhslink.com/m/6B94W4wQIWf</a>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-500">EMAIL:</span>
              <a href="mailto:leiyuting09@163.com" className="interactive-link text-white">leiyuting09@163.com</a>
            </div>
          </div>
          <div className="text-right hidden md:block space-y-2">
            <p className="text-gray-600">专为 AGENT 工作流设计</p>
            <p className="text-white">稳定版本 2026</p>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-[#222] text-center text-gray-600 font-bold text-[10px] tracking-[0.4em] uppercase">
        <div className="flex justify-center gap-12">
          <span>初始构建</span>
          <span>© 2026 AGENT FULL PRO</span>
          <span>系统就绪</span>
        </div>
      </footer>
    </div>
  );
}
