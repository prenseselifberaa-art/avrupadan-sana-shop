import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const DOLAP_PROFILE_URL = 'https://dolap.com/profil/avrupadansana1';
const GARDROPS_PROFILE_URL = 'https://www.gardrops.com/avrupadansana1-u-15344839';

function fetchHtml(url) {
  try {
    const cmd = `curl -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "${url}"`;
    return execSync(cmd, { maxBuffer: 15 * 1024 * 1024, encoding: 'utf-8' });
  } catch (err) {
    console.error(`[SYNC] Error fetching ${url}:`, err.message);
    return null;
  }
}

// Robust bracket-counting JSON extractor for Next.js flight data
function extractNextJsArray(html, key) {
  if (!html) return null;
  const keyIdx = html.indexOf(key);
  if (keyIdx === -1) return null;

  const bracketIdx = html.indexOf('[', keyIdx);
  if (bracketIdx === -1) return null;

  let depth = 0;
  let inString = false;
  let escapeNext = false;
  let end = -1;

  for (let i = bracketIdx; i < html.length; i++) {
    const char = html[i];
    if (escapeNext) {
      escapeNext = false;
      continue;
    }
    if (char === '\\') {
      escapeNext = true;
      continue;
    }
    if (char === '"') {
      inString = !inString;
      continue;
    }
    if (!inString) {
      if (char === '[') depth++;
      else if (char === ']') {
        depth--;
        if (depth === 0) {
          end = i + 1;
          break;
        }
      }
    }
  }

  if (end === -1) return null;
  const jsonStr = html.slice(bracketIdx, end);
  try {
    return JSON.parse(jsonStr);
  } catch (err) {
    try {
      const unescaped = jsonStr.replace(/\\"/g, '"').replace(/\\\\/g, '\\');
      return JSON.parse(unescaped);
    } catch (err2) {
      console.warn(`[SYNC] Could not parse array for key "${key}":`, err2.message);
      return null;
    }
  }
}

function normalizeTitle(title) {
  return (title || '')
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function slugify(text) {
  return normalizeTitle(text).replace(/\s+/g, '-');
}

function getProductKey(title) {
  const norm = normalizeTitle(title);
  if (norm.includes('coach')) return 'coach-vintage-canta';
  if (norm.includes('funko') || norm.includes('one piece') || norm.includes('supernatural')) return 'funko-one-piece';
  if (norm.includes('lace') && norm.includes('luster')) return 'revolution-lace-luster';
  if (norm.includes('cherry rebel')) return 'revolution-cherry-rebel';
  if (norm.includes('almanya dm')) return 'almanya-dm-siparis';
  if (norm.includes('wednesday') && (norm.includes('5500') || norm.includes('rave'))) return 'monster-high-wednesday-rave';
  if (norm.includes('wednesday')) return 'monster-high-wednesday-classic';
  if (norm.includes('tokyo')) return 'bratz-tokyo-a-go-go';
  if (norm.includes('bling')) return 'bratz-bling-25th';
  if (norm.includes('bestiez')) return 'bratz-bestiez';
  if (norm.includes('pelus')) return 'bratz-pelus';
  if (norm.includes('moda bebek')) return 'bratz-moda-bebek-seti';
  return norm.slice(0, 32).replace(/\s+/g, '-');
}

function categorizeProduct(title) {
  const norm = normalizeTitle(title);
  let brand = 'Avrupa İthalat';
  let category = 'avrupa-ozel-istek';
  let isRare = false;

  if (norm.includes('coach')) {
    brand = 'Coach New York';
    category = 'luks-vintage';
    isRare = true;
  } else if (norm.includes('funko') || norm.includes('one piece') || norm.includes('supernatural')) {
    brand = 'Funko Pop / Anime Collector';
    category = 'koleksiyon';
    isRare = true;
  } else if (norm.includes('wednesday') || norm.includes('monster high')) {
    brand = 'Monster High x Wednesday';
    category = 'koleksiyon';
    isRare = true;
  } else if (norm.includes('revolution') || norm.includes('palet') || norm.includes('far') || norm.includes('lace') || norm.includes('rebel')) {
    brand = 'Makeup Revolution London';
    category = 'avrupa-kozmetik';
  } else if (norm.includes('dm') || norm.includes('balea') || norm.includes('rossmann')) {
    brand = 'Almanya Kişisel Alışveriş';
    category = 'avrupa-ozel-istek';
  } else if (norm.includes('bratz') || norm.includes('blind') || norm.includes('surpriz') || norm.includes('kutu')) {
    brand = 'Bratz Collector Edition';
    category = 'blind-box';
    isRare = true;
  }

  return { brand, category, isRare };
}

// Scrape Gardrops
function parseGardrops(html) {
  const products = [];
  if (!html) return products;

  // 1. Try Next.js productList array
  const rawList = extractNextJsArray(html, 'productList');
  if (rawList && Array.isArray(rawList) && rawList.length > 0) {
    for (const item of rawList) {
      const cleanSlug = (item.slug || '').replace(/-[a-f0-9]{16}$/i, '');
      const title = cleanSlug
        .split('-')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      const priceTRY = parseInt((item.price || '').replace(/[^\d]/g, ''), 10) || null;
      const gardropsUrl = `https://www.gardrops.com/${item.slug}-p-${item.pid}-${item.puid}`;
      const condition = item.isNew ? 'Yeni & Etiketli' : 'Az Kullanılmış Vintage';

      products.push({
        id: `gardrops-${item.pid}`,
        pid: item.pid,
        source: 'gardrops',
        title,
        priceTRY,
        image: item.productImg || '',
        images: item.productImg ? [item.productImg] : [],
        condition,
        gardropsUrl,
        freeShipping: !!item.freeShipping
      });
    }
    return products;
  }

  // 2. Regex fallback
  const itemRegex = /<a[^>]*href="(\/[^"]*-p-(\d+)-15344839)"[^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = itemRegex.exec(html)) !== null) {
    const relUrl = match[1];
    const pid = match[2];
    const innerHtml = match[3];

    const imgMatch = innerHtml.match(/src="([^"]+)"/i) || innerHtml.match(/data-src="([^"]+)"/i);
    const image = imgMatch ? imgMatch[1].replace(/&amp;/g, '&') : '';

    const slug = relUrl.split('-p-')[0].replace(/^\//, '').replace(/-[a-f0-9]{16}$/i, '');
    const title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    const cardEnd = match.index + match[0].length;
    const surroundingText = html.slice(cardEnd, cardEnd + 400);
    const priceMatch = surroundingText.match(/(\d[\d\.,]*)\s*(?:TL|₺)/i);
    const priceTRY = priceMatch ? parseInt(priceMatch[1].replace(/[^\d]/g, ''), 10) : null;

    products.push({
      id: `gardrops-${pid}`,
      pid,
      source: 'gardrops',
      title,
      priceTRY,
      image,
      images: image ? [image] : [],
      condition: 'Yeni & Etiketli',
      gardropsUrl: `https://www.gardrops.com${relUrl}`,
      freeShipping: true
    });
  }

  return products;
}

// Scrape Dolap
function parseDolap(html) {
  const products = [];
  if (!html) return products;

  // 1. Try Next.js initialProducts array
  const rawList = extractNextJsArray(html, 'initialProducts');
  if (rawList && Array.isArray(rawList) && rawList.length > 0) {
    for (const item of rawList) {
      const priceTRY = parseInt((item.price || '').replace(/[^\d]/g, ''), 10) || null;
      const slug = slugify(item.title);
      const dolapUrl = `https://dolap.com/urun/${slug}-avrupadansana1-${item.id}`;
      const images = (item.images || []).map(img => img.path).filter(Boolean);
      if (images.length === 0 && item.thumbnailImage?.path) images.push(item.thumbnailImage.path);
      const image = images[0] || '';
      
      let condition = 'Yeni & Etiketli';
      if (item.condition === 'LIKE_NEW') condition = 'Çok Az Kullanılmış / Kusursuz';
      else if (item.condition === 'USED') condition = 'Az Kullanılmış Vintage';

      products.push({
        id: `dolap-${item.id}`,
        productId: item.id,
        source: 'dolap',
        title: item.title,
        priceTRY,
        image,
        images,
        condition,
        dolapUrl,
        description: item.description || ''
      });
    }
    return products;
  }

  // 2. Regex fallback
  const cardRegex = /<a[^>]*href="(\/urun\/([^"]+)-(\d+))"[^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = cardRegex.exec(html)) !== null) {
    const relUrl = match[1];
    const slug = match[2];
    const productId = match[3];
    const innerHtml = match[4];

    const imgMatch = innerHtml.match(/src="([^"]+)"/i) || innerHtml.match(/data-src="([^"]+)"/i);
    const image = imgMatch ? imgMatch[1].replace(/&amp;/g, '&') : '';

    const altMatch = innerHtml.match(/alt="([^"]*)"/i);
    const title = altMatch && altMatch[1] ? altMatch[1].trim() : slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    if (!products.some(p => p.productId === productId)) {
      products.push({
        id: `dolap-${productId}`,
        productId,
        source: 'dolap',
        title,
        priceTRY: null,
        image,
        images: image ? [image] : [],
        condition: 'Yeni & Etiketli',
        dolapUrl: `https://dolap.com${relUrl}`
      });
    }
  }

  return products;
}

export async function syncAllProducts() {
  console.log('[SYNC] Starting Dolap & Gardrops synchronization...');
  const startTime = Date.now();

  const dolapHtml = fetchHtml(DOLAP_PROFILE_URL);
  const dolapProducts = parseDolap(dolapHtml);
  console.log(`[SYNC] Extracted ${dolapProducts.length} items from Dolap`);

  const gardropsHtml = fetchHtml(GARDROPS_PROFILE_URL);
  const gardropsProducts = parseGardrops(gardropsHtml);
  console.log(`[SYNC] Extracted ${gardropsProducts.length} items from Gardrops`);

  // Merge products by matching keys
  const mergedMap = new Map();

  // 1. Ingest Gardrops
  gardropsProducts.forEach(gp => {
    const key = getProductKey(gp.title);
    const { brand, category, isRare } = categorizeProduct(gp.title);
    const images = gp.images || (gp.image ? [gp.image] : []);

    mergedMap.set(key, {
      id: gp.id,
      key,
      title: gp.title,
      brand,
      category,
      isRare,
      priceTRY: gp.priceTRY,
      gardropsPrice: gp.priceTRY,
      dolapPrice: null,
      gardropsUrl: gp.gardropsUrl,
      dolapUrl: null,
      image: gp.image,
      images,
      condition: gp.condition,
      description: `Avrupa koleksiyonundan %100 orijinal ve faturalı ürün. Gardrops alıcı güvencesiyle sigortalı kargo ile gönderilir veya WhatsApp üzerinden doğrudan sipariş verilebilir.`,
      specs: [
        { label: 'Platform', value: 'Gardrops Doğrulanmış' },
        { label: 'Menşei', value: 'Avrupa İthalat' },
        { label: 'Kargo', value: 'Ücretsiz & Sigortalı' }
      ]
    });
  });

  // 2. Ingest Dolap
  dolapProducts.forEach(dp => {
    const key = getProductKey(dp.title);
    const { brand, category, isRare } = categorizeProduct(dp.title);
    const dpImages = dp.images || (dp.image ? [dp.image] : []);

    if (mergedMap.has(key)) {
      const existing = mergedMap.get(key);
      existing.dolapUrl = dp.dolapUrl;
      existing.dolapPrice = dp.priceTRY;
      if (dp.description) existing.description = dp.description;
      
      // Combine unique images
      const combinedImages = Array.from(new Set([...(existing.images || []), ...dpImages]));
      existing.images = combinedImages;
      if (!existing.image && combinedImages[0]) existing.image = combinedImages[0];
      
      // Best price displayed on card
      if (dp.priceTRY && (!existing.priceTRY || dp.priceTRY < existing.priceTRY)) {
        existing.priceTRY = dp.priceTRY;
      }
      existing.specs[0] = { label: 'Platform', value: 'Dolap & Gardrops Aktif' };
    } else {
      mergedMap.set(key, {
        id: dp.id,
        key,
        title: dp.title,
        brand,
        category,
        isRare,
        priceTRY: dp.priceTRY,
        dolapPrice: dp.priceTRY,
        gardropsPrice: null,
        dolapUrl: dp.dolapUrl,
        gardropsUrl: null,
        image: dp.image,
        images: dpImages,
        condition: dp.condition,
        description: dp.description || `Avrupa'dan özenle seçilmiş orijinal ürün. Dolap güvencesi veya WhatsApp hattı üzerinden hemen sipariş oluşturabilirsiniz.`,
        specs: [
          { label: 'Platform', value: 'Dolap Doğrulanmış' },
          { label: 'Menşei', value: 'Avrupa İthalat' },
          { label: 'Kargo', value: 'Sigortalı Teslimat' }
        ]
      });
    }
  });

  const mergedList = Array.from(mergedMap.values());

  // 3. Prepend the evergreen Germany DM Custom Order card
  mergedList.unshift({
    id: 'dm-drogerie-custom-service',
    key: 'almanya-dm-ozel-siparis-hizmeti',
    title: 'Almanya DM & Avrupa Özel Sipariş Hizmeti',
    brand: 'Almanya Kişisel Alışveriş',
    category: 'avrupa-ozel-istek',
    priceTRY: 0,
    isCustomQuote: true,
    condition: 'Özel Talep / Sıfır İthalat',
    image: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&w=600&q=80',
    images: ['https://images.unsplash.com/photo-1576426863848-c21f53c60b19?auto=format&fit=crop&w=600&q=80'],
    description: 'Almanya DM (Drogerie Markt), Rossmann, Amazon.de ve Avrupa eczanelerinden dilediğiniz vitamin, Balea cilt bakım veya kozmetik ürünlerini canlı piyasa kuruyla doğrudan adresinize temin ediyoruz.',

    isRare: false,
    dolapUrl: 'https://dolap.com/profil/avrupadansana1',
    gardropsUrl: 'https://www.gardrops.com/avrupadansana1',
    specs: [
      { label: 'Hizmet', value: 'Kişisel İthalat & Teslimat' },
      { label: 'Menşei', value: 'Almanya / İtalya / Fransa' },
      { label: 'Kur', value: 'Canlı Piyasa Kuru' },
      { label: 'Fatura', value: 'Resmi Avrupa Mağaza Faturası' }
    ]
  });

  console.log(`[SYNC] Total unique merged products: ${mergedList.length}`);

  // Write JSON
  const outputData = {
    lastSynced: new Date().toISOString(),
    itemCount: mergedList.length,
    sources: {
      dolap: dolapProducts.length,
      gardrops: gardropsProducts.length
    },
    products: mergedList
  };

  const jsonPath = path.join(ROOT_DIR, 'public', 'products.json');
  fs.writeFileSync(jsonPath, JSON.stringify(outputData, null, 2), 'utf-8');
  console.log(`[SYNC] Saved JSON to ${jsonPath}`);

  // Write src/data/products.js
  const jsContent = `// AUTOMATICALLY GENERATED BY scripts/sync-products.js
// Last Synced: ${new Date().toISOString()}

export const WHATSAPP_NUMBER = '905518319958';
export const WHATSAPP_DISPLAY = '+90 551 831 99 58';

export const CATEGORIES = [
  { id: 'all', label: 'Tüm Ürünler' },
  { id: 'koleksiyon', label: 'Koleksiyon & Figür' },
  { id: 'luks-vintage', label: 'Lüks & Vintage Çanta' },
  { id: 'avrupa-ozel-istek', label: 'Avrupa Kişisel Sipariş' },
  { id: 'avrupa-kozmetik', label: 'Avrupa Kozmetik & Bakım' },
  { id: 'blind-box', label: 'Blind Box & Sürpriz' },
];

export const PRODUCTS = ${JSON.stringify(mergedList, null, 2)};

export const TRUST_FEATURES = [
  {
    icon: 'Plane',
    title: "Avrupa'dan Doğrudan İthalat",
    desc: "Almanya, Fransa ve İtalya'dan bizzat temin edilen %100 orijinal ve faturalı ürünler."
  },
  {
    icon: 'ShieldCheck',
    title: "Dolap & Gardrops Güvencesi",
    desc: "İster profilimizden komisyonsuz, isterseniz Dolap & Gardrops güvenceli ödeme ile satın alın."
  },
  {
    icon: 'PackageCheck',
    title: "Özel Sipariş & Kişisel Alışveriş",
    desc: "Avrupa'da bulduğunuz herhangi bir ürünün linkini atın, sizin için satın alıp getirelim."
  },
  {
    icon: 'Sparkles',
    title: "Seçkin Koleksiyon Parçaları",
    desc: "Nadir Funko Pop, Coach vintage deri çantalar ve limitli üretim pop-kültür parçaları."
  }
];

export const FAQ_ITEMS = [
  {
    q: "Avrupa'dan Sana Shop nasıl çalışıyor?",
    a: "Avrupa seyahatlerimiz ve doğrudan ithalat ağımız sayesinde Almanya (DM, Rossmann, Amazon.de), Fransa, İngiltere ve İtalya'dan popüler ve Türkiye'de bulunmayan orijinal ürünleri getiriyoruz. Hem hazır stoklu ürünlerimizi satıyor hem de müşterilerimize özel sipariş hizmeti sunuyoruz."
  },
  {
    q: "Ürünler orijinal mi?",
    a: "Kesinlikle %100 orijinaldir. Ürünlerimiz resmi Avrupa mağazalarından ve yetkili distribütörlerden faturalı olarak temin edilir. Asla replika veya sahte ürün satılmamaktadır."
  },
  {
    q: "Dolap veya Gardrops üzerinden satın alabilir miyim?",
    a: "Evet! Tüm ürünlerimizin Dolap (@avrupadansana1) ve Gardrops (@avrupadansana1) hesaplarımızda aktif ilanları bulunmaktadır. Dilerseniz platformların taksit ve alıcı koruma güvencesiyle, dilerseniz sitemiz üzerinden WhatsApp ile doğrudan sipariş verebilirsiniz."
  },
  {
    q: "Almanya DM veya başka bir mağazadan istediğim ürünü sipariş verebilir miyim?",
    a: "Evet! 'Avrupa'dan İste' formumuzu doldurarak veya Instagram (@avrupadan.sana.shop) / WhatsApp üzerinden istediğiniz ürünün linkini ya da fotoğrafını bize iletebilirsiniz. En kısa sürede maliyet ve teslimat süresi teklifimizi iletiyoruz."
  },
  {
    q: "Kargo ve teslimat süresi ne kadar?",
    a: "Türkiye stoğumuzda olan hazır ürünler aynı gün veya ertesi gün kargoya verilir (1-3 iş günü). Özel Avrupa siparişleri ise getirme takvimimize bağlı olarak ortalama 7-14 iş günü içinde adresinize ulaştırılır."
  }
];
`;

  const jsPath = path.join(ROOT_DIR, 'src', 'data', 'products.js');
  fs.writeFileSync(jsPath, jsContent, 'utf-8');
  console.log(`[SYNC] Updated ${jsPath} successfully! (Elapsed: ${Date.now() - startTime}ms)`);

  return outputData;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  syncAllProducts()
    .then(res => {
      console.log(`[SYNC] Completed! Total items: ${res.itemCount}`);
      process.exit(0);
    })
    .catch(err => {
      console.error('[SYNC] Failed:', err);
      process.exit(1);
    });
}
