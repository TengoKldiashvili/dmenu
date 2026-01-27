import Link from "next/link";
import LanguageSwitch from "@/components/LanguageSwitch";
import { getTranslations } from "next-intl/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import ScrollAnimation from "@/components/ScrollAnimation";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "mainpage",
  });

  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session?.user;

  const menuDemos = [
    {
      id: "light",
      title: t("styleLightTitle"),
      desc: t("styleLightDesc"),
      color: "from-white/20 to-zinc-200/20",
      preview: "https://s6vobsvxdq.ufs.sh/f/6yJieLdgU3ZSP47gwCZiN4bS5PWTB0Yj3VQglMfA87tos1da",
      demoUrl: "/menu/demo",
    },
    {
      id: "minimal",
      title: t("styleMinimalTitle"),
      desc: t("styleMinimalDesc"),
      color: "from-zinc-500/20 to-stone-400/20",
      preview: "https://s6vobsvxdq.ufs.sh/f/6yJieLdgU3ZSipogjuQ3RfKv5QoznhOCXLdMx2NWVbqjg1Gk",
      demoUrl: "/menu/demo2",
    },
    {
      id: "dark",
      title: t("styleDarkTitle"),
      desc: t("styleDarkDesc"),
      color: "from-zinc-800/40 to-black/40",
      preview: "https://s6vobsvxdq.ufs.sh/f/6yJieLdgU3ZS48Y0C950X1EPpmzvlHta7uIqnDsjQRZd9YVr",
      demoUrl: "/menu/demo3",
    },
    {
      id: "elegant",
      title: t("styleElegantTitle"),
      desc: t("styleElegantDesc"),
      color: "from-white/10 to-slate-200/10",
      preview: "https://s6vobsvxdq.ufs.sh/f/6yJieLdgU3ZSVVuodUvijCkfnovGqWY3R0JbDcwAzFKytrxh",
      demoUrl: "/menu/demo4",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-zinc-300 overflow-x-hidden selection:bg-white selection:text-black">

      {/* BACKGROUND EFFECTS */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-zinc-800/[0.05] rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="fixed inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>

      {/* NAVIGATION - FIXED SQUARE HEADER */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <h1 className="text-sm sm:text-lg font-bold tracking-widest text-white uppercase">
              {t("brand")}
            </h1>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-6">
            
            {/* Language Switcher */}
            <div className="scale-90 sm:scale-100">
               <LanguageSwitch locale={locale} />
            </div>

            <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>

            {!isLoggedIn ? (
              <div className="flex items-center gap-3 sm:gap-4">
                <Link
                  href={`/${locale}/login`}
                  className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors whitespace-nowrap"
                >
                  {t("navSignIn")}
                </Link>

                <Link
                  href={`/${locale}/register`}
                  className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all whitespace-nowrap"
                >
                  {t("navStartFree")}
                </Link>
              </div>
            ) : (
              <Link
                href={`/${locale}/dashboard`}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all whitespace-nowrap"
              >
                {t("goToDashboard")}
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* MARKETING HERO */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-32 lg:py-40">
        <ScrollAnimation className="text-center max-w-4xl mx-auto mb-28">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[10px] font-medium uppercase tracking-widest mb-10 hover:bg-white/10 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
            {t("eyebrow")}
          </div>

          <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-[1.05] text-white">
            {t("headlineMain")}
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 mt-2 pb-2">
              {t("headlineHighlight")}
            </span>
          </h2>

          <p className="mt-10 text-lg text-zinc-500 max-w-2xl mx-auto leading-relaxed">
            {t("subhead")}
          </p>

          <div className="mt-14 flex flex-wrap justify-center gap-4">
            {!isLoggedIn ? (
              <>
                <Link
                  href={`/${locale}/register`}
                  className="px-10 py-4 rounded-full bg-white text-black text-sm font-semibold hover:scale-105 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]"
                >
                  {t("ctaPrimary")}
                </Link>

                <Link
                  href={`/${locale}/login`}
                  className="px-10 py-4 rounded-full border border-white/10 bg-black text-sm font-semibold hover:bg-white/5 hover:border-white/30 text-zinc-300 transition-all"
                >
                  {t("ctaSecondary")}
                </Link>
              </>
            ) : (
              <Link
                href={`/${locale}/dashboard`}
                className="px-10 py-4 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition"
              >
                {t("goToDashboard")}
              </Link>
            )}
          </div>
        </ScrollAnimation>

        {/* MENU SHOWCASE SECTION */}
        <div className="mt-20 mb-20 relative">
          <ScrollAnimation className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">{t("feature1Title")}</h3>
            <p className="text-zinc-500 text-sm uppercase tracking-widest">{t("menuSelectionSubtitle")}</p>
          </ScrollAnimation>

          {/* Cards Container */}
          <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 px-6 -mx-6 pb-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 no-scrollbar items-start">
            {menuDemos.map((menu, i) => (
              <ScrollAnimation
                key={menu.id}
                delay={i * 100}
                className="group relative rounded-[2rem] border border-white/10 bg-zinc-900/20 overflow-hidden hover:border-white/40 transition-all duration-500 hover:shadow-2xl hover:shadow-white/5 flex-shrink-0 w-[80vw] sm:w-[400px] md:w-auto snap-center h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${menu.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                <div className="relative p-2">
                  <div className="w-full aspect-[9/16] rounded-[1.8rem] overflow-hidden relative grayscale-[30%] group-hover:grayscale-0 transition-all duration-700">
                    <img
                      src={menu.preview}
                      alt={menu.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-50"></div>
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-10">
                    <Link
                      href={menu.demoUrl}
                      className="px-8 py-3 rounded-full bg-white/90 text-black font-bold text-xs uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 backdrop-blur-md"
                    >
                      View Demo
                    </Link>
                  </div>
                </div>

                <div className="relative p-6 text-center">
                  <h4 className="font-bold text-lg text-white group-hover:text-zinc-200 transition-colors">{menu.title}</h4>
                  <p className="text-xs text-zinc-500 mt-2">{menu.desc}</p>
                </div>
              </ScrollAnimation>
            ))}
          </div>

          {/* 🔥 ახალი მინიშნება მობილურისთვის (Swipe Hint) */}
          <div className="md:hidden flex items-center justify-center gap-3 mt-4 animate-pulse">
             <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-zinc-600"></div>
             <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 flex items-center gap-2">
               Swipe <span className="text-zinc-400 text-xs">→</span>
             </p>
             <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-zinc-600"></div>
          </div>

        </div>

        <div className="mt-40 grid md:grid-cols-3 gap-8">
          {[
            ["feature1Title", "feature1Desc"],
            ["feature2Title", "feature2Desc"],
            ["feature3Title", "feature3Desc"],
            ["feature4Title", "feature4Desc"],
            ["feature5Title", "feature5Desc"],
          ].map(([titleKey, descKey], i) => (
            <ScrollAnimation
              key={titleKey}
              delay={i * 50}
              className="group rounded-2xl bg-zinc-900/20 border border-white/5 p-10 hover:bg-zinc-900/60 hover:border-white/20 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-black transition-all duration-500">
                <div className="w-2 h-2 bg-white group-hover:bg-black transition-colors duration-500" />
              </div>
              <h3 className="text-lg font-bold text-white">{t(titleKey)}</h3>
              <p className="text-sm text-zinc-500 mt-4 leading-loose group-hover:text-zinc-400 transition-colors">{t(descKey)}</p>
            </ScrollAnimation>
          ))}
        </div>

        <div className="mt-40">
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollAnimation className="group rounded-[2.5rem] bg-zinc-900/20 border border-white/5 p-12 hover:border-white/20 transition-all duration-700 hover:-translate-y-2">
              <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/5 text-white">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {t("previewDashboardTitle")}
              </h3>
              <p className="text-zinc-500 leading-relaxed">
                {t("previewDashboardDesc")}
              </p>
            </ScrollAnimation>

            <ScrollAnimation delay={200} className="group rounded-[2.5rem] bg-zinc-900/20 border border-white/5 p-12 hover:border-white/20 transition-all duration-700 hover:-translate-y-2">
              <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/5 text-white">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4h-4v-4H8m1-6h.01M16 16h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                {t("previewCustomerTitle")}
              </h3>
              <p className="text-zinc-500 leading-relaxed">
                {t("previewCustomerDesc")}
              </p>
            </ScrollAnimation>
          </div>
        </div>

        <div className="mt-48 border-t border-white/5 pt-24 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-white/20" />

          <ScrollAnimation>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {t("contactTitle")}
            </h3>
            <p className="text-zinc-500 mt-6 max-w-xl mx-auto">
              {t("contactDesc")}
            </p>

            <div className="mt-12 flex flex-col md:flex-row justify-center gap-6">
              <div className="px-8 py-4 rounded-full border border-white/5 bg-zinc-900/50 hover:bg-white/5 transition-colors flex items-center justify-center gap-3">
                <span className="text-xs uppercase tracking-widest text-zinc-500">{t("contactEmailLabel")}</span>
                <span className="text-white font-medium">{t("contactEmail")}</span>
              </div>
              <div className="px-8 py-4 rounded-full border border-white/5 bg-zinc-900/50 hover:bg-white/5 transition-colors flex items-center justify-center gap-3">
                <span className="text-xs uppercase tracking-widest text-zinc-500">{t("contactInstagramLabel")}</span>
                <span className="text-white font-medium">{t("contactInstagram")}</span>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        <div className="mt-32 text-center pb-24">
          <ScrollAnimation>
            <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
              {t("finalTitle")}
            </h3>
            <p className="text-zinc-500 mt-6 text-lg">{t("finalDesc")}</p>

            <Link
              href={`/${locale}/${isLoggedIn ? "dashboard" : "register"}`}
              className="inline-block mt-12 px-14 py-5 rounded-full bg-white text-black text-sm font-bold tracking-wide hover:scale-105 transition-all duration-300 shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)]"
            >
              {isLoggedIn ? t("goToDashboard") : t("finalButton")}
            </Link>
          </ScrollAnimation>
        </div>
      </main>

      <footer className="relative border-t border-white/5 py-12 text-center text-xs text-zinc-600">
        <p>© {new Date().getFullYear()} tlab. {t("footer")}</p>
      </footer>
    </div>
  );
}