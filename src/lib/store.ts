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

// Initial clean data - no sample/demo posts
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
  announcements: [],
  blogPosts: [],
};

const BLOB_DB_FILENAME = "data/parafia_store.json";

// Smart Put supporting both Public and Private Blob Stores
export async function smartBlobPut(pathname: string, body: Buffer | string, contentType: string) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  try {
    return await put(pathname, body, {
      access: "public",
      contentType,
      token,
      addRandomSuffix: false,
      allowOverwrite: true,
    });
  } catch (err: any) {
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
        // Sort by uploadedAt descending to get latest version
        const sortedBlobs = blobs.blobs.sort(
          (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        );
        const latestBlob = sortedBlobs[0];
        const targetUrl = (latestBlob as any).downloadUrl || latestBlob.url;
        const cacheBustUrl = targetUrl.includes("?")
          ? `${targetUrl}&t=${Date.now()}`
          : `${targetUrl}?t=${Date.now()}`;

        const res = await fetch(cacheBustUrl, {
          cache: "no-store",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          return {
            siteSettings: data.siteSettings || defaultSeedData.siteSettings,
            announcements: Array.isArray(data.announcements) ? data.announcements : [],
            blogPosts: Array.isArray(data.blogPosts) ? data.blogPosts : [],
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
      announcements: ann,
      blogPosts: blog,
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
