"use client";

import { useState } from "react";
import { Announcement, BlogPost } from "@/db/schema";
import { MassScheduleItem, OfficeHourItem, OfficeVacationInfo, PriestInfo, ContactInfo } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ClipboardList,
  Newspaper,
  Church,
  Building2,
  User,
  Image as ImageIcon,
  ExternalLink,
  Check,
  Plus,
  X,
} from "lucide-react";

interface Props {
  initialAnnouncements: Announcement[];
  initialBlogPosts: BlogPost[];
  initialSettings: Record<string, any>;
  initialPhotos: string[];
}

export default function AdminDashboardClient({
  initialAnnouncements,
  initialBlogPosts,
  initialSettings,
  initialPhotos,
}: Props) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"ogloszenia" | "blog" | "msze" | "kancelaria" | "parafia" | "zdjecia">("ogloszenia");
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // State for Announcements
  const [announcementsList, setAnnouncementsList] = useState<Announcement[]>(initialAnnouncements);
  const [annForm, setAnnForm] = useState<{ id?: number; title: string; date: string; content: string; isPublished: boolean }>({
    title: "",
    date: new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" }),
    content: "",
    isPublished: true,
  });

  // State for Blog Posts
  const [blogList, setBlogList] = useState<BlogPost[]>(initialBlogPosts);
  const [blogForm, setBlogForm] = useState<{
    id?: number;
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    content: string;
    coverImage: string;
    galleryImages: string[];
    isPublished: boolean;
  }>({
    title: "",
    slug: "",
    date: new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" }),
    excerpt: "",
    content: "",
    coverImage: initialPhotos[0] || "/zdjecia/oltarz.jpg",
    galleryImages: [],
    isPublished: true,
  });

  // State for Mass Schedule
  const [massSchedule, setMassSchedule] = useState<MassScheduleItem[]>(
    initialSettings.mass_schedule || [
      { label: "Dni powszednie", times: ["18:00"] },
      { label: "Niedziele i Święta", times: ["07:00", "08:30", "10:00", "11:30"] },
    ]
  );

  // State for Office Hours & Vacation Status
  const [officeHours, setOfficeHours] = useState<OfficeHourItem[]>(
    initialSettings.office_hours || [
      { day: "Poniedziałek", hours: "16:00–17:00" },
      { day: "Środa", hours: "16:00–17:00" },
      { day: "Piątek", hours: "16:00–17:00" },
    ]
  );

  const [officeVacation, setOfficeVacation] = useState<OfficeVacationInfo>(
    initialSettings.office_vacation || {
      enabled: false,
      title: "Powiadomienie Kancelarii Parafialnej",
      message: "W sprawach pilnych prosimy o kontakt telefoniczny po Mszy wieczornej.",
      period: "15 - 30 sierpnia 2026",
    }
  );

  // State for Priest & Contact Info
  const [priestInfo, setPriestInfo] = useState<PriestInfo>(
    initialSettings.priest_info || {
      name: "Ks. Paweł Kowalski",
      title: "Proboszcz parafii",
      bio: "Duszpasterz naszej wspólnoty parafialnej w Doruchowie.",
      image: "/zdjecia/oltarzboczny.jpg",
    }
  );

  const [contactInfo, setContactInfo] = useState<ContactInfo>(
    initialSettings.contact_info || {
      phone: "+48 62 730 11 22",
      email: "kancelaria@parafia-doruchow.pl",
      address: "ul. Kępińska 1, 63-505 Doruchów",
    }
  );

  // State for Photos
  const [photosList, setPhotosList] = useState<string[]>(initialPhotos);

  // State for Photos Gallery Pagination (Max 30 photos per page)
  const [photosPage, setPhotosPage] = useState(1);
  const photosPerPage = 30;
  const totalPhotosPages = Math.ceil(photosList.length / photosPerPage);
  const paginatedPhotos = photosList.slice((photosPage - 1) * photosPerPage, photosPage * photosPerPage);

  // Flash message notification helper
  const notify = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // Logout handler
  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  // SAVE ANNOUNCEMENT
  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annForm.title || !annForm.content) return;

    if (annForm.id) {
      // Update
      const res = await fetch(`/api/admin/announcements/${annForm.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(annForm),
      });
      if (res.ok) {
        const updated = await res.json();
        setAnnouncementsList(announcementsList.map((a) => (a.id === updated.id ? updated : a)));
        notify("Zaktualizowano ogłoszenie");
        setAnnForm({
          title: "",
          date: new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" }),
          content: "",
          isPublished: true,
        });
      }
    } else {
      // Create
      const res = await fetch("/api/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(annForm),
      });
      if (res.ok) {
        const created = await res.json();
        setAnnouncementsList([created, ...announcementsList]);
        notify("Dodano nowe ogłoszenie");
        setAnnForm({
          title: "",
          date: new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" }),
          content: "",
          isPublished: true,
        });
      }
    }
  };

  // DELETE ANNOUNCEMENT
  const handleDeleteAnnouncement = async (id: number) => {
    if (!confirm("Czy na pewno usunąć to ogłoszenie?")) return;
    const res = await fetch(`/api/admin/announcements/${id}`, { method: "DELETE" });
    if (res.ok) {
      setAnnouncementsList(announcementsList.filter((a) => a.id !== id));
      notify("Usunięto ogłoszenie");
    }
  };

  // SAVE BLOG POST
  const handleSaveBlogPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.content) return;

    const slug = blogForm.slug || blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const payload = {
      ...blogForm,
      slug,
    };

    if (blogForm.id) {
      const res = await fetch(`/api/admin/blog/${blogForm.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const updated = await res.json();
        setBlogList(blogList.map((b) => (b.id === updated.id ? updated : b)));
        notify("Zaktualizowano wpis w blogu");
        setBlogForm({
          title: "",
          slug: "",
          date: new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" }),
          excerpt: "",
          content: "",
          coverImage: photosList[0] || "/zdjecia/oltarz.jpg",
          galleryImages: [],
          isPublished: true,
        });
      }
    } else {
      const res = await fetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const created = await res.json();
        setBlogList([created, ...blogList]);
        notify("Dodano nowy wpis na blogu");
        setBlogForm({
          title: "",
          slug: "",
          date: new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" }),
          excerpt: "",
          content: "",
          coverImage: photosList[0] || "/zdjecia/oltarz.jpg",
          galleryImages: [],
          isPublished: true,
        });
      }
    }
  };

  // DELETE BLOG POST
  const handleDeleteBlogPost = async (id: number) => {
    if (!confirm("Czy na pewno usunąć ten wpis?")) return;
    const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    if (res.ok) {
      setBlogList(blogList.filter((b) => b.id !== id));
      notify("Usunięto wpis z bloga");
    }
  };

  // SAVE SETTINGS (Masses, Office, Priest, Contact)
  const saveSettings = async (settingsData: Record<string, any>, successMsg: string) => {
    const res = await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settingsData),
    });
    if (res.ok) {
      notify(successMsg);
      router.refresh();
    } else {
      notify("Wystąpił błąd podczas zapisywania");
    }
  };

  // BATCH UPLOAD PHOTOS (supports selecting 20, 30, 40+ files)
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    notify(`Przesyłanie ${files.length} zdjęć... Proszę czekać`);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        const newUrls: string[] = data.urls || [data.url];
        setPhotosList((prev) => [...newUrls, ...prev]);

        // If uploading within blog form, auto add to current blog gallery
        if (blogForm) {
          setBlogForm((prev) => ({
            ...prev,
            galleryImages: [...prev.galleryImages, ...newUrls],
          }));
        }

        notify(`Pomyślnie dodano ${newUrls.length} zdjęć!`);
      } else {
        notify("Błąd podczas przesyłania plików");
      }
    } catch {
      notify("Błąd połączenia podczas przesyłania plików");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--parchment)" }}>
      {/* Header Bar */}
      <header
        style={{
          background: "var(--twilight)",
          color: "#fff",
          padding: "16px 0",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          className="container"
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.7)",
                display: "grid",
                placeItems: "center",
                fontFamily: "var(--serif)",
              }}
            >
              †
            </span>
            <strong style={{ fontSize: "18px", fontFamily: "var(--serif)", fontWeight: 400 }}>
              Panel Zarządzania Parafią Doruchów
            </strong>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link
              href="/"
              target="_blank"
              style={{
                color: "#fff",
                fontSize: "13px",
                padding: "6px 12px",
                border: "1px solid rgba(255,255,255,0.4)",
                borderRadius: "6px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Podgląd strony <ExternalLink size={14} />
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: "#ff8b8b",
                fontSize: "14px",
                cursor: "pointer",
                fontWeight: 500,
              }}
            >
              Wyloguj
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Area */}
      <div className="container" style={{ padding: "32px 0 64px" }}>
        {saveStatus && (
          <div
            style={{
              position: "fixed",
              bottom: "24px",
              right: "24px",
              zIndex: 300,
              padding: "14px 24px",
              background: "var(--twilight)",
              color: "#fff",
              borderRadius: "8px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Check size={18} color="#41a1cf" /> {saveStatus}
          </div>
        )}

        {/* Navigation Tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "32px",
            borderBottom: "1px solid var(--mist)",
            paddingBottom: "12px",
          }}
        >
          <button
            onClick={() => setActiveTab("ogloszenia")}
            className="btn"
            style={{
              borderColor: activeTab === "ogloszenia" ? "var(--blue)" : "var(--mist)",
              background: activeTab === "ogloszenia" ? "rgba(65,161,207,0.1)" : "transparent",
              color: activeTab === "ogloszenia" ? "var(--blue)" : "var(--charcoal)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ClipboardList size={16} /> Ogłoszenia ({announcementsList.length})
          </button>
          <button
            onClick={() => setActiveTab("blog")}
            className="btn"
            style={{
              borderColor: activeTab === "blog" ? "var(--blue)" : "var(--mist)",
              background: activeTab === "blog" ? "rgba(65,161,207,0.1)" : "transparent",
              color: activeTab === "blog" ? "var(--blue)" : "var(--charcoal)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Newspaper size={16} /> Blog & Wydarzenia ({blogList.length})
          </button>
          <button
            onClick={() => setActiveTab("msze")}
            className="btn"
            style={{
              borderColor: activeTab === "msze" ? "var(--blue)" : "var(--mist)",
              background: activeTab === "msze" ? "rgba(65,161,207,0.1)" : "transparent",
              color: activeTab === "msze" ? "var(--blue)" : "var(--charcoal)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Church size={16} /> Godziny Mszy Świętych
          </button>
          <button
            onClick={() => setActiveTab("kancelaria")}
            className="btn"
            style={{
              borderColor: activeTab === "kancelaria" ? "var(--blue)" : "var(--mist)",
              background: activeTab === "kancelaria" ? "rgba(65,161,207,0.1)" : "transparent",
              color: activeTab === "kancelaria" ? "var(--blue)" : "var(--charcoal)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Building2 size={16} /> Kancelaria & Alert Wakacyjny
          </button>
          <button
            onClick={() => setActiveTab("parafia")}
            className="btn"
            style={{
              borderColor: activeTab === "parafia" ? "var(--blue)" : "var(--mist)",
              background: activeTab === "parafia" ? "rgba(65,161,207,0.1)" : "transparent",
              color: activeTab === "parafia" ? "var(--blue)" : "var(--charcoal)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <User size={16} /> Proboszcz & Kontakt
          </button>
          <button
            onClick={() => setActiveTab("zdjecia")}
            className="btn"
            style={{
              borderColor: activeTab === "zdjecia" ? "var(--blue)" : "var(--mist)",
              background: activeTab === "zdjecia" ? "rgba(65,161,207,0.1)" : "transparent",
              color: activeTab === "zdjecia" ? "var(--blue)" : "var(--charcoal)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <ImageIcon size={16} /> Galeria Zdjęć ({photosList.length})
          </button>
        </div>

        {/* TAB 1: OGŁOSZENIA */}
        {activeTab === "ogloszenia" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "32px" }}>
            <div className="card" style={{ padding: "28px" }}>
              <h3 style={{ margin: "0 0 20px" }}>
                {annForm.id ? "Edytuj Ogłoszenie" : "Dodaj Nowe Ogłoszenie"}
              </h3>
              <form onSubmit={handleSaveAnnouncement}>
                <div className="field">
                  <label htmlFor="ann-title">Tytuł ogłoszeń</label>
                  <input
                    id="ann-title"
                    type="text"
                    placeholder="np. Ogłoszenia parafialne — XX Niedziela Zwykła"
                    value={annForm.title}
                    onChange={(e) => setAnnForm({ ...annForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="ann-date">Data publikacji</label>
                  <input
                    id="ann-date"
                    type="text"
                    value={annForm.date}
                    onChange={(e) => setAnnForm({ ...annForm, date: e.target.value })}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="ann-content">Treść ogłoszeń (punkty 1, 2, 3...)</label>
                  <textarea
                    id="ann-content"
                    placeholder="Wpisz treść ogłoszeń parafialnych..."
                    value={annForm.content}
                    onChange={(e) => setAnnForm({ ...annForm, content: e.target.value })}
                    style={{ minHeight: "220px" }}
                    required
                  />
                </div>
                <div style={{ display: "flex", gap: "12px" }}>
                  <button type="submit" className="btn btn-dark">
                    {annForm.id ? "Zapisz zmiany" : "Opublikuj ogłoszenie"}
                  </button>
                  {annForm.id && (
                    <button
                      type="button"
                      className="btn"
                      onClick={() =>
                        setAnnForm({
                          title: "",
                          date: new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" }),
                          content: "",
                          isPublished: true,
                        })
                      }
                    >
                      Anuluj edycję
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div>
              <h3 style={{ marginBottom: "20px" }}>Opublikowane ogłoszenia</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {announcementsList.map((ann) => (
                  <div
                    key={ann.id}
                    className="card"
                    style={{ padding: "20px", display: "flex", justifyContent: "space-between", gap: "16px" }}
                  >
                    <div>
                      <span className="eyebrow" style={{ fontSize: "11px" }}>{ann.date}</span>
                      <h4 style={{ margin: "4px 0 8px", fontSize: "18px", fontFamily: "var(--serif)" }}>
                        {ann.title}
                      </h4>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "13px",
                          color: "var(--ash)",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {ann.content}
                      </p>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      <button
                        onClick={() =>
                          setAnnForm({
                            id: ann.id,
                            title: ann.title,
                            date: ann.date,
                            content: ann.content,
                            isPublished: ann.isPublished === 1,
                          })
                        }
                        className="btn btn-primary"
                        style={{ padding: "4px 10px", fontSize: "12px" }}
                      >
                        Edytuj
                      </button>
                      <button
                        onClick={() => handleDeleteAnnouncement(ann.id)}
                        style={{
                          padding: "4px 10px",
                          fontSize: "12px",
                          background: "#fce8e6",
                          color: "#c5221f",
                          border: "1px solid #f3babb",
                          borderRadius: "var(--radius-button)",
                          cursor: "pointer",
                        }}
                      >
                        Usuń
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BLOG & WYDARZENIA */}
        {activeTab === "blog" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "32px" }}>
            <div className="card" style={{ padding: "28px" }}>
              <h3 style={{ margin: "0 0 20px" }}>
                {blogForm.id ? "Edytuj wpis w blogu" : "Dodaj Nowy Wpis / Wydarzenie"}
              </h3>
              <form onSubmit={handleSaveBlogPost}>
                <div className="field">
                  <label htmlFor="blog-title">Tytuł wpisu</label>
                  <input
                    id="blog-title"
                    type="text"
                    placeholder="np. Uroczystość Odpustowa"
                    value={blogForm.title}
                    onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="blog-date">Data wydarzenia</label>
                  <input
                    id="blog-date"
                    type="text"
                    value={blogForm.date}
                    onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="blog-excerpt">Krótkie podsumowanie (skrót)</label>
                  <input
                    id="blog-excerpt"
                    type="text"
                    placeholder="Krótki opis do siatki wydarzeń"
                    value={blogForm.excerpt}
                    onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label htmlFor="blog-content">Pełna treść artykułu</label>
                  <textarea
                    id="blog-content"
                    placeholder="Wpisz treść artykułu..."
                    value={blogForm.content}
                    onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                    style={{ minHeight: "180px" }}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="blog-cover">Zdjęcie okładkowe (z folderu zdjecia)</label>
                  <select
                    id="blog-cover"
                    value={blogForm.coverImage}
                    onChange={(e) => setBlogForm({ ...blogForm, coverImage: e.target.value })}
                  >
                    {photosList.map((photo) => (
                      <option key={photo} value={photo}>
                        {photo}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", fontSize: "12px", color: "var(--ash)", marginBottom: "8px" }}>
                    Podgląd wybranej okładki:
                  </label>
                  <img
                    src={blogForm.coverImage}
                    alt="Cover preview"
                    style={{ height: "120px", borderRadius: "8px", objectFit: "cover" }}
                  />
                </div>

                {/* Batch Photo Upload for Blog Gallery */}
                <div style={{ marginBottom: "20px", padding: "16px", background: "var(--linen)", borderRadius: "8px", border: "1px solid var(--mist)" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--graphite)", marginBottom: "6px" }}>
                    Prześlij serie zdjęć do galerii tego wydarzenia (np. 10, 20, 30+ zdjęć naraz):
                  </label>
                  <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} style={{ width: "100%" }} />
                  <p style={{ margin: "6px 0 0", fontSize: "12px", color: "var(--ash)" }}>
                    Możesz zaznaczyć wiele plików na raz z dysku. Zostaną automatycznie przesłane i przypisane do galerii tego wpisu.
                  </p>
                </div>

                {/* Gallery Images Checkbox Selector */}
                <div style={{ marginBottom: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <label style={{ fontSize: "13px", fontWeight: 600, color: "var(--graphite)", margin: 0 }}>
                      Zdjęcia w galerii wpisu ({blogForm.galleryImages.length} wybranych):
                    </label>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        type="button"
                        className="btn"
                        style={{ padding: "2px 8px", fontSize: "11px" }}
                        onClick={() => setBlogForm({ ...blogForm, galleryImages: [...photosList] })}
                      >
                        Zaznacz wszystkie
                      </button>
                      <button
                        type="button"
                        className="btn"
                        style={{ padding: "2px 8px", fontSize: "11px" }}
                        onClick={() => setBlogForm({ ...blogForm, galleryImages: [] })}
                      >
                        Odznacz wszystkie
                      </button>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(90px, 1fr))",
                      gap: "8px",
                      maxHeight: "220px",
                      overflowY: "auto",
                      padding: "8px",
                      border: "1px solid var(--mist)",
                      borderRadius: "8px",
                      background: "#fff",
                    }}
                  >
                    {photosList.map((photo) => {
                      const isSelected = blogForm.galleryImages.includes(photo);
                      return (
                        <div
                          key={photo}
                          onClick={() => {
                            const newGallery = isSelected
                              ? blogForm.galleryImages.filter((p) => p !== photo)
                              : [...blogForm.galleryImages, photo];
                            setBlogForm({ ...blogForm, galleryImages: newGallery });
                          }}
                          style={{
                            position: "relative",
                            height: "65px",
                            borderRadius: "6px",
                            overflow: "hidden",
                            border: isSelected ? "2px solid var(--blue)" : "1px solid var(--mist)",
                            cursor: "pointer",
                            opacity: isSelected ? 1 : 0.4,
                          }}
                        >
                          <img src={photo} alt={photo} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          {isSelected && (
                            <div
                              style={{
                                position: "absolute",
                                top: 4,
                                right: 4,
                                background: "var(--blue)",
                                color: "#fff",
                                borderRadius: "50%",
                                width: "16px",
                                height: "16px",
                                display: "grid",
                                placeItems: "center",
                                fontSize: "10px",
                                fontWeight: 700,
                              }}
                            >
                              ✓
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px" }}>
                  <button type="submit" className="btn btn-dark">
                    {blogForm.id ? "Zapisz zmiany" : "Opublikuj artykuł"}
                  </button>
                  {blogForm.id && (
                    <button
                      type="button"
                      className="btn"
                      onClick={() =>
                        setBlogForm({
                          title: "",
                          slug: "",
                          date: new Date().toLocaleDateString("pl-PL", { day: "numeric", month: "long", year: "numeric" }),
                          excerpt: "",
                          content: "",
                          coverImage: photosList[0] || "/zdjecia/oltarz.jpg",
                          galleryImages: [],
                          isPublished: true,
                        })
                      }
                    >
                      Anuluj
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div>
              <h3 style={{ marginBottom: "20px" }}>Opublikowane wydarzenia</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {blogList.map((post) => (
                  <div
                    key={post.id}
                    className="card"
                    style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}
                  >
                    <img src={post.coverImage} alt={post.title} style={{ height: "140px", objectFit: "cover" }} />
                    <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <span className="eyebrow" style={{ fontSize: "11px", marginBottom: "4px" }}>{post.date}</span>
                      <h4 style={{ margin: "0 0 8px", fontSize: "16px", fontFamily: "var(--serif)" }}>
                        {post.title}
                      </h4>
                      <div style={{ marginTop: "auto", display: "flex", gap: "8px", paddingTop: "12px" }}>
                        <button
                          onClick={() =>
                            setBlogForm({
                              id: post.id,
                              title: post.title,
                              slug: post.slug,
                              date: post.date,
                              excerpt: post.excerpt,
                              content: post.content,
                              coverImage: post.coverImage,
                              galleryImages: JSON.parse(post.galleryImages || "[]"),
                              isPublished: post.isPublished === 1,
                            })
                          }
                          className="btn btn-primary"
                          style={{ padding: "4px 10px", fontSize: "12px", flex: 1, justifyContent: "center" }}
                        >
                          Edytuj
                        </button>
                        <button
                          onClick={() => handleDeleteBlogPost(post.id)}
                          style={{
                            padding: "4px 10px",
                            fontSize: "12px",
                            background: "#fce8e6",
                            color: "#c5221f",
                            border: "1px solid #f3babb",
                            borderRadius: "var(--radius-button)",
                            cursor: "pointer",
                          }}
                        >
                          Usuń
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MSZE ŚWIĘTE */}
        {activeTab === "msze" && (
          <div className="card" style={{ padding: "32px", maxWidth: "850px" }}>
            <h3 style={{ margin: "0 0 8px" }}>Zarządzanie Godzinami Mszy Świętych</h3>
            <p style={{ color: "var(--ash)", marginBottom: "28px" }}>
              Możesz zarządzać porządkiem Mszy Świętych dla kościoła parafialnego w Doruchowie oraz kościoła filialnego w Bobrownikach.
            </p>

            {massSchedule.map((category, catIdx) => (
              <div
                key={catIdx}
                style={{
                  marginBottom: "24px",
                  padding: "20px",
                  border: "1px solid var(--mist)",
                  borderRadius: "12px",
                  background: "var(--linen)",
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div className="field" style={{ margin: 0 }}>
                    <label>Lokalizacja kościoła</label>
                    <select
                      value={category.location || "Kościół parafialny w Doruchowie"}
                      onChange={(e) => {
                        const newSched = [...massSchedule];
                        newSched[catIdx].location = e.target.value;
                        setMassSchedule(newSched);
                      }}
                    >
                      <option value="Kościół parafialny w Doruchowie">Kościół parafialny w Doruchowie</option>
                      <option value="Kościół filialny pw. św. Barbary w Bobrownikach">Kościół filialny pw. św. Barbary w Bobrownikach</option>
                    </select>
                  </div>

                  <div className="field" style={{ margin: 0 }}>
                    <label>Nazwa kategorii (np. Niedziele i Święta)</label>
                    <input
                      type="text"
                      value={category.label}
                      onChange={(e) => {
                        const newSched = [...massSchedule];
                        newSched[catIdx].label = e.target.value;
                        setMassSchedule(newSched);
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontSize: "12px", color: "var(--ash)", marginBottom: "6px" }}>
                    Godziny Mszy (np. 09:15, 11:00, 18:00)
                  </label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                    {category.times.map((time, timeIdx) => (
                      <div key={timeIdx} style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <input
                          type="text"
                          value={time}
                          onChange={(e) => {
                            const newSched = [...massSchedule];
                            newSched[catIdx].times[timeIdx] = e.target.value;
                            setMassSchedule(newSched);
                          }}
                          style={{ width: "90px", textAlign: "center" }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const newSched = [...massSchedule];
                            newSched[catIdx].times = newSched[catIdx].times.filter((_, i) => i !== timeIdx);
                            setMassSchedule(newSched);
                          }}
                          style={{ background: "none", border: "none", color: "#c5221f", cursor: "pointer", display: "grid", placeItems: "center", padding: "4px" }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ padding: "4px 10px", fontSize: "12px", display: "inline-flex", alignItems: "center", gap: "4px" }}
                      onClick={() => {
                        const newSched = [...massSchedule];
                        newSched[catIdx].times.push("10:00");
                        setMassSchedule(newSched);
                      }}
                    >
                      <Plus size={14} /> Dodaj godzinę
                    </button>
                  </div>
                </div>

                <div style={{ textAlign: "right", marginTop: "12px" }}>
                  <button
                    type="button"
                    style={{ background: "none", border: "none", color: "#c5221f", fontSize: "12px", cursor: "pointer" }}
                    onClick={() => {
                      if (confirm("Czy na pewno usunąć tę kategorię Mszy Świętych?")) {
                        setMassSchedule(massSchedule.filter((_, i) => i !== catIdx));
                      }
                    }}
                  >
                    Usuń tę kategorię
                  </button>
                </div>
              </div>
            ))}

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "20px" }}>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setMassSchedule([
                    ...massSchedule,
                    {
                      location: "Kościół filialny pw. św. Barbary w Bobrownikach",
                      label: "Niedziele i Święta",
                      times: ["09:15", "11:00"],
                    },
                  ]);
                }}
              >
                + Dodaj kategorię dla Bobrownik
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  setMassSchedule([
                    ...massSchedule,
                    {
                      location: "Kościół parafialny w Doruchowie",
                      label: "Dni powszednie",
                      times: ["18:00"],
                    },
                  ]);
                }}
              >
                + Dodaj kategorię dla Doruchowa
              </button>
            </div>

            <div style={{ marginTop: "28px" }}>
              <button
                onClick={() => saveSettings({ mass_schedule: massSchedule }, "Zapisano porządek Mszy Świętych dla obu kościołów")}
                className="btn btn-dark"
              >
                Zapisz zmiany w porządku Mszy Św.
              </button>
            </div>
          </div>
        )}

        {/* TAB 4: KANCELARIA & VACATION ALERT */}
        {activeTab === "kancelaria" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
            <div className="card" style={{ padding: "28px" }}>
              <h3 style={{ margin: "0 0 20px" }}>Godziny otwarcia Kancelarii</h3>
              {officeHours.map((item, idx) => (
                <div key={idx} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                  <input
                    type="text"
                    value={item.day}
                    onChange={(e) => {
                      const newH = [...officeHours];
                      newH[idx].day = e.target.value;
                      setOfficeHours(newH);
                    }}
                    placeholder="Dzień"
                  />
                  <input
                    type="text"
                    value={item.hours}
                    onChange={(e) => {
                      const newH = [...officeHours];
                      newH[idx].hours = e.target.value;
                      setOfficeHours(newH);
                    }}
                    placeholder="Godziny"
                  />
                </div>
              ))}
              <button
                onClick={() => saveSettings({ office_hours: officeHours }, "Zapisano godziny otwarcia kancelarii")}
                className="btn btn-dark"
                style={{ marginTop: "12px" }}
              >
                Zapisz godziny kancelarii
              </button>
            </div>

            <div className="card" style={{ padding: "28px" }}>
              <h3 style={{ margin: "0 0 8px" }}>Informacja o urlopie / zamknięciu kancelarii</h3>
              <p style={{ color: "var(--ash)", fontSize: "14px", marginBottom: "20px" }}>
                Włącz ten komunikat, aby wyświetlić specjalny baner dla parafian o przerwie w pracy kancelarii (np. wakacje, urlop, święta).
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <label style={{ fontWeight: 600, fontSize: "15px", cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={officeVacation.enabled}
                    onChange={(e) => setOfficeVacation({ ...officeVacation, enabled: e.target.checked })}
                    style={{ width: "20px", height: "20px", marginRight: "8px", verticalAlign: "middle" }}
                  />
                  Włącz powiadomienie o zamknięciu kancelarii
                </label>
              </div>

              <div className="field">
                <label htmlFor="vac-title">Tytuł powiadomienia</label>
                <input
                  id="vac-title"
                  type="text"
                  value={officeVacation.title}
                  onChange={(e) => setOfficeVacation({ ...officeVacation, title: e.target.value })}
                />
              </div>

              <div className="field">
                <label htmlFor="vac-period">Okres zamknięcia (np. 15–30 sierpnia)</label>
                <input
                  id="vac-period"
                  type="text"
                  value={officeVacation.period}
                  onChange={(e) => setOfficeVacation({ ...officeVacation, period: e.target.value })}
                />
              </div>

              <div className="field">
                <label htmlFor="vac-msg">Dodatkowe informacje dla parafian</label>
                <textarea
                  id="vac-msg"
                  value={officeVacation.message}
                  onChange={(e) => setOfficeVacation({ ...officeVacation, message: e.target.value })}
                />
              </div>

              {/* Live Preview Box */}
              <div style={{ marginTop: "20px", padding: "16px", background: "#fff9e6", border: "1px solid #f0d58c", borderRadius: "8px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#d99000", textTransform: "uppercase" }}>
                  Podgląd baneru na stronie głównej:
                </span>
                <div style={{ marginTop: "8px", color: "#7a5600", fontSize: "14px" }}>
                  <strong>{officeVacation.title}</strong>
                  {officeVacation.period && <span> ({officeVacation.period}): </span>}
                  <p style={{ margin: "4px 0 0" }}>{officeVacation.message}</p>
                </div>
              </div>

              <button
                onClick={() => saveSettings({ office_vacation: officeVacation }, "Zapisano status urlopu kancelarii")}
                className="btn btn-dark"
                style={{ marginTop: "20px" }}
              >
                Zapisz ustawienia urlopu
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: PARAFIA & PROBOSZCZ */}
        {activeTab === "parafia" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
            <div className="card" style={{ padding: "28px" }}>
              <h3 style={{ margin: "0 0 20px" }}>Duszpasterz / Proboszcz</h3>
              <div className="field">
                <label htmlFor="pr-name">Imię i nazwisko kapłana</label>
                <input
                  id="pr-name"
                  type="text"
                  value={priestInfo.name}
                  onChange={(e) => setPriestInfo({ ...priestInfo, name: e.target.value })}
                />
              </div>
              <div className="field">
                <label htmlFor="pr-title">Tytuł posługi</label>
                <input
                  id="pr-title"
                  type="text"
                  value={priestInfo.title}
                  onChange={(e) => setPriestInfo({ ...priestInfo, title: e.target.value })}
                />
              </div>
              <div className="field">
                <label htmlFor="pr-bio">Opis posługi</label>
                <textarea
                  id="pr-bio"
                  value={priestInfo.bio}
                  onChange={(e) => setPriestInfo({ ...priestInfo, bio: e.target.value })}
                />
              </div>
              <div className="field">
                <label htmlFor="pr-img">Zdjęcie proboszcza</label>
                <select
                  id="pr-img"
                  value={priestInfo.image}
                  onChange={(e) => setPriestInfo({ ...priestInfo, image: e.target.value })}
                >
                  {photosList.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => saveSettings({ priest_info: priestInfo }, "Zapisano dane proboszcza")}
                className="btn btn-dark"
              >
                Zapisz dane proboszcza
              </button>
            </div>

            <div className="card" style={{ padding: "28px" }}>
              <h3 style={{ margin: "0 0 20px" }}>Dane kontaktowe parafii</h3>
              <div className="field">
                <label htmlFor="ct-phone">Telefon</label>
                <input
                  id="ct-phone"
                  type="text"
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                />
              </div>
              <div className="field">
                <label htmlFor="ct-email">E-mail</label>
                <input
                  id="ct-email"
                  type="text"
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                />
              </div>
              <div className="field">
                <label htmlFor="ct-addr">Adres parafii</label>
                <input
                  id="ct-addr"
                  type="text"
                  value={contactInfo.address}
                  onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                />
              </div>
              <button
                onClick={() => saveSettings({ contact_info: contactInfo }, "Zapisano dane kontaktowe")}
                className="btn btn-dark"
              >
                Zapisz dane kontaktowe
              </button>
            </div>
          </div>
        )}

        {/* TAB 6: GALERIA ZDJĘĆ */}
        {activeTab === "zdjecia" && (
          <div>
            <div className="card" style={{ padding: "28px", marginBottom: "32px" }}>
              <h3 style={{ margin: "0 0 12px" }}>Dodaj Nowe Zdjęcie do Galerii</h3>
              <p style={{ color: "var(--ash)", fontSize: "14px", marginBottom: "20px" }}>
                Możesz wgrać własne zdjęcie w formacie JPG, PNG lub WebP. Zostanie automatycznie zachowane w folderze zdjęć strony.
              </p>
              <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} />
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
              <h3 style={{ margin: 0 }}>Dostępne zdjęcia w parafii ({photosList.length})</h3>
              {totalPhotosPages > 1 && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "13px", color: "var(--ash)" }}>
                    Strona {photosPage} z {totalPhotosPages}
                  </span>
                  <button
                    onClick={() => setPhotosPage((p) => Math.max(p - 1, 1))}
                    disabled={photosPage === 1}
                    className="btn"
                    style={{ padding: "4px 10px", fontSize: "12px", opacity: photosPage === 1 ? 0.5 : 1 }}
                  >
                    ← Poprzednia
                  </button>
                  <button
                    onClick={() => setPhotosPage((p) => Math.min(p + 1, totalPhotosPages))}
                    disabled={photosPage === totalPhotosPages}
                    className="btn"
                    style={{ padding: "4px 10px", fontSize: "12px", opacity: photosPage === totalPhotosPages ? 0.5 : 1 }}
                  >
                    Następna →
                  </button>
                </div>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "16px",
              }}
            >
              {paginatedPhotos.map((photo) => (
                <div
                  key={photo}
                  className="card"
                  style={{ overflow: "hidden", position: "relative" }}
                >
                  <img src={photo} alt={photo} loading="lazy" style={{ height: "160px", objectFit: "cover", width: "100%" }} />
                  <div style={{ padding: "10px", fontSize: "12px", color: "var(--ash)", wordBreak: "break-all" }}>
                    {photo}
                  </div>
                </div>
              ))}
            </div>

            {totalPhotosPages > 1 && (
              <div style={{ display: "flex", justifyContent: "center", gap: "8px", marginTop: "24px" }}>
                {Array.from({ length: totalPhotosPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setPhotosPage(page)}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "8px",
                      border: "1px solid var(--mist)",
                      background: photosPage === page ? "var(--twilight)" : "var(--paper)",
                      color: photosPage === page ? "#fff" : "var(--charcoal)",
                      fontWeight: 600,
                      fontSize: "13px",
                      cursor: "pointer",
                    }}
                  >
                    {page}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
