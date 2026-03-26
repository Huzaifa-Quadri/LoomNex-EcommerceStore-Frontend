import { Link } from "react-router-dom";

const STATS = [
  { value: "3+", label: "Years in Business" },
  { value: "50K+", label: "Happy Customers" },
  { value: "10K+", label: "Products Sold" },
  { value: "99%", label: "Satisfaction Rate" },
];

const TEAM = [
  {
    name: "Arjun Mehta",
    role: "Founder & CEO",
    image: "https://picsum.photos/seed/team-ceo/300/300",
    bio: "Visionary entrepreneur with 10+ years in e-commerce and supply chain innovation.",
  },
  {
    name: "Priya Sharma",
    role: "Head of Design",
    image: "https://picsum.photos/seed/team-design/300/300",
    bio: "Award-winning UX designer passionate about creating delightful shopping experiences.",
  },
  {
    name: "Rohan Singh",
    role: "CTO",
    image: "https://picsum.photos/seed/team-cto/300/300",
    bio: "Full-stack architect who scaled platforms serving millions of daily users.",
  },
  {
    name: "Ananya Patel",
    role: "Head of Operations",
    image: "https://picsum.photos/seed/team-ops/300/300",
    bio: "Operations expert ensuring every order reaches you on time, every time.",
  },
];

const VALUES = [
  {
    icon: "verified",
    title: "Quality First",
    desc: "Every product is hand-vetted by our team to meet the highest quality standards.",
  },
  {
    icon: "local_shipping",
    title: "Fast & Free Shipping",
    desc: "Free shipping on all orders. Most items delivered within 2–4 business days.",
  },
  {
    icon: "support_agent",
    title: "24/7 Support",
    desc: "Our dedicated support team is always available to help you with any queries.",
  },
  {
    icon: "lock",
    title: "Secure Payments",
    desc: "Shop with confidence. All transactions are encrypted and 100% secure.",
  },
  {
    icon: "autorenew",
    title: "Easy Returns",
    desc: "Not satisfied? Return any product within 30 days for a full refund, no questions asked.",
  },
  {
    icon: "eco",
    title: "Sustainable Practices",
    desc: "We use eco-friendly packaging and partner with carbon-neutral logistics providers.",
  },
];

const MILESTONES = [
  { year: "2022", event: "LoomNex founded with a mission to redefine online shopping." },
  { year: "2023", event: "Reached 10,000 customers and expanded to electronics category." },
  { year: "2024", event: "Launched mobile app and crossed ₹10 Cr in annual revenue." },
  { year: "2025", event: "Partnered with 200+ brands and introduced same-day delivery." },
  { year: "2026", event: "Serving 50K+ happy customers across India with 99% satisfaction rate." },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-stone-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://picsum.photos/seed/about-hero/1400/600"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-5xl px-6 py-24 text-center">
          <span className="inline-block rounded-full bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary mb-6">
            Since 2022
          </span>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
            About <span className="text-primary">LoomNex</span>
          </h1>
          <p className="mt-6 text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed">
            Born from a passion for quality and innovation, LoomNex has grown from a small startup
            into one of India's most trusted online shopping destinations — delivering premium
            electronics, fashion, and lifestyle products to over 50,000 happy customers.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-stone-200">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-extrabold text-primary">{s.value}</p>
                <p className="mt-1 text-sm text-stone-500 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-3xl font-bold text-stone-800 mb-8 text-center">Our Story</h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-stone-600 leading-relaxed">
              LoomNex was founded in <strong>2022</strong> with a simple belief: everyone
              deserves access to quality products at fair prices, delivered with exceptional service.
            </p>
            <p className="mt-4 text-stone-600 leading-relaxed">
              What started as a small curated clothing store has blossomed into a full-fledged
              marketplace spanning electronics, gadgets, fashion, and lifestyle. We've built
              direct relationships with over <strong>200 brands</strong> to cut out middlemen
              and pass the savings on to you.
            </p>
            <p className="mt-4 text-stone-600 leading-relaxed">
              Today, our team of <strong>60+ passionate people</strong> works tirelessly to
              ensure every click, every delivery, and every interaction leaves you smiling.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://picsum.photos/seed/about-story/600/400"
              alt="LoomNex office"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-stone-50 py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold text-stone-800 mb-10 text-center">Our Journey</h2>
          <div className="relative border-l-2 border-primary/30 ml-4 space-y-8">
            {MILESTONES.map((m) => (
              <div key={m.year} className="relative pl-8">
                <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary border-2 border-white shadow" />
                <p className="text-sm font-bold text-primary">{m.year}</p>
                <p className="mt-1 text-stone-600">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold text-stone-800 mb-10 text-center">
          Why Shop With Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-stone-200 p-6 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <span className="material-symbols-outlined text-primary text-3xl">
                {v.icon}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-stone-800">{v.title}</h3>
              <p className="mt-2 text-sm text-stone-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-stone-50 py-16">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-bold text-stone-800 mb-10 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM.map((t) => (
              <div
                key={t.name}
                className="group rounded-2xl bg-white shadow-md overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <div className="overflow-hidden">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-stone-800">{t.name}</h3>
                  <p className="text-xs text-primary font-medium mt-0.5">{t.role}</p>
                  <p className="mt-2 text-xs text-stone-500 leading-relaxed">{t.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-stone-800">
          Ready to start shopping?
        </h2>
        <p className="mt-3 text-stone-500 max-w-xl mx-auto">
          Join over 50,000 happy customers who trust LoomNex for quality products,
          fast delivery, and unbeatable prices.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3 text-lg font-bold text-white hover:bg-red-700 transition-colors"
        >
          <span className="material-symbols-outlined">storefront</span>
          Explore Products
        </Link>
      </section>
    </div>
  );
}
