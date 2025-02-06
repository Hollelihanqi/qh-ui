import { computed } from "vue";
import { useData } from "vitepress";
import { defaultLang } from "../constant";
import { createCrowdinUrl, createGitHubUrl } from "../utils";

export function useEditLink() {
  const { page, theme, frontmatter } = useData();

  const text = computed(() => {
    // return canEditSource.value
    //   ? editLink.value['edit-on-github']
    //   : editLink.value['edit-on-crowdin']
    return "editLink.value.edit-on-github";
  });

  return {
    url: "",
    text,
  };
}
