import { client } from "./client";
import type {
  ExperienceItem,
  Skill,
  Project,
  Feature,
} from "@/lib/content";

export async function getSiteData() {
  const [experienceItems, skillItems, techTagItems, projectItems, profileData] =
    await Promise.all([
      client.fetch<ExperienceItem[]>(
        `*[_type == "experience"] | order(order asc) { company, role, period, tag, desc }`
      ),
      client.fetch<Skill[]>(
        `*[_type == "skill"] | order(order asc) { name, level }`
      ),
      client.fetch<{ name: string }[]>(
        `*[_type == "techTag"] | order(order asc) { name }`
      ),
      client.fetch<(Omit<Project, "id"> & { id: { current: string } })[]>(
        `*[_type == "project"] | order(order asc) { "id": id.current, label, title, description, tech, status, statusText, links }`
      ),
      client.fetch<{ aboutFeatures: Feature[] } | null>(
        `*[_type == "profile"][0] { aboutFeatures }`
      ),
    ]);

  return {
    experience: experienceItems.length > 0 ? experienceItems : null,
    skills: skillItems.length > 0 ? skillItems : null,
    tags:
      techTagItems.length > 0 ? techTagItems.map((t) => t.name) : null,
    projects:
      projectItems.length > 0
        ? (projectItems as unknown as Project[])
        : null,
    aboutFeatures:
      profileData?.aboutFeatures?.length ? profileData.aboutFeatures : null,
  };
}
