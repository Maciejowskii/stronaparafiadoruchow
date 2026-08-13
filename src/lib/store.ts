import { db } from "@/db";
import { announcements, blogPosts, siteSettings } from "@/db/schema";
import { desc } from "drizzle-orm";
import { put, list } from "@vercel/blob";
import { Announcement, BlogPost } from "@/db/schema";

interface StorageData {
  announcements: Announcement[];
  blogPosts: BlogPost[];
  siteSettings: Record<string, any>;
}

// Initial seed data used if blob is empty
const defaultSeedData: StorageData = {
  siteSettings: {
    mass_schedule: [
      { location: "Kościół parafialny w Doruchowie", label: "Dni powszednie", times: ["18:00"] },
      { location: "Kościół parafialny w Doruchowie", label: "Niedziele i Święta", times: ["07:00", "08:30", "10:00", "11:30"] },
      { location: "Kościół filialny pw. św. Barbary w Bobrownikach", label: "Niedziele i Święta", times: ["09:15", "11:00"] },
    ],
    office_hours: [
      { day: "Poniedziałek", hours: "16:00–17:00" },
      { day: "Środa", hours: "16:00–17:00" },
      { day: "Piątek", hours: "16:00–17:00" },
    ],
    office_vacation: {
      enabled: false,
      title: "Powiadomienie Kancelarii Parafialnej",
      message: "W sprawach pilnych (np. pogrzeb, wezwanie do chorego) prosimy o kontakt telefoniczny po Mszy Świętej wieczornej.",
      period: "15 - 30 sierpnia 2026",
    },
    priest_info: {
      name: "Ks. Ireneusz Powaga",
      title: "Proboszcz parafii",
      bio: "Duszpasterz naszej wspólnoty parafialnej w Doruchowie. Dba o rozwój duchowy parafian, opiekuje się zabytkowym kościołem oraz prowadzi duszpasterstwo dzieci, młodzieży i rodzin.",
      image: "/zdjecia/zzewnatrz5.jpg",
    },
    contact_info: {
      phone: "+48 62 730 11 22",
      email: "kancelaria@parafia-doruchow.pl",
      address: "ul. Kępińska 1, 63-505 Doruchów",
    },
  },
  announcements: [
    {
      id: 1,
      title: "XIX Niedziela Zwykła",
      date: "13 sierpnia 2026",
      content: `1. Serdecznie dziękujemy za wspólne świętowanie i dbanie o naszą świątynię.
2. W tym tygodniu obchodzimy Uroczystość Wniebowzięcia Najświętszej Maryi Panny (15 sierpnia). Msze Święte odprawiane będą w porządku niedzielnym: 07:00, 08:30, 10:00, 11:30. Na każdej Mszy św. poświęcenie ziół i kwiatów.
3. Spotkanie młodzieży przygotowującej się do Sakramentu Bierzmowania odbędzie się w piątek po Mszy św. wieczornej.
4. Bóg zapłać za składane ofiary na utrzymanie kościoła oraz bieżące prace konserwatorskie.`,
      isPublished: 1,
      createdAt: Date.now() - 1000 * 60 * 60 * 2,
    },
    {
      id: 2,
      title: "XVIII Niedziela Zwykła",
      date: "9 sierpnia 2026",
      content: `1. Kancelaria parafialna w tym tygodniu czynna w poniedziałki, środy i piątki od 16:00 do 17:00.
2. Okazja do Spowiedzi Świętej codziennie 20 minut przed Mszą Świętą.
3. Zachęcamy do nabywania i lektury tygodnika katolickiego "Niedziela" oraz "Przewodnika Katolickiego".`,
      isPublished: 1,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 4,
    },
    {
      id: 3,
      title: "XVII Niedziela Zwykła",
      date: "2 sierpnia 2026",
      content: `1. W minioną niedzielę odbyła się zbiórka na cele charytatywne Caritas. Zebrano kwotę 2450 zł. Serdeczne Bóg zapłać wszystkim darczyńcom.
2. Zapisy na pieszą pielgrzymkę przyjmowane są w kancelarii po Mszy świętej wieczornej.`,
      isPublished: 1,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 11,
    },
  ],
  blogPosts: [
    {
      id: 1,
      slug: "uroczystosc-odpustowa",
      title: "Uroczystość Odpustowa ku czci św. Stanisława Kostki",
      date: "15 czerwca 2026",
      excerpt: "Uroczyste świętowanie patrona naszej parafii połączone z procesją i wspólnym dziękczynieniem.",
      content: `W naszej wspólnocie parafialnej w Doruchowie przeżywaliśmy doroczną Uroczystość Odpustową ku czci św. Stanisława Kostki. Uroczystej Sumie odpustowej przewodniczył zaproszony ks. Dziekan, który w wygłoszonym słowie bożym przybliżył postać naszego patrona jako wzór odwagi i wiary dla młodego pokolenia.

Po Eucharystii odbyła się uroczysta procesja wokół kościoła z udziałem pocztów sztandarowych, strażaków, dzieci sypiących kwiaty oraz licznie zgromadzonych parafian i gości. Składamy serdeczne "Bóg zapłać" wszystkim osobiście zaangażowanym w przygotowanie tej pięknej uroczystości.`,
      coverImage: "/zdjecia/oltarz.jpg",
      galleryImages: JSON.stringify(["/zdjecia/oltarz.jpg", "/zdjecia/wewnatrz.jpg", "/zdjecia/zzewnatrz3.jpg", "/zdjecia/zzewnaatrz6.jpg"]),
      isPublished: 1,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 60,
    },
    {
      id: 2,
      slug: "procesja-bozego-ciala",
      title: "Procesja Bożego Ciała w naszej parafii",
      date: "4 czerwca 2026",
      excerpt: "Relacja z tradycyjnej procesji do czterech ołtarzy przygotowanych przez mieszkańców.",
      content: `Święto Ciała i Krwi Pańskiej zgromadziło całą naszą parafialną wspólnotę. Wyruszyliśmy z Najświętszym Sakramentem ulicami Doruchowa do czterech ołtarzy przygotowanych przez poszczególne rejony naszej parafii.

Dziękujemy rodzinom za trud i serce włożone w dekorację tras oraz budowę ołtarzy. Było to poruszające świadectwo żywej wiary i jedności naszej parafii.`,
      coverImage: "/zdjecia/zzewnaatrz6.jpg",
      galleryImages: JSON.stringify(["/zdjecia/zzewnaatrz6.jpg", "/zdjecia/zzewnatrz4.jpg", "/zdjecia/oltarzboczny.jpg", "/zdjecia/zzewnatrz5.jpg"]),
      isPublished: 1,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 70,
    },
    {
      id: 3,
      slug: "pierwsza-komunia-swieta",
      title: "Uroczystość Pierwszej Komunii Świętej",
      date: "17 maja 2026",
      excerpt: "Dzieci z naszej parafii po raz pierwszy przyjęły Pana Jezusa do swoich serc.",
      content: `W słoneczną niedzielę maja grupa dzieci z klasy trzeciej szkoły podstawowej w Doruchowie po raz pierwszy w pełni uczestniczyła we Mszy Świętej, przyjmując Eucharystię.

Otoczmy te dzieci i ich rodziny stałą modlitwą, aby radość ze spotkania z Chrystusem trwała w ich sercach przez całe życie.`,
      coverImage: "/zdjecia/wewnatrzambona.jpg",
      galleryImages: JSON.stringify(["/zdjecia/wewnatrzambona.jpg", "/zdjecia/wewnatrzorgany.jpg", "/zdjecia/wewnatrz.jpg"]),
      isPublished: 1,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 90,
    },
    {
      id: 4,
      slug: "odnowienie-wnetrza-kosciola",
      title: "Prace konserwatorskie we wnętrzu kościoła",
      date: "20 kwietnia 2026",
      excerpt: "Zakończenie kolejnego etapu prac odnowienia zabytkowych elementów świątyni.",
      content: `Dzięki Państwa ofiarności i życzliwości udało się pomyślnie ukończyć kolejny etap prac konserwatorskich w kościele parafialnym. Prace objęły odnowienie elementów drewnianych ambon, nawy głównej oraz przegląd stanu technicznego prospektu organowego.

Bóg zapłać wszystkim darczyńcom oraz wykonawcom za troskę o piękno naszego wspólnego domu modlitwy.`,
      coverImage: "/zdjecia/wewnatrzorgany.jpg",
      galleryImages: JSON.stringify(["/zdjecia/wewnatrzorgany.jpg", "/zdjecia/wewnatrz.jpg", "/zdjecia/zzewnatrzgrobowiec.jpg"]),
      isPublished: 1,
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 110,
    },
  ],
};

const BLOB_DB_FILENAME = "data/parafia_store.json";

// Smart Put supporting both Public and Private Blob Stores
export async function smartBlobPut(pathname: string, body: Buffer | string, contentType: string) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  try {
    // Try public mode first
    return await put(pathname, body, {
      access: "public",
      contentType,
      token,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
  } catch (err: any) {
    // If store is Private, retry with private access
    console.warn("Public Blob put failed, retrying with private access:", err?.message);
    return await put(pathname, body, {
      access: "private",
      contentType,
      token,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
  }
}

// Read store data from Blob or fallback to SQLite
export async function getStoreData(): Promise<StorageData> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (token) {
    try {
      const blobs = await list({ prefix: BLOB_DB_FILENAME, token });
      if (blobs.blobs.length > 0) {
        const latestBlob = blobs.blobs[0];
        const targetUrl = (latestBlob as any).downloadUrl || latestBlob.url;

        const res = await fetch(targetUrl, {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          return {
            siteSettings: data.siteSettings || defaultSeedData.siteSettings,
            announcements: data.announcements || defaultSeedData.announcements,
            blogPosts: data.blogPosts || defaultSeedData.blogPosts,
          };
        }
      }
    } catch (err) {
      console.error("Failed to fetch store from Vercel Blob:", err);
    }
  }

  // SQLite fallback
  try {
    const ann = await db.select().from(announcements).orderBy(desc(announcements.createdAt));
    const blog = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    const rows = await db.select().from(siteSettings);

    const settings: Record<string, any> = {};
    for (const row of rows) {
      try {
        settings[row.key] = JSON.parse(row.value);
      } catch {
        settings[row.key] = row.value;
      }
    }

    return {
      announcements: ann.length > 0 ? ann : defaultSeedData.announcements,
      blogPosts: blog.length > 0 ? blog : defaultSeedData.blogPosts,
      siteSettings: Object.keys(settings).length > 0 ? settings : defaultSeedData.siteSettings,
    };
  } catch (err) {
    console.error("Failed to read from SQLite:", err);
    return defaultSeedData;
  }
}

// Save store data to Blob or SQLite
export async function saveStoreData(data: StorageData): Promise<boolean> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  let blobSuccess = false;

  if (token) {
    try {
      const jsonContent = JSON.stringify(data, null, 2);
      await smartBlobPut(BLOB_DB_FILENAME, jsonContent, "application/json");
      blobSuccess = true;
    } catch (err) {
      console.error("Failed to save store data to Vercel Blob:", err);
    }
  }

  // SQLite fallback save
  try {
    for (const [key, val] of Object.entries(data.siteSettings)) {
      const stringVal = typeof val === "string" ? val : JSON.stringify(val);
      await db
        .insert(siteSettings)
        .values({ key, value: stringVal })
        .onConflictDoUpdate({
          target: siteSettings.key,
          set: { value: stringVal },
        });
    }
    return true;
  } catch (err) {
    if (token && blobSuccess) {
      return true;
    }
    return false;
  }
}
