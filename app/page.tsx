"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, Clock, Check, Heart, Sparkles, Lock, Mail, Star, ArrowUpDown } from 'lucide-react';
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

type FeatureItem = { title: string; description: string };
type ProductItem = {
  name: string;
  category: string;
  price: string;
  image: string;
  badge?: string;
};
type CraftStep = { title: string; description: string };
type TrustItem = { title: string; description: string };

const FEATURE_ICONS = [Clock, Check, Heart, Sparkles];
const TRUST_ICONS = [Lock, Mail, Star, ArrowUpDown];
const ALL_VALUE = "All";

export default function Home() {
  const t = useTranslations();

  const features = (
    Array.isArray(t.raw("features.items")) ? t.raw("features.items") : []
  ) as FeatureItem[];

  const products = (
    Array.isArray(t.raw("collection.products")) ? t.raw("collection.products") : []
  ) as ProductItem[];

  const craftSteps = (
    Array.isArray(t.raw("craft.steps")) ? t.raw("craft.steps") : []
  ) as CraftStep[];

  const trustItems = (
    Array.isArray(t.raw("trust.items")) ? t.raw("trust.items") : []
  ) as TrustItem[];

  const categories = useMemo(
    () => [ALL_VALUE, ...Array.from(new Set(products.map((p) => p.category)))],
    [products],
  );
  const [activeCategory, setActiveCategory] = useState<string>(ALL_VALUE);
  const filteredProducts = useMemo(
    () =>
      activeCategory === ALL_VALUE
        ? products
        : products.filter((p) => p.category === activeCategory),
    [products, activeCategory],
  );

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <main>
      {/* Hero */}
      <Reveal>
        <section id="home" className="relative overflow-hidden bg-mesh">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:py-32 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium text-muted-foreground">
                {t("hero.eyebrow")}
              </span>
              <h1 className="mt-6 text-balance text-5xl font-display font-semibold leading-[1.05] tracking-tight text-foreground md:text-6xl">
                {t("hero.titlePre")} <span
                className="text-gradient"
                style={{
                  color: "#f59e0b",
                  backgroundColor: "#06b6d4",
                  fontSize: "64px"
                }}>{t("hero.titleAccent")}</span>{" "}
                {t("hero.titlePost")}
              </h1>
              <p
                className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted-foreground"
                style={{
                  color: "#f59e0b",
                  backgroundColor: "#06b6d4",
                  fontSize: "64px"
                }}>
                {t("hero.subtitle")}
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="/shop" className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none">
                  {t("hero.primaryCta")}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <a href="#collection" className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none">
                  {t("hero.secondaryCta")}
                </a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md">
              <div className="glass-strong rounded-2xl p-4 shadow-glow motion-safe:animate-float">
                <img src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/7fbfe836346e4629969b98f95e660eae.jpg" alt={t("hero.imageAlt")} className="h-full w-full rounded-xl object-cover" />
              </div>
            </div>
          </div>
        </section>
      </Reveal>
      {/* Features */}
      <section id="features" className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("features.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-display font-semibold tracking-tight text-foreground md:text-4xl">
                {t("features.title")}
              </h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
                {t("features.subtitle")}
              </p>
            </div>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((item, i) => {
              const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
              return (
                <Reveal key={item.title} delay={i * 0.08}>
                  <div className="surface-elevated h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      {/* Collection */}
      <section id="collection" className="bg-muted py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                  {t("collection.eyebrow")}
                </span>
                <h2 className="mt-3 text-balance text-3xl font-display font-semibold tracking-tight text-foreground md:text-4xl">
                  {t("collection.title")}
                </h2>
                <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
                  {t("collection.subtitle")}
                </p>
              </div>
              <Link href="/shop" className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none md:self-auto">
                {t("collection.viewAll")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap gap-2">
              {categories.map((cat) => (<button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  activeCategory === cat
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground",
                )}>
                {cat === ALL_VALUE ? t("collection.filterAll") : cat}
              </button>))}
            </div>
          </Reveal>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product, i) => (
              <Reveal key={product.name} delay={i * 0.06}>
                <Link href="/shop" className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={product.image} alt={`${product.name} ${product.category} shoe`} className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" />
                    {product.badge ? (
                      <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-glow">
                        {product.badge}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex items-center justify-between gap-4 p-5">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {product.category}
                      </p>
                      <h3 className="mt-1 text-base font-semibold tracking-tight text-foreground">
                        {product.name}
                      </h3>
                    </div>
                    <span className="shrink-0 text-lg font-semibold text-foreground">
                      {product.price}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* Craft / story */}
      <section id="craft" className="bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-border shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-8px_rgba(0,0,0,0.12)]">
              <img src="https://titoaistorageaccount.blob.core.windows.net/titoai-storage/site-images/d27a0c7f24bf46cd8ed4ca1276a986e5.jpg" alt={t("craft.imageAlt")} className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("craft.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-display font-semibold tracking-tight text-foreground md:text-4xl">
                {t("craft.title")}
              </h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
                {t("craft.subtitle")}
              </p>
              <ol className="mt-8 space-y-6 border-l border-border pl-6">
                {craftSteps.map((step, i) => (
                  <li key={step.title} className="relative">
                    <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {i + 1}
                    </span>
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>
      {/* Trust band */}
      <Reveal>
        <section id="trust" className="bg-gradient-brand py-16 text-primary-foreground md:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-balance text-center text-2xl font-display font-semibold tracking-tight md:text-3xl">
              {t("trust.title")}
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {trustItems.map((item, i) => {
                const Icon = TRUST_ICONS[i % TRUST_ICONS.length];
                return (
                  <div key={item.title} className="flex flex-col items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-foreground/15">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-semibold tracking-tight">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-primary-foreground/80">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </Reveal>
      {/* Newsletter */}
      <section id="newsletter" className="relative overflow-hidden bg-mesh py-20 md:py-28">
        <Reveal>
          <div className="mx-auto max-w-2xl px-6">
            <div className="glass-strong rounded-2xl p-8 text-center shadow-glow md:p-12">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("newsletter.eyebrow")}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-display font-semibold tracking-tight text-foreground md:text-4xl">
                {t("newsletter.title")}
              </h2>
              <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
                {t("newsletter.subtitle")}
              </p>
              {submitted ? (
                <p className="mt-8 text-sm font-medium text-primary" role="status">
                  {t("newsletter.successMessage")}
                </p>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
                  <label htmlFor="newsletter-email" className="sr-only">
                    {t("newsletter.placeholder")}
                  </label>
                  <input id="newsletter-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("newsletter.placeholder")} autoComplete="email" className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-72" />
                  <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {t("newsletter.button")}
                  </button>
                </form>
              )}
              <p className="mt-4 text-xs text-muted-foreground">{t("newsletter.disclaimer")}</p>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}