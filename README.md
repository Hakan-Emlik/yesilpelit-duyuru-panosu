# 🌿 Yeşilpelit Öğrenci Yurdu Duyuru Panosu

**Yeşilpelit Öğrenci Yurdu Duyuru Panosu**, yurtta kalan öğrencilerin ve personelin günlük yaşamını kolaylaştırmak amacıyla tasarlanmış modern, dijital bir bilgilendirme ve duyuru platformudur.

---

## 📌 Özellikler ve Entegrasyonlar

### 1. 🕌 Fazilet Takvimi Samsun Namaz Vakitleri Entegrasyonu
- **Resmi Kaynak:** [namaz-vakitleri.fazilettakvimi.com/samsun/57](https://namaz-vakitleri.fazilettakvimi.com/samsun/57)
- **İl:** Samsun (İl Kodu: 57)
- **Vakitler:** İmsak, Güneş, Öğle, İkindi, Akşam, Yatsı (Fazilet Takvimi şer'î temkinli vakitleri).
- **Canlı Geri Sayım:** Bir sonraki vakte kalan süre saniyesi saniyesine gösterilir.
- **Aktif Vakit Vurgusu:** İçinde bulunulan namaz vakti parlak yeşil ve altın renk tonlarıyla otomatik olarak öne çıkarılır.
- **Fazilet Takvimi Canlı Penceresi:** Fazilet Takvimi'nin resmi interaktif Samsun sayfası tek tıkla açılıp incelenebilir.


### 2. 📜 1. Fotoğraf: Kurumsal Logo
- Yeşilpelit Öğrenci Yurdu'nun resmi logosu (`assets/images/logo.png`) sitenin ana başlığında ve duyuru bandında altın çerçeveyle yer alır.

### 3. 📅 Program Vitrini (Hafta İçi & Hafta Sonu Akıllı Geçiş Sistemi)
- **Akıllı Gün Algılama:** Sistem haftanın gününü otomatik kontrol eder. Pazartesi – Cuma günleri **Hafta İçi Programı** afişi ve akışı, Cumartesi – Pazar günleri ise **Hafta Sonu Programı** ("Bir Haftasonu Daha Nasıl Güzel Geçirilir?") afişi ve akışı otomatik olarak panoya yansıtılır.
- **Manuel Geçiş Sekmeleri:** Kullanıcılar diledikleri zaman üst bardaki `[Hafta İçi Programı]` ve `[Hafta Sonu Programı]` sekmelerine tıklayarak diğer programı da anında inceleyebilir. Hangi programın bugüne ait olduğu "Bugün" rozetiyle belirtilir.
- **Afiş Vitrini:** Ahşap çerçeveli poster önizlemesi ve tıklandığında açılan tam ekran büyütme (lightbox) modu (`assets/images/haftaici-programi.jpg` & `assets/images/haftasonu-programi.jpg`).
- **PDF İndir & A4 Yazdır:** Aktif olan programa göre A4 formatında yüksek kaliteli PDF belgesi indirilebilir (`assets/docs/haftaici-programi.pdf` & `assets/docs/haftasonu-programi.pdf`) ve tek tıkla yazdırılabilir.
- **İnteraktif Zaman Akışı:** Canlı saatle senkronize çalışan, içinde bulunulan etkinliği yeşil-altın tonlarıyla vurgulayan dinamik zaman çizelgesi.

### 4. 📢 Dijital Pano & Yurt Yaşamı
- **Kayan Bilgi Bandı:** Günün hadis-i şerifi, nöbetçi öğretmen, yemekhane ve etkinlik duyuruları.
- **Günün Yemek Menüsü:** Sabah, öğle ve akşam menüsü detayları.
- **Nöbetçi İdare & Yetkililer:** Nöbetçi müdür yardımcısı, belletmen ve acil dahili numaralar.
- **Yurt Kuralları:** Giriş-çıkış, sessiz etüt salonu ve çamaşırhane saatleri.
- **Pano / TV Modu (Kiosk):** Yurt lobisindeki veya koridordaki TV ekranlarına tam ekran yansıtmak için özel gösterim modu.
- **Koyu / Açık Tema:** Gece ve gündüz için göz yormayan renk seçenekleri.

---

## 💻 Nasıl Çalıştırılır?

1. **Geliştirici Sunucusu ile (Önerilen):**
   ```bash
   npm start
   ```
   Tarayıcınızda açın: **[http://localhost:3000](http://localhost:3000)**

2. **Doğrudan Dosya Olarak:**
   `index.html` dosyasını herhangi bir web tarayıcısında çift tıklayarak açabilirsiniz.

---

## 📁 Proje Dosya Yapısı

```
yurt-intibak-rehberi/
├── index.html                   # Ana duyuru panosu sayfası
├── server.js                    # Hafif ve hızlı yerel web sunucusu
├── package.json                 # Proje yapılandırması ve scriptler
├── assets/
│   ├── images/
│   │   ├── logo.png             # 1. Fotoğraf: Yeşilpelit Logosu
│   │   └── haftasonu-programi.jpg # 2. Fotoğraf: Haftasonu programı afişi
│   ├── docs/
│   │   └── haftasonu-programi.pdf # İndirilebilir A4 PDF program belgesi
│   ├── css/
│   │   └── style.css            # Özel kurumsal yeşil-altın tasarım sistemi
│   └── js/
│       ├── prayer.js            # Fazilet Takvimi & namaz vakitleri mantığı
│       └── app.js               # Canlı saat, takvim, zaman akışı ve TV modu
└── scripts/
    └── generate_pdf.js          # PDF üretim betiği
```
