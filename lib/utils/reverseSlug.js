export default function reverseSlug(slug) {
  // Split the slug into an array of words
  const words = slug.split("-");

  // Capitalize the first letter of each word
  const capitalizedWords = words.map((word, wIdx) =>
    wIdx >= 0 ? word[0].toUpperCase() + word.slice(1) : word
  );

  // Join the capitalized words with a space
  return capitalizedWords.join(" ");
}
