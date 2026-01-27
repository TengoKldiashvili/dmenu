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

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-zinc-800/[0.05] rounded-full blur-[100px] mix-blend-screen" />
      </div>

      <div className="fixed inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>

      <nav className="relative z-50 max-w-7xl mx-auto px-6 py-6">
        <ScrollAnimation className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-full bg-zinc-900/30 backdrop-blur-xl border border-white/10 p-2 pl-6 pr-2 transition-all hover:border-white/20">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold tracking-tight text-white">
              {t("brand")}
            </h1>

            <div className="sm:hidden">
              <LanguageSwitch locale={locale} />
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="hidden sm:block">
              <LanguageSwitch locale={locale} />
            </div>

            {!isLoggedIn ? (
              <>
                <Link
                  href={`/${locale}/login`}
                  className="text-xs font-medium text-zinc-400 hover:text-white transition-all text-center sm:text-left px-4"
                >
                  {t("navSignIn")}
                </Link>

                <Link
                  href={`/${locale}/register`}
                  className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)]"
                >
                  {t("navStartFree")}
                </Link>
              </>
            ) : (
              <Link
                href={`/${locale}/dashboard`}
                className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-all"
              >
                {t("goToDashboard")}
              </Link>
            )}
          </div>
        </ScrollAnimation>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32">
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

        <div className="mt-20 mb-20 relative">
          <ScrollAnimation className="text-center mb-16">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight">{t("feature1Title")}</h3>
            <p className="text-zinc-500 text-sm uppercase tracking-widest">{t("menuSelectionSubtitle")}</p>
          </ScrollAnimation>

          <div className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-8 px-6 -mx-6 pb-12 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0 no-scrollbar items-start">
            {menuDemos.map((menu, i) => (
              <ScrollAnimation
                key={menu.id}
                delay={i * 100}
                className="group relative rounded-[2rem] border border-white/10 bg-zinc-900/20 overflow-hidden hover:border-white/40 transition-all duration-500 hover:shadow-2xl hover:shadow-white/5 flex-shrink-0 w-[85vw] sm:w-[400px] md:w-auto snap-center h-full"
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