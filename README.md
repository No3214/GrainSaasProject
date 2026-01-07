<div align="center">
  
# 🌾 Grain n8n Workflow Suite

[![CI](https://github.com/No3214/GrainSaasProject/actions/workflows/ci.yml/badge.svg)](https://github.com/No3214/GrainSaasProject/actions)
[![npm version](https://badge.fury.io/js/@grain%2Fn8n-workflows.svg)](https://www.npmjs.com/package/@grain/n8n-workflows)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![n8n](https://img.shields.io/badge/n8n-v1.20+-blue.svg)](https://n8n.io)

**Dijital ajanslar, SaaS şirketleri ve konaklama işletmeleri için tasarlanmış,  
üretim seviyesinde 45+ n8n otomasyon şablonu.**

[Hızlı Başlangıç](#-hızlı-başlangıç) • 
[Kategoriler](#-kategoriler) • 
[Dokümantasyon](#-dokümantasyon) • 
[Katkıda Bulunma](#-katkıda-bulunma)

</div>

---

## ✨ Öne Çıkanlar

| Özellik | Açıklama |
|---------|----------|
| 🤖 **Agentic AI** | İnsan onay döngüsü içeren çoklu ajan koordinasyonu |
| 📊 **RevOps Hub** | AI destekli gelir tahmini ve anlaşma puanlama |
| 🔄 **Self-Healing** | Otomatik hata algılama ve kurtarma |
| 🎨 **Visual AI** | Görsel içerik üretimi ve optimizasyonu |
| 📈 **SEO Engine** | SERP takibi ve AI içerik önerileri |

## 🚀 Hızlı Başlangıç

### Yöntem 1: Docker Compose (Önerilen)

```bash
git clone https://github.com/No3214/GrainSaasProject.git
cd GrainSaasProject/docker
cp .env.example .env
# .env dosyasını kendi API anahtarlarınızla düzenleyin
docker-compose up -d
```

### Yöntem 2: Manuel Import
1. `templates/` klasöründen istediğiniz json dosyasını indirin.
2. n8n panelinde **Workflows > Import from File** seçeneğini kullanın.
3. Gerekli credential'ları ayarlayın.

## 📁 Kategoriler

### 🤖 AI & Gelişmiş Otomasyon (`templates/ai-automation`)
- Agentic AI Orchestrator
- AI Visual Content Generator
- Prompt Engineering Studio
- Knowledge Base AI Search
- Voice AI Assistant

### 📈 SEO & Pazarlama (`templates/seo-marketing`)
- SEO Engine (SERP Tracking, Keyword Gap)
- Multi-Platform Publisher v2 (9 Platforms)
- Email Marketing Automation
- Webinar & Event Automation
- Content Repurposing Engine
- GBP Auto Posting
- GSC Hub & Rank Tracker (API-Free)

### 🏨 Konaklama (`templates/hospitality`)
- Guest Communication Journey
- Review Management
- Restaurant Reservation
- Booking Channel Sync

### 💼 Ajans & RevOps (`templates/agency-revops`)
- RevOps Hub
- Lead Conversion Funnel
- Client Reporting Dashboard
- Proposal & Contract Generator
- Meeting Intelligence Hub

### 👥 HR & Ops (`templates/ops-hr`)
- HR Onboarding/Offboarding
- Recruitment AI Agent
- Ticket Escalation Manager
- Contract Review & Compliance

### ⚙️ Genel & Altyapı (`templates/general`)
- Master Orchestrator (Chain Controller)
- Self-Healing Pipeline
- NPS Feedback Collection
- Subscription Lifecycle Manager
- Competitor Monitoring
- Intelligent CDP & Analytics
- Invoice Automation & Churn Prediction

## 📖 Dokümantasyon
- [Kurulum Rehberi](docs/INSTALL.md)
- [Satış Rehberi](docs/sales_guide.md)
- [İş Rehberi](docs/guide_n8n_business.md)

## 🛠️ Gereksinimler
| Araç | Minimum Versiyon |
|------|------------------|
| n8n | 1.20.0+ |
| Node.js | 18.0.0+ |
| PostgreSQL | 14+ (önerilen) |

## 🤝 Katkıda Bulunma
Katkılarınızı bekliyoruz! Lütfen [CONTRIBUTING.md](CONTRIBUTING.md) dosyasını okuyun.

## ❤️ Projeyi Destekle

Bu proje bireysel geliştiriciler için her zaman ücretsiz kalacak.
Eğer değerli buluyorsanız, sponsor olmayı düşünün:

[![GitHub Sponsors](https://img.shields.io/badge/Sponsor-%E2%9D%A4-red)](https://github.com/sponsors/No3214)

### Sponsor Avantajları

| Tier | Aylık | Özellikler |
|------|-------|------------|
| ☕ Coffee | $5 | İsminiz SPONSORS.md'de |
| 🌱 Seed | $25 | + Early access + Discord VIP |
| 🌾 Grain | $100 | + Aylık 30 dk danışmanlık |
| 🏆 Harvest | $500 | + Custom workflow (1/ay) + Logo README'de |

## 💼 Ticari & Kurumsal

**Grain Pro Bundle** ($199) - [Satın Al](#)
- ✅ Tüm 48+ Workflow
- ✅ 10 Saat Video Eğitim
- ✅ Kurulum Desteği
- ✅ Ticari Lisans

Sorularınız için: license@grain-automation.com
