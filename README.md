# 🌿 Yeşilpelit Öğrenci Yurdu Duyuru Panosu

**Yeşilpelit Öğrenci Yurdu Duyuru Panosu**, yurtta kalan öğrencilerin ve personelin günlük yaşamını kolaylaştırmak amacıyla tasarlanmış modern, dijital bir bilgilendirme ve duyuru platformudur.

---

## 📌 Özellikler ve Entegrasyonlar

### 1. 🕌 Fazilet Takvimi Samsun Atakum Namaz Vakitleri Entegrasyonu
- **Resmi Kaynak:** [namaz-vakitleri.fazilettakvimi.com/samsun-atakum/2025](https://namaz-vakitleri.fazilettakvimi.com/samsun-atakum/2025)
- **İl / İlçe:** Samsun - Atakum (İlçe Kodu: 2025)
- **Vakitler:** İmsak, Güneş, Öğle, İkindi, Akşam, Yatsı (Fazilet Takvimi şer'î temkinli Atakum vakitleri).
- **Canlı Geri Sayım:** Bir sonraki vakte kalan süre saniyesi saniyesine gösterilir (Europe/Istanbul saat dilimi esaslı).
- **Aktif Vakit Vurgusu:** İçinde bulunulan namaz vakti otomatik olarak parlar ve rozetle öne çıkarılır.
- **Fazilet Takvimi Canlı Penceresi:** Fazilet Takvimi'nin resmi interaktif Samsun Atakum sayfası tek tıkla açılıp incelenebilir.
- **7/24 Otonom Güncelleme:** GitHub Actions botu her gece vakitleri Fazilet Takvimi'nden çekip panoyu otomatik günceller; bilgisayar kapalıyken bile internetteki pano asla eskimez.

### 2. 📜 Kurumsal Kimlik & Logo
- Yeşilpelit Öğrenci Yurdu'nun resmi logosu (`assets/images/logo.png`) sitenin ana başlığında altın çerçeveyle yer alır.

### 3. 📅 Program Vitrini & Akıllı Zaman Akışı
- **Akıllı Gün Algılama:** Sistem gün kontrolünü İstanbul saatine göre otomatik yapar. Pazartesi – Cuma günleri **Hafta İçi Programı**, Cumartesi – Pazar günleri ise **Hafta Sonu Programı** afişi ve akışı otomatik açılır.
- **Dinamik Namaz Entegrasyonu:** Zaman çizelgesindeki Akşam Namazı gibi maddeler sabit saat yerine o günün gerçek Fazilet akşam namazı saatine otomatik bağlanır.
- **JSON Tabanlı İçerik:** Tüm program akışı `assets/data/program.json` dosyasından okunur; kod değiştirmeden kolayca düzenlenebilir.
- **Afiş Vitrini:** Ahşap çerçeveli poster önizlemesi ve tıklandığında açılan tam ekran büyütme (lightbox) modu.
- **PDF İndir & A4 Yazdır:** Aktif olan programa göre A4 formatında yüksek kaliteli PDF belgesi indirilebilir veya doğrudan yazıcıdan A4 tam sayfa olarak basılabilir.
- **İnteraktif Zaman Akışı:** Canlı saatle senkronize çalışan, içinde bulunulan etkinliği vurgulayan ve sıradaki programa geri sayım yapan sayaç.

### 4. 📖 Günün Hikmeti Köşesi (Âyet-i Kerîme & Hadîs-i Şerîf)
- Her günün kendi özel âyeti, hadîsi, kaynağı ve tefekkür notu.
- Âyet, Hadîs ve İkisi Bir Arada (Dual) sekme görünümleri.
- TV ekranları için 15 saniyelik otomatik geçiş ve ilerleme çubuğu.
- Tek tıkla metin kopyalama özelliği.
- `assets/data/hikmet.json` üzerinden kolayca yeni hikmetler eklenebilir.

### 5. 📡 Canlı Senkronizasyon (TV & Kiosk Ekranları)
- Yerel ağdaki TV, tablet veya bilgisayar ekranları sunucuya bağlı kalır (SSE).
- Panoda veya kodda bir güncelleme yapıldığında tüm bağlı TV ekranları 1 saniye içinde kendiliğinden yenilenir.
- **Pano / TV Modu (Kiosk):** F11 veya tam ekran butonu ile lobideki TV ekranlarına tam ekran yansıtma modu.
- **Koyu / Açık Tema:** Gece ve gündüz için göz yormayan renk seçenekleri (hafızada saklanır).

---

## 💻 Nasıl Çalıştırılır?

### 1. Geliştirici Sunucusu ile (Önerilen):
```bash
npm start
```
Tarayıcınızda açın: **[http://localhost:3000](http://localhost:3000)** (aynı Wi-Fi'daki TV ve telefonlar için LAN IP adresi terminalde yazar).

### 2. Tek Tıkla Masaüstü Başlatıcılar (.bat):
- **`Baslat.bat`**: Doğrudan tarayıcıda açar.
- **`Sunucu_Baslat.bat`**: Yerel Node.js sunucusunu başlatır.
- **`Guncelle_ve_Kaydet.bat`**: index.html'i derler, Git'e kaydeder, GitHub Pages'e yükler ve bağlı TV ekranlarını yeniler.
- **`Internet_Yayinla.bat`**: Cloudflare tüneli ile panoyu dış dünyaya açar.

### 3. Komut Satırı Araçları:
```bash
# Panoyu tek parça index.html olarak derle
npm run build

# Fazilet Takvimi'nden güncel vakitleri çek
npm run fetch:prayer

# Afişlerden A4 PDF belgelerini üret
npm run build:pdf
```

---

## 📁 Proje Dosya Yapısı

```
yesilpelit-duyuru-panosu/
├── index.html                   # Dağıtıma hazır, bağımsız (self-contained) tek dosya
├── server.js                    # Yerel web sunucusu, SSE canlı senkronizasyon ve API proxy
├── package.json                 # Bağımlılıklar ve npm scriptleri
├── .github/workflows/
│   └── vakitleri-guncelle.yml   # Her gece çalışan otomatik vakit güncelleme botu
├── assets/
│   ├── css/
│   │   └── style.css            # TEK KAYNAK: Tüm CSS tasarım sistemi ve A4 baskı stilleri
│   ├── js/
│   │   ├── time.js              # Europe/Istanbul saat ve takvim motoru
│   │   ├── prayer.js            # Fazilet Takvimi vakit hesaplama ve kart gösterimi
│   │   ├── app.js               # Canlı saat, akış, Günün Hikmeti, tema, kiosk
│   │   └── sync.js              # TV canlı senkronizasyon (SSE & polling) istemcisi
│   ├── data/
│   │   ├── program.json         # Düzenlenebilir günlük program akışları
│   │   ├── hikmet.json          # Âyet ve Hadîs koleksiyonu
│   │   ├── fazilet_atakum.json  # Biriktirilen Fazilet Atakum vakit arşivi
│   │   └── version.json         # Anlık sürüm numarası
│   ├── images/
│   │   ├── logo.png             # Yeşilpelit Logosu
│   │   ├── haftaici-programi.jpg# Hafta içi afiş görseli
│   │   └── haftasonu-programi.jpg# Hafta sonu afiş görseli
│   └── docs/
│       ├── haftaici-programi.pdf# İndirilebilir A4 Hafta İçi PDF
│       └── haftasonu-programi.pdf# İndirilebilir A4 Hafta Sonu PDF
└── scripts/
    ├── build_standalone.js      # Modüler dosyaları index.html'e derleyen ana betik
    ├── fetch_prayer.js          # Fazilet API'den vakitleri çeken betik
    ├── generate_pdf.js          # Afiş görsellerinden PDF oluşturan betik
    └── lib/
        └── fazilet.js           # Fazilet API ve arşiv birleştirme kütüphanesi
```
