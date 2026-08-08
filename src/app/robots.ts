import type { MetadataRoute } from 'next';
import { abs } from '@/lib/site';

// AI crawler'ları açıkça karşılıyoruz: bu sitenin işi Türkçe Miami sorularına
// alıntılanabilir cevap vermek. Engellenen tek şey yok — kapatılacak bir
// bölüm eklenirse buraya YAZILIR, yoksa varsayılan açıktır.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: abs('/sitemap.xml'),
    host: abs('/').replace(/\/$/, ''),
  };
}
