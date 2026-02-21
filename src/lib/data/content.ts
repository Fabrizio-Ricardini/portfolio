import aboutContent from "@/content/about.md";
import experienceContent from "@/content/experience.md";
import skillsContent from "@/content/skills.md";
import readmeContent from "@/content/README.md";
import contactContent from "@/content/contact.sh";

export const fileContents: Record<string, string> = {
  readme: readmeContent,
  about: aboutContent,
  experience: experienceContent,
  skills: skillsContent,
  contact: contactContent,
};
