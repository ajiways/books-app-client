type TStyle = undefined | string;

export function filter(styles: TStyle[]): string | undefined {
  const stylesArr = styles.filter((style) => style).join(' ');
  return stylesArr.trim() ? stylesArr : undefined;
}
