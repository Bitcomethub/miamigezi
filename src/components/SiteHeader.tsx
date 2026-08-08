import Link from 'next/link';
import { Sunburst } from './Ledge';

// Hamburger menü YOK: 8 bağlantı mobilde yatay kaydırılan bir ray olarak
// duruyor. Gerekçe — açılır menü bir state, bir focus tuzağı ve bir Escape
// tuşu demek; editoryal bir içerik sitesinde bunların hiçbirine gerek yok ve
// bağlantılar görünür kaldığı sürece keşfedilebilirlik daha yüksek.
const NAV = [
  { href: '/gezilecek-yerler', label: 'Gezilecek Yerler' },
  { href: '/plajlar', label: 'Plajlar' },
  { href: '/oteller', label: 'Nerede Kalınır' },
  { href: '/ucak-bileti', label: 'Uçak Bileti' },
  { href: '/hava-durumu', label: 'Hava & Aylar' },
  { href: '/yeme-icme', label: 'Yeme-İçme' },
  { href: '/ulasim', label: 'Ulaşım' },
  { href: '/blog', label: 'Blog' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/12 bg-paper/92 backdrop-blur-[6px]">
      {/* Gün batımı şeridi — sitenin her sayfadaki imza rengi, 3px'lik dozda */}
      <span
        aria-hidden="true"
        className="block h-[3px] bg-gradient-to-r from-flamingo to-sunset"
      />
      <div className="mx-auto flex max-w-[78rem] items-baseline gap-6 px-5 pt-3.5 pb-2 sm:px-8">
        {/* py-1.5 -my-1.5: dokunma hedefi 24px'e çıkar (WCAG 2.5.8), negatif
            margin düzeni aynı bırakır. Metin 13-21px olduğu için satır kutusu
            tek başına 24px'i geçmiyordu. */}
        <Link
          href="/"
          className="group -my-1.5 flex shrink-0 items-baseline gap-2 py-1.5 font-display text-ink no-underline"
        >
          <Sunburst className="h-3 w-5 translate-y-[1px] text-flamingo transition-transform duration-300 group-hover:-translate-y-px" />
          <span
            className="text-[1.32rem] leading-none font-semibold tracking-[-0.02em]"
            style={{ fontStretch: '112%' }}
          >
            miamigezi
          </span>
        </Link>

        <nav
          aria-label="Ana menü"
          className="-mb-2 min-w-0 flex-1 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* `ml-auto w-max` — `justify-end` DEĞİL. justify-end + overflow-x
              birleşiminde taşan içerik SOL taraftan çıkar ve spec gereği o alan
              kaydırılamaz (scrollWidth taşmayı saymaz): 393px'te ilk üç bağlantı
              -262px'te kalıp erişilemez oluyordu. Auto margin, boş alan
              kalmadığında 0'a düşer; hizalama sessizce devre dışı kalır ve taşma
              SAĞA — yani kaydırılabilir yöne — gider. */}
          <ul className="ml-auto flex w-max items-baseline gap-x-5 whitespace-nowrap">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="-my-1.5 inline-block py-1.5 font-display text-[0.8125rem] font-medium tracking-[0.01em] text-ink-2 no-underline transition-colors duration-200 hover:text-flamingo-deep"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
