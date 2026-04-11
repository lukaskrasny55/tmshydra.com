-- Pages table
CREATE TABLE pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- SEO table
CREATE TABLE seo (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  page_slug TEXT UNIQUE NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT,
  og_image TEXT
);

-- Settings table
CREATE TABLE settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  site_name TEXT DEFAULT 'TMS-HYDRA',
  google_ads_id TEXT,
  google_tag_manager_id TEXT,
  conversion_event_form TEXT,
  conversion_event_booking TEXT
);

-- Bookings table
CREATE TABLE bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  time TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Leads table (Contact Form)
CREATE TABLE leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Calculator Settings table
CREATE TABLE calculator_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  base_price_per_m2 NUMERIC DEFAULT 10,
  insulation_price_per_m2 NUMERIC DEFAULT 15,
  waterproofing_price_per_m2 NUMERIC DEFAULT 12,
  premium_material_multiplier NUMERIC DEFAULT 1.2,
  discount_percentage NUMERIC DEFAULT 0,
  minimum_order_price NUMERIC DEFAULT 500,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services table
CREATE TABLE services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  icon TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Page Sections table
CREATE TABLE page_sections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  page_slug TEXT NOT NULL,
  section_key TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(page_slug, section_key)
);

-- Initial Data
INSERT INTO pages (slug, title, content) VALUES 
('home', 'Domov', '{"hero_title": "Vaša strecha, naša zodpovednosť", "hero_highlight_text": "naša zodpovednosť", "hero_description": "Sme experti na hydroizolácie a zateplenie plochých striech.", "hero_button_primary_text": "Bezplatná obhliadka", "hero_button_secondary_text": "Vypočítať cenu", "hero_background_image": "https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&q=80&w=1920"}'),
('about', 'O nás', '{"title": "Vitajte vo svete TMS-HYDRA", "content": "Moje meno je Tomáš Solnoky..."}'),
('services', 'Služby', '{"title": "Naše služby", "content": "Komplexný cyklus starostlivosti..."}'),
('tech', 'Technológie', '{"title": "Technológie a materiály", "content": "Detailné skladby..."}'),
('contact', 'Kontakt', '{"title": "Kontaktujte nás", "content": "Sme pripravení..."}');

INSERT INTO calculator_settings (base_price_per_m2, insulation_price_per_m2, waterproofing_price_per_m2) VALUES (10, 15, 12);

INSERT INTO page_sections (page_slug, section_key, content) VALUES 
('about', 'hero_title', 'Vitajte vo svete TMS-HYDRA'),
('about', 'intro_text', 'Moje meno je Tomáš Solnoky a som zakladateľom spoločnosti TMS-HYDRA. Naším cieľom je poskytovať najvyššiu kvalitu v oblasti hydroizolácií.'),
('about', 'story_text', 'Naša cesta začala pred rokmi s víziou priniesť na trh spoľahlivé a inovatívne riešenia pre ploché strechy.'),
('about', 'cta_text', 'Kontaktujte nás pre bezplatnú obhliadku.'),
('home', 'hero_title', 'Vaša strecha, naša zodpovednosť.'),
('home', 'hero_highlight_text', 'zodpovednosť'),
('home', 'hero_description', 'Špecialisti na hydroizoláciu a zateplenie plochých striech. Prinášame kvalitu, ktorá vydrží generácie.'),
('home', 'hero_button_primary_text', 'Bezplatná obhliadka'),
('home', 'hero_button_secondary_text', 'Vypočítať cenu'),
('home', 'hero_background_image', 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&q=80&w=1920'),
('services', 'title_main', 'NAŠE'),
('services', 'title_accent', 'SLUŽBY'),
('services', 'subtitle', 'Komplexný cyklus starostlivosti o ploché strechy. Od diagnostiky až po urgentný zásah v havarijných stavoch.'),
('tech', 'title_main', 'MODERNÉ'),
('tech', 'title_accent', 'TECHNOLÓGIE'),
('tech', 'subtitle', 'Používame len certifikované materiály od svetových lídrov v oblasti hydroizolácií.'),
('projects', 'title_main', 'NAŠE'),
('projects', 'title_accent', 'REALIZÁCIE'),
('projects', 'subtitle', 'Prezrite si výber našich prác. Každý projekt je pre nás záväzkom ku kvalite.'),
('contact', 'title_main', 'POĎME SA'),
('contact', 'title_accent', 'SPOJIŤ'),
('contact', 'subtitle', 'Sme tu pre vás. Či už potrebujete konzultáciu, obhliadku alebo urgentný zásah.'),
('about', 'subtitle', 'Vitajte vo svete TMS-HYDRA.'),
('about', 'tagline', 'Príbeh o odbornosti a rodinnom záväzku.'),
('about', 'symbolism_title', 'Symbolika nášho mena'),
('about', 'symbolism_text_1', 'Tie tri písmená – T.M.S. – majú pre mňa obrovský význam. Sú to iniciály mojich dvoch synov: Tomáš a Matias, a moje priezvisko Solnoky. Toto logo nie je len značka, je to symbol nášej budúcnosti a záväzku, ktorý pre nich budujem.'),
('about', 'symbolism_text_2', 'Prečo HYDRA? Pretože naša práca je o krotení vody. HYDRA evokuje silu, odolnosť a schopnosť chrániť pred vlhkosťou, ktorá môže narušiť štruktúru každej budovy. Je to o vytvorení nepriepustného štítu, ktorý vydrží roky.'),
('about', 'protection_text', 'Pre mňa a moju rodinu je každá strecha, ktorú realizujeme, akoby bola naša vlastná. Viem, aká dôležitá je ochrana, spoľahlivosť a dlhá životnosť. Preto kladieme dôraz na najmodernejšie technológie, najkvalitnejšie materiály a precíznosť v každom detaile.'),
('about', 'partnership_text', 'Keď si vyberiete TMS-HYDRA, nevyberáte si len dodávateľa. Vyberáte si partnera, ktorý berie svoju prácu osobne, s rodinnou zodpovednosťou and s víziou odolnej a trvácnej budúcnosti. Pretože rovnako ako chránim svoju rodinu, chceme chrániť aj tú vašu.'),
('about', 'feature_1_title', 'Osobný prístup'),
('about', 'feature_1_text', 'Každý projekt riešim osobne so zodpovednosťou otca a odborníka.'),
('about', 'feature_2_title', 'Európska kvalita'),
('about', 'feature_2_text', 'Skúsenosti z Belgicka pretavené do každého detailu vašej strechy.'),
('about', 'founder_image', 'https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&q=80&w=800'),
('about', 'founder_name', 'Tomáš Solnoky - Zakladateľ TMS-HYDRA'),
('about', 'promise_title', 'Náš sľub'),
('about', 'promise_text', 'Rovnako ako chránim svoju rodinu, budem chrániť aj tú vašu – pevnými a spoľahlivými strechami.'),
('about', 'promise_author', 'Tomáš Solnoky'),
('home', 'hero_side_image', '1.png'),
('home', 'hero_side_image_alt', 'Moderná izolácia strechy'),
('home', 'hero_trust_number', '12+'),
('home', 'hero_trust_text', 'Rokov skúseností'),
('home', 'hero_features', '["Kvalitné materiály (TPO, PVC)", "Záruka až 15 rokov", "Certifikovaný tím odborníkov", "Osobný prístup a poradenstvo"]');

-- SEO City Pages table
CREATE TABLE seo_city_pages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  service TEXT NOT NULL,
  city TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_title TEXT NOT NULL,
  meta_description TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

INSERT INTO seo (page_slug, meta_title, meta_description) VALUES 
('home', 'TMS-HYDRA | Ploché strechy', 'Experti na ploché strechy, hydroizolácie a zateplenie.'),
('about', 'O nás | TMS-HYDRA', 'Spoznajte náš príbeh a odborný prístup.'),
('services', 'Služby | TMS-HYDRA', 'Ponúkame diagnostiku, realizáciu a servis striech.'),
('tech', 'Technológie | TMS-HYDRA', 'Používame najmodernejšie materiály a postupy.'),
('contact', 'Kontakt | TMS-HYDRA', 'Ozvite sa nám pre nezáväznú cenovú ponuku.');

INSERT INTO settings (google_ads_id) VALUES ('');

-- Initial Projects
INSERT INTO projects (title, location, description, image_url) VALUES 
('Villa Hasčák', 'Bratislava', 'Kompletná rekonštrukcia hydroizolačného systému pomocou PVC fólie na bytovom dome v Ružinove.', 'vh1.jpg,vh2.jpg,vh3.jpg,vh4.jpg'),
('Oprava plochej strechy', 'Nové Zámky', 'Lokálne opravy a celoplošné pretesnenie priemyselného skladu s rozlohou 1200 m2.', 'nz1.jpg,nz2.jpg,nz3.jpg,nz4.jpg'),
('Novostavba', 'Kolta', 'Zateplenie plochej strechy polystyrénom a následná pokládka TPO fólie pre maximálnu životnosť.', 'ns1.jpg,ns2.jpg,ns3.jpg,ns4.jpg'),
('Biela lepenka', 'Pezinok', 'Špeciálne riešenie pre pochôdznu terasu s využitím hydroizolačnej stierky a dlažby na terčoch.', 'bl1.jpeg,bl2.jpeg,bl3.jpeg'),
('Bytovka', 'Dubnica nad Váhom', 'Realizácia novej strešnej na bytovom dome.', 'bdv1.jpeg,bdv2.jpg,bdv3.jpg'),
('Zelená strecha', 'Belgicko', 'Aplikácia prémiovej TPO fólie na administratívnom objekte s vysokými nárokmi na UV stabilitu.', 'b1.jpg,b2.jpg,b3.jpg');
