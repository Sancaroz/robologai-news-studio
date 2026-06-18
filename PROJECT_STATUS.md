# RoboLogAI Proje Durumu

## Genel durum

RoboLogAI şu anda metin odaklı bir MVP iskeletidir. Kaynak video bilgisi girilebilir, haber paketi üretilebilir, brief düzenlenip onaylanabilir ve TXT olarak dışa aktarılabilir. Otomatik transkripsiyon, seslendirme ve video üretimi henüz tamamlanmamıştır.

## Tamamlananlar

- Next.js, TypeScript ve Tailwind CSS proje yapısı
- PostgreSQL ve Prisma veri modeli
- İlk veritabanı migration dosyası ve örnek seed kaydı
- YouTube URL, kaynak başlığı, şirket ve transcript/not giriş formu
- YouTube video kimliği ve thumbnail adresini yerel olarak çıkarma
- 60 saniyelik İngilizce haber metni üretme
- YouTube başlığı, açıklaması, hashtag, kaynak kredisi ve voiceover metni üretme
- API anahtarı olmadan çalışan ücretsiz demo üretim modu
- İsteğe bağlı OpenAI structured-output entegrasyonu
- Kaydedilmiş brief dashboard'u
- Brief düzenleme ve manuel onay akışı
- TXT dışa aktarma
- Video yükleme, transkripsiyon, voiceover ve render için API placeholder'ları
- Docker, FFmpeg ve Railway dağıtımına temel hazırlık
- Telif, kaynak gösterme ve otomatik yayınlamama kuralları
- Teknik backlog ve kurulum dokümantasyonu

## Eksikler ve tahmini efor

Tahminler tek geliştirici için yaklaşık aktif çalışma süresidir. Test, servis onayları ve üçüncü taraf sorunları süreyi uzatabilir.

| Özellik | İş değeri | Tahmini efor |
|---|---|---:|
| Yetkili ortamda build, lint ve tip hatalarının düzeltilmesi | Uygulamanın gerçekten çalıştığını doğrular | 0,5–1 gün |
| Railway + PostgreSQL dağıtımı ve migration | Kurucunun uygulamayı tarayıcıdan kullanmasını sağlar | 0,5–1 gün |
| Admin girişi ve rota koruması | İçerik ve API anahtarlarını korur | 1–2 gün |
| Form hata mesajları, loading ve retry durumları | Günlük kullanımda hata kaybını azaltır | 1–2 gün |
| YouTube metadata entegrasyonu | Manuel başlık ve şirket girişini azaltır | 1–2 gün |
| Video yükleme ve özel dosya depolama | İndirilen kaynakların işlenmesini sağlar | 2–4 gün |
| Otomatik transcript çıkarma | En büyük manuel hazırlık işini kaldırır | 2–4 gün |
| Timestamp'li transcript düzenleyici | Altyazı ve klip seçimini güvenilir yapar | 2–3 gün |
| AI voiceover üretimi ve ses önizleme | Harici ses aracına ihtiyacı azaltır | 2–3 gün |
| Klip zaman aralığı seçimi | Telif açısından kontrollü kaynak kullanımını sağlar | 3–5 gün |
| FFmpeg ile 9:16 video render | Uygulamayı gerçek video üretim aracına dönüştürür | 5–8 gün |
| Altyazı, başlık ve kaynak kredisi şablonları | Yayına hazır görsel kalite sağlar | 3–5 gün |
| Render kuyruğu ve arka plan worker'ı | Uzun işlemleri güvenli ve tekrar çalıştırılabilir yapar | 3–5 gün |
| Video önizleme ve MP4 dışa aktarma | Son kalite kontrolünü uygulama içinde tamamlar | 2–4 gün |
| Testler, loglama ve onay audit kaydı | Üretim güvenilirliğini artırır | 3–5 gün |

Tam otomatik metinden videoya ilk üretim sürümü yaklaşık **4–7 haftalık** tek geliştirici çalışmasıdır. Tasarım kalitesi, gelişmiş editör ve operasyonel güvenilirlik ayrıca zaman gerektirir.

## Önce hangi özellik yapılmalı?

İlk olarak **uygulamanın yetkili bir ortamda build edilmesi ve Railway üzerinde çalıştırılması** gerekir.

Sebebi basittir: mevcut metin MVP'si doğrulanmadan transkripsiyon veya FFmpeg gibi daha pahalı ve karmaşık özellikler eklemek riski büyütür. Çalışan bir deployment; gerçek kullanım, veri modeli, editoryal akış ve kullanıcı arayüzü sorunlarını erkenden ortaya çıkarır.

Bundan sonraki ilk ürün özelliği **otomatik transcript çıkarma** olmalıdır. Solo kurucu için en fazla zaman kazandıran adım budur ve video render motoru tamamlanmadan da değer üretir.

## İlk robotics news videosunu en hızlı yayınlama planı

İlk video için tam otomasyonu beklemeyin. RoboLogAI'yi haber masasının metin üretim bölümü olarak kullanın; montajı mevcut araçlarla tamamlayın.

1. Haber değeri açık olan, yeni yayınlanmış ve kaynağı belli bir robotik şirket videosu seçin.
2. YouTube transcript'ini veya önemli noktaları RoboLogAI formuna yapıştırın.
3. Demo çıktısını başlangıç olarak kullanın. OpenAI API ancak ücretli kullanım açıkça onaylandıktan sonra etkinleştirilmelidir.
4. Üretilen metindeki tüm teknik iddiaları şirketin orijinal açıklamasıyla karşılaştırın.
5. Pazarlama dilini çıkarın; neyin şirket iddiası, neyin gözlemlenebilir gerçek olduğunu belirtin.
6. Voiceover metnini yaklaşık 130–155 kelimede tutun ve telefon veya mevcut bir ses aracıyla İngilizce kaydedin.
7. CapCut, Canva veya benzeri erişilebilir bir editörde 1080x1920 proje oluşturun.
8. Kaynak videodan yalnızca yorum yapılan noktaları destekleyen kısa klipler kullanın. Orijinal videoyu kesintisiz veya büyük ölçüde yeniden yayınlamayın.
9. İngilizce altyazı, güçlü bir açılış başlığı ve görünür şirket/kaynak kredisi ekleyin.
10. Yaklaşık 45–60 saniyelik videoyu izleyerek iddia, telaffuz, kaynak gösterimi ve mobil okunabilirliği kontrol edin.
11. RoboLogAI brief'ini onaylayın ve TXT çıktısını yayın metni olarak kullanın.
12. Videoyu YouTube Shorts'a manuel olarak yükleyin. Otomatik yayınlama kullanmayın.

Bu yöntemle ilk yayın için makul hedef **yarım ila bir iş günü**dür. İlk 5–10 video manuel hazırlanmalıdır; tekrar eden ve en fazla zaman alan adımlar ölçüldükten sonra otomasyon yatırımı yapılmalıdır.

## İş açısından önerilen sıra

1. Çalışan deployment ve temel güvenlik
2. İlk 5–10 videoyu yarı manuel üretme
3. Üretim süresini adım bazında ölçme
4. Otomatik transcript çıkarma
5. Voiceover üretimi
6. Şablon tabanlı FFmpeg render
7. Gelişmiş klip editörü ve render kuyruğu

Başarı ölçütü yalnızca otomasyon değildir. İlk aşamada takip edilmesi gereken metrikler: video başına üretim süresi, yayın sıklığı, izlenme süresi, ilk üç saniye tutma oranı ve bir videonun doğrudan maliyetidir.

