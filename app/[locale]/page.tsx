import Link from "next/link";
import LanguageSwitch from "@/components/LanguageSwitch";
import { getTranslations } from "next-intl/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import ScrollAnimation from "@/components/ScrollAnimation";
import MenuSlider from "@/components/MenuSlider";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const t = await getTranslations({ locale, namespace: "mainpage" });
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

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center shrink-0">
            <h1 className="text-sm sm:text-lg font-bold tracking-widest text-white uppercase">
              {t("brand")}
            </h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-6">
            <div className="scale-90 sm:scale-100">
              <LanguageSwitch locale={locale} />
            </div>
            <div className="h-4 w-[1px] bg-white/10 hidden sm:block"></div>
            {!isLoggedIn ? (
              <div className="flex items-center gap-3 sm:gap-4">
                <Link href={`/${locale}/login`} className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors whitespace-nowrap">
                  {t("navSignIn")}
                </Link>
                <Link href={`/${locale}/register`} className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all whitespace-nowrap">
                  {t("navStartFree")}
                </Link>
              </div>
            ) : (
              <Link href={`/${locale}/dashboard`} className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-white text-black text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all whitespace-nowrap">
                {t("goToDashboard")}
              </Link>
            )}
          </div>
        </div>
      </nav>

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
                <Link href={`/${locale}/register`} className="px-10 py-4 rounded-full bg-white text-black text-sm font-semibold hover:scale-105 transition-all duration-300">
                  {t("ctaPrimary")}
                </Link>
                <Link href={`/${locale}/login`} className="px-10 py-4 rounded-full border border-white/10 bg-black text-sm font-semibold hover:bg-white/5 text-zinc-300 transition-all">
                  {t("ctaSecondary")}
                </Link>
              </>
            ) : (
              <Link href={`/${locale}/dashboard`} className="px-10 py-4 rounded-full bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition">
                {t("goToDashboard")}
              </Link>
            )}
          </div>
        </ScrollAnimation>

        <MenuSlider
          items={menuDemos}
          locale={locale}
          titleText={t("feature1Title")}
          subtitleText={t("menuSelectionSubtitle")}
        />

        <div className="mt-32 mb-40 relative">
          <ScrollAnimation className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-b from-zinc-900/50 to-black border border-white/10 p-8 md:p-16 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[100px] -mr-20 -mt-20 pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-6">
                  <span className="w-1 h-1 rounded-full bg-white" />
                  {t("qrExperienceTitle")}
                </div>

                <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
                  {t("qrHeadline")}
                </h3>

                <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-md">
                  {t("qrSubheadline")}
                </p>

                <ul className="mt-8 space-y-4">
                  {[t("qrFeature1"), t("qrFeature2"), t("qrFeature3")].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-500 justify-center md:justify-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-white/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative bg-white p-5 rounded-[2.5rem] shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)] transform group-hover:scale-105 transition-transform duration-500">
                  <div className="w-48 h-48 md:w-56 md:h-56 bg-white flex items-center justify-center">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`${baseUrl}/${locale}/menu/demo`)}`}
                      alt="Scan Menu"
                      className="w-full h-full"
                    />
                  </div>
                </div>
                <div className="text-center mt-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-500">
                    Ready to scan
                  </span>
                </div>
              </div>
            </div>
          </ScrollAnimation>
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

        <div className="mt-40 border-t border-white/5 pt-24 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-white/20" />
          <ScrollAnimation>
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{t("contactTitle")}</h3>
            <p className="text-zinc-500 mt-6 max-w-xl mx-auto">{t("contactDesc")}</p>
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
            <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tight">{t("finalTitle")}</h3>
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