function splitTags(splitChars: string[] | undefined, value: string) {
  if (!splitChars) {
    return [value];
  }

  return value
    .split(new RegExp(`[${splitChars.join('')}]`))
    .map((tag) => tag.trim())
    .filter((tag) => tag !== '');
}

interface GetSplittedTagsInput {
  splitChars: string[] | undefined;
  allowDuplicates: boolean | undefined;
  maxTags: number | undefined;
  value: string;
  currentTags: string[];
}

export function getSplittedTags(props: GetSplittedTagsInput) {
  const splitted = splitTags(props.splitChars, props.value);
  const merged = props.allowDuplicates
    ? [...props.currentTags, ...splitted]
    : [...new Set([...props.currentTags, ...splitted])];

  return props.maxTags ? merged.slice(0, props.maxTags) : merged;
}
