# Grain SaaS 2.0 - Agentic AI Automation Suite

## Proje Özeti
Grain SaaS 2.0, küçük ve orta ölçekli işletmeler için tasarlanmış, maliyet etkin ve yüksek performanslı bir yapay zeka otomasyon altyapısıdır. Bu sistem, n8n (self-hosted) üzerinde çalışan ve OpenAI gpt-4o gibi güçlü modellerle desteklenen bir "Agentic" (temsilci tabanlı) orkestra şefidir.

## Ana Bileşenler
1. **Agentic AI Orchestrator v2 Pro:** Sistemin beyni. Görevleri analiz eder, uygun yapay zeka ajanlarına dağıtır, maliyetleri takip eder ve sonuçları birleştirir.
2. **Specialized Agents:**
   - **Lead Enrichment:** Şirket ve kişi araştırması yapar.
   - **SEO Intelligence:** AI SERP görünürlüğü ve rakip analizi yapar.
   - **Content Factory:** Viral video özetleri ve reklam görselleri oluşturur.
   - **Sentiment Analysis:** Marka algısı ve duygu analizi yapar.
3. **Infrastructure:**
   - **n8n Community Edition:** Ücretsiz, limitsiz iş akışı motoru.
   - **MCP Filesystem Server:** Yapay zekanın yerel dosyalara güvenli erişimi.
   - **Cost Tracking:** Google Sheets üzerinden anlık token ve maliyet takibi.

## Kullanıcı Gereksinimleri & Hedefler
- **Maliyet Etkinlik:** Ücretli bulut servisleri yerine self-hosted araçlarla (n8n, MCP) minimum gider.
- **Güçlü Otomasyon:** Manuel işleri sıfıra indiren karmaşık karar mekanizmaları.
- **Kullanım Kolaylığı:** Chat UI üzerinden asistanla doğal dilde iletişim.
- **Güvenli Yedekleme:** Tüm sistemin Google Drive ve GitHub üzerinde güvenli senkronizasyonu.

## Kurulum ve Kullanım (Otomatik & Manuel)

### 🚀 Yöntem 1: Tam Otomatik (Önerilen)
Bu proje, 120+ workflow'u tek seferde yüklemek için **özel scriptler** içerir.
1. `scripts/node_import_v2.js` dosyasını çalıştırarak API üzerinden toplu yükleme yapabilirsiniz.
   ```bash
   node scripts/node_import_v2.js
   ```

### 🛠️ Yöntem 2: Manuel Yükleme
Eğer sadece belirli dosyaları yüklemek isterseniz:
1. `templates/pro/Grain_Agentic_AI_Orchestrator_v2_Pro.json` dosyasını n8n'e aktarın.
2. (Sorun yaşarsanız `MANUEL_KURULUM` klasöründeki FIX dosyalarını kullanın).
3. OpenAI API anahtarınızı `Credentials` kısmına ekleyin.
4. **Chat UI** kutucuğuna tıklayıp **Open Chat** diyerek asistanınızla konuşmaya başlayın.

---
*Bu proje, No3214 tarafından profesyonel saas otomasyonları geliştirmek için oluşturulmuştur.*
