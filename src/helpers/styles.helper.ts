type TStyle = undefined | string;

export function stylesFilter(styles: TStyle[]): string | undefined {
  const stylesArr = styles.filter((style) => style).join(' ');
  return stylesArr.trim() ? stylesArr : undefined;
}
