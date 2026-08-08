import type { Guide } from './types';

import { ilkKez } from './ilk-kez';
import { ucakBileti } from './ucak-bileti';
import { oteller } from './oteller';
import { gezilecekYerler } from './gezilecek-yerler';
import { plajlar } from './plajlar';
import { havaDurumu } from './hava-durumu';
import { ulasim } from './ulasim';
import { yemeIcme } from './yeme-icme';
import { alisveris } from './alisveris';
import { aileceMiami } from './ailece-miami';

// Sıra EDİTORYALDİR: ana sayfadaki numaralı içindekiler, footer ve
// sitemap hep bu diziden okur. `number` alanı diziyle senkron tutulur.
export const GUIDES: Guide[] = [
  ilkKez,
  ucakBileti,
  oteller,
  gezilecekYerler,
  plajlar,
  havaDurumu,
  ulasim,
  yemeIcme,
  alisveris,
  aileceMiami,
];

const BY_SLUG = new Map(GUIDES.map((g) => [g.slug, g]));

export function getGuide(slug: string): Guide | undefined {
  return BY_SLUG.get(slug);
}

export function getGuides(slugs: string[]): Guide[] {
  return slugs.map((s) => BY_SLUG.get(s)).filter((g): g is Guide => Boolean(g));
}

export type { Guide } from './types';
