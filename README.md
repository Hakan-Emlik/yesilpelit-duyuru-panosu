# 🌿 Yeşilpelit Öğrenci Yurdu Duyuru Panosu

**Yeşilpelit Öğrenci Yurdu Duyuru Panosu**, yurtta kalan öğrencilerin ve personelin günlük yaşamını kolaylaştırmak amacıyla tasarlanmış modern, dijital bir bilgilendirme ve duyuru platformudur.

---

## 📌 Özellikler ve Entegrasyonlar

### 1. 🕌 Fazilet Takvimi Namaz Vakitleri Entegrasyonu
- **Resmi Kaynak:** [fazilettakvimi.com/namaz-vakitleri/](https://fazilettakvimi.com/namaz-vakitleri/)
- **Vakitler:** İmsak, Güneş, Öğle, İkindi, Akşam, Yatsı.
- **Canlı Geri Sayım:** Bir sonraki vakte kalan süre saniyesi saniyesine gösterilir.
- **Aktif Vakit Vurgusu:** İçinde bulunulan namaz vakti parlak yeşil ve altın renk tonlarıyla otomatik olarak öne çıkarılır.
- **Şehir Değiştirici:** İstanbul, Ankara, İzmir, Bursa, Konya, Antalya, Trabzon ve Diyarbakır gibi iller tek tıkla seçilebilir.
- **Fazilet Takvimi Canlı Penceresi:** Fazilet Takvimi'nin resmi interaktif günlük penceresi (`/gunluk/`) tek tıkla açılıp incelenebilir.

### 2. 📜 1. Fotoğraf: Kurumsal Logo
- Yeşilpelit Öğrenci Yurdu'nun resmi logosu (`assets/images/logo.png`) sitenin ana başlığında ve duyuru bandında altın çerçeveyle yer alır.

### 3. 📅 2. Fotoğraf & PDF: Haftasonu Programı ("Bir Haftasonu Daha Nasıl Güzel Geçirilir?")
- **Afiş Vitrini:** Ahşap çerçeveli özel tasarım poster önizlemesi ve tıklandığında açılan tam ekran büyütme (lightbox) modu (`assets/images/haftasonu-programi.jpg`).
- **PDF İndir:** A4 formatında hazırlanmış yüksek kaliteli program belgesi tek tıkla indirilebilir (`assets/docs/haftasonu-programi.pdf`).
- **A4 Yazdır:** Fiziksel panolara asılmak üzere tek tıkla A4 baskı formatında çıktısı alınabilir.
- **İnteraktif Zaman Akışı:** Afişteki 15 saatlik program (05:00 Sabah Namazından 20:10 Yatsı Namazına kadar) canlı saatle senkronize biçimde gösterilir.

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
